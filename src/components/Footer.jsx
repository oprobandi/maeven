/**
 * src/components/Footer.jsx — v1.2
 * ─────────────────────────────────────────────────────────────────────────────
 * STRIPPED DOWN. Luxury = negative space.
 *
 * DESKTOP
 *   Faded MAEVEN watermark
 *   5 nav links inline: Shop · Brand · Journal · Stockists · Contact
 *   4 social icons: Instagram · TikTok · Pinterest · Twitter/X
 *   Bottom bar: copyright left · M-PESA right
 *
 * MOBILE
 *   Same structure but the 5 nav links become accordion items (+/- toggle).
 *   Keeps footer clean on first view, accessible on demand.
 *
 * SOCIAL ICONS
 *   Proper brand SVGs — not lucide generic icons.
 */

import { useState } from "react";

/* ── Brand SVG Icons ─────────────────────────────────────────────────────── */

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconTikTok = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
  </svg>
);

const IconPinterest = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const IconTwitterX = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ── Data ────────────────────────────────────────────────────────────────── */

const FOOTER_NAV = [
  { label: "Shop",      links: ["New Arrivals", "Dresses", "Outerwear", "Essentials", "Best Sellers"] },
  { label: "Brand",     links: ["Our Story", "Sustainability", "Artisan Partners", "Press"] },
  { label: "Journal",   links: ["Latest Stories", "Style Guides", "Behind the Craft"] },
  { label: "Stockists", links: ["Nairobi CBD", "Westlands", "Karen", "International"] },
  { label: "Contact",   links: ["WhatsApp Support", "Email Us", "Size Guide", "Shipping & Returns"] },
];

const SOCIAL = [
  { label: "Instagram", Icon: IconInstagram },
  { label: "TikTok",    Icon: IconTikTok    },
  { label: "Pinterest", Icon: IconPinterest },
  { label: "Twitter/X", Icon: IconTwitterX  },
];

/* ── Accordion item (mobile only) ───────────────────────────────────────── */

function AccordionItem({ label, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(250,248,245,0.08)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "14px 0",
        background: "none", border: "none", cursor: "pointer",
        color: "var(--chalk)", fontFamily: "var(--sans)",
        fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase",
      }}>
        {label}
        <span style={{
          fontSize: "1.1rem", lineHeight: 1, display: "inline-block",
          transition: "transform 0.25s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "300px" : "0",
        transition: "max-height 0.35s ease",
      }}>
        <div style={{ paddingBottom: 16 }}>
          {links.map((link) => (
            <a key={link} href="#" style={{
              display: "block", padding: "6px 0",
              fontSize: "0.75rem", color: "rgba(250,248,245,0.4)",
              textDecoration: "none", letterSpacing: "0.06em",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--chalk)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,245,0.4)")}
            >{link}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--chalk)", padding: "72px 48px 40px" }}>

      {/* Watermark */}
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(3rem,9vw,7.5rem)",
        letterSpacing: "0.25em", textTransform: "uppercase",
        textAlign: "center", opacity: 0.05,
        marginBottom: 56, userSelect: "none", lineHeight: 1,
      }}>
        MAEVEN
      </div>

      {/* Desktop nav links */}
      <nav className="footer-nav-desktop" style={{
        display: "flex", justifyContent: "center",
        gap: "clamp(20px,3vw,48px)", flexWrap: "wrap",
        marginBottom: 48,
      }}>
        {FOOTER_NAV.map(({ label }) => (
          <FooterLink key={label}>{label}</FooterLink>
        ))}
      </nav>

      {/* Mobile accordion */}
      <div className="footer-nav-mobile" style={{ display: "none", marginBottom: 40 }}>
        {FOOTER_NAV.map((item) => (
          <AccordionItem key={item.label} label={item.label} links={item.links} />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(250,248,245,0.08)", marginBottom: 40 }} />

      {/* Social icons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 48 }}>
        {SOCIAL.map(({ label, Icon }) => (
          <a key={label} href="#" aria-label={label} style={{
            color: "rgba(250,248,245,0.3)", transition: "color 0.2s", textDecoration: "none",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--chalk)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,245,0.3)")}
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: "0.6rem", color: "rgba(250,248,245,0.2)", letterSpacing: "0.08em" }}>
          © 2025 MAEVEN LTD · Nairobi, Kenya · All rights reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.2)" }}>
            Payments:
          </span>
          <div style={{ background: "white", padding: "2px 8px", borderRadius: 2 }}>
            <svg viewBox="0 0 100 28" style={{ height: 13, fill: "#4caf50" }}>
              <text x="2" y="22" fontWeight="bold" fontSize="22" fontFamily="sans-serif">M-PESA</text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.7rem", letterSpacing: "0.18em",
        textTransform: "uppercase", textDecoration: "none",
        color: hovered ? "var(--chalk)" : "rgba(250,248,245,0.4)",
        transition: "color 0.2s", fontFamily: "var(--sans)",
        position: "relative", paddingBottom: 3,
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: "1px", background: "rgba(250,248,245,0.35)",
        transition: "width 0.25s ease",
      }} />
    </a>
  );
}
