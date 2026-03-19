/**
 * src/hooks/useWishlist.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Wishlist state management with localStorage persistence.
 * See ADR-002 for the rationale behind this approach.
 *
 * STORAGE KEY: 'maeven_wishlist'
 * SHAPE: Array<number> — array of product IDs
 *
 * USAGE
 *   const { wishlist, toggleWish, isWishlisted } = useWishlist();
 */

import { useState, useEffect } from "react";

const STORAGE_KEY = "maeven_wishlist";

function readWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState(readWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // fail silently
    }
  }, [wishlist]);

  /**
   * toggleWish
   * Adds product ID if not present, removes if already present.
   * @param {number} id
   */
  const toggleWish = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /**
   * isWishlisted
   * @param {number} id
   * @returns {boolean}
   */
  const isWishlisted = (id) => wishlist.includes(id);

  return { wishlist, toggleWish, isWishlisted };
}
