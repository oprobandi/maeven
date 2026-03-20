/**
 * src/data/products.js
 * ─────────────────────────────────────────────────────────────────────────────
 * MAEVEN product catalogue.
 *
 * FIELDS
 *   id        {number}   Unique identifier — never reuse a retired ID
 *   name      {string}   Display name
 *   category  {string}   Matches CategoryGrid labels (Outerwear / Dresses / Essentials / Tops)
 *   material  {string}   Primary fabric — used by material filter in ProductGrid
 *   price     {number}   Price in Kshs (full, no discounts)
 *   tags      {string[]} Used by the category filter pill tabs (New / Dresses / Tops / Outerwear)
 *   img       {string}   Primary Unsplash image URL (portrait ratio, 800px wide)
 *   altImg    {string}   Hover-swap image URL
 *   desc      {string}   1–2 sentence product description for ProductModal
 *
 * ADDING A PRODUCT
 *   1. Give it the next sequential ID
 *   2. Add at least one tag matching an existing filter tab
 *   3. Use Unsplash URLs with ?q=80&w=800 for consistency
 *   4. Keep desc under 200 characters — it appears in a constrained modal
 *
 * RETIRING A PRODUCT
 *   Do not delete — comment out and add { retired: true } so order history
 *   references remain intact once backend is introduced (v3.x).
 */

export const PRODUCTS = [
  {
    id: 1,
    name: "The Aligned Coat",
    category: "Outerwear",
    material: "Virgin Wool",
    price: 11500,
    tags: ["New", "Outerwear"],
    img:    "https://images.unsplash.com/photo-1539109132304-3915502d8e7a?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1544441893-675973e31985?q=75&w=700&fm=webp",
    desc:   "Structured in 100% virgin wool from Italian mills. A coat that anchors any wardrobe — season after season.",
  },
  {
    id: 2,
    name: "Ethereal Slip Dress",
    category: "Dresses",
    material: "Pure Silk",
    price: 5800,
    tags: ["Dresses", "New"],
    img:    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=75&w=700&fm=webp",
    desc:   "Pure silk charmeuse, cut on the bias. Moves like water. Dresses up or down with equal ease.",
  },
  {
    id: 3,
    name: "Metric Trousers",
    category: "Essentials",
    material: "Italian Crepe",
    price: 4200,
    tags: ["Tops", "Essentials"],
    img:    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=75&w=700&fm=webp",
    desc:   "Italian crepe in a straight, mid-rise cut. The trouser every capsule wardrobe needs.",
  },
  {
    id: 4,
    name: "Sculpted Blazer",
    category: "Outerwear",
    material: "Linen Blend",
    price: 7500,
    tags: ["New", "Outerwear"],
    img:    "https://images.unsplash.com/photo-1548142813-c348350df52b?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=75&w=700&fm=webp",
    desc:   "A linen-blend blazer with a single structured shoulder and clean notch lapel. Effortlessly sharp.",
  },
  {
    id: 5,
    name: "Oversized Cashmere",
    category: "Tops",
    material: "Grade A Cashmere",
    price: 5100,
    tags: ["Tops"],
    img:    "https://images.unsplash.com/photo-1576188973526-0e5d74221d07?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=75&w=700&fm=webp",
    desc:   "Grade A Mongolian cashmere in a generous, relaxed silhouette. The definition of considered comfort.",
  },
  {
    id: 6,
    name: "The Column Skirt",
    category: "Dresses",
    material: "Organic Cotton",
    price: 3800,
    tags: ["Dresses"],
    img:    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=75&w=700&fm=webp",
    altImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=75&w=700&fm=webp",
    desc:   "Organic cotton poplin, midi length, with a clean A-line column silhouette. Simple. Deliberate.",
  },
];

/**
 * MATERIAL_OPTIONS
 * Used to populate the material filter <select> in ProductGrid.
 * Keep in sync with unique `material` values above.
 */
export const MATERIAL_OPTIONS = [
  "All Materials",
  "Virgin Wool",
  "Pure Silk",
  "Italian Crepe",
  "Linen Blend",
  "Grade A Cashmere",
  "Organic Cotton",
];

/**
 * FILTER_TABS
 * Category filter pill tabs shown above the product grid.
 * Values must match tags used in PRODUCTS above.
 */
export const FILTER_TABS = ["All", "New", "Dresses", "Tops", "Outerwear"];
