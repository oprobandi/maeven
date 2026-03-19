# ADR-001: Component Architecture — Split App.jsx into Discrete Components

**Date:** 2026-03-20  
**Status:** Accepted  
**Deciders:** Peter (lead dev)

---

## Context

The original `src/App.jsx` was a monolithic ~650-line file containing all UI logic,
data, state, and render output in a single export. This worked for the initial
prototype but creates real problems as the codebase grows:

- Scroll position is lost when editing any part of the file in Termux nano/vim
- React hot-reload re-mounts the entire tree on any change, losing UI state
- No clear separation between data, logic, and presentation
- Impossible to onboard a second developer without a full walkthrough

## Decision

Split `App.jsx` into the following layers:

```
src/
  data/
    products.js        — product catalogue (id, name, price, images, desc, material, tags)
    content.js         — static content (lookbook, testimonials, press, categories, footer cols)
  hooks/
    useCart.js         — cart state + localStorage sync
    useWishlist.js     — wishlist state + localStorage sync
    useScrollReveal.js — IntersectionObserver abstraction
  components/
    Cursor.jsx         — custom cursor (dot + lagging ring)
    Toast.jsx          — ephemeral notification system
    Navbar.jsx         — top bar, mobile menu, scroll state
    Hero.jsx           — full-viewport split hero
    CategoryGrid.jsx   — shop-by-category tiles
    ProductGrid.jsx    — filter bar + product card grid
    ProductCard.jsx    — individual card with hover swap + wishlist
    ProductModal.jsx   — full detail drawer (NEW in v1.1)
    BrandStory.jsx     — dark brand philosophy section
    Lookbook.jsx       — horizontal scroll carousel
    ImpactCalculator.jsx — conscious choice slider (NEW in v1.1)
    Testimonials.jsx   — press logos + customer reviews
    EmailCapture.jsx   — newsletter signup
    CartDrawer.jsx     — slide-in cart panel
    SizeGuide.jsx      — modal with IN/CM toggle
    Footer.jsx         — full-width footer grid
  App.jsx              — orchestrator only, ~80 lines
  index.css            — global tokens, animations, utilities
  main.jsx             — Vite entry point
```

## Consequences

**Positive:**
- Each component can be edited and hot-reloaded independently
- Hooks encapsulate all stateful logic — components are mostly presentational
- Data files can be updated without touching any component
- Clear onboarding path: read `App.jsx` → follow imports

**Negative:**
- More files to navigate in Termux (mitigated by consistent naming)
- Cross-component prop drilling for shared state (mitigated by custom hooks)

**Not chosen:** React Context or Zustand for global state — overkill for v1.x.
Will revisit when account/auth is introduced (see ADR-002).
