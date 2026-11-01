"use client";

import { useEffect } from "react";

// Mount only once per browser document; the root layout persists across SPA routes.
const SOCIAL_SCRIPT = "https://bauval.org/14/a32b66bd085393e8ab577acb7b45a884";
const SCRIPT_ID = "caf-adsterra-social-bar";

export function SocialBarAd() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SOCIAL_SCRIPT;
    script.async = false;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
    // Do not remove/re-execute on React StrictMode replay or SPA navigation.
  }, []);
  return null;
}
