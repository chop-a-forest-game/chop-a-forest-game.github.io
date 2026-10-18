import Link from "next/link";
import { ArrowRight, ExternalLink, Leaf, BookOpen } from "lucide-react";
import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageSections } from "@/components/site/page-sections";
import type { HomePageDefinition } from "@/config/types";
import { siteConfig } from "@/config/site";
import { visibleCorePages } from "@/content/registry";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

export function FixedTemplateHome({ home }: { home: HomePageDefinition }) {
  return (
    <>
      <JsonLd data={homeSchemas(home)} />
      <main className="bw-main">
        <section className="bw-container bw-home-hero" aria-labelledby="bw-home-title">
          <div className="bw-home-intro">
            <p className="bw-kicker"><Leaf size={15} aria-hidden="true" /> {home.hero.eyebrow}</p>
            <h1 id="bw-home-title">{home.hero.heading}</h1>
            <p className="bw-hero-lead">{home.hero.lead}</p>
            <p className="bw-hero-support">{home.hero.supportingText}</p>
            <div className="bw-hero-actions">
              {home.hero.primaryLink ? (
                <Link className="bw-button bw-button-primary" href={routePath(home.hero.primaryLink.slug)}>
                  <BookOpen size={18} aria-hidden="true" />{home.hero.primaryLink.label}<ArrowRight size={17} aria-hidden="true" />
                </Link>
              ) : null}
              {siteConfig.game.officialUrl && (
                <a className="bw-button bw-button-outline" href={siteConfig.game.officialUrl} target="_blank" rel="noopener noreferrer">
                  Play on Roblox <ExternalLink size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <figure className="bw-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetPath(siteConfig.assets.cover)} alt="Chop A Forest Roblox gameplay artwork showing a tree-cutting vehicle" width={840} height={560} />
            <figcaption>Chop A Forest · Roblox game reference</figcaption>
          </figure>
        </section>

        <div className="bw-container">
          <div className="bw-section-heading">
            <span className="bw-eyebrow">START HERE</span>
            <h2>Chop A Forest Guides</h2>
            <p>Four focused guides for the decisions players make most often.</p>
          </div>
          <nav className="bw-guide-grid" aria-label="Explore Chop A Forest guides">
            {visibleCorePages.map((page, index) => (
              <Link href={routePath(page.slug)} className="bw-guide-card" key={page.slug}>
                <span className="bw-guide-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{page.navLabel}</h3>
                <p>{page.description}</p>
                <span className="bw-guide-go">Open guide <ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </nav>
          <NativeAdSlot />
          <div className="bw-prose bw-home-content">
            <PageSections sections={home.sections} />
            <p className="bw-source-note">
              <a href={siteConfig.game.officialUrl || "https://www.roblox.com/games/103363457515322/Chop-A-Forest"} target="_blank" rel="noopener noreferrer">
                Official Chop A Forest Roblox game (WCT Capital)
              </a> · identity checked October 18, 2026. This website is independent and not affiliated with Roblox.
            </p>
          </div>
          {home.faq.length ? (
            <div className="bw-faq">
              <Faq items={home.faq} />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
