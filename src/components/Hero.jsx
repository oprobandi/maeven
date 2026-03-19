/**
 * src/components/Hero.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-viewport split hero: left copy + CTA, right Ken Burns image.
 * Headline words animate in staggered via CSS (wordUp keyframe in index.css).
 */

import { HERO_WORDS } from "../data/content";

export default function Hero() {
  return (
    <section
      className="hero-grid"
      style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 28 }}
    >
      {/* Left */}
      <div
        className="hero-left"
        style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "120px 64px 80px", position: "relative",
        }}
      >
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 24, opacity: 0, animation: "wordUp 0.8s ease 0.2s forwards" }}>
          Spring Collection 2025 · Nairobi
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(3rem,5vw,5.5rem)", fontWeight: 300, lineHeight: 1.08, marginBottom: 32 }}>
          {HERO_WORDS.map((w, i) => (
            <span key={i} className="hero-word" style={{ animationDelay: `${0.35 + i * 0.11}s` }}>
              {w === "Quiet"
                ? <em style={{ fontStyle: "italic", color: "var(--bronze)" }}>{w}</em>
                : w}
              {i < HERO_WORDS.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.9, color: "#666", maxWidth: 360, marginBottom: 48, opacity: 0, animation: "wordUp 0.8s ease 1.0s forwards" }}>
          Each piece is designed to move with you — crafted from responsibly sourced fabrics, built to last a lifetime.
        </p>
        <a
          href="#shop"
          style={{ display: "inline-block", padding: "16px 40px", background: "var(--charcoal)", color: "var(--chalk)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", border: "1px solid var(--charcoal)", transition: "background 0.3s, color 0.3s", opacity: 0, animation: "wordUp 0.8s ease 1.2s forwards", width: "fit-content" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--charcoal)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "var(--chalk)"; }}
        >
          Shop the Collection
        </a>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0, animation: "wordUp 1s ease 1.8s forwards" }}>
          <div className="scroll-line" style={{ width: 1, height: 44, background: "linear-gradient(to bottom,#999,transparent)" }} />
          <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>Scroll</span>
        </div>
      </div>

      {/* Right */}
      <div className="hero-right" style={{ position: "relative", overflow: "hidden" }}>
        <div
          className="kb"
          style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1537907690979-ee8e01276184?q=80&w=2000')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(28,28,28,0.08)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 40, color: "white", fontFamily: "var(--serif)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          SS25 — The Quiet Collection
        </div>
      </div>
    </section>
  );
}
