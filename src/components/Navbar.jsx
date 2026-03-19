/**
 * src/components/Navbar.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed top navigation. Two modes:
 *   - Transparent (at top of page)
 *   - Frosted glass with subtle shadow (after 80px scroll)
 *
 * LAYOUT
 *   [Left: nav links] [Centre: MAEVEN logo] [Right: search · wishlist · bag]
 *
 * NAV ITEMS (desktop left)
 *   Shop · Lookbook · Brand · Journal
 *   All are anchor links in v1.1 (no React Router yet — see TODO-004).
 *
 * RIGHT ICONS (desktop)
 *   Search   — toggles search overlay via onSearchToggle prop
 *   Wishlist — heart icon with live count badge
 *   Bag      — shopping bag icon with live count badge, opens cart drawer
 *
 * MOBILE
 *   Hamburger → full-screen overlay with large italic serif links
 *   + icon row (search / wishlist / bag) above the links
 *
 * PROPS
 *   scrolled         {boolean}   Injected from App scroll listener
 *   totalQty         {number}    Cart item count from useCart
 *   wishlistCount    {number}    Wishlist item count from useWishlist
 *   onCartOpen       {function}  Opens CartDrawer
 *   onSizeOpen       {function}  Opens SizeGuide modal
 *   onSearchToggle   {function}  Toggles search overlay (future — v1.2)
 */

import { useState } from "react";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop",     href: "#shop"     },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Brand",    href: "#brand"    },
  { label: "Journal",  href: "#journal"  },
];

const navLinkStyle = {
  fontSize: "0.68rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "var(--charcoal)",
  transition: "opacity 0.2s",
  background: "none",
  border: "none",
  cursor: "none",
  fontFamily: "var(--sans)",
};

export default function Navbar({
  scrolled,
  totalQty,
  wishlistCount,
  onCartOpen,
  onSizeOpen,
  onSearchToggle,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── TOP MARQUEE ── */}
      <div
        style={{
          background: "var(--charcoal)",
          color: "var(--chalk)",
          overflow: "hidden",
          height: 28,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
        }}
      >
        <div
          className="mq"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {" New Arrivals · Free Shipping Over Kshs 15,000 · Sustainably Made · Conscious Craft · ".repeat(6)}
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 28,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "14px 48px" : "22px 48px",
          background: scrolled ? "rgba(250,248,245,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(28,28,28,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Left: desktop nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Centre: logo (absolutely positioned) */}
        <a
          href="#"
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--charcoal)",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          MAEVEN
        </a>

        {/* Right: icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Search */}
          <button
            onClick={onSearchToggle}
            aria-label="Search"
            style={{ background: "none", border: "none", cursor: "none", color: "var(--charcoal)", display: "flex" }}
          >
            <Search size={19} strokeWidth={1.5} />
          </button>

          {/* Wishlist */}
          <button
            aria-label={`Wishlist (${wishlistCount} items)`}
            style={{ background: "none", border: "none", cursor: "none", position: "relative", color: "var(--charcoal)", display: "flex" }}
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: "absolute", top: -6, right: -6,
                  background: "var(--rose)", color: "white",
                  fontSize: "0.55rem", width: 15, height: 15,
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart bag */}
          <button
            onClick={onCartOpen}
            aria-label={`Shopping bag (${totalQty} items)`}
            style={{ background: "none", border: "none", cursor: "none", position: "relative", color: "var(--charcoal)", display: "flex" }}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalQty > 0 && (
              <span
                style={{
                  position: "absolute", top: -6, right: -6,
                  background: "var(--rose)", color: "white",
                  fontSize: "0.55rem", width: 15, height: 15,
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                {totalQty}
              </span>
            )}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none", border: "none", cursor: "none",
              display: "none", flexDirection: "column", gap: 5,
            }}
          >
            <span style={{ display: "block", width: 24, height: 1, background: "var(--charcoal)" }} />
            <span style={{ display: "block", width: 24, height: 1, background: "var(--charcoal)" }} />
            <span style={{ display: "block", width: 24, height: 1, background: "var(--charcoal)" }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div
        style={{
          position: "fixed", inset: 0,
          background: "var(--chalk)",
          zIndex: 200,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Close */}
        <button
          onClick={closeMobile}
          aria-label="Close menu"
          style={{ position: "absolute", top: 32, right: 32, background: "none", border: "none", cursor: "none" }}
        >
          <X size={28} strokeWidth={1} />
        </button>

        {/* Icon row */}
        <div style={{ display: "flex", gap: 32, marginBottom: 48 }}>
          {[
            { icon: Search,      label: "Search",   action: () => { closeMobile(); onSearchToggle?.(); } },
            { icon: Heart,       label: "Wishlist",  action: closeMobile, badge: wishlistCount },
            { icon: ShoppingBag, label: "Bag",       action: () => { closeMobile(); onCartOpen(); }, badge: totalQty },
          ].map(({ icon: Icon, label, action, badge }) => (
            <button key={label} onClick={action} aria-label={label}
              style={{ background: "none", border: "none", cursor: "none", position: "relative", color: "var(--charcoal)" }}>
              <Icon size={22} strokeWidth={1.5} />
              {badge > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -5,
                  background: "var(--rose)", color: "white",
                  fontSize: "0.5rem", width: 14, height: 14,
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Nav links */}
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={closeMobile}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "3.5rem",
              fontWeight: 300,
              textDecoration: "none",
              color: "var(--charcoal)",
              marginBottom: 12,
              fontStyle: "italic",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${0.1 + i * 0.06}s`,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
