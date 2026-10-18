"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { InternalLink } from "@/config/types";
import { assetPath, routePath } from "@/lib/urls";

export function FixedTemplateHeader({ links }: { links: InternalLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return (
    <header className="bw-header">
      <div className="bw-container bw-header-inner">
        <Link href="/" className="bw-brand" aria-label="Chop A Forest home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath(siteConfig.assets.logo)} alt="" width={42} height={42} />
          <span className="bw-brand-text">
            <strong>{siteConfig.shortName}</strong>
            <small>ROBLOX GAME GUIDE</small>
          </span>
        </Link>
        <button
          type="button"
          className="bw-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="bw-primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="bw-primary-nav" className={`bw-nav ${open ? "bw-nav-open" : ""}`} aria-label="Primary navigation">
          {links.map((link) => {
            const target = routePath(link.slug);
            const active = normalized === target.replace(/\/+$/, "");
            return (
              <Link
                key={link.slug}
                href={target}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`bw-nav-link ${active ? "bw-nav-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
