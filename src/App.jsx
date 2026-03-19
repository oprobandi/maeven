/**
 * src/App.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Root orchestrator. Owns:
 *   - Global state hooks (useCart, useWishlist, useScrollReveal)
 *   - Scroll listener (scrolled flag for Navbar)
 *   - Scroll progress (for back-to-top ring)
 *   - Toast state + showToast helper
 *   - Modal/drawer open state (cart, size guide, product modal)
 *   - Prop drilling to all child components
 *
 * This file should stay thin (~90 lines of JSX).
 * If it grows beyond 150 lines, extract a new component.
 *
 * COMPONENT RENDER ORDER (matches visual top-to-bottom page order)
 *   Cursor
 *   Toast
 *   Navbar              (fixed overlay)
 *   Hero
 *   CategoryGrid        #shop
 *   ProductGrid
 *   BrandStory          #brand
 *   Lookbook            #lookbook
 *   ImpactCalculator    (new in v1.1)
 *   Testimonials        #journal
 *   EmailCapture
 *   Footer
 *   CartDrawer          (fixed overlay)
 *   ProductModal        (fixed overlay, new in v1.1)
 *   SizeGuide           (fixed overlay)
 *   [Back to top btn]
 *   [WhatsApp btn]
 */

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

// Hooks
import { useCart }         from "./hooks/useCart";
import { useWishlist }     from "./hooks/useWishlist";
import { useScrollReveal } from "./hooks/useScrollReveal";

// Components
import Cursor            from "./components/Cursor";
import Toast             from "./components/Toast";
import Navbar            from "./components/Navbar";
import Hero              from "./components/Hero";
import CategoryGrid      from "./components/CategoryGrid";
import ProductGrid       from "./components/ProductGrid";
import BrandStory        from "./components/BrandStory";
import Lookbook          from "./components/Lookbook";
import ImpactCalculator  from "./components/ImpactCalculator";
import Testimonials      from "./components/Testimonials";
import EmailCapture      from "./components/EmailCapture";
import Footer            from "./components/Footer";
import CartDrawer        from "./components/CartDrawer";
import ProductModal      from "./components/ProductModal";
import SizeGuide         from "./components/SizeGuide";

// Constants
import { WA_NUMBER, WA_MESSAGE } from "./data/content";

export default function App() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const { cart, addToCart, updateQty, totalQty, totalAmt } = useCart();
  const { wishlist, toggleWish, isWishlisted }             = useWishlist();
  useScrollReveal();

  // ── UI state ───────────────────────────────────────────────────────────────
  const [scrolled,      setScrolled]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [sizeOpen,      setSizeOpen]      = useState(false);
  const [activeProduct, setActiveProduct] = useState(null); // ProductModal
  const [toast,         setToast]         = useState({ message: "", visible: false });

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  // ── Cart action with toast ─────────────────────────────────────────────────
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast("Added to bag");
    setCartOpen(true);
  };

  // ── Scroll progress ring circumference ────────────────────────────────────
  const circum = 2 * Math.PI * 20;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--sans)", background: "var(--chalk)", color: "var(--charcoal)", overflowX: "hidden" }}>

      <Cursor />
      <Toast message={toast.message} visible={toast.visible} />

      <Navbar
        scrolled={scrolled}
        totalQty={totalQty}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onSizeOpen={() => setSizeOpen(true)}
        onSearchToggle={() => {/* v1.2 — see TODO */}}
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

      {/* ── Overlays ─────────────────────────────────────────────────────── */}
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

      {/* ── Floating: Size Guide button ──────────────────────────────────── */}
      <button
        onClick={() => setSizeOpen(true)}
        style={{
          position: "fixed", bottom: 96, right: 32,
          background: "var(--chalk)", border: "1px solid var(--charcoal)",
          padding: "11px 22px",
          fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
          cursor: "none", fontFamily: "var(--sans)", zIndex: 90,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "var(--chalk)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--chalk)"; e.currentTarget.style.color = "var(--charcoal)"; }}
      >
        Size Guide
      </button>

      {/* ── Floating: Back to top ─────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", bottom: 32, left: 32, width: 50, height: 50,
          zIndex: 90, background: "none", border: "none", cursor: "none", padding: 0,
          opacity: scrollPct > 8 ? 1 : 0,
          transform: scrollPct > 8 ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        <svg viewBox="0 0 50 50" width="50" height="50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#e8e4de" strokeWidth="1.5" />
          <circle
            cx="25" cy="25" r="20" fill="none"
            stroke="var(--bronze)" strokeWidth="1.5"
            strokeDasharray={circum}
            strokeDashoffset={circum - (circum * scrollPct) / 100}
            transform="rotate(-90 25 25)"
            style={{ transition: "stroke-dashoffset 0.15s" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "var(--charcoal)" }}>↑</div>
      </button>

      {/* ── Floating: WhatsApp ────────────────────────────────────────────── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 100,
          background: "#25D366", color: "white",
          padding: 14, borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s", textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <MessageCircle size={24} fill="white" />
      </a>

    </div>
  );
}
