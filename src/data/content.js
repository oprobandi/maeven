/**
 * src/data/content.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All static content arrays extracted from App.jsx.
 * Edit copy here — no component files need touching for content updates.
 */

export const LOOKBOOK = [
  {
    id: 1,
    title: "L'Échappée Belle",
    issue: "No. 04",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
  },
  {
    id: 2,
    title: "Quiet Revolution",
    issue: "No. 05",
    img: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200",
  },
  {
    id: 3,
    title: "Modernist Form",
    issue: "No. 06",
    img: "https://images.unsplash.com/photo-1537907690979-ee8e01276184?q=80&w=1200",
  },
  {
    id: 4,
    title: "Eternal Summer",
    issue: "No. 07",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200",
  },
  {
    id: 5,
    title: "The Silk Road",
    issue: "No. 08",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
  },
];

export const PRESS = ["Vogue", "Elle", "Harper's Bazaar", "The Cut", "Wallpaper*"];

export const CATEGORIES = [
  {
    label: "New Arrivals",
    span: true,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
  },
  {
    label: "Dresses",
    span: false,
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
  },
  {
    label: "Outerwear",
    span: false,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200",
  },
  {
    label: "Essentials",
    span: false,
    img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1200",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The Merino wrap I ordered fits like it was made for me. I've had strangers stop me on the street to ask where it's from. Worth every penny.",
    author: "Amina W.",
    location: "Nairobi",
  },
  {
    quote:
      "MAEVEN pieces don't feel like fast fashion. They feel like heirlooms. I've been wearing my linen trousers for three seasons and they only get better.",
    author: "Clara M.",
    location: "Mombasa",
  },
  {
    quote:
      "Finally a brand that understands quiet elegance. Every piece I own from MAEVEN has become a wardrobe staple. The quality is unmatched.",
    author: "Sofia R.",
    location: "Kisumu",
  },
];

export const FOOTER_COLS = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Dresses", "Outerwear", "Essentials", "Sale"],
  },
  {
    title: "Help",
    links: ["Size Guide", "Shipping & Returns", "Care Instructions", "FAQ", "Contact Us"],
  },
  {
    title: "Brand",
    links: ["Our Story", "Sustainability", "Artisan Partners", "Press", "Careers"],
  },
  {
    title: "Follow",
    links: ["Instagram", "Pinterest", "TikTok", "Newsletter"],
  },
];

/** Hero headline words — each rendered as an animated span */
export const HERO_WORDS = ["Dressed", "for", "Every", "Quiet", "Revolution."];

/** Size guide tables */
export const SIZE_IN = [
  ["XS", '32"', '25"', '34"'],
  ["S",  '34"', '27"', '36"'],
  ["M",  '36"', '29"', '38"'],
  ["L",  '38"', '31"', '40"'],
  ["XL", '40"', '33"', '42"'],
];

export const SIZE_CM = [
  ["XS", "81cm",  "64cm", "86cm"],
  ["S",  "86cm",  "69cm", "91cm"],
  ["M",  "91cm",  "74cm", "96cm"],
  ["L",  "96cm",  "79cm", "102cm"],
  ["XL", "102cm", "84cm", "107cm"],
];

/**
 * IMPACT_METRICS
 * Used by ImpactCalculator.jsx.
 * Per MAEVEN piece purchased (vs. equivalent fast-fashion purchases).
 */
export const IMPACT_METRICS = {
  waterPerPiece: 2700,    // litres saved vs. 7 fast-fashion equivalents
  co2PerPiece:   8.5,     // kg CO₂ avoided
  lifespanYears: 7,       // average additional garment lifespan
};

/** WhatsApp contact — single source of truth */
export const WA_NUMBER  = "254799644100";
export const WA_MESSAGE = "Hello MAEVEN Support, I'd like to inquire about...";
