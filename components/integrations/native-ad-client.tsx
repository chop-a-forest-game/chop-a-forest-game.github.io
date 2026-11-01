"use client";

import { useEffect, useRef } from "react";

export function NativeAdClient({ scriptUrl, containerId }: { scriptUrl: string; containerId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Defer to the next frame to avoid loading twice on React StrictMode's
    // immediate effect cleanup/replay. The container is already in the DOM.
    let script: HTMLScriptElement | null = null;
    const frame = requestAnimationFrame(() => {
      if (!host.isConnected || host.querySelector('script[data-caf-native]')) return;
      script = document.createElement("script");
      script.async = true;
      script.src = scriptUrl;
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-caf-native", "true");
      host.appendChild(script);
    });
    return () => {
      cancelAnimationFrame(frame);
      script?.remove();
      // React owns the native container element; do not clear it while mounted.
    };
  }, [scriptUrl, containerId]);

  return (
    <aside className="caf-ad caf-native" aria-label="Sponsored advertising" data-native-ad-slot>
      <span className="caf-ad-label">Advertisement · Sponsored</span>
      <div ref={hostRef} className="caf-native-content">
        <div id={containerId} />
      </div>
    </aside>
  );
}
