/**
 * src/components/EmailCapture.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Newsletter signup section. On submit: shows a confirmation message.
 * No backend in v1.1 — form submission is captured locally only.
 * Wire to Mailchimp / ConvertKit in v2.x.
 */

import { useState } from "react";

export default function EmailCapture() {
  const [done, setDone] = useState(false);

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--rose-light)", padding: "120px 48px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -60, left: -60, width: 300, height: 300, background: "radial-gradient(circle,rgba(212,165,165,0.3) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, right: -60, width: 400, height: 400, background: "radial-gradient(circle,rgba(160,132,92,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />

      <p className="rv" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--bronze)", marginBottom: 20, position: "relative", zIndex: 1 }}>
        Members Only
      </p>
      <h2 className="rv d1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem,4vw,4.5rem)", fontWeight: 300, marginBottom: 16, lineHeight: 1.1, position: "relative", zIndex: 1 }}>
        First Access. Always.
      </h2>
      <p className="rv d2" style={{ fontSize: "0.85rem", color: "#888", marginBottom: 48, position: "relative", zIndex: 1 }}>
        Join our inner circle for early access to new collections, private sales, and editorial content.
      </p>

      {!done ? (
        <form
          className="rv d3"
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          style={{ display: "flex", maxWidth: 440, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            style={{
              flex: 1, padding: "16px 24px",
              border: "1px solid #c8b8b8", background: "white",
              fontSize: "0.8rem", fontFamily: "var(--sans)",
              outline: "none", color: "var(--charcoal)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "16px 28px",
              background: "var(--charcoal)", color: "var(--chalk)",
              border: "1px solid var(--charcoal)", cursor: "none",
              fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase",
              fontFamily: "var(--sans)", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bronze)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--charcoal)")}
          >
            Subscribe
          </button>
        </form>
      ) : (
        <p style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontStyle: "italic", color: "var(--bronze)", position: "relative", zIndex: 1, animation: "wordUp 0.6s ease forwards" }}>
          Thank you for joining. ✦
        </p>
      )}
    </section>
  );
}
