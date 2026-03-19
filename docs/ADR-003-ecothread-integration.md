# ADR-003: EcoThread → Maeven Integration Decisions

**Date:** 2026-03-20  
**Status:** Accepted  
**Deciders:** Peter (lead dev)

---

## Context

EcoThread (vanilla HTML/JS) and Maeven (React/Vite) were developed in parallel
as separate prototypes. v1.1 merges EcoThread's functional e-commerce features
into Maeven's visual and brand framework.

This ADR documents every integration decision made during that merge.

---

## Decision Log

### 1. Drop the 85% Sale / Clearance Framing

**EcoThread had:** "Final Sale — 85% Off Everything" hero, red "85% OFF ENTIRE STORE"
badge, crossed-out original prices.

**Decision:** Remove entirely.

**Rationale:** "Quiet luxury" and "clearance event" are fundamentally incompatible
brand signals. Discount-first positioning attracts a price-sensitive customer who
will leave the moment a cheaper alternative appears. Maeven's positioning
(Cormorant Garamond, Kshs 11,500 coats, "crafted from responsibly sourced fabrics")
is explicitly anti-discount. We are building a customer who buys one piece and
keeps it for 10 years — not one who hunts for the lowest price.

**What replaces it:** The ProductModal shows full Kshs price, material provenance,
and a care guide snippet. Value is communicated through quality signals, not
markdown percentages.

---

### 2. Rebrand Impact Calculator as "The Conscious Choice"

**EcoThread had:** An impact slider titled generically with metrics tied to
"how many fast fashion pieces" owned.

**Decision:** Port the mechanic, reframe entirely.

**New framing:** "Every MAEVEN piece replaces an average of 7 fast-fashion
purchases. Slide to see the difference your choices make."

**Metrics kept:** Water saved (litres), CO₂ avoided (kg)  
**Metric added:** Garment lifespan extension (years)  
**Tone:** Affirmative, not guilt-based. "Your choices make a difference" not
"fast fashion is destroying the planet."

**Rationale:** Maeven's customer is already values-aligned. The calculator should
celebrate their choices, not lecture them.

---

### 3. Product Modal vs. Product Page

**EcoThread had:** A modal overlay with product detail.

**Options considered:**
- A) Modal overlay (EcoThread approach) — no routing required
- B) Dedicated `/product/:id` page — requires React Router

**Decision:** Modal overlay for v1.1.

**Rationale:** Maeven has no React Router yet. Adding routing is a non-trivial
refactor (see TODO-004). The modal approach is zero-dependency, ships immediately,
and is common in luxury fashion (Net-a-Porter, SSENSE). The trade-off is no
shareable product URLs — acceptable for v1.1, must be resolved before any
paid marketing traffic is sent.

---

### 4. Material Filter + Search

**EcoThread had:** A `<select>` for material and a text input for search,
working together with `Array.filter()`.

**Decision:** Port both, integrate with Maeven's existing category filter.

**Implementation:** Three filters work in AND logic:
- Category filter (existing: All / New / Dresses / Tops / Outerwear)
- Material filter (new: All Materials / Virgin Wool / Silk / Cashmere / etc.)
- Search query (new: matches product name)

All three are derived state via `useMemo` — no separate filter state arrays.

---

### 5. Toast Notifications

**EcoThread had:** A DOM-manipulation toast system (vanilla JS).

**Decision:** Rewrite as a React component using state + CSS transition.

**Implementation:** `Toast.jsx` receives `message` + `visible` props from App.
App manages `toast` state: `{ message: '', visible: false }`. A `showToast(msg)`
helper in App sets visible to true, then a `setTimeout` sets it back to false
after 2500ms.

---

### 6. WhatsApp Number

Both EcoThread and Maeven already used `+254799644100`. Kept as-is.

---

### 7. EcoThread Features NOT Ported

| Feature | Reason skipped |
|---|---|
| Size selector in modal | Maeven has a dedicated Size Guide modal — redundant |
| "Verified Buyer" badge logic | No backend to verify against |
| Cart localStorage `ecothread_cart` key | Renamed to `maeven_cart` to avoid collision |
