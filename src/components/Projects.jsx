import { useState, useEffect, useRef } from "react";
import { ORANGE, ORANGE_LIGHT, ORANGE_DIM, BG, BG3, WHITE, BORDER, PROJECTS } from "../constants";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "7rem 5%", background: BG }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— Work & Initiatives</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1 }}>Work That <span style={{ color: ORANGE }}>Matters</span></h2>
        </div>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title}
              style={{ background: BG3, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "2rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `all 0.65s ease ${i * 0.12}s` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,0,0.3)"; e.currentTarget.style.background = "#181008"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = BG3; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: ORANGE_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{p.icon}</div>
                <span style={{ fontSize: "0.7rem", color: ORANGE, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.tag}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: WHITE, margin: "0 0 0.7rem" }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: "0 0 1.4rem" }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.badges.map((b) => (
                  <span key={b} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.3rem 0.75rem", borderRadius: 6, background: ORANGE_DIM, color: ORANGE_LIGHT, border: `1px solid rgba(255,107,0,0.2)` }}>{b}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}