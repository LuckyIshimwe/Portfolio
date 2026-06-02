import { useState, useEffect, useRef } from "react";
import { ORANGE, BG, BG2, BG3, WHITE, BORDER } from "../constants";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSend = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("fill");
      return;
    }
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_KEY,
          name:       form.name,
          email:      form.email,
          message:    form.message,
          subject:    `New message from ${form.name} — Lucky's Portfolio`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  const IS = {
    fontSize: "0.88rem",
    fontWeight: 400,
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    padding: "0.9rem 1.1rem",
    color: WHITE,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "7rem 5%", background: BG2 }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>— Let's Talk</p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: WHITE, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Get In <span style={{ color: ORANGE }}>Touch</span>
          </h2>
          <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, maxWidth: 460, margin: "0.75rem auto 0" }}>
            Open to collaborations, mentorships, scholarships, and conversations about tech & impact in Africa.
          </p>
        </div>

        <div style={{ background: BG3, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "2.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            {[["name","Name","Your name"],["email","Email","your@email.com"]].map(([key, lbl, ph]) => (
              <div key={key}>
                <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{lbl}</label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={ph}
                  style={IS}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,107,0,0.5)")}
                  onBlur={(e)  => (e.target.style.borderColor = BORDER)}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              rows={5}
              style={{ ...IS, resize: "vertical", minHeight: 120 }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,107,0,0.5)")}
              onBlur={(e)  => (e.target.style.borderColor = BORDER)}
            />
          </div>

          {status === "fill" && (
            <p style={{ fontSize: "0.82rem", color: "#FF5555", marginBottom: "1rem" }}>
              Please fill in all fields before sending.
            </p>
          )}
          {status === "ok" && (
            <p style={{ fontSize: "0.82rem", color: "#4ADE80", marginBottom: "1rem" }}>
              ✓ Message sent! Lucky will get back to you soon.
            </p>
          )}
          {status === "err" && (
            <p style={{ fontSize: "0.82rem", color: "#FF5555", marginBottom: "1rem" }}>
              Something went wrong. Try again or email: lishimwe73@gmail.com
            </p>
          )}

          <button
            onClick={handleSend}
            disabled={status === "sending"}
            style={{
              width: "100%",
              background: status === "sending" ? "rgba(255,107,0,0.45)" : ORANGE,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "1rem",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.05em",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              boxShadow: status === "sending" ? "none" : "0 6px 24px rgba(255,107,0,0.3)",
            }}
            onMouseEnter={(e) => { if (status !== "sending") { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; }}}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "none"; }}
          >
            {status === "sending" ? "Sending..." : "Send Message →"}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {[["📧","Email","lishimwe73@gmail.com"],["📱","Phone","0794039100"],["📍","Location","Kigali, Rwanda"]].map(([ic, l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.15rem", marginBottom: 5 }}>{ic}</div>
              <div style={{ fontSize: "0.7rem", color: ORANGE, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{l}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}