/**
 * src/components/ProductModal.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full product detail overlay. Triggered by clicking the image area of a
 * ProductCard. Slides in from the right (cart-drawer style).
 *
 * See ADR-003 §3 for why modal was chosen over a dedicated product page.
 *
 * PROPS
 *   product   {Object|null}   Product to display. null = modal closed.
 *   onClose   {function}      Called on backdrop click or X button
 *   onAdd     {function}      Called on "Add to Bag" — receives product object
 *   wishlisted {boolean}
 *   onWish    {function}
 *
 * SECTIONS
 *   - Product image (full height left panel)
 *   - Name, material, price
 *   - Description
 *   - Care guide snippet (static — will be per-product in v2.x)
 *   - Add to Bag CTA
 *   - Wishlist toggle
 */

import { Heart, X } from "lucide-react";

const fmt = (v) => `Kshs ${v.toLocaleString()}`;

const CARE_NOTE = "Dry clean or hand wash cold. Lay flat to dry. Store folded, never hung.";

export default function ProductModal({ product, onClose, onAdd, wishlisted, onWish }) {
  const open = !!product;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(28,28,28,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 300,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.35s",
        }}
      />

      {/* Panel — slides in from right */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(680px, 100vw)",
          background: "var(--chalk)",
          zIndex: 301,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          overflow: "hidden",
        }}
      >
        {product && (
          <>
            {/* Left: image */}
            <div
              style={{
                backgroundImage: `url(${product.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {/* Category badge */}
              <div
                style={{
                  position: "absolute", top: 20, left: 20,
                  background: "rgba(250,248,245,0.85)",
                  backdropFilter: "blur(8px)",
                  padding: "5px 14px",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "var(--sans)",
                }}
              >
                {product.category}
              </div>
            </div>

            {/* Right: detail */}
            <div
              className="thin-scroll"
              style={{
                display: "flex", flexDirection: "column",
                padding: "48px 36px",
                overflowY: "auto",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  alignSelf: "flex-end", background: "none",
                  border: "none", cursor: "none", marginBottom: 32,
                  color: "var(--charcoal)",
                }}
              >
                <X size={22} strokeWidth={1} />
              </button>

              {/* Name */}
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                {product.name}
              </h2>

              {/* Material */}
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(28,28,28,0.45)",
                  marginBottom: 20,
                }}
              >
                {product.material}
              </p>

              {/* Price */}
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.6rem",
                  color: "var(--bronze)",
                  marginBottom: 28,
                }}
              >
                {fmt(product.price)}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.85,
                  color: "#666",
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom: "1px solid #ede9e3",
                }}
              >
                {product.desc}
              </p>

              {/* Care guide */}
              <div style={{ marginBottom: 36 }}>
                <p
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                    marginBottom: 10,
                  }}
                >
                  Care
                </p>
                <p style={{ fontSize: "0.78rem", lineHeight: 1.75, color: "#888" }}>
                  {CARE_NOTE}
                </p>
              </div>

              {/* Actions */}
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Add to bag */}
                <button
                  onClick={() => { onAdd(product); onClose(); }}
                  style={{
                    width: "100%", padding: "16px",
                    background: "var(--charcoal)", color: "var(--chalk)",
                    border: "1px solid var(--charcoal)",
                    cursor: "none",
                    fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    fontFamily: "var(--sans)", transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bronze)"; e.currentTarget.style.borderColor = "var(--bronze)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.borderColor = "var(--charcoal)"; }}
                >
                  Add to Bag
                </button>

                {/* Wishlist */}
                <button
                  onClick={onWish}
                  style={{
                    width: "100%", padding: "14px",
                    background: "transparent",
                    border: "1px solid rgba(28,28,28,0.2)",
                    cursor: "none",
                    fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    fontFamily: "var(--sans)", transition: "border-color 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    color: "var(--charcoal)",
                  }}
                >
                  <Heart
                    size={14}
                    fill={wishlisted ? "var(--rose)" : "none"}
                    stroke={wishlisted ? "var(--rose)" : "var(--charcoal)"}
                  />
                  {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                </button>
              </div>

              {/* Shipping note */}
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "#aaa",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Free shipping on orders over Kshs 15,000 · M-PESA accepted
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
