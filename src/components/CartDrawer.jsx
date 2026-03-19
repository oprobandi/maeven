/**
 * src/components/CartDrawer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Slide-in cart panel from the right edge.
 * State (cart, updateQty) injected from App via useCart hook.
 *
 * PROPS
 *   open       {boolean}
 *   onClose    {function}
 *   cart       {Array}      From useCart
 *   updateQty  {function}   From useCart
 *   totalAmt   {number}     From useCart
 */

import { X, ShoppingBag } from "lucide-react";

const fmt = (v) => `Kshs ${v.toLocaleString()}`;

export default function CartDrawer({ open, onClose, cart, updateQty, totalAmt }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(28,28,28,0.45)", backdropFilter: "blur(4px)",
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.35s",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(400px, 100vw)",
          background: "var(--chalk)",
          zIndex: 201,
          display: "flex", flexDirection: "column",
          padding: 40,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #e8e4de",
          }}
        >
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400 }}>Your Bag</h3>
          <button onClick={onClose} aria-label="Close cart" style={{ background: "none", border: "none", cursor: "none" }}>
            <X size={22} strokeWidth={1} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto" }} className="thin-scroll">
          {cart.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.4, textAlign: "center" }}>
              <ShoppingBag size={48} strokeWidth={0.6} style={{ marginBottom: 12 }} />
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                {/* Thumbnail */}
                <div
                  style={{
                    width: 80, aspectRatio: "3/4",
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    flexShrink: 0,
                  }}
                />
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1rem", marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    {item.material}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="Decrease quantity"
                        style={{ width: 28, height: 28, border: "1px solid #ccc", background: "transparent", cursor: "none", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >−</button>
                      <span style={{ fontSize: "0.85rem", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="Increase quantity"
                        style={{ width: 28, height: 28, border: "1px solid #ccc", background: "transparent", cursor: "none", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >+</button>
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "var(--bronze)" }}>
                      {fmt(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ paddingTop: 24, borderTop: "1px solid #e8e4de" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem" }}>{fmt(totalAmt)}</span>
            </div>
            <p style={{ fontSize: "0.65rem", color: "#aaa", textAlign: "center", marginBottom: 20, letterSpacing: "0.08em" }}>
              Shipping & taxes calculated at checkout.
            </p>
            <button
              style={{
                width: "100%", padding: "18px",
                background: "var(--charcoal)", color: "var(--chalk)",
                border: "none", cursor: "none",
                fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "var(--sans)", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bronze)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--charcoal)")}
            >
              Checkout via M-PESA
            </button>
          </div>
        )}
      </div>
    </>
  );
}
