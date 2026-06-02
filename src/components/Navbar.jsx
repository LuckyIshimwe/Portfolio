import { useState, useEffect } from "react";
import { ORANGE, WHITE, BORDER, NAV_LINKS } from "../constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5%", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "all 0.4s ease",
    }}>
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: ORANGE,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "0.95rem", color: "#fff",
        }}>L</div>
        <span style={{ fontWeight: 700, fontSize: "1.05rem", color: WHITE, letterSpacing: "-0.01em" }}>
          Lucky<span style={{ color: ORANGE }}>.</span>
        </span>
      </a>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500, fontSize: "0.83rem", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = ORANGE)}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.55)")}
          >{l}</a>
        ))}
        <a href="#contact"
          style={{ background: ORANGE, color: "#fff", padding: "0.55rem 1.35rem", borderRadius: 8, fontWeight: 600, fontSize: "0.82rem", transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.82")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >Hire Me</a>
      </div>
    </nav>
  );
}
