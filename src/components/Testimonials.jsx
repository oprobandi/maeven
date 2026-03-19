/**
 * src/components/Testimonials.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two sections combined:
 *   1. Press logos bar — italic serif names that glow on hover
 *   2. Customer testimonials grid — 3 cards, Nairobi/Mombasa/Kisumu authors
 *
 * All content sourced from src/data/content.js.
 * In v3.x, testimonials will be pulled from Supabase (verified buyer records).
 */

import { PRESS, TESTIMONIALS } from "../data/content";

export default function Testimonials() {
  return (
    <section id="journal" className="section-pad" style={{ padding: "80px 48px", borderTop: "1px solid #e8e4de" }}>

      {/* Press logos */}
      <div
        className="rv"
        style={{
          display: "flex", justifyContent: "center",
          gap: "clamp(24px,4vw,64px)", flexWrap: "wrap",
          marginBottom: 80, alignItems: "center",
        }}
      >
        {PRESS.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: "var(--serif)", fontSize: "1.3rem",
              fontStyle: "italic", color: "#ccc",
              transition: "color 0.3s", cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Section label + heading */}
      <p className="rv" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 12 }}>
        What They Say
      </p>
      <h2 className="rv d1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,3vw,3rem)", fontWeight: 300, marginBottom: 60 }}>
        Loved by Our Community
      </h2>

      {/* Testimonial cards */}
      <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className={`rv d${i + 1}`}
            style={{ padding: 40, background: "white", border: "1px solid #f0ece6" }}
          >
            <div style={{ color: "var(--bronze)", marginBottom: 16, fontSize: "0.78rem", letterSpacing: 2 }}>
              ★★★★★
            </div>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 20 }}>
              "{t.quote}"
            </p>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
              {t.author} · {t.location}
            </div>
            <div style={{ fontSize: "0.6rem", color: "var(--bronze)", marginTop: 4, letterSpacing: "0.08em" }}>
              ✓ Verified Buyer
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
