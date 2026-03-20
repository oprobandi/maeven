/**
 * src/App.jsx — v1.2
 * ─────────────────────────────────────────────────────────────────────────────
 * Changes from v1.1:
 *   - WhatsApp: green bubble replaced with minimal "Chat with us" text trigger
 *     + slide-up contact panel (WhatsApp + Email options)
 *   - onSizeOpen removed from Navbar props (not needed — float btn handles it)
 *   - Scroll listener now passive for better mobile performance
 */

import { useState, useEffect } from "react";

import { useCart }         from "./hooks/useCart";
import { useWishlist }     from "./hooks/useWishlist";
import { useScrollReveal } from "./hooks/useScrollReveal";

import Cursor           from "./components/Cursor";
import Toast            from "./components/Toast";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import CategoryGrid     from "./components/CategoryGrid";
import ProductGrid      from "./components/ProductGrid";
import BrandStory       from "./components/BrandStory";
import Lookbook         from "./components/Lookbook";
import ImpactCalculator from "./components/ImpactCalculator";
import Testimonials     from "./components/Testimonials";
import EmailCapture     from "./components/EmailCapture";
import Footer           from "./components/Footer";
import CartDrawer       from "./components/CartDrawer";
import ProductModal     from "./components/ProductModal";
import SizeGuide        from "./components/SizeGuide";

import { WA_NUMBER, WA_MESSAGE } from "./data/content";

export default function App() {
  const { cart, addToCart, updateQty, totalQty, totalAmt } = useCart();
  const { wishlist, toggleWish, isWishlisted }             = useWishlist();
  useScrollReveal();

  const [scrolled,      setScrolled]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [sizeOpen,      setSizeOpen]      = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [toast,         setToast]         = useState({ message: "", visible: false });
  const [chatOpen,      setChatOpen]      = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast("Added to bag");
    setCartOpen(true);
  };

  const circum = 2 * Math.PI * 20;

  return (
    <div style={{ fontFamily: "var(--sans)", background: "var(--chalk)", color: "var(--charcoal)", overflowX: "hidden" }}>

      <Cursor />
      <Toast message={toast.message} visible={toast.visible} />

      <Navbar
        scrolled={scrolled}
        totalQty={totalQty}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onSearchToggle={() => {/* v1.3 */}}
      />

      <main>
        <Hero />
        <CategoryGrid />
        <ProductGrid
          wishlisted={wishlist}
          onWish={toggleWish}
          onAdd={handleAddToCart}
          onOpen={setActiveProduct}
        />
        <BrandStory />
        <Lookbook />
        <ImpactCalculator />
        <Testimonials />
        <EmailCapture />
      </main>

      <Footer />

      {/* ── Overlays ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        totalAmt={totalAmt}
      />
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAdd={handleAddToCart}
        wishlisted={activeProduct ? isWishlisted(activeProduct.id) : false}
        onWish={() => activeProduct && toggleWish(activeProduct.id)}
      />
      <SizeGuide open={sizeOpen} onClose={() => setSizeOpen(false)} />

      {/* ── Size Guide float ── */}
      <button onClick={() => setSizeOpen(true)} style={{
        position: "fixed", bottom: 96, right: 32,
        background: "var(--chalk)", border: "1px solid var(--charcoal)",
        padding: "10px 20px", fontSize: "0.6rem", letterSpacing: "0.18em",
        textTransform: "uppercase", cursor: "pointer",
        fontFamily: "var(--sans)", zIndex: 90,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.2s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "var(--chalk)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--chalk)"; e.currentTarget.style.color = "var(--charcoal)"; }}
      >
        Size Guide
      </button>

      {/* ── Back to top ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top" style={{
          position: "fixed", bottom: 32, left: 32,
          width: 50, height: 50, zIndex: 90,
          background: "none", border: "none", cursor: "pointer", padding: 0,
          opacity: scrollPct > 8 ? 1 : 0,
          transform: scrollPct > 8 ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}>
        <svg viewBox="0 0 50 50" width="50" height="50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#e8e4de" strokeWidth="1.5" />
          <circle cx="25" cy="25" r="20" fill="none" stroke="var(--bronze)" strokeWidth="1.5"
            strokeDasharray={circum}
            strokeDashoffset={circum - (circum * scrollPct) / 100}
            transform="rotate(-90 25 25)"
            style={{ transition: "stroke-dashoffset 0.15s" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "var(--charcoal)" }}>↑</div>
      </button>

      {/* ── Chat widget — minimal text trigger ── */}
      {/* Panel */}
      <div style={{
        position: "fixed", bottom: chatOpen ? 0 : "-200px", right: 32,
        width: 260, background: "var(--charcoal)", color: "var(--chalk)",
        zIndex: 101, transition: "bottom 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.15)",
      }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Get in touch</span>
          <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(250,248,245,0.5)", fontSize: "1rem", lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: "12px 0" }}>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 20px", textDecoration: "none", color: "var(--chalk)", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {/* WhatsApp proper SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>WhatsApp</div>
              <div style={{ fontSize: "0.6rem", color: "rgba(250,248,245,0.4)" }}>Usually replies in minutes</div>
            </div>
          </a>
          <a href="mailto:hello@maeven.co.ke"
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 20px", textDecoration: "none", color: "var(--chalk)", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(250,248,245,0.6)" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 500 }}>Email us</div>
              <div style={{ fontSize: "0.6rem", color: "rgba(250,248,245,0.4)" }}>hello@maeven.co.ke</div>
            </div>
          </a>
        </div>
      </div>

      {/* Trigger button — minimal text, no green bubble */}
      <button onClick={() => setChatOpen(!chatOpen)} style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 100,
        background: "var(--charcoal)", color: "var(--chalk)",
        border: "none", padding: "11px 20px",
        fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
        fontFamily: "var(--sans)", cursor: "pointer",
        boxShadow: "0 4px 24px rgba(28,28,28,0.18)",
        transition: "background 0.2s, transform 0.2s",
        display: "flex", alignItems: "center", gap: 8,
      }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bronze)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Small dot indicator */}
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#25D366", flexShrink: 0 }} />
        Chat with us
      </button>

    </div>
  );
}
