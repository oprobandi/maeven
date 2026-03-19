/**
 * src/hooks/useCart.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Cart state management with localStorage persistence.
 * See ADR-002 for the rationale behind this approach.
 *
 * STORAGE KEY: 'maeven_cart'
 * SHAPE: Array<{ id, name, material, price, img, qty }>
 *
 * USAGE
 *   const { cart, addToCart, updateQty, clearCart, totalQty, totalAmt } = useCart();
 */

import { useState, useEffect } from "react";

const STORAGE_KEY = "maeven_cart";

/** Read cart from localStorage safely (private — not exported) */
function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // localStorage unavailable (private browsing on some Android browsers)
    return [];
  }
}

export function useCart() {
  // Lazy initialiser — runs once on mount, reads from localStorage
  const [cart, setCart] = useState(readCart);

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  }, [cart]);

  /**
   * addToCart
   * Increments qty if product already in cart, otherwise appends with qty: 1.
   * @param {Object} product — must include: id, name, material, price, img
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, material: product.material, price: product.price, img: product.img, qty: 1 }];
    });
  };

  /**
   * updateQty
   * Adjusts quantity by delta. Removes item if qty reaches 0.
   * @param {number} id
   * @param {number} delta — positive to increase, negative to decrease
   */
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  /**
   * clearCart
   * Empties the cart entirely. Called after successful M-PESA payment (v2.1).
   */
  const clearCart = () => setCart([]);

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalAmt = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { cart, addToCart, updateQty, clearCart, totalQty, totalAmt };
}
