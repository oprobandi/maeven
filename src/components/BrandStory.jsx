/**
 * src/components/BrandStory.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dark section — brand philosophy, stats, and editorial portrait.
 * Background: var(--charcoal). Text: var(--chalk) / var(--rose).
 *
 * The oversized watermark "MAEVEN" behind the content is intentional —
 * it adds depth without competing with the copy.
 */

export default function BrandStory() {
  return (
    <section
      id="brand"
      className="section-pad brand-grid"
      style={{
        background: "var(--charcoal)",
        color: "var(--chalk)",
        padding: "120px 48px",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "var(--serif)", fontSize: "18vw", fontWeight: 300,
          color: "rgba(255,255,255,0.025)", whiteSpace: "nowrap",
          pointerEvents: "none", letterSpacing: "-0.04em", userSelect: "none",
        }}
      >
        MAEVEN
      </div>

      {/* Left: copy + stats */}
      <div className="rv" style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--rose)", marginBottom: 20 }}>
          Our Philosophy
        </p>
        <h2
          style={{
            fontFamily: "var(--serif)", fontSize: "clamp(2.5rem,4vw,4rem)",
            fontWeight: 300, lineHeight: 1.15, marginBottom: 32,
          }}
        >
          Slow fashion.<br />
          <em style={{ fontStyle: "italic", color: "var(--rose)" }}>Timeless</em> beauty.
        </h2>
        <p style={{ fontSize: "0.85rem", lineHeight: 2, color: "rgba(250,248,245,0.7)", marginBottom: 40 }}>
          MAEVEN was born from a quiet conviction: that clothing should be made thoughtfully,
          worn endlessly, and never discarded lightly. We partner with artisan ateliers who
          share our commitment to craftsmanship, fair labour, and environmental stewardship.
        </p>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {[
            ["12+",    "Years of craft"],
            ["4,800+", "Clients served"],
            ["98%",    "Satisfaction"],
          ].map(([n, l]) => (
            <div key={l}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--rose)", display: "block" }}>
                {n}
              </span>
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,245,0.4)" }}>
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: editorial portrait */}
      <div className="rv d2" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            aspectRatio: "3/4",
            backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200')",
            backgroundSize: "cover", backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(28,28,28,0.65) 0%, transparent 50%)",
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: 32,
            }}
          >
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
              "Crafted for the woman who moves through the world on her own terms."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
