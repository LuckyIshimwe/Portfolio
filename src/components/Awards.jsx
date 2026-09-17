import { useState, useEffect, useRef } from "react";
import { ORANGE, ORANGE_DIM, BG, BG3, WHITE, BORDER, AWARDS } from "../constants";

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

export default function Awards() {
  const [ref, inView] = useInView();
  return (
    <section id="awards" ref={ref} style={{ padding: "7rem 5%", background: BG }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— Recognition</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1 }}>Honors & <span style={{ color: ORANGE }}>Awards</span></h2>
        </div>
        <div className="awards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {AWARDS.map((a, i) => (
            <div key={a.title} style={{ background: BG3, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.75rem 2rem", display: "flex", gap: "1.25rem", alignItems: "flex-start", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: ORANGE_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.55rem", flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: WHITE, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: "0.82rem", color: ORANGE, fontWeight: 500, marginBottom: 4 }}>
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ color: ORANGE, textDecoration: "none" }}>{a.org} ↗</a>
                  ) : a.org}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>{a.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .awards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}