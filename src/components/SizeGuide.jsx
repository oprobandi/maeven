/**
 * src/components/SizeGuide.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Modal overlay with size chart. IN/CM toggle via local state.
 * Triggered by floating "Size Guide" button (rendered in App.jsx).
 *
 * PROPS
 *   open     {boolean}
 *   onClose  {function}
 */

import { useState } from "react";
import { X } from "lucide-react";
import { SIZE_IN, SIZE_CM } from "../data/content";

const COLS = ["Size", "Bust", "Waist", "Hips"];

export default function SizeGuide({ open, onClose }) {
  const [unit, setUnit] = useState("IN");
  const rows = unit === "IN" ? SIZE_IN : SIZE_CM;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(28,28,28,0.5)",
        zIndex: 300,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.3s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--chalk)",
          padding: 48,
          maxWidth: 540, width: "90%", maxHeight: "80vh",
          overflowY: "auto",
          transform: open ? "scale(1)" : "scale(0.95)",
          opacity: open ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 400 }}>Size Guide</h3>
          <button onClick={onClose} aria-label="Close size guide" style={{ background: "none", border: "none", cursor: "none" }}>
            <X size={20} strokeWidth={1} />
          </button>
        </div>

        {/* Unit toggle */}
        <div style={{ display: "flex", marginBottom: 24 }}>
          {["IN", "CM"].map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              style={{
                padding: "8px 20px",
                background: unit === u ? "var(--charcoal)" : "transparent",
                color: unit === u ? "var(--chalk)" : "var(--charcoal)",
                border: "1px solid var(--charcoal)",
                cursor: "none",
                fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "var(--sans)",
              }}
            >
              {u}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className="sz-table">
          <thead>
            <tr>
              {COLS.map((h) => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: "0.65rem", color: "#bbb", marginTop: 24, letterSpacing: "0.08em" }}>
          If you're between sizes, we recommend sizing up. For tailoring enquiries, contact us via WhatsApp.
        </p>
      </div>
    </div>
  );
}
