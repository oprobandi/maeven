# CHANGELOG — MAEVEN Fashion Platform

All notable changes to this project are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.2.1] — 2026-03-20

### Summary
Targeted patch. Fixes disappearing product images permanently. Improves desktop
product grid layout. Adds image placeholder so blank loading states are graceful.

### Fixed
- **Disappearing images (critical)** — replaced all backgroundImage CSS divs in
  ProductCard with real <img> tags and loading="lazy". Browser now only requests
  images when they approach the viewport. No more Unsplash rate limiting.
- Image onError fallback: failed images show a warm beige placeholder, never blank
- Desktop filter bar: heading + controls now sit in a single well-spaced row
- Desktop section max-width capped at 1300px with auto side margins on wide screens

### Changed
- ProductCard: backgroundImage → <img> with loading="lazy" + onError handler
- ProductGrid: filter bar layout refactored — heading left, dropdowns right, tabs below
- ProductGrid: max-width 1200px container with centered auto margins
- Select dropdown: custom SVG chevron replacing default browser arrow
- index.css: .product-img class for consistent aspect ratio across breakpoints
- index.css: desktop padding uses max() to add breathing room above 1280px

---

## [1.2.0] — 2026-03-20

### Summary
Mobile navbar overlap fixed. Logo moved left. Footer stripped to 5 links with
mobile accordion. WhatsApp bubble replaced with minimal text trigger. Proper
brand SVG icons. Image load optimised. Termux workflow documented.

### Added
- `docs/TERMUX-WORKFLOW.md` — full Termux guide
- Mobile footer accordion (5 collapsible sections)
- OG meta tags in `index.html`
- Contact panel (WhatsApp + Email slide-up)

### Changed
- Navbar: logo LEFT, slide-in underline hover, mobile-only bag+hamburger
- Footer: 20-link grid → 5 inline links + social row
- WhatsApp: green bubble → minimal "Chat with us" text button
- Social icons: proper brand SVGs (Instagram, TikTok, Pinterest, Twitter/X)
- All Unsplash images: `&q=75&fm=webp` — ~60% smaller payloads
- Scroll listener: `{ passive: true }` for mobile performance

---

## [1.1.0] — 2026-03-20

### Summary
Heavy structural refactor merging EcoThread's e-commerce functionality into
Maeven's visual framework. No visual regressions. Net additions: localStorage
persistence, product modal, search + material filter, impact calculator, toast
notifications, wishlist icon in nav.

### Added
- **localStorage persistence** for cart (`maeven_cart`) and wishlist (`maeven_wishlist`)
  via `useCart.js` and `useWishlist.js` custom hooks (ADR-002)
- **ProductModal.jsx** — full product detail overlay with image, description,
  material provenance, Kshs price, and add-to-bag action (ADR-003 §3)
- **ImpactCalculator.jsx** — "The Conscious Choice" interactive slider section,
  ported and rebranded from EcoThread (ADR-003 §2)
- **Toast.jsx** — ephemeral "Added to bag" notification component
- **Search bar** in ProductGrid — real-time name matching
- **Material filter** in ProductGrid — dropdown filter alongside category tabs
- **Wishlist icon** in Navbar desktop bar with live count badge
- **Search icon** in Navbar triggering inline search overlay
- `desc` field added to all products in `products.js`
- `src/data/content.js` — extracted all static content arrays from App.jsx
- Full component split (ADR-001): 16 discrete components, 2 custom hooks, 2 data files

### Changed
- `App.jsx` reduced from ~650 lines to ~90 lines (orchestrator only)
- `useScrollReveal` extracted to `src/hooks/useScrollReveal.js`
- Product filter now uses AND logic across category + material + search query
- Navbar right side: Size Guide link removed from visible nav, now only accessible
  via the floating button (cleaner nav bar)

### Removed
- Inline data arrays from `App.jsx` (moved to `src/data/`)
- Inline sub-components from `App.jsx` (moved to `src/components/`)
- All discount/sale pricing language (ADR-003 §1)

### Fixed
- Cart badge count was not visible when `totalQty` was 0 but cart had items (off-by-one)
- Lookbook arrow buttons used `cursor: none` but were still showing pointer on mobile —
  now correctly hidden on touch devices only

### Documentation
- `docs/ADR-001-component-architecture.md`
- `docs/ADR-002-state-persistence.md`
- `docs/ADR-003-ecothread-integration.md`
- `TODO.md` created with full v1.x → v3.x roadmap

---

## [1.0.0] — 2026-03-19

### Summary
Initial production deployment of MAEVEN. Single-file React app (App.jsx).
Deployed to Vercel at maeven-five.vercel.app.

### Features shipped
- Split-grid hero with Ken Burns image animation
- Animated word-by-word headline
- Top marquee ticker (fixed, charcoal background)
- Scroll-aware navbar (transparent → frosted glass)
- Custom cursor: dot + lagging ring
- Scroll reveal system (IntersectionObserver, staggered delays)
- Scroll progress circle (SVG stroke-dashoffset)
- Category grid (2fr 1fr 1fr layout with hover zoom)
- Product grid with category filter tabs
- Product cards: dual-image hover swap, slide-up "Add to Bag", wishlist heart
- Cart drawer (slide-in from right, quantity controls)
- Brand story section (dark, watermark text, stats)
- Lookbook horizontal scroll carousel with arrow navigation
- Press logos bar + testimonials (Nairobi, Mombasa, Kisumu)
- Email capture with confirmation animation
- Size Guide modal (IN/CM toggle, full size table)
- Back-to-top button with scroll progress ring
- WhatsApp support button (wa.me/254799644100)
- M-PESA payment badge in footer
- Fully responsive (768px, 900px, 560px breakpoints)
- Fonts: Cormorant Garamond (serif display) + DM Sans (body)
- Palette: chalk / charcoal / rose / bronze

### Known issues at launch
- Cart does not persist on page refresh (fixed in v1.1.0)
- No product detail view — "Add to Bag" is the only product interaction
- No search or material filtering
