/**
 * src/components/Toast.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Ephemeral notification bar — appears at the bottom-centre of the screen,
 * auto-dismisses after 2500ms.
 *
 * PROPS
 *   message  {string}   Text to display (e.g. "Added to bag")
 *   visible  {boolean}  Controls show/hide via CSS transition
 *
 * PARENT USAGE (in App.jsx)
 *   const [toast, setToast] = useState({ message: "", visible: false });
 *
 *   const showToast = (message) => {
 *     setToast({ message, visible: true });
 *     setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
 *   };
 *
 *   <Toast message={toast.message} visible={toast.visible} />
 *
 * NOTE
 *   For v1.1, only one toast shows at a time (last-write-wins).
 *   For a queued toast system, see TODO v1.2.
 */

export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: "none",
        zIndex: 9000,
        background: "var(--charcoal)",
        color: "var(--chalk)",
        padding: "12px 28px",
        fontSize: "0.72rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontFamily: "var(--sans)",
        boxShadow: "0 8px 32px rgba(28,28,28,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      {message}
    </div>
  );
}
