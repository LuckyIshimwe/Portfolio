import { useState, useEffect, useRef } from "react";
import { ORANGE, ORANGE_LIGHT, BG, WHITE, BORDER, STATS } from "../constants";
import luckyPhoto from "../assets/lucky.png";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Developer.", "Leader.", "Innovator.", "Change-Maker."];
  const wR = useRef(0), cR = useRef(0), dR = useRef(false);

  useEffect(() => {
    let t;
    const tick = () => {
      const w = words[wR.current];
      if (!dR.current) {
        cR.current++; setTyped(w.slice(0, cR.current));
        if (cR.current === w.length) {
          t = setTimeout(() => { dR.current = true; tick(); }, 1600);
          return;
        }
      } else {
        cR.current--; setTyped(w.slice(0, cR.current));
        if (cR.current === 0) {
          dR.current = false;
          wR.current = (wR.current + 1) % words.length;
        }
      }
      t = setTimeout(tick, dR.current ? 55 : 95);
    };
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 5%", background: BG, position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "80px 80px", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)", pointerEvents: "none" }} />
      {/* Bottom border line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.35), transparent)" }} />

      {/* Main content — two columns */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "4rem" }}>

        {/* LEFT — Text */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 1.02, margin: 0, letterSpacing: "-0.03em", color: WHITE }}>
            Lucky<br /><span style={{ color: ORANGE }}>Ishimwe</span>
          </h1>

          {/* Typewriter */}
          <div style={{ height: 52, display: "flex", alignItems: "center", marginTop: "0.75rem" }}>
            <span style={{ fontWeight: 600, fontSize: "clamp(1.1rem,2.5vw,1.7rem)", color: "rgba(255,255,255,0.7)" }}>
              {typed}
              <span style={{ borderRight: `2px solid ${ORANGE}`, marginLeft: 1, animation: "blink 1s step-end infinite" }}>&thinsp;</span>
            </span>
          </div>

          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginTop: "1.5rem", maxWidth: 500 }}>
            Student developer & community builder from{" "}
            <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Kigali, Rwanda</span>{" "}
            — using technology, education, and leadership to create real-world impact.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: "2.5rem", flexWrap: "wrap" }}>
            <a href="#projects"
              style={{ background: ORANGE, color: "#fff", padding: "0.85rem 2rem", borderRadius: 10, fontWeight: 600, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 8px 32px rgba(255,107,0,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,0,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,0,0.3)"; }}
            >View My Work →</a>
            <a href="#contact"
              style={{ background: "transparent", color: WHITE, padding: "0.85rem 2rem", borderRadius: 10, fontWeight: 600, fontSize: "0.88rem", border: `1px solid ${BORDER}`, transition: "border-color 0.2s, color 0.2s", display: "inline-flex", alignItems: "center" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,0,0.45)"; e.currentTarget.style.color = ORANGE; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = WHITE; }}
            >Let's Connect</a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", paddingTop: "3rem", borderTop: `1px solid ${BORDER}`, flexWrap: "wrap" }}>
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontWeight: 800, fontSize: "2rem", color: ORANGE, lineHeight: 1, letterSpacing: "-0.02em" }}>{num}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div style={{ flexShrink: 0, position: "relative" }}>
          {/* Outer glow ring */}
          <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: `conic-gradient(${ORANGE}, transparent, ${ORANGE}, transparent, ${ORANGE})`, animation: "spin 8s linear infinite", zIndex: 0 }} />
          {/* White gap ring */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: BG, zIndex: 1 }} />
          {/* Photo */}
          <div style={{ position: "relative", zIndex: 2, width: 340, height: 340, borderRadius: "50%", overflow: "hidden", border: `3px solid rgba(255,107,0,0.25)` }}>
            <img src={luckyPhoto} alt="Lucky Ishimwe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </div>
         
        </div>

      </div>
    </section>
  );
}