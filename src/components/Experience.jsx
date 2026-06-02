import { useState, useEffect, useRef } from "react";
import { ORANGE, BG2, BG3, WHITE, BORDER, EXPERIENCE } from "../constants";

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

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" ref={ref} style={{ padding: "7rem 5%", background: BG2 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— Experience</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1 }}>The <span style={{ color: ORANGE }}>Journey</span></h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, transparent, ${ORANGE}40 8%, ${ORANGE}40 92%, transparent)` }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "2rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-20px)", transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ flexShrink: 0, paddingTop: "1.65rem" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: ORANGE, boxShadow: `0 0 10px rgba(255,107,0,0.6)`, marginLeft: 14 }} />
                </div>
                <div style={{ flex: 1, background: BG3, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1.4rem 1.6rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.98rem", color: WHITE }}>{item.role}</div>
                      <div style={{ fontSize: "0.82rem", color: ORANGE, fontWeight: 600, marginTop: 2 }}>{item.org}</div>
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>{item.period}</span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.75, margin: 0 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
