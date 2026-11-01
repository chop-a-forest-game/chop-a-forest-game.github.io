"use client";

import { useEffect, useState } from "react";

// These are the original Adsterra GET CODE values supplied for chop-a-forest-game.github.io.
// The provider's iframe-format banner loader may call document.write, so it executes
// inside one same-origin srcDoc frame rather than the already-loaded Next.js document.
// No sandbox attribute is set: the provider can observe the parent site's origin/referrer.
const formats = {
  desktop: {
    width: 728,
    height: 90,
    code: `<script>
  atOptions = {
    'key' : '9c3dd40b83ef226ef855da4c27bc1b62',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/9c3dd40b83ef226ef855da4c27bc1b62"></script>`,
  },
  mobile: {
    width: 320,
    height: 50,
    code: `<script>
  atOptions = {
    'key' : '7f352439480b57ce4b04fb8fee16eefc',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/7f352439480b57ce4b04fb8fee16eefc"></script>`,
  },
} as const;

type Format = keyof typeof formats;

export function ResponsiveBannerAd() {
  const [format, setFormat] = useState<Format | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setFormat(query.matches ? "desktop" : "mobile");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const unit = format ? formats[format] : null;
  return (
    <aside className="caf-ad caf-banner" aria-label="Advertisement" data-ad-format="responsive-banner">
      <span className="caf-ad-label">Advertisement</span>
      <div className="caf-banner-content">
        {unit ? (
          <iframe
            key={format}
            title={`Advertisement — ${format} banner`}
            className="caf-banner-frame"
            width={unit.width}
            height={unit.height}
            scrolling="no"
            srcDoc={`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent;">${unit.code}</body></html>`}
            data-ad-unit={format}
          />
        ) : null}
      </div>
    </aside>
  );
}
