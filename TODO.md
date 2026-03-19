# TODO — MAEVEN Development Roadmap

Priority legend: 🔴 Critical · 🟡 Important · 🟢 Nice-to-have · 🔵 Research

---

## v1.2 — Polish & Performance
*Target: 2–3 weeks after v1.1*

- [ ] 🔴 **Image optimisation** — all Unsplash URLs use `?w=800&q=75&fm=webp`.
       Currently some load at 2000px. Add a utility function `imgUrl(base, w)`
       that appends correct params.
- [ ] 🔴 **Font loading** — add `<link rel="preconnect">` for Google Fonts in
       `index.html` and use `font-display: swap`. Currently causes FOUT on slow
       Kenyan mobile connections.
- [ ] 🟡 **Lazy loading** — product images below the fold should use
       `loading="lazy"` (or `backgroundImage` with IntersectionObserver swap).
- [ ] 🟡 **Toast queue** — currently only one toast can show at a time.
       If user spams "Add to Bag", toasts overlap. Implement a toast queue array.
- [ ] 🟡 **Mobile cart** — cart drawer is 400px wide, clips on small Android screens.
       Cap at `min(400px, 100vw)` and test on S34.
- [ ] 🟢 **Lookbook drag-to-scroll** — add pointer event handlers for desktop drag
       scrolling on the lookbook track (currently only arrow buttons + native scroll).
- [ ] 🟢 **Reduced motion** — wrap cursor animation and Ken Burns in
       `@media (prefers-reduced-motion: reduce)` to respect accessibility settings.
- [ ] 🟢 **OG tags** — add `og:title`, `og:description`, `og:image` to `index.html`
       for WhatsApp link previews when sharing the URL.

---

## v2.0 — Routing & Real Content
*Target: 4–6 weeks after v1.1*

- [ ] 🔴 **TODO-004: React Router v6** — add `react-router-dom`. Convert anchor
       links to `<Link>` components. Pages: `/`, `/shop`, `/lookbook`, `/brand`,
       `/journal`, `/product/:id`.
- [ ] 🔴 **Product detail pages** — `/product/:id` replaces the modal for SEO
       and shareable URLs (critical before any paid marketing).
- [ ] 🔴 **Real product photography** — replace all Unsplash placeholder images
       with actual MAEVEN product shots. Coordinate with Paul/photographer.
- [ ] 🟡 **Journal/Blog** — at minimum 3 seed posts. Consider Hashnode API
       integration (precedent from Paul Nyang'wara portfolio project).
- [ ] 🟡 **Stockists page** — `/stockists` with a map (Google Maps embed) of
       Nairobi retail locations.
- [ ] 🟡 **Size guide per product** — some products (dresses vs. outerwear)
       have different sizing. Link the correct guide from the product modal.
- [ ] 🟢 **Search page** — `/search?q=` with full-text results across product
       name, material, category, and description.
- [ ] 🟢 **Wishlist page** — `/wishlist` showing saved items with share link.

---

## v2.1 — Checkout Integration
*Target: 2–3 weeks after v2.0*

- [ ] 🔴 **M-PESA STK Push** — integrate Daraja API (Safaricom).
       The "Checkout via M-PESA" button currently does nothing. This is the
       single most important commercial milestone.
       Reference: https://developer.safaricom.co.ke/
- [ ] 🔴 **Order confirmation** — after successful M-PESA payment, show order
       summary and send confirmation SMS/email.
- [ ] 🟡 **Inventory tracking** — add `stock` field to products.js. Show
       "Only 2 left" badge when stock < 3. Disable "Add to Bag" when stock = 0.
- [ ] 🟡 **Shipping calculator** — Nairobi CBD vs. other counties vs. international.
       Integrate with a courier API (Sendy, G4S Kenya, or DHL).

---

## v3.0 — Accounts & Backend
*Target: 6–8 weeks after v2.1*

- [ ] 🔴 **Supabase integration** — auth, database (products, orders, customers),
       storage (product images). See ADR-002 for cart merge strategy on login.
- [ ] 🔴 **Customer accounts** — `/account` page: order history, saved addresses,
       wishlist sync across devices.
- [ ] 🟡 **Admin dashboard** — add/edit/remove products without touching code.
       Supabase Studio is sufficient for v3.0; custom admin UI in v4.x.
- [ ] 🟡 **Reviews system** — verified buyer reviews tied to order records.
       Replace hardcoded testimonials in `content.js`.
- [ ] 🟢 **Loyalty programme** — points per Kshs spent, redeemable against
       future orders. Consider Smile.io or custom implementation.

---

## Ongoing / No version
- [ ] 🔵 **Analytics** — add Plausible (privacy-first, no cookie banner needed)
       or Vercel Analytics. Track: page views, add-to-bag events, checkout starts.
- [ ] 🔵 **A/B testing** — test hero headline variants ("Dressed for Every Quiet
       Revolution" vs. alternatives). Use Vercel Edge Config for flag management.
- [ ] 🔵 **Accessibility audit** — run axe-core against all pages. Fix all
       critical and serious issues. Target WCAG 2.1 AA.
- [ ] 🔵 **PWA** — add `manifest.json` and service worker for offline browsing
       and "Add to Home Screen" on Android. Relevant given Kenyan mobile-first usage.
