import { useState, useEffect, useRef } from "react";
import { ORANGE, ORANGE_LIGHT, ORANGE_DIM, BG2, BG3, WHITE, BORDER, SKILLS } from "../constants";

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

export default function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "7rem 5%", background: BG2 }}>
      <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— About Me</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "1.5rem" }}>Driven by <span style={{ color: ORANGE }}>Purpose.</span></h2>
          <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "1.25rem" }}>I'm a student at Agahozo-Shalom Youth Village pursuing Mathematics, Physics, and Computer Science. I believe technology is a tool for liberation — and education is the most powerful force for change.</p>
          <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "2rem" }}>From founding a Code Club to co-developing an award-winning water pollution removal robot, everything I do is rooted in one belief: <span style={{ color: WHITE, fontWeight: 600 }}>young Africans can — and will — build the future.</span></p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "2rem" }}>
            {["English", "Kinyarwanda", "French"].map((l) => (
              <span key={l} style={{ fontSize: "0.78rem", fontWeight: 600, padding: "0.4rem 1rem", borderRadius: 8, border: `1px solid rgba(255,107,0,0.3)`, color: ORANGE_LIGHT, background: ORANGE_DIM }}>{l}</span>
            ))}
          </div>
          <div style={{ padding: "1.5rem 1.75rem", background: BG3, borderRadius: 14, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${ORANGE}` }}>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Education</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: WHITE }}>Agahozo-Shalom Youth Village</div>
            <div style={{ fontSize: "0.82rem", color: ORANGE, fontWeight: 500, marginTop: 3 }}>Mathematics · Physics · Computer Science</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Expected Graduation: July 2027 · Rwamagana, Rwanda</div>
          </div>
        </div>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s ease 0.2s" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— Skills</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "2rem" }}>What I <span style={{ color: ORANGE }}>Bring</span></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {SKILLS.map((s, i) => (
              <div key={s.name} style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${0.3 + i * 0.1}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{s.name}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: ORANGE }}>{s.pct}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: inView ? `${s.pct}%` : "0%", background: "linear-gradient(90deg, #FF6B00, #FF8C35)", borderRadius: 4, transition: `width 1.1s cubic-bezier(0.25,1,0.5,1) ${0.35 + i * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}