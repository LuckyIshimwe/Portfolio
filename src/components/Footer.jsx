import { ORANGE, BG, WHITE, BORDER } from "../constants";

export default function Footer() {
  return (
    <footer style={{ padding: "2rem 5%", borderTop: `1px solid ${BORDER}`, background: BG, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.82rem", color: "#fff" }}>L</div>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: WHITE }}>Lucky<span style={{ color: ORANGE }}>.</span></span>
      </div>
      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>© 2025 Lucky Ishimwe · Kigali, Rwanda</span>
    </footer>
  );
}
