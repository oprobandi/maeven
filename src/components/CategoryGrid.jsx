/**
 * src/components/CategoryGrid.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shop-by-category image tiles.
 * Layout: 2fr 1fr 1fr grid, first tile spans 2 rows (responsive — see index.css).
 */

import { useState } from "react";
import { CATEGORIES } from "../data/content";

function CatTile({ label, span, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={span ? "cat-span" : ""}
      style={{
        position: "relative", overflow: "hidden", cursor: "none",
        gridRow: span ? "span 2" : "span 1",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.07)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(28,28,28,0.45)" : "rgba(28,28,28,0)",
          transition: "background 0.4s",
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: 32,
        }}
      >
        <div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 300, color: "white", lineHeight: 1.1 }}>
          {label}
        </div>
        <div
          style={{
            color: "white", fontSize: "0.68rem", letterSpacing: "0.2em",
            textTransform: "uppercase", marginTop: 8,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.3s",
          }}
        >
          Explore →
        </div>
      </div>
    </div>
  );
}

export default function CategoryGrid() {
  return (
    <section id="shop" className="section-pad" style={{ padding: "100px 48px" }}>
      <p className="rv" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 12 }}>
        Discover
      </p>
      <h2 className="rv d1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,3vw,3.2rem)", fontWeight: 300, marginBottom: 60, lineHeight: 1.2 }}>
        Shop by Category
      </h2>
      <div
        className="rv d2 cat-grid"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "280px 280px", gap: 12 }}
      >
        {CATEGORIES.map((c, i) => (
          <CatTile key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
