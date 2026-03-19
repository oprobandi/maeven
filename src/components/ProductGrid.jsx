/**
 * src/components/ProductGrid.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Product listing with three simultaneous filters:
 *   1. Category tabs  (All / New / Dresses / Tops / Outerwear)
 *   2. Material dropdown (All Materials / Virgin Wool / Pure Silk / ...)
 *   3. Search query (matches product.name, case-insensitive)
 *
 * All three work in AND logic via useMemo.
 * See ADR-003 §4 for the integration rationale.
 *
 * PROPS
 *   wishlisted   {number[]}   Array of wishlisted product IDs (from useWishlist)
 *   onWish       {function}   (id) => void
 *   onAdd        {function}   (product) => void — passed to ProductCard
 *   onOpen       {function}   (product) => void — opens ProductModal
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
      const matchCat  = category === "All" || p.tags.includes(category);
      const matchMat  = material === "All Materials" || p.material === material;
      const matchQ    = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchMat && matchQ;
    });
  }, [category, material, query]);

  return (
    <section className="section-pad" style={{ padding: "60px 48px 100px" }}>

      {/* ── Filter bar ── */}
      <div
        className="rv"
        style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 48,
          flexWrap: "wrap", gap: 16,
        }}
      >
        {/* Left: heading + category tabs */}
        <div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,3vw,3rem)", fontWeight: 300, marginBottom: 20 }}>
            The Curated Edit
          </h2>
          <div className="thin-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {FILTER_TABS.map((f) => (
              <button
                key={f}
                onClick={() => setCategory(f)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${category === f ? "var(--charcoal)" : "rgba(28,28,28,0.2)"}`,
                  background: category === f ? "var(--charcoal)" : "transparent",
                  color: category === f ? "var(--chalk)" : "var(--charcoal)",
                  fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  cursor: "none", fontFamily: "var(--sans)", transition: "all 0.2s", whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Right: material dropdown + search */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {/* Material filter */}
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={{
              padding: "9px 14px",
              border: "1px solid rgba(28,28,28,0.2)",
              background: "transparent",
              color: "var(--charcoal)",
              fontSize: "0.68rem", letterSpacing: "0.1em",
              fontFamily: "var(--sans)", outline: "none",
              cursor: "none",
            }}
          >
            {MATERIAL_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              style={{
                padding: "9px 14px 9px 36px",
                border: "1px solid rgba(28,28,28,0.2)",
                background: "transparent",
                color: "var(--charcoal)",
                fontSize: "0.68rem",
                fontFamily: "var(--sans)",
                outline: "none",
                width: 180,
              }}
            />
            {/* search icon inline */}
            <svg
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.35 }}
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.35 }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontStyle: "italic" }}>
            No pieces match your selection.
          </p>
          <button
            onClick={() => { setCategory("All"); setMaterial("All Materials"); setQuery(""); }}
            style={{ marginTop: 16, background: "none", border: "none", cursor: "none", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "underline", fontFamily: "var(--sans)" }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div
          className="product-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px 32px" }}
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
    </section>
  );
}
