import { useState, useEffect } from "react";
import { ORANGE, WHITE, BORDER, NAV_LINKS } from "../constants";

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5%", height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "all 0.4s ease",
    }}>

      {/* Logo */}
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/favicon.png" alt="LI Logo" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }} />
        <span style={{ fontWeight: 700, fontSize: "1.05rem", color: WHITE, letterSpacing: "-0.01em" }}>
          Lucky<span style={{ color: ORANGE }}>.</span>
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center", "@media(max-width:768px)": { display: "none" } }}
        className="desktop-nav">
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

      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}
      >
        <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? ORANGE : WHITE, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? ORANGE : WHITE, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? ORANGE : WHITE, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0,
          background: "rgba(10,10,10,0.98)", backdropFilter: "blur(24px)",
          padding: "1.5rem 5% 2rem", display: "flex", flexDirection: "column",
          gap: "1.5rem", borderBottom: `1px solid ${BORDER}`, zIndex: 199,
        }}>
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "1rem" }}
            >{l}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            style={{ background: ORANGE, color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 8, fontWeight: 600, fontSize: "0.9rem", textAlign: "center" }}
          >Hire Me</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}