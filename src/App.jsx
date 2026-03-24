import { useState, useEffect, useRef } from "react";

const properties = [
  {
    id: 1,
    title: "Skyline Penthouse",
    location: "Manhattan, New York",
    price: "$4,850,000",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    tag: "Featured",
    youtubeId: "pSUydWEqKwE",
    photos: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    desc: "Panoramic city views, private terrace, bespoke finishes. The apex of urban living.",
  },
  {
    id: 2,
    title: "Coastal Villa Azure",
    location: "Malibu, California",
    price: "$7,200,000",
    beds: 5,
    baths: 5,
    sqft: "5,800",
    tag: "New",
    youtubeId: "ZOZocxTpEXg",
    photos: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    desc: "Where the Pacific meets architectural perfection. Infinity pool, private beach access.",
  },
  {
    id: 3,
    title: "The Glass Residence",
    location: "Miami Beach, Florida",
    price: "$3,100,000",
    beds: 3,
    baths: 3,
    sqft: "2,600",
    tag: "Hot",
    youtubeId: "DXkpSEMkKIQ",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    ],
    desc: "Floor-to-ceiling glass, smart home integration, and a seamless indoor-outdoor flow.",
  },
  {
    id: 4,
    title: "Alpine Estate Noir",
    location: "Aspen, Colorado",
    price: "$9,500,000",
    beds: 6,
    baths: 7,
    sqft: "8,400",
    tag: "Exclusive",
    youtubeId: "pSUydWEqKwE",
    photos: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
    ],
    desc: "Commanding mountain peak. Private ski run, spa, wine cellar, and helipad.",
  },
];

const tagColors = {
  Featured: { bg: "rgba(212,175,55,0.18)", border: "#d4af37", text: "#d4af37" },
  New: { bg: "rgba(0,210,170,0.15)", border: "#00d2aa", text: "#00d2aa" },
  Hot: { bg: "rgba(255,80,80,0.15)", border: "#ff5050", text: "#ff5050" },
  Exclusive: { bg: "rgba(160,100,255,0.15)", border: "#a064ff", text: "#a064ff" },
};

function PropertyCard({ prop }) {
  const [mode, setMode] = useState("video");
  const [photoIdx, setPhotoIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const tag = tagColors[prop.tag];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(160deg, rgba(18,18,28,0.97) 0%, rgba(10,10,20,0.99) 100%)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.08)"
          : "0 8px 40px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Media Area */}
      <div style={{ position: "relative", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>
        {mode === "video" ? (
          <iframe
            src={`https://www.youtube.com/embed/${prop.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
            title={prop.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={prop.photos[photoIdx]}
              alt={prop.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s" }}
            />
            {/* Photo nav */}
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {prop.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  style={{
                    width: i === photoIdx ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === photoIdx ? "#d4af37" : "rgba(255,255,255,0.45)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setPhotoIdx((p) => (p - 1 + prop.photos.length) % prop.photos.length)}
              style={arrowBtn("left")}
            >‹</button>
            <button
              onClick={() => setPhotoIdx((p) => (p + 1) % prop.photos.length)}
              style={arrowBtn("right")}
            >›</button>
          </div>
        )}

        {/* Tag */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          background: tag.bg, border: `1px solid ${tag.border}`,
          color: tag.text, borderRadius: 20, padding: "3px 12px",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
          fontFamily: "'Syne', sans-serif", textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}>{prop.tag}</div>

        {/* Toggle */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          display: "flex", background: "rgba(0,0,0,0.6)",
          borderRadius: 30, padding: 4, gap: 2,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          {["video", "photos"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                background: mode === m ? "#d4af37" : "transparent",
                color: mode === m ? "#000" : "rgba(255,255,255,0.65)",
                border: "none", borderRadius: 20, padding: "4px 12px",
                cursor: "pointer", fontSize: 11, fontWeight: 700,
                fontFamily: "'Syne', sans-serif", textTransform: "uppercase",
                letterSpacing: "0.05em", transition: "all 0.25s",
              }}
            >{m === "video" ? "▶ Video" : "⊞ Photos"}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 24px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h3 style={{
            margin: 0, fontSize: 20, fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, color: "#f0ece0", letterSpacing: "0.02em", lineHeight: 1.2,
          }}>{prop.title}</h3>
          <span style={{
            fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 800,
            color: "#d4af37", whiteSpace: "nowrap", marginLeft: 12,
          }}>{prop.price}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>◎</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'Syne', sans-serif", letterSpacing: "0.05em" }}>{prop.location}</span>
        </div>

        <p style={{ margin: "0 0 18px", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          {prop.desc}
        </p>

        <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 18 }}>
          {[["🛏", prop.beds, "Beds"], ["🛁", prop.baths, "Baths"], ["⬜", prop.sqft, "sqft"]].map(([icon, val, label]) => (
            <div key={label} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#f0ece0", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%", padding: "12px 0",
          background: "linear-gradient(90deg, #b8922a 0%, #d4af37 50%, #b8922a 100%)",
          backgroundSize: "200%",
          border: "none", borderRadius: 10, cursor: "pointer",
          color: "#0a0a14", fontSize: 12, fontWeight: 800,
          fontFamily: "'Syne', sans-serif", letterSpacing: "0.15em",
          textTransform: "uppercase", transition: "all 0.3s",
        }}
          onMouseEnter={e => e.target.style.backgroundPosition = "right center"}
          onMouseLeave={e => e.target.style.backgroundPosition = "left center"}
        >
          Schedule Viewing
        </button>
      </div>
    </div>
  );
}

function arrowBtn(side) {
  return {
    position: "absolute", top: "50%", [side]: 10,
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)",
    color: "#fff", width: 32, height: 32, borderRadius: "50%",
    cursor: "pointer", fontSize: 20, display: "flex",
    alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(6px)", lineHeight: 1,
    padding: 0, transition: "all 0.2s",
  };
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const filters = ["All", "Penthouse", "Villa", "Estate", "Condo"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05050f; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #05050f; }
        ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 3px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes gridPan { 0%{background-position:0 0} 100%{background-position:60px 60px} }
        .hero-title { animation: fadeUp 1s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-sub { animation: fadeUp 1s 0.2s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-cta { animation: fadeUp 1s 0.4s cubic-bezier(0.23,1,0.32,1) both; }
        .stat-card { animation: fadeUp 0.8s both; }
        .stat-card:nth-child(2) { animation-delay: 0.1s; }
        .stat-card:nth-child(3) { animation-delay: 0.2s; }
        .stat-card:nth-child(4) { animation-delay: 0.3s; }
      `}</style>

      <div style={{ background: "#05050f", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#f0ece0", overflowX: "hidden" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: 70,
          background: "rgba(5,5,15,0.82)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: "linear-gradient(135deg, #d4af37, #8b6914)",
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>⬡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "0.08em" }}>
              LUMINA <span style={{ color: "#d4af37" }}>ESTATES</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 32 }}>
            {["Properties", "AI Match", "Market", "Contact"].map(l => (
              <a key={l} href="#" style={{
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "color 0.2s",
                onMouseEnter: e => e.target.style.color = "#d4af37",
              }}
                onMouseEnter={e => e.target.style.color = "#d4af37"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
              >{l}</a>
            ))}
          </div>

          <button style={{
            background: "linear-gradient(90deg, #d4af37, #8b6914)",
            border: "none", borderRadius: 8, padding: "8px 20px",
            color: "#0a0a14", fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}>AI Advisor</button>
        </nav>

        {/* HERO */}
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden", paddingTop: 70,
        }}>
          {/* Animated grid bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridPan 20s linear infinite",
          }} />

          {/* Glow orbs */}
          <div style={{
            position: "absolute", top: "15%", left: "10%",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            borderRadius: "50%", animation: "float 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: "5%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(100,60,180,0.1) 0%, transparent 70%)",
            borderRadius: "50%", animation: "float 11s ease-in-out infinite reverse",
          }} />

          <div style={{ position: "relative", textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
            <div className="hero-title" style={{ marginBottom: 8 }}>
              <span style={{
                display: "inline-block",
                background: "linear-gradient(90deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 20, padding: "4px 16px",
                fontSize: 11, fontFamily: "'Syne', sans-serif", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af37",
                marginBottom: 24, display: "inline-block",
              }}>
                ✦ AI-Powered Real Estate Intelligence
              </span>
            </div>

            <h1 className="hero-title" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: 24,
            }}>
              Find Your<br />
              <span style={{
                background: "linear-gradient(90deg, #c9a227, #f0d060, #c9a227, #f0d060)",
                backgroundSize: "300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
                fontWeight: 700,
              }}>Perfect Home</span>
              <br />
              <span style={{ opacity: 0.7 }}>with Intelligence</span>
            </h1>

            <p className="hero-sub" style={{
              fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 520,
              margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300,
            }}>
              Curated luxury properties matched to your lifestyle through advanced AI analysis. Experience real estate reimagined.
            </p>

            <div className="hero-cta" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                background: "linear-gradient(90deg, #c9a227, #d4af37)",
                border: "none", borderRadius: 12, padding: "14px 32px",
                color: "#0a0a14", fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", boxShadow: "0 8px 32px rgba(212,175,55,0.3)",
              }}>
                Explore Properties
              </button>
              <button style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                padding: "14px 32px",
                color: "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer",
              }}>
                ▶ Watch Tour
              </button>
            </div>

            {/* Scroll indicator */}
            <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.5))", position: "relative" }}>
                <div style={{
                  position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 50%)",
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#d4af37",
                }} />
              </div>
              <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase" }}>Scroll</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
          }}>
            {[
              { val: 1240, suf: "+", label: "Properties Sold", icon: "🏛" },
              { val: 98, suf: "%", label: "Client Satisfaction", icon: "★" },
              { val: 2800000000, suf: "+", label: "Total Value Managed", icon: "$", prefix: "$" },
              { val: 12, suf: " yrs", label: "Market Experience", icon: "◎" },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: 16, padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 36, fontWeight: 700, color: "#d4af37",
                }}>
                  {s.prefix || ""}<AnimatedCounter target={s.val} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Syne', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEARCH BAR */}
        <section style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 40px" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: 20, padding: "28px 32px",
            display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap",
          }}>
            {[
              { label: "Location", placeholder: "City, State, Zip..." },
              { label: "Type", placeholder: "Property type..." },
              { label: "Budget", placeholder: "Max price..." },
            ].map(f => (
              <div key={f.label} style={{ flex: 1, minWidth: 160 }}>
                <label style={{ display: "block", fontSize: 10, color: "#d4af37", fontFamily: "'Syne', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                <input placeholder={f.placeholder} style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, padding: "10px 14px", color: "#f0ece0",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none",
                }} />
              </div>
            ))}
            <button style={{
              background: "linear-gradient(90deg, #c9a227, #d4af37)",
              border: "none", borderRadius: 10, padding: "11px 28px",
              color: "#0a0a14", fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Search ↗
            </button>
          </div>
        </section>

        {/* PROPERTIES */}
        <section style={{ maxWidth: 1300, margin: "0 auto", padding: "0 40px 100px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: "#d4af37", fontFamily: "'Syne', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>✦ Curated Collection</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.1 }}>
                Featured <span style={{ fontWeight: 700, fontStyle: "italic", color: "#d4af37" }}>Estates</span>
              </h2>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  background: activeFilter === f ? "#d4af37" : "transparent",
                  color: activeFilter === f ? "#0a0a14" : "rgba(255,255,255,0.45)",
                  border: `1px solid ${activeFilter === f ? "#d4af37" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 20, padding: "6px 16px",
                  fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.25s",
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
            gap: 28,
          }}>
            {properties.map(p => <PropertyCard key={p.id} prop={p} />)}
          </div>
        </section>

        {/* AI SECTION */}
        <section style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(100,60,180,0.06) 100%)",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          padding: "80px 40px", textAlign: "center",
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24,
              background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 30, padding: "8px 20px",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4af37", boxShadow: "0 0 12px #d4af37", animation: "pulse-ring 1.5s infinite" }} />
              <span style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4af37" }}>AI Matching Active</span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300,
              lineHeight: 1.15, marginBottom: 20,
            }}>
              Let AI Find Your<br />
              <span style={{ fontWeight: 700, color: "#d4af37" }}>Dream Property</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              Our proprietary AI analyzes over 200 data points—from neighborhood trends to architectural style—to surface properties that match your precise vision.
            </p>
            <button style={{
              background: "linear-gradient(90deg, #c9a227, #d4af37)",
              border: "none", borderRadius: 12, padding: "16px 40px",
              color: "#0a0a14", fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer", boxShadow: "0 8px 40px rgba(212,175,55,0.25)",
            }}>
              Start AI Match →
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, background: "linear-gradient(135deg, #d4af37, #8b6914)",
              borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>⬡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "0.08em" }}>
              LUMINA <span style={{ color: "#d4af37" }}>ESTATES</span>
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "'Syne', sans-serif", letterSpacing: "0.05em" }}>
            © 2025 Lumina Estates. AI-Powered Luxury Real Estate.
          </p>
        </footer>
      </div>
    </>
  );
}
