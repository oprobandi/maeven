/**
 * src/components/Lookbook.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Horizontal scroll carousel of editorial lookbook issues.
 * Navigation: left/right arrow buttons + native scroll snap + drag (desktop).
 *
 * The track ID "lbtrack" is used by the arrow button scroll logic.
 * Each slide is 320px wide with scroll-snap-align: start.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LOOKBOOK } from "../data/content";

function LookbookArrow({ Icon, direction }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => {
        const track = document.getElementById("lbtrack");
        if (track) track.scrollBy({ left: direction * 360, behavior: "smooth" });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction < 0 ? "Previous" : "Next"}
      style={{
        width: 48, height: 48,
        border: "1px solid rgba(28,28,28,0.2)",
        background: hovered ? "var(--charcoal)" : "transparent",
        cursor: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        color: hovered ? "var(--chalk)" : "var(--charcoal)",
      }}
    >
      <Icon size={18} strokeWidth={1.5} />
    </button>
  );
}

function LookbookSlide({ title, issue, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ flex: "0 0 320px", scrollSnapAlign: "start", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          aspectRatio: "2/3",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transition: "transform 0.7s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1rem" }}>{title}</div>
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: "#999", marginTop: 4 }}>{issue}</div>
      </div>
    </div>
  );
}

export default function Lookbook() {
  return (
    <section id="lookbook" className="lookbook-pad" style={{ padding: "100px 0 100px 48px", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ paddingRight: 48, marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="rv" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 12 }}>
            Visual Stories
          </p>
          <h2 className="rv d1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,3vw,3rem)", fontWeight: 300 }}>
            The Spring Lookbook
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8, paddingRight: 48 }}>
          <LookbookArrow Icon={ChevronLeft}  direction={-1} />
          <LookbookArrow Icon={ChevronRight} direction={1}  />
        </div>
      </div>

      {/* Track */}
      <div
        id="lbtrack"
        className="thin-scroll"
        style={{
          display: "flex", gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 20, paddingRight: 48,
          cursor: "grab",
        }}
      >
        {LOOKBOOK.map((lb) => (
          <LookbookSlide key={lb.id} {...lb} />
        ))}
      </div>
    </section>
  );
}
