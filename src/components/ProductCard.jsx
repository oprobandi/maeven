/**
 * src/components/ProductCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Individual product card with:
 *   - Dual image hover swap (primary → altImg on hover)
 *   - Wishlist heart toggle (top-right)
 *   - "Add to Bag" button (slides up from bottom on hover)
 *   - Click anywhere on image → open product modal
 *
 * PROPS
 *   product      {Object}    Full product object from products.js
 *   delay        {number}    0–2 — maps to rv.d1 / d2 / d3 CSS delay class
 *   wishlisted   {boolean}
 *   onWish       {function}  Called on heart click
 *   onAdd        {function}  Called on "Add to Bag" click
 *   onOpen       {function}  Called on image area click → opens ProductModal
 */

import { useState } from "react";
import { Heart } from "lucide-react";

const fmt = (v) => `Kshs ${v.toLocaleString()}`;

export default function ProductCard({ product, delay, wishlisted, onWish, onAdd, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`rv d${delay + 1}`}
      style={{ cursor: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 16 }}
        onClick={onOpen}
      >
        {/* Primary image */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${product.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "opacity 0.6s",
            opacity: hovered ? 0 : 1,
          }}
        />
        {/* Alt image */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${product.altImg})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "opacity 0.6s",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); onWish(); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute", top: 12, right: 12,
            width: 36, height: 36, borderRadius: "50%",
            background: wishlisted ? "var(--rose)" : "rgba(250,248,245,0.9)",
            border: "none", cursor: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s", zIndex: 2,
          }}
        >
          <Heart
            size={16}
            fill={wishlisted ? "white" : "none"}
            stroke={wishlisted ? "white" : "var(--charcoal)"}
          />
        </button>

        {/* Add to bag — slides up on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "14px",
            background: "rgba(250,248,245,0.96)",
            border: "none", cursor: "none",
            fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "var(--sans)",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s ease",
            width: "100%", zIndex: 2,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "var(--chalk)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(250,248,245,0.96)"; e.currentTarget.style.color = "var(--charcoal)"; }}
        >
          Add to Bag
        </button>
      </div>

      {/* Info row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 400 }}>
          {product.name}
        </span>
        <span style={{ fontSize: "0.85rem", color: "var(--bronze)", fontWeight: 400, marginLeft: 8 }}>
          {fmt(product.price)}
        </span>
      </div>
      <p style={{ fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(28,28,28,0.5)", textTransform: "uppercase" }}>
        {product.material}
      </p>
    </div>
  );
}
