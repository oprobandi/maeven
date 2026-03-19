# MAEVEN — Quiet Luxury Fashion

**Live:** https://maeven-five.vercel.app  
**Repo:** https://github.com/oprobandi/maeven  
**Stack:** React 18 · Vite 4 · Lucide React · Vercel  
**Current version:** 1.1.0

---

## What is MAEVEN?

MAEVEN is a Nairobi-based quiet luxury fashion brand selling responsibly sourced,
artisan-crafted clothing. The platform is a React SPA that serves as both an
editorial brand experience and a functional e-commerce storefront.

The brand ethos: *slow fashion, timeless beauty*. Every design decision reflects
this — from the Cormorant Garamond typography to the absence of sale pricing.

---

## Getting Started (Termux)

```bash
# Clone
git clone https://github.com/oprobandi/maeven.git
cd maeven

# Install
npm install

# Dev server (opens on localhost:5173)
npm run dev

# Production build
npm run build

# Deploy to Vercel
vercel --prod
```

---

## Project Structure

```
maeven/
  docs/                          # Architecture decision records
    ADR-001-component-architecture.md
    ADR-002-state-persistence.md
    ADR-003-ecothread-integration.md
  src/
    data/
      products.js                # Product catalogue
      content.js                 # Static content (lookbook, testimonials, etc.)
    hooks/
      useCart.js                 # Cart state + localStorage
      useWishlist.js             # Wishlist state + localStorage
      useScrollReveal.js         # IntersectionObserver utility
    components/
      Cursor.jsx                 # Custom cursor (dot + ring)
      Toast.jsx                  # "Added to bag" notification
      Navbar.jsx                 # Top navigation + mobile menu
      Hero.jsx                   # Split-grid hero section
      CategoryGrid.jsx           # Shop-by-category tiles
      ProductGrid.jsx            # Filter bar + product card grid
      ProductCard.jsx            # Individual product card
      ProductModal.jsx           # Product detail overlay
      BrandStory.jsx             # Dark brand philosophy section
      Lookbook.jsx               # Horizontal scroll carousel
      ImpactCalculator.jsx       # "The Conscious Choice" slider
      Testimonials.jsx           # Press + customer reviews
      EmailCapture.jsx           # Newsletter signup
      CartDrawer.jsx             # Slide-in cart panel
      SizeGuide.jsx              # Size modal with IN/CM toggle
      Footer.jsx                 # Full footer grid
    App.jsx                      # Root orchestrator
    index.css                    # Global tokens + animations
    main.jsx                     # Vite entry
  index.html
  package.json
  vite.config.js
  vercel.json
  CHANGELOG.md
  TODO.md
```

---

## Design Tokens (index.css)

| Token | Value | Usage |
|---|---|---|
| `--chalk` | `#faf8f5` | Page background, light text |
| `--charcoal` | `#1c1c1c` | Primary text, dark backgrounds |
| `--rose` | `#d4a5a5` | Accents, wishlist, section labels |
| `--bronze` | `#a0845c` | Star ratings, price, hover states |
| `--rose-light` | `#f0e6e6` | Email capture section background |
| `--serif` | Cormorant Garamond | Display, headings, quotes |
| `--sans` | DM Sans | Body, labels, buttons |

---

## Key Decisions

See `docs/` folder for full Architecture Decision Records.

| # | Decision | Record |
|---|---|---|
| 001 | Split monolithic App.jsx into components | ADR-001 |
| 002 | Persist cart/wishlist to localStorage | ADR-002 |
| 003 | Merge EcoThread features into Maeven | ADR-003 |

---

## Payments

Checkout is via **M-PESA** (Safaricom Daraja API — integration pending, see TODO v2.1).
All prices are in **Kshs** (Kenyan Shillings).

## Support

WhatsApp: [+254 799 644 100](https://wa.me/254799644100)
