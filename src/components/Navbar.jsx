/**
 * src/components/Navbar.jsx — v1.2
 * ─────────────────────────────────────────────────────────────────────────────
 * LEFT-ALIGNED logo. No centring, no absolute positioning, zero overlap risk.
 *
 * DESKTOP LAYOUT
 *   [MAEVEN]  [Shop · Lookbook · Brand · Journal]  ........  [🔍 · ♡n · 🛍n]
 *   Logo left → nav links → flex spacer → icon cluster right
 *
 * MOBILE LAYOUT
 *   [MAEVEN]  .....................................  [🛍n · ☰]
 *   Logo left, bag + hamburger right. Nothing else visible.
 *
 * HOVER BEHAVIOUR
 *   Underline slides in from left on nav links.
 *   More intentional than opacity — feels editorial.
 *
 * NAV ITEMS (see ADR-004)
 *   Shop · Lookbook · Brand · Journal
 *   4 items max. Ordered by user intent priority.
 */

import { useState } from "react";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop",     href: "#shop"     },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Brand",    href: "#brand"    },
  { label: "Journal",  href: "#journal"  },
];

export default function Navbar({
  scrolled,
  totalQty,
  wishlistCount,
  onCartOpen,
  onSearchToggle,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── TOP MARQUEE ── */}
      <div style={{
        background: "var(--charcoal)", color: "var(--chalk)",
        overflow: "hidden", height: 28,
        display: "flex", alignItems: "center",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 110,
      }}>
        <div className="mq" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          {" New Arrivals · Free Shipping Over Kshs 15,000 · Sustainably Made · Conscious Craft · ".repeat(6)}
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav style={{
        position: "fixed", top: 28, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center",
        padding: scrolled ? "12px 40px" : "20px 40px",
        background: scrolled ? "rgba(250,248,245,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(28,28,28,0.07)" : "none",
        transition: "all 0.4s ease",
        gap: 32,
      }}>

        {/* ── Logo LEFT ── */}
        <a href="#" style={{
          fontFamily: "var(--serif)",
          fontSize: "1.55rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: "var(--charcoal)",
          flexShrink: 0,
          lineHeight: 1,
        }}>
          MAEVEN
        </a>

        {/* ── Desktop nav links ── */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
          ))}
        </div>

        {/* ── Spacer pushes icons to far right ── */}
        <div style={{ flex: 1 }} />

        {/* ── Desktop right icons ── */}
        <div className="nav-icons-desktop" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <IconBtn onClick={onSearchToggle} label="Search">
            <Search size={18} strokeWidth={1.5} />
          </IconBtn>
          <IconBtn label={`Wishlist (${wishlistCount} items)`} badge={wishlistCount}>
            <Heart size={18} strokeWidth={1.5} />
          </IconBtn>
          <IconBtn onClick={onCartOpen} label={`Bag (${totalQty} items)`} badge={totalQty}>
            <ShoppingBag size={19} strokeWidth={1.5} />
          </IconBtn>
        </div>

        {/* ── Mobile: bag + hamburger only ── */}
        <div className="nav-mobile-right" style={{ display: "none", alignItems: "center", gap: 16 }}>
          <IconBtn onClick={onCartOpen} label={`Bag (${totalQty} items)`} badge={totalQty}>
            <ShoppingBag size={20} strokeWidth={1.5} />
          </IconBtn>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--charcoal)", display: "flex", padding: 2 }}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div style={{
        position: "fixed", inset: 0, background: "var(--chalk)",
        zIndex: 200, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.48s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}>
        {/* Close X */}
        <button onClick={closeMobile} aria-label="Close menu" style={{
          position: "absolute", top: 28, right: 28,
          background: "none", border: "none", cursor: "pointer",
        }}>
          <X size={26} strokeWidth={1} />
        </button>

        {/* Logo inside overlay — mirrors main nav */}
        <a href="#" onClick={closeMobile} style={{
          position: "absolute", top: 22, left: 28,
          fontFamily: "var(--serif)", fontSize: "1.4rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          textDecoration: "none", color: "var(--charcoal)",
        }}>
          MAEVEN
        </a>

        {/* Icon row */}
        <div style={{ display: "flex", gap: 36, marginBottom: 52 }}>
          {[
            { icon: Search,      label: "Search",  action: () => { closeMobile(); onSearchToggle?.(); }, badge: 0 },
            { icon: Heart,       label: "Wishlist", action: closeMobile, badge: wishlistCount },
            { icon: ShoppingBag, label: "Bag",      action: () => { closeMobile(); onCartOpen(); }, badge: totalQty },
          ].map(({ icon: Icon, label, action, badge }) => (
            <button key={label} onClick={action} aria-label={label} style={{
              background: "none", border: "none", cursor: "pointer",
              position: "relative", color: "var(--charcoal)",
            }}>
              <Icon size={22} strokeWidth={1.5} />
              {badge > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -6,
                  background: "var(--rose)", color: "white",
                  fontSize: "0.5rem", width: 14, height: 14,
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>{badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Nav links — large italic */}
        {NAV_LINKS.map((link, i) => (
          <a key={link.label} href={link.href} onClick={closeMobile} style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2.4rem,8vw,3.5rem)",
            fontWeight: 300, fontStyle: "italic",
            textDecoration: "none", color: "var(--charcoal)",
            marginBottom: 6,
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.45s ease ${0.08 + i * 0.07}s, transform 0.45s ease ${0.08 + i * 0.07}s`,
          }}>
            {link.label}
          </a>
        ))}

        {/* Location tag */}
        <p style={{
          position: "absolute", bottom: 40,
          fontSize: "0.6rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(28,28,28,0.3)",
        }}>
          Nairobi · Kenya
        </p>
      </div>
    </>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.68rem", letterSpacing: "0.16em",
        textTransform: "uppercase", textDecoration: "none",
        color: "var(--charcoal)", fontFamily: "var(--sans)",
        position: "relative", paddingBottom: 3,
      }}
    >
      {children}
      <span style={{
        position: "absolute", bottom: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: "1px", background: "var(--charcoal)",
        transition: "width 0.25s ease",
      }} />
    </a>
  );
}

function IconBtn({ onClick, label, badge = 0, children }) {
  return (
    <button onClick={onClick} aria-label={label} style={{
      background: "none", border: "none", cursor: "pointer",
      position: "relative", color: "var(--charcoal)",
      display: "flex", padding: 2,
    }}>
      {children}
      {badge > 0 && (
        <span style={{
          position: "absolute", top: -5, right: -5,
          background: "var(--rose)", color: "white",
          fontSize: "0.5rem", width: 14, height: 14,
          borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>{badge}</span>
      )}
    </button>
  );
}
