import { useState, useEffect, useRef, useMemo } from "react";
import {
  ShoppingBag, Heart, Menu, X, ArrowRight,
  ChevronLeft, ChevronRight, ArrowUp,
  MessageCircle, Instagram, Twitter, Facebook
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: "The Aligned Coat", category: "Outerwear",
    material: "100% Virgin Wool", price: 11500,
    tags: ["New","Outerwear"],
    img:    "https://images.unsplash.com/photo-1539109132304-3915502d8e7a?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800",
  },
  {
    id: 2, name: "Ethereal Slip Dress", category: "Dresses",
    material: "Pure Silk Charmeuse", price: 5800,
    tags: ["Dresses","New"],
    img:    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
  },
  {
    id: 3, name: "Metric Trousers", category: "Essentials",
    material: "Italian Crepe", price: 4200,
    tags: ["Tops","Essentials"],
    img:    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800",
  },
  {
    id: 4, name: "Sculpted Blazer", category: "Outerwear",
    material: "Linen Blend", price: 7500,
    tags: ["New","Outerwear"],
    img:    "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800",
  },
  {
    id: 5, name: "Oversized Cashmere", category: "Tops",
    material: "Grade A Cashmere", price: 5100,
    tags: ["Tops"],
    img:    "https://images.unsplash.com/photo-1576188973526-0e5d74221d07?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800",
  },
  {
    id: 6, name: "The Column Skirt", category: "Dresses",
    material: "Organic Cotton Poplin", price: 3800,
    tags: ["Dresses"],
    img:    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800",
    altImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
  },
];

const LOOKBOOK = [
  { id:1, title:"L'Échappée Belle", issue:"No. 04", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200" },
  { id:2, title:"Quiet Revolution",  issue:"No. 05", img:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200" },
  { id:3, title:"Modernist Form",    issue:"No. 06", img:"https://images.unsplash.com/photo-1537907690979-ee8e01276184?q=80&w=1200" },
  { id:4, title:"Eternal Summer",    issue:"No. 07", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200" },
  { id:5, title:"The Silk Road",     issue:"No. 08", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200" },
];

const PRESS = ["Vogue", "Elle", "Harper's Bazaar", "The Cut", "Wallpaper*"];

const CATEGORIES = [
  { label:"New Arrivals", span:true,  img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200" },
  { label:"Dresses",      span:false, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200" },
  { label:"Outerwear",    span:false, img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200" },
  { label:"Essentials",   span:false, img:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1200" },
];

const TESTIMONIALS = [
  { q:"The Merino wrap I ordered fits like it was made for me. I've had strangers stop me on the street to ask where it's from. Worth every penny.", a:"Amina W. · Nairobi" },
  { q:"MAEVEN pieces don't feel like fast fashion. They feel like heirlooms. I've been wearing my linen trousers for three seasons and they only get better.", a:"Clara M. · Mombasa" },
  { q:"Finally a brand that understands quiet elegance. Every piece I own from MAEVEN has become a wardrobe staple. The quality is unmatched.", a:"Sofia R. · Kisumu" },
];

const FOOTER_COLS = [
  { title:"Shop",   links:["New Arrivals","Best Sellers","Dresses","Outerwear","Essentials","Sale"] },
  { title:"Help",   links:["Size Guide","Shipping & Returns","Care Instructions","FAQ","Contact Us"] },
  { title:"Brand",  links:["Our Story","Sustainability","Artisan Partners","Press","Careers"] },
  { title:"Follow", links:["Instagram","Pinterest","TikTok","Newsletter"] },
];

const HERO_WORDS = ["Dressed","for","Every","Quiet","Revolution."];

const SIZE_IN = [["XS","32\"","25\"","34\""],["S","34\"","27\"","36\""],["M","36\"","29\"","38\""],["L","38\"","31\"","40\""],["XL","40\"","33\"","42\""]];
const SIZE_CM = [["XS","81cm","64cm","86cm"],["S","86cm","69cm","91cm"],["M","91cm","74cm","96cm"],["L","96cm","79cm","102cm"],["XL","102cm","84cm","107cm"]];

const fmt = v => `Kshs ${v.toLocaleString()}`;

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [cartOpen,    setCartOpen]    = useState(false);
  const [sizeOpen,    setSizeOpen]    = useState(false);
  const [unit,        setUnit]        = useState("IN");
  const [wishlist,    setWishlist]    = useState([]);
  const [cart,        setCart]        = useState([]);
  const [filter,      setFilter]      = useState("All");
  const [emailDone,   setEmailDone]   = useState(false);

  /* Cursor */
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x:0, y:0 });
  const ring    = useRef({ x:0, y:0 });
  const raf     = useRef(null);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Scroll progress */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 80);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Cursor animation */
  useEffect(() => {
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", onMove);
    const animate = () => {
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${mouse.current.x - 5}px,${mouse.current.y - 5}px)`;
      if (ringRef.current) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);

  /* Cart helpers */
  const addToCart = p => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty+1 } : i) : [...prev, { ...p, qty:1 }];
    });
    setCartOpen(true);
  };
  const updateQty = (id, d) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty+d) } : i).filter(i => i.qty > 0));
  const toggleWish = id =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const totalQty = cart.reduce((a,b) => a + b.qty, 0);
  const totalAmt = cart.reduce((a,b) => a + b.price * b.qty, 0);
  const filtered = useMemo(() =>
    filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.tags.includes(filter)),
    [filter]
  );
  const sizeData = unit === "IN" ? SIZE_IN : SIZE_CM;
  const circum   = 2 * Math.PI * 20;

  /* ── RENDER ─────────────────────────────────────────────────────── */
  return (
    <div style={{ fontFamily:"var(--sans)", background:"var(--chalk)", color:"var(--charcoal)", overflowX:"hidden" }}>

      {/* CURSOR */}
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />

      {/* ── TOP MARQUEE ── */}
      <div style={{ background:"var(--charcoal)", color:"var(--chalk)", overflow:"hidden", height:28, display:"flex", alignItems:"center", position:"fixed", top:0, left:0, right:0, zIndex:110 }}>
        <div className="mq" style={{ fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase" }}>
          {(" New Arrivals · Free Shipping Over Kshs 15,000 · Sustainably Made · Conscious Craft · ").repeat(6)}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:28, left:0, right:0, zIndex:100,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding: scrolled ? "14px 48px" : "22px 48px",
        background: scrolled ? "rgba(250,248,245,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(28,28,28,0.08)" : "none",
        transition:"all 0.4s ease",
      }}>
        {/* Left links */}
        <div className="nav-links-desktop" style={{ display:"flex", gap:36 }}>
          {["Shop","Brand","Lookbook","Journal"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
               style={{ fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase", textDecoration:"none", color:"var(--charcoal)", transition:"opacity 0.2s" }}
               onMouseEnter={e => e.currentTarget.style.opacity="0.45"}
               onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              {l}
            </a>
          ))}
        </div>

        {/* Centre logo */}
        <a href="#" style={{ fontFamily:"var(--serif)", fontSize:"1.7rem", letterSpacing:"0.25em", textTransform:"uppercase", textDecoration:"none", color:"var(--charcoal)", position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
          MAEVEN
        </a>

        {/* Right icons */}
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <button className="nav-size-guide" onClick={() => setSizeOpen(true)}
            style={{ background:"none", border:"none", cursor:"none", fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"var(--sans)", color:"var(--charcoal)" }}>
            Size Guide
          </button>
          <button onClick={() => setCartOpen(true)} style={{ background:"none", border:"none", cursor:"none", position:"relative", color:"var(--charcoal)" }}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalQty > 0 && (
              <span style={{ position:"absolute", top:-6, right:-6, background:"var(--rose)", color:"white", fontSize:"0.55rem", width:16, height:16, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {totalQty}
              </span>
            )}
          </button>
          <button className="hamburger-btn" onClick={() => setMobileOpen(true)}
            style={{ background:"none", border:"none", cursor:"none", display:"none", flexDirection:"column", gap:5 }}>
            <span style={{ display:"block", width:24, height:1, background:"var(--charcoal)" }} />
            <span style={{ display:"block", width:24, height:1, background:"var(--charcoal)" }} />
            <span style={{ display:"block", width:24, height:1, background:"var(--charcoal)" }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div style={{
        position:"fixed", inset:0, background:"var(--chalk)", zIndex:200,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}>
        <button onClick={() => setMobileOpen(false)}
          style={{ position:"absolute", top:32, right:32, background:"none", border:"none", cursor:"none" }}>
          <X size={28} strokeWidth={1} />
        </button>
        {["Shop","Brand","Lookbook","Journal"].map((l,i) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
             style={{
               fontFamily:"var(--serif)", fontSize:"3.5rem", fontWeight:300,
               textDecoration:"none", color:"var(--charcoal)", marginBottom:12, fontStyle:"italic",
               opacity: mobileOpen ? 1 : 0,
               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
               transition:`all 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${0.1 + i*0.06}s`,
             }}>
            {l}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero-grid" style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", paddingTop:28 }}>
        {/* Left */}
        <div className="hero-left" style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 64px 80px", position:"relative" }}>
          <p style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--bronze)", marginBottom:24, opacity:0, animation:"wordUp 0.8s ease 0.2s forwards" }}>
            Spring Collection 2025 · Nairobi
          </p>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(3rem,5vw,5.5rem)", fontWeight:300, lineHeight:1.08, marginBottom:32 }}>
            {HERO_WORDS.map((w,i) => (
              <span key={i} className="hero-word" style={{ animationDelay:`${0.35 + i*0.11}s` }}>
                {w === "Quiet"
                  ? <em style={{ fontStyle:"italic", color:"var(--bronze)" }}>{w}</em>
                  : w}
                {i < HERO_WORDS.length-1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
          <p style={{ fontSize:"0.85rem", lineHeight:1.9, color:"#666", maxWidth:360, marginBottom:48, opacity:0, animation:"wordUp 0.8s ease 1.0s forwards" }}>
            Each piece is designed to move with you — crafted from responsibly sourced fabrics, built to last a lifetime.
          </p>
          <a href="#shop"
             style={{ display:"inline-block", padding:"16px 40px", background:"var(--charcoal)", color:"var(--chalk)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", border:"1px solid var(--charcoal)", transition:"background 0.3s, color 0.3s", opacity:0, animation:"wordUp 0.8s ease 1.2s forwards", width:"fit-content" }}
             onMouseEnter={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--charcoal)"; }}
             onMouseLeave={e => { e.currentTarget.style.background="var(--charcoal)"; e.currentTarget.style.color="var(--chalk)"; }}>
            Shop the Collection
          </a>
          {/* Scroll indicator */}
          <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0, animation:"wordUp 1s ease 1.8s forwards" }}>
            <div className="scroll-line" style={{ width:1, height:44, background:"linear-gradient(to bottom,#999,transparent)" }} />
            <span style={{ fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#999" }}>Scroll</span>
          </div>
        </div>
        {/* Right — photo */}
        <div className="hero-right" style={{ position:"relative", overflow:"hidden" }}>
          <div className="kb" style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1537907690979-ee8e01276184?q=80&w=2000')", backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"rgba(28,28,28,0.08)" }} />
          <div style={{ position:"absolute", bottom:40, left:40, color:"white", fontFamily:"var(--serif)", fontSize:"0.75rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>
            SS25 — The Quiet Collection
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section id="shop" className="section-pad" style={{ padding:"100px 48px" }}>
        <p className="rv"    style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--bronze)", marginBottom:12 }}>Discover</p>
        <h2 className="rv d1" style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,3vw,3.2rem)", fontWeight:300, marginBottom:60, lineHeight:1.2 }}>Shop by Category</h2>
        <div className="rv d2 cat-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gridTemplateRows:"280px 280px", gap:12 }}>
          {CATEGORIES.map((c,i) => (
            <CatTile key={i} {...c} />
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="section-pad" style={{ padding:"60px 48px 100px" }}>
        <div className="rv" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:300 }}>The Curated Edit</h2>
          <div className="thin-scroll" style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
            {["All","New","Dresses","Tops","Outerwear"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding:"8px 20px", border:`1px solid ${filter===f?"var(--charcoal)":"rgba(28,28,28,0.2)"}`, background:filter===f?"var(--charcoal)":"transparent", color:filter===f?"var(--chalk)":"var(--charcoal)", fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"none", fontFamily:"var(--sans)", transition:"all 0.2s", whiteSpace:"nowrap" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"40px 32px" }}>
          {filtered.map((p,i) => (
            <ProductCard key={p.id} product={p} delay={i % 3} wishlisted={wishlist.includes(p.id)} onWish={() => toggleWish(p.id)} onAdd={() => addToCart(p)} />
          ))}
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section id="brand" className="section-pad brand-grid" style={{ background:"var(--charcoal)", color:"var(--chalk)", padding:"120px 48px", position:"relative", overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"var(--serif)", fontSize:"18vw", fontWeight:300, color:"rgba(255,255,255,0.025)", whiteSpace:"nowrap", pointerEvents:"none", letterSpacing:"-0.04em", userSelect:"none" }}>
          MAEVEN
        </div>
        <div className="rv" style={{ position:"relative", zIndex:1 }}>
          <p style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--rose)", marginBottom:20 }}>Our Philosophy</p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(2.5rem,4vw,4rem)", fontWeight:300, lineHeight:1.15, marginBottom:32 }}>
            Slow fashion.<br /><em style={{ fontStyle:"italic", color:"var(--rose)" }}>Timeless</em> beauty.
          </h2>
          <p style={{ fontSize:"0.85rem", lineHeight:2, color:"rgba(250,248,245,0.7)", marginBottom:40 }}>
            MAEVEN was born from a quiet conviction: that clothing should be made thoughtfully, worn endlessly, and never discarded lightly. We partner with artisan ateliers who share our commitment to craftsmanship, fair labour, and environmental stewardship.
          </p>
          <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
            {[["12+","Years of craft"],["4,800+","Clients served"],["98%","Satisfaction"]].map(([n,l]) => (
              <div key={l}>
                <span style={{ fontFamily:"var(--serif)", fontSize:"2.5rem", fontWeight:300, color:"var(--rose)", display:"block" }}>{n}</span>
                <span style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(250,248,245,0.4)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rv d2" style={{ position:"relative", zIndex:1 }}>
          <div style={{ aspectRatio:"3/4", backgroundImage:"url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200')", backgroundSize:"cover", backgroundPosition:"center", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(28,28,28,0.65) 0%, transparent 50%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:32 }}>
              <p style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:"1.1rem", color:"rgba(255,255,255,0.85)", lineHeight:1.6 }}>
                "Crafted for the woman who moves through the world on her own terms."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section id="lookbook" className="lookbook-pad" style={{ padding:"100px 0 100px 48px", overflow:"hidden" }}>
        <div style={{ paddingRight:48, marginBottom:48, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <p className="rv"    style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--bronze)", marginBottom:12 }}>Visual Stories</p>
            <h2 className="rv d1" style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:300 }}>The Spring Lookbook</h2>
          </div>
          <div style={{ display:"flex", gap:8, paddingRight:48 }}>
            {[ChevronLeft, ChevronRight].map((Icon,i) => (
              <LookbookArrow key={i} icon={Icon} direction={i===0 ? -1 : 1} />
            ))}
          </div>
        </div>
        <div id="lbtrack" className="thin-scroll" style={{ display:"flex", gap:16, overflowX:"auto", scrollSnapType:"x mandatory", paddingBottom:20, paddingRight:48, cursor:"grab" }}>
          {LOOKBOOK.map(lb => (
            <LookbookSlide key={lb.id} {...lb} />
          ))}
        </div>
      </section>

      {/* ── PRESS & TESTIMONIALS ── */}
      <section id="journal" className="section-pad" style={{ padding:"80px 48px", borderTop:"1px solid #e8e4de" }}>
        <div className="rv" style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,4vw,64px)", flexWrap:"wrap", marginBottom:80, alignItems:"center" }}>
          {PRESS.map(n => (
            <span key={n} style={{ fontFamily:"var(--serif)", fontSize:"1.3rem", fontStyle:"italic", color:"#ccc", transition:"color 0.3s", cursor:"default" }}
              onMouseEnter={e => e.currentTarget.style.color="var(--charcoal)"}
              onMouseLeave={e => e.currentTarget.style.color="#ccc"}>
              {n}
            </span>
          ))}
        </div>
        <p className="rv"    style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--bronze)", marginBottom:12 }}>What They Say</p>
        <h2 className="rv d1" style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:300, marginBottom:60 }}>Loved by Our Community</h2>
        <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:40 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} className={`rv d${i+1}`} style={{ padding:40, background:"white", border:"1px solid #f0ece6" }}>
              <div style={{ color:"var(--bronze)", marginBottom:16, fontSize:"0.78rem", letterSpacing:2 }}>★★★★★</div>
              <p style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:"1.05rem", lineHeight:1.75, marginBottom:20 }}>"{t.q}"</p>
              <div style={{ fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>{t.a}</div>
              <div style={{ fontSize:"0.6rem", color:"var(--bronze)", marginTop:4, letterSpacing:"0.08em" }}>✓ Verified Buyer</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className="section-pad" style={{ background:"var(--rose-light)", padding:"120px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, left:-60, width:300, height:300, background:"radial-gradient(circle,rgba(212,165,165,0.3) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, right:-60, width:400, height:400, background:"radial-gradient(circle,rgba(160,132,92,0.15) 0%,transparent 70%)", pointerEvents:"none" }} />
        <p className="rv"    style={{ fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--bronze)", marginBottom:20, position:"relative", zIndex:1 }}>Members Only</p>
        <h2 className="rv d1" style={{ fontFamily:"var(--serif)", fontSize:"clamp(2.5rem,4vw,4.5rem)", fontWeight:300, marginBottom:16, lineHeight:1.1, position:"relative", zIndex:1 }}>First Access. Always.</h2>
        <p className="rv d2"  style={{ fontSize:"0.85rem", color:"#888", marginBottom:48, position:"relative", zIndex:1 }}>Join our inner circle for early access to new collections, private sales, and editorial content.</p>
        {!emailDone ? (
          <form className="rv d3" onSubmit={e => { e.preventDefault(); setEmailDone(true); }}
            style={{ display:"flex", maxWidth:440, margin:"0 auto", position:"relative", zIndex:1 }}>
            <input type="email" required placeholder="Your email address"
              style={{ flex:1, padding:"16px 24px", border:"1px solid #c8b8b8", background:"white", fontSize:"0.8rem", fontFamily:"var(--sans)", outline:"none", color:"var(--charcoal)" }} />
            <button type="submit"
              style={{ padding:"16px 28px", background:"var(--charcoal)", color:"var(--chalk)", border:"1px solid var(--charcoal)", cursor:"none", fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"var(--sans)", transition:"background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="var(--bronze)"}
              onMouseLeave={e => e.currentTarget.style.background="var(--charcoal)"}>
              Subscribe
            </button>
          </form>
        ) : (
          <p style={{ fontFamily:"var(--serif)", fontSize:"2rem", fontStyle:"italic", color:"var(--bronze)", position:"relative", zIndex:1, animation:"wordUp 0.6s ease forwards" }}>
            Thank you for joining. ✦
          </p>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="section-pad" style={{ background:"var(--charcoal)", color:"var(--chalk)", padding:"80px 48px 40px" }}>
        <div style={{ fontFamily:"var(--serif)", fontSize:"clamp(3rem,8vw,7rem)", letterSpacing:"0.25em", textTransform:"uppercase", textAlign:"center", opacity:0.07, marginBottom:64, userSelect:"none", lineHeight:1 }}>
          MAEVEN
        </div>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:40, marginBottom:60 }}>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <p style={{ fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--rose)", marginBottom:20 }}>{col.title}</p>
              <ul style={{ listStyle:"none" }}>
                {col.links.map(l => (
                  <li key={l} style={{ marginBottom:10 }}>
                    <a href="#" style={{ fontSize:"0.78rem", color:"rgba(250,248,245,0.55)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color="var(--chalk)"}
                      onMouseLeave={e => e.currentTarget.style.color="rgba(250,248,245,0.55)"}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(250,248,245,0.1)", paddingTop:32, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <p style={{ fontSize:"0.68rem", color:"rgba(250,248,245,0.35)" }}>© 2025 MAEVEN LTD. · Nairobi, Kenya · All rights reserved.</p>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:"0.62rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(250,248,245,0.35)" }}>Payments:</span>
            <div style={{ background:"white", padding:"2px 10px", borderRadius:2 }}>
              <svg viewBox="0 0 100 28" style={{ height:16, fill:"#4caf50" }}>
                <text x="2" y="22" fontWeight="bold" fontSize="22" fontFamily="sans-serif">M-PESA</text>
              </svg>
            </div>
          </div>
          <div style={{ display:"flex", gap:20 }}>
            {[Instagram, Twitter, Facebook].map((Icon,i) => (
              <a key={i} href="#" style={{ color:"rgba(250,248,245,0.4)", transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="var(--rose)"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(250,248,245,0.4)"}>
                <Icon size={18} strokeWidth={1} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      <div onClick={() => setCartOpen(false)}
        style={{ position:"fixed", inset:0, background:"rgba(28,28,28,0.45)", backdropFilter:"blur(4px)", zIndex:200, opacity:cartOpen?1:0, pointerEvents:cartOpen?"all":"none", transition:"opacity 0.35s" }} />
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:400, maxWidth:"100vw", background:"var(--chalk)", zIndex:201, display:"flex", flexDirection:"column", padding:40, transform:cartOpen?"translateX(0)":"translateX(100%)", transition:"transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:40, paddingBottom:24, borderBottom:"1px solid #e8e4de" }}>
          <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.6rem", fontWeight:400 }}>Your Bag</h3>
          <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"none" }}><X size={22} strokeWidth={1} /></button>
        </div>
        <div style={{ flex:1, overflowY:"auto" }} className="thin-scroll">
          {cart.length === 0 ? (
            <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:0.4, textAlign:"center" }}>
              <ShoppingBag size={48} strokeWidth={0.6} style={{ marginBottom:12 }} />
              <p style={{ fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>Your bag is empty.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display:"flex", gap:20, marginBottom:28 }}>
              <div style={{ width:80, aspectRatio:"3/4", backgroundImage:`url(${item.img})`, backgroundSize:"cover", backgroundPosition:"center", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"var(--serif)", fontSize:"1rem", marginBottom:4 }}>{item.name}</div>
                <div style={{ fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>{item.material}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <button onClick={() => updateQty(item.id,-1)} style={{ width:28, height:28, border:"1px solid #ccc", background:"transparent", cursor:"none", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                    <span style={{ fontSize:"0.85rem", minWidth:18, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width:28, height:28, border:"1px solid #ccc", background:"transparent", cursor:"none", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                  </div>
                  <span style={{ fontSize:"0.85rem", color:"var(--bronze)", fontWeight:400 }}>{fmt(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ paddingTop:24, borderTop:"1px solid #e8e4de" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>Subtotal</span>
              <span style={{ fontFamily:"var(--serif)", fontSize:"1.2rem" }}>{fmt(totalAmt)}</span>
            </div>
            <p style={{ fontSize:"0.65rem", color:"#aaa", textAlign:"center", marginBottom:20, letterSpacing:"0.08em" }}>Shipping & taxes calculated at checkout.</p>
            <button style={{ width:"100%", padding:"18px", background:"var(--charcoal)", color:"var(--chalk)", border:"none", cursor:"none", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"var(--sans)", transition:"background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="var(--bronze)"}
              onMouseLeave={e => e.currentTarget.style.background="var(--charcoal)"}>
              Checkout via M-PESA
            </button>
          </div>
        )}
      </div>

      {/* ── SIZE GUIDE MODAL ── */}
      <button onClick={() => setSizeOpen(true)}
        style={{ position:"fixed", bottom:96, right:32, background:"var(--chalk)", border:"1px solid var(--charcoal)", padding:"11px 22px", fontSize:"0.62rem", letterSpacing:"0.18em", textTransform:"uppercase", cursor:"none", fontFamily:"var(--sans)", zIndex:90, boxShadow:"0 4px 20px rgba(0,0,0,0.1)", transition:"all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="var(--charcoal)"; e.currentTarget.style.color="var(--chalk)"; }}
        onMouseLeave={e => { e.currentTarget.style.background="var(--chalk)"; e.currentTarget.style.color="var(--charcoal)"; }}>
        Size Guide
      </button>
      <div onClick={() => setSizeOpen(false)}
        style={{ position:"fixed", inset:0, background:"rgba(28,28,28,0.5)", zIndex:300, opacity:sizeOpen?1:0, pointerEvents:sizeOpen?"all":"none", transition:"opacity 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div onClick={e => e.stopPropagation()}
          style={{ background:"var(--chalk)", padding:48, maxWidth:540, width:"90%", maxHeight:"80vh", overflowY:"auto", transform:sizeOpen?"scale(1)":"scale(0.95)", opacity:sizeOpen?1:0, transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
            <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:400 }}>Size Guide</h3>
            <button onClick={() => setSizeOpen(false)} style={{ background:"none", border:"none", cursor:"none" }}><X size={20} strokeWidth={1} /></button>
          </div>
          <div style={{ display:"flex", marginBottom:24 }}>
            {["IN","CM"].map(u => (
              <button key={u} onClick={() => setUnit(u)}
                style={{ padding:"8px 20px", background:unit===u?"var(--charcoal)":"transparent", color:unit===u?"var(--chalk)":"var(--charcoal)", border:"1px solid var(--charcoal)", cursor:"none", fontSize:"0.68rem", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--sans)" }}>
                {u}
              </button>
            ))}
          </div>
          <table className="sz-table">
            <thead><tr>{["Size","Bust","Waist","Hips"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{sizeData.map((row,i) => <tr key={i}>{row.map((cell,j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
        style={{ position:"fixed", bottom:32, left:32, width:50, height:50, zIndex:90, background:"none", border:"none", cursor:"none", padding:0, opacity:scrollPct>8?1:0, transform:scrollPct>8?"translateY(0)":"translateY(20px)", transition:"opacity 0.3s, transform 0.3s" }}>
        <svg viewBox="0 0 50 50" width="50" height="50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#e8e4de" strokeWidth="1.5" />
          <circle cx="25" cy="25" r="20" fill="none" stroke="var(--bronze)" strokeWidth="1.5"
            strokeDasharray={circum} strokeDashoffset={circum - (circum * scrollPct) / 100}
            transform="rotate(-90 25 25)" style={{ transition:"stroke-dashoffset 0.15s" }} />
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", color:"var(--charcoal)" }}>↑</div>
      </button>

      {/* ── WHATSAPP ── */}
      <a href="https://wa.me/254799644100?text=Hello%20MAEVEN%20Support%2C%20I'd%20like%20to%20inquire%20about..."
        target="_blank" rel="noopener noreferrer"
        style={{ position:"fixed", bottom:32, right:32, zIndex:100, background:"#25D366", color:"white", padding:14, borderRadius:"50%", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s", textDecoration:"none" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
        <MessageCircle size={24} fill="white" />
      </a>

    </div>
  );
}

/* ─── SUB-COMPONENTS ────────────────────────────────────────────────── */

function CatTile({ label, span, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={span ? "cat-span" : ""}
      style={{ position:"relative", overflow:"hidden", cursor:"none", gridRow: span ? "span 2" : "span 1" }}
    >
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position:"absolute", inset:0, background: hovered ? "rgba(28,28,28,0.45)" : "rgba(28,28,28,0)", transition:"background 0.4s", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:32 }}>
        <div style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:300, color:"white", lineHeight:1.1 }}>{label}</div>
        <div style={{ color:"white", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:8, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(12px)", transition:"all 0.3s" }}>
          Explore →
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, delay, wishlisted, onWish, onAdd }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`rv d${delay+1}`} style={{ cursor:"none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", marginBottom:16 }}>
        {/* Main image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${product.img})`, backgroundSize:"cover", backgroundPosition:"center", transition:"opacity 0.6s", opacity: hovered ? 0 : 1 }} />
        {/* Alt image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${product.altImg})`, backgroundSize:"cover", backgroundPosition:"center", transition:"opacity 0.6s", opacity: hovered ? 1 : 0 }} />
        {/* Wishlist */}
        <button onClick={onWish}
          style={{ position:"absolute", top:12, right:12, width:36, height:36, borderRadius:"50%", background: wishlisted ? "var(--rose)" : "rgba(250,248,245,0.9)", border:"none", cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", zIndex:2 }}>
          <Heart size={16} fill={wishlisted ? "white" : "none"} stroke={wishlisted ? "white" : "var(--charcoal)"} />
        </button>
        {/* Add to bag */}
        <button onClick={onAdd}
          style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px", background:"rgba(250,248,245,0.96)", border:"none", cursor:"none", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"var(--sans)", transform: hovered ? "translateY(0)" : "translateY(100%)", transition:"transform 0.35s ease", width:"100%", zIndex:2 }}
          onMouseEnter={e => { e.currentTarget.style.background="var(--charcoal)"; e.currentTarget.style.color="var(--chalk)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(250,248,245,0.96)"; e.currentTarget.style.color="var(--charcoal)"; }}>
          Add to Bag
        </button>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
        <span style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", fontWeight:400 }}>{product.name}</span>
        <span style={{ fontSize:"0.85rem", color:"var(--bronze)", fontWeight:400, marginLeft:8 }}>{`Kshs ${product.price.toLocaleString()}`}</span>
      </div>
      <p style={{ fontSize:"0.68rem", letterSpacing:"0.08em", color:"rgba(28,28,28,0.5)", textTransform:"uppercase" }}>{product.material}</p>
    </div>
  );
}

function LookbookSlide({ title, issue, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ flex:"0 0 320px", scrollSnapAlign:"start", position:"relative", overflow:"hidden" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ aspectRatio:"2/3", backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", transition:"transform 0.7s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      <div style={{ marginTop:14 }}>
        <div style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:"1rem" }}>{title}</div>
        <div style={{ fontSize:"0.62rem", letterSpacing:"0.15em", color:"#999", marginTop:4 }}>{issue}</div>
      </div>
    </div>
  );
}

function LookbookArrow({ icon: Icon, direction }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => { const t = document.getElementById("lbtrack"); t && t.scrollBy({ left: direction * 360, behavior:"smooth" }); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width:48, height:48, border:"1px solid rgba(28,28,28,0.2)", background: hovered ? "var(--charcoal)" : "transparent", cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", color: hovered ? "var(--chalk)" : "var(--charcoal)" }}>
      <Icon size={18} strokeWidth={1.5} />
    </button>
  );
}
