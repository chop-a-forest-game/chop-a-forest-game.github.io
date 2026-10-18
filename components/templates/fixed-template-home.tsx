import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/config/site";
import { siteSkin } from "@/config/skin";
import type { HomePageDefinition, InternalLink } from "@/config/types";
import { visibleCorePages } from "@/content/registry";
import { esc, renderFixedDocument } from "@/lib/fixed-template/render";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

function supplement(home: HomePageDefinition): string {
  const sections = home.sections.map((section) => {
    const paragraphs = [section.intro, ...(section.paragraphs ?? [])].filter(Boolean).map((text) => `<p>${esc(text as string)}</p>`).join("");
    const subsections = (section.subsections ?? []).map((s) => `<div class="launch-subsection"><h3>${esc(s.heading)}</h3>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`).join("");
    const steps = section.steps?.length ? `<ol class="launch-steps">${section.steps.map((s) => `<li><strong>${esc(s.heading)}</strong> ${esc(s.description)}</li>`).join("")}</ol>` : "";
    const links = section.links?.length ? `<nav class="launch-related" aria-label="Guide shortcuts">${section.links.filter((l) => l.slug).map((l) => `<a href="${esc(routePath(l.slug))}"><strong>${esc(l.label)}</strong><span>${esc(l.description || "")}</span></a>`).join("")}</nav>` : "";
    return `<section id="${esc(section.id)}" class="launch-home-section"><h2>${esc(section.heading)}</h2>${paragraphs}${subsections}${steps}${links}</section>`;
  }).join("");
  return `<div class="launch-home-copy">${sections}<p><a href="https://www.roblox.com/games/103363457515322/Chop-A-Forest" target="_blank" rel="noopener noreferrer">Official Chop A Forest game on Roblox (WCT Capital)</a> — identity checked October 18, 2026.</p></div>`;
}

export function FixedTemplateHome({ home }: { home: HomePageDefinition }) {
  const skin = siteSkin();
  const links: InternalLink[] = visibleCorePages
    .filter((page) => page.slug.replace(/^\/+|\/+$/g, ""))
    .map((page) => ({ slug: page.slug, label: page.navLabel }));
  const entries = links.slice(0, 6).map((link) => ({
    href: routePath(link.slug),
    title: link.label,
    text: link.description || link.label,
  }));
  const rendered = renderFixedDocument({
    skin,
    page: "home",
    accentColorId: siteConfig.theme.accentColorId,
    gameName: siteConfig.game.name || siteConfig.shortName,
    nav: links.map((link) => ({ slug: link.slug, label: link.label, href: routePath(link.slug) })),
    homeHref: "/",
    logoUrl: assetPath(siteConfig.assets.logo),
    bannerUrl: assetPath(siteConfig.assets.cover),
    heading: home.hero.heading,
    lead: home.hero.lead,
    entries,
    supplementHtml: supplement(home),
  });
  return (
    <>
      <JsonLd data={homeSchemas(home)} />
      <div dangerouslySetInnerHTML={{ __html: rendered.rest }} />
      <div className="site-container"><NativeAdSlot /></div>
      {home.faq.length ? (
        <div className="site-container"><Faq items={home.faq} /></div>
      ) : null}
    </>
  );
}
