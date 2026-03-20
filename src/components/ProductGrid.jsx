/**
 * src/components/ProductGrid.jsx — v1.2.1
 * ─────────────────────────────────────────────────────────────────────────────
 * KEY CHANGES FROM v1.2
 *   - Desktop filter bar: heading left, filters right — all in ONE row
 *   - Category tabs sit directly under the heading on desktop
 *   - Material dropdown + search inline with each other on desktop
 *   - Max-width container (1200px) with auto side margins — breathing room
 *   - On mobile: heading + tabs stack top, dropdowns stack below (unchanged)
 *
 * DESKTOP LAYOUT TARGET
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ The Curated Edit                 [All Materials ▼] [🔍 ...]  │
 *   │ [All] [New] [Dresses] [Tops] [Outerwear]                     │
 *   │                                                              │
 *   │ [card]  [card]  [card]                                       │
 *   │ [card]  [card]  [card]                                       │
 *   └──────────────────────────────────────────────────────────────┘
 */

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS, FILTER_TABS, MATERIAL_OPTIONS } from "../data/products";

export default function ProductGrid({ wishlisted, onWish, onAdd, onOpen }) {
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All Materials");
  const [query,    setQuery]    = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.tags.includes(category);
      const matchMat = material === "All Materials" || p.material === material;
      const matchQ   = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchMat && matchQ;
    });
  }, [category, material, query]);

  const hasFilters = category !== "All" || material !== "All Materials" || query !== "";

  return (
    <section
      className="section-pad"
      style={{ padding: "60px 48px 100px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Filter bar ── */}
        <div className="filter-bar rv" style={{ marginBottom: 48 }}>

          {/* Row 1: heading + right controls */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
          }}>
            <h2 style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.8rem,3vw,3rem)",
              fontWeight: 300,
              lineHeight: 1,
            }}>
              The Curated Edit
            </h2>

            {/* Right: material + search inline */}
            <div className="filter-controls" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                style={{
                  padding: "8px 14px",
                  border: "1px solid rgba(28,28,28,0.18)",
                  background: "transparent",
                  color: "var(--charcoal)",
                  fontSize: "0.65rem", letterSpacing: "0.1em",
                  fontFamily: "var(--sans)", outline: "none",
                  cursor: "pointer", appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231c1c1c' stroke-width='1.2' fill='none'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  paddingRight: 28,
                  minWidth: 148,
                }}
              >
                {MATERIAL_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  style={{
                    padding: "8px 12px 8px 32px",
                    border: "1px solid rgba(28,28,28,0.18)",
                    background: "transparent",
                    color: "var(--charcoal)",
                    fontSize: "0.65rem",
                    fontFamily: "var(--sans)", outline: "none",
                    width: 160,
                  }}
                />
                <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", opacity: 0.3 }}
                  width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2: category tabs */}
          <div className="thin-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
            {FILTER_TABS.map((f) => (
              <button key={f} onClick={() => setCategory(f)} style={{
                padding: "7px 18px",
                border: `1px solid ${category === f ? "var(--charcoal)" : "rgba(28,28,28,0.18)"}`,
                background: category === f ? "var(--charcoal)" : "transparent",
                color: category === f ? "var(--chalk)" : "var(--charcoal)",
                fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "var(--sans)",
                transition: "all 0.18s", whiteSpace: "nowrap",
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Products ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.35 }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontStyle: "italic" }}>
              No pieces match your selection.
            </p>
            <button onClick={() => { setCategory("All"); setMaterial("All Materials"); setQuery(""); }}
              style={{
                marginTop: 16, background: "none", border: "none",
                cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.15em",
                textTransform: "uppercase", textDecoration: "underline",
                fontFamily: "var(--sans)",
              }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className="product-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "48px 28px" }}
          >
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                delay={i % 3}
                wishlisted={wishlisted.includes(p.id)}
                onWish={() => onWish(p.id)}
                onAdd={() => onAdd(p)}
                onOpen={() => onOpen(p)}
              />
            ))}
          </div>
        )}

        {/* Active filter summary */}
        {hasFilters && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => { setCategory("All"); setMaterial("All Materials"); setQuery(""); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(28,28,28,0.4)", fontFamily: "var(--sans)",
                textDecoration: "underline",
              }}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
