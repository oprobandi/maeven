/**
 * src/hooks/useScrollReveal.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Attaches IntersectionObserver to all elements with className "rv".
 * Adds className "on" when element enters the viewport, triggering the
 * CSS transition defined in index.css (.rv → .rv.on).
 *
 * USAGE
 *   Call once in App.jsx after all components are mounted:
 *   useScrollReveal();
 *
 * NOTE
 *   The hook observes `.rv` elements present in the DOM at mount time.
 *   Elements added dynamically (e.g. after filter changes) are not observed.
 *   This is acceptable for v1.1 — products are always rendered on mount.
 *   If lazy-loaded sections are added in v2.x, switch to MutationObserver
 *   or call reveal manually after dynamic renders.
 */

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            // Unobserve after reveal — no need to watch further
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
