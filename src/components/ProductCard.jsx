/**
 * src/components/ProductCard.jsx — v1.2.1
 * ─────────────────────────────────────────────────────────────────────────────
 * KEY CHANGES FROM v1.2
 *   - backgroundImage divs → real <img> tags with loading="lazy"
 *   - onError fallback: shows chalky placeholder, never blank white void
 *   - Alt text on all images (accessibility + SEO)
 *   - Aspect ratio slightly shorter on desktop (see index.css .product-img)
 *
 * WHY THIS FIXES DISAPPEARING IMAGES
 *   backgroundImage CSS fires ALL requests simultaneously on mount regardless
 *   of scroll position. 12 concurrent Unsplash requests = rate limiting = blanks.
 *   <img loading="lazy"> only requests images when they are about to enter
 *   the viewport. Off-screen cards do not fire requests at all.
 *
 * PROPS
 *   product      {Object}    Full product from products.js
 *   delay        {number}    0–2 → maps to rv.d1/d2/d3 stagger class
 *   wishlisted   {boolean}
 *   onWish       {function}
 *   onAdd        {function}
 *   onOpen       {function}  Click image → ProductModal
 */

import { useState } from "react";
import { Heart } from "lucide-react";

const fmt = (v) => `Kshs ${v.toLocaleString()}`;

/* Placeholder shown when image fails to load */
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect width='400' height='533' fill='%23f0ece6'/%3E%3C/svg%3E";

export default function ProductCard({ product, delay, wishlisted, onWish, onAdd, onOpen }) {
  const [hovered,    setHovered]    = useState(false);
  const [imgLoaded,  setImgLoaded]  = useState(false);

  return (
    <div
      className={`rv d${delay + 1}`}
      style={{ cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image container ── */}
      <div
        className="product-img"
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: 14,
          background: "#f0ece6", /* placeholder colour while loading */
        }}
        onClick={onOpen}
      >
        {/* Primary image */}
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            transition: "opacity 0.55s ease",
            opacity: hovered ? 0 : (imgLoaded ? 1 : 0),
          }}
        />

        {/* Alt / hover image */}
        <img
          src={product.altImg}
          alt={`${product.name} — alternate view`}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            transition: "opacity 0.55s ease",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); onWish(); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 34, height: 34, borderRadius: "50%",
            background: wishlisted ? "var(--rose)" : "rgba(250,248,245,0.92)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s", zIndex: 2,
          }}
        >
          <Heart
            size={15}
            fill={wishlisted ? "white" : "none"}
            stroke={wishlisted ? "white" : "var(--charcoal)"}
            strokeWidth={1.5}
          />
        </button>

        {/* Add to bag — slides up on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "13px",
            background: "rgba(250,248,245,0.97)",
            border: "none", cursor: "pointer",
            fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
            fontFamily: "var(--sans)", fontWeight: 500,
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.32s ease, background 0.2s, color 0.2s",
            zIndex: 2, width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--charcoal)";
            e.currentTarget.style.color = "var(--chalk)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(250,248,245,0.97)";
            e.currentTarget.style.color = "var(--charcoal)";
          }}
        >
          Add to Bag
        </button>
      </div>

      {/* ── Info row ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 4,
      }}>
        <span style={{
          fontFamily: "var(--serif)", fontSize: "1rem",
          fontWeight: 400, lineHeight: 1.3,
          cursor: "pointer",
        }}
          onClick={onOpen}
        >
          {product.name}
        </span>
        <span style={{
          fontSize: "0.82rem", color: "var(--bronze)",
          fontWeight: 400, marginLeft: 8, flexShrink: 0,
        }}>
          {fmt(product.price)}
        </span>
      </div>
      <p style={{
        fontSize: "0.65rem", letterSpacing: "0.1em",
        color: "rgba(28,28,28,0.45)", textTransform: "uppercase",
      }}>
        {product.material}
      </p>
    </div>
  );
}
