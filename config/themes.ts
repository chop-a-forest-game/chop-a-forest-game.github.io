import type { ThemeConfig, ThemePresetName } from "./types";

export const themes: Record<string, ThemeConfig> = {
  "obsidian-red": {
    name: "obsidian-red" as ThemePresetName,
    label: "Site Theme",
    description: "Selected site theme",
    tokens: {
  "background": "108 12% 92%",
  "foreground": "0 0% 7%",
  "card": "108 12% 88%",
  "card-foreground": "0 0% 7%",
  "primary": "95 39% 39%",
  "primary-foreground": "0 0% 0%",
  "secondary": "108 12% 85%",
  "muted": "108 12% 87%",
  "muted-foreground": "0 0% 7%",
  "border": "108 12% 76%",
  "radius": ".75rem",
  "card-shadow": "0 18px 50px rgba(20, 20, 30, .1)",
  "hero-gradient": "radial-gradient(circle at 78% 14%, hsl(95 39% 39% / .2), transparent 36%)",
  "background-pattern": "linear-gradient(hsl(0 0% 7% / .04) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 7% / .04) 1px, transparent 1px)",
  "font-sans": "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
  "font-heading": "\"IBM Plex Mono\", ui-monospace, SFMono-Regular, Menlo, monospace",
  "heading-weight": "600",
  "heading-letter-spacing": "0em"
},
  },
};
