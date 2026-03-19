/**
 * src/components/Cursor.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom cursor: a solid dot that tracks the mouse exactly, and a larger ring
 * that follows with a 0.12 easing lag — creating a trailing "magnetic" feel.
 *
 * Both elements are fixed-position, z-index 9999, pointer-events: none.
 * Styled in index.css as .cur-dot and .cur-ring.
 *
 * The cursor is hidden on touch devices via `body { cursor: none }` in CSS,
 * but the elements themselves are always rendered — they just have no effect
 * when there is no mouse. This avoids a flash of default cursor on desktop.
 *
 * IMPORTANT: This component should be rendered as the FIRST child of the root
 * div in App.jsx, before all other content, so it always paints on top.
 */

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", onMove);

    const animate = () => {
      // Dot: instant follow
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px)`;
      }
      // Ring: eased follow (lerp factor 0.12)
      if (ringRef.current) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
