/**
 * src/components/Footer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-width footer on charcoal background.
 *
 * Sections:
 *   - Oversized watermark "MAEVEN" (decorative)
 *   - 4-column link grid (Shop / Help / Brand / Follow)
 *   - Bottom bar: copyright · M-PESA badge · social icons
 *
 * Social icons use lucide-react. Links are all href="#" placeholders
 * until real pages exist (v2.x routing).
 */

import { Instagram, Twitter, Facebook } from "lucide-react";
import { FOOTER_COLS } from "../data/content";

export default function Footer() {
  return (
    <footer
      className="section-pad"
      style={{ background: "var(--charcoal)", color: "var(--chalk)", padding: "80px 48px 40px" }}
    >
      {/* Watermark */}
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(3rem,8vw,7rem)",
          letterSpacing: "0.25em", textTransform: "uppercase",
          textAlign: "center", opacity: 0.07,
          marginBottom: 64, userSelect: "none", lineHeight: 1,
        }}
      >
        MAEVEN
      </div>

      {/* Link grid */}
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, marginBottom: 60 }}>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--rose)", marginBottom: 20 }}>
              {col.title}
            </p>
            <ul style={{ listStyle: "none" }}>
              {col.links.map((link) => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <a
                    href="#"
                    style={{ fontSize: "0.78rem", color: "rgba(250,248,245,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--chalk)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,245,0.55)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(250,248,245,0.1)",
          paddingTop: 32,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 16,
        }}
      >
        <p style={{ fontSize: "0.68rem", color: "rgba(250,248,245,0.35)" }}>
          © 2025 MAEVEN LTD. · Nairobi, Kenya · All rights reserved.
        </p>

        {/* M-PESA badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.35)" }}>
            Payments:
          </span>
          <div style={{ background: "white", padding: "2px 10px", borderRadius: 2 }}>
            <svg viewBox="0 0 100 28" style={{ height: 16, fill: "#4caf50" }}>
              <text x="2" y="22" fontWeight="bold" fontSize="22" fontFamily="sans-serif">M-PESA</text>
            </svg>
          </div>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: 20 }}>
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label={["Instagram", "Twitter", "Facebook"][i]}
              style={{ color: "rgba(250,248,245,0.4)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rose)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,245,0.4)")}
            >
              <Icon size={18} strokeWidth={1} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
