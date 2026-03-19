/**
 * src/components/ImpactCalculator.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "The Conscious Choice" — interactive impact slider.
 * Ported and rebranded from EcoThread. See ADR-003 §2 for framing decisions.
 *
 * MECHANIC
 *   Slider: 1–10 MAEVEN pieces purchased
 *   Derived metrics (per IMPACT_METRICS in content.js):
 *     - Water saved (litres)
 *     - CO₂ avoided (kg)
 *     - Garment lifespan extended (years)
 *
 * TONE
 *   Affirmative — celebrates the user's choices.
 *   Does NOT use guilt framing about fast fashion.
 *
 * VISUAL
 *   Light rose background (--rose-light), matching EmailCapture section.
 *   Three metric cards in a row, updating live as slider moves.
 */

import { useState } from "react";
import { IMPACT_METRICS } from "../data/content";

const { waterPerPiece, co2PerPiece, lifespanYears } = IMPACT_METRICS;

function MetricCard({ value, unit, label }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "32px 24px",
        background: "white",
        border: "1px solid rgba(212,165,165,0.3)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(2rem,3vw,3rem)",
          fontWeight: 300,
          color: "var(--bronze)",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value.toLocaleString()}
        <span style={{ fontSize: "1rem", marginLeft: 4 }}>{unit}</span>
      </div>
      <p
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(28,28,28,0.45)",
          marginTop: 8,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function ImpactCalculator() {
  const [pieces, setPieces] = useState(3);

  const water    = pieces * waterPerPiece;
  const co2      = (pieces * co2PerPiece).toFixed(1);
  const lifespan = pieces * lifespanYears;

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--rose-light)",
        padding: "100px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle,rgba(160,132,92,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, background: "radial-gradient(circle,rgba(212,165,165,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <p className="rv" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 12 }}>
          Conscious Choices
        </p>
        <h2 className="rv d1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
          The difference your wardrobe makes.
        </h2>
        <p className="rv d2" style={{ fontSize: "0.85rem", lineHeight: 1.85, color: "#888", marginBottom: 56, maxWidth: 520 }}>
          Every MAEVEN piece replaces an average of 7 fast-fashion purchases. See the cumulative difference your choices make.
        </p>

        {/* Slider */}
        <div className="rv d3" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <label
              htmlFor="impact-slider"
              style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--sans)" }}
            >
              MAEVEN pieces in your wardrobe
            </label>
            <span style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, color: "var(--bronze)" }}>
              {pieces}
            </span>
          </div>
          <input
            id="impact-slider"
            type="range"
            min={1}
            max={10}
            value={pieces}
            onChange={(e) => setPieces(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "var(--bronze)",
              height: 2,
              cursor: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: "0.6rem", color: "#aaa", letterSpacing: "0.1em" }}>1 piece</span>
            <span style={{ fontSize: "0.6rem", color: "#aaa", letterSpacing: "0.1em" }}>10 pieces</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="rv d4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <MetricCard value={water}    unit="L"   label="Litres of water saved" />
          <MetricCard value={co2}      unit="kg"  label="kg of CO₂ avoided" />
          <MetricCard value={lifespan} unit="yrs" label="Years of garment life added" />
        </div>

        {/* Footer note */}
        <p className="rv d5" style={{ fontSize: "0.62rem", color: "#bbb", marginTop: 24, letterSpacing: "0.08em", textAlign: "center" }}>
          Estimates based on Higg Index environmental impact data vs. equivalent fast-fashion garment lifecycle.
        </p>
      </div>
    </section>
  );
}
