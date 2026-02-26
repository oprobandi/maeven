# MAEVEN — Fashion E-Commerce Landing Page

A luxury fashion e-commerce landing page built with React + Vite.

## Features
- Custom trailing cursor with ring effect
- Word-by-word hero title animation
- Real Unsplash fashion photography
- Reactive cart with M-PESA checkout
- Wishlist (heart toggle per product)
- Product filter tabs (All / New / Dresses / Tops / Outerwear)
- Size Guide modal with IN ↔ CM toggle
- Lookbook carousel (drag + arrow navigation)
- Scroll reveal animations throughout
- Parallax brand story section
- SVG progress ring on back-to-top button
- WhatsApp floating support button
- Fully responsive (mobile, tablet, desktop)
- Kenya market: Kshs pricing + M-PESA

---

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
npm install
vercel
```

### Option 2 — Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) → New Project
2. Upload this folder **or** push to GitHub and import
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy ✅

---

## Project Structure

```
maeven/
├── index.html          # HTML entry point
├── vercel.json         # Vercel SPA routing config
├── vite.config.js      # Vite config
├── package.json        # Dependencies
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main component (all sections + sub-components)
    └── index.css       # Global styles, animations, responsive breakpoints
```

---

## Customisation

| What | Where |
|------|-------|
| Products data | `src/App.jsx` → `PRODUCTS` array |
| Lookbook images | `src/App.jsx` → `LOOKBOOK` array |
| WhatsApp number | `src/App.jsx` → WhatsApp `href` |
| Colors | `src/index.css` → `:root` variables |
| Fonts | `index.html` → Google Fonts link |
| Currency | `src/App.jsx` → `fmt()` function |
