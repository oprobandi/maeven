# ADR-002: Client-Side State Persistence via localStorage

**Date:** 2026-03-20  
**Status:** Accepted  
**Deciders:** Peter (lead dev)

---

## Context

In v1.0, cart and wishlist state lived entirely in React `useState`. This meant:

- Refreshing the page wiped the cart entirely
- A customer who added 3 items and then scrolled to read the brand story
  would lose everything if they accidentally closed the tab
- No session continuity between visits

This is a critical UX failure for any e-commerce product, regardless of scale.

## Decision

Persist cart and wishlist to `localStorage` using two custom hooks:

### `useCart.js`
- Initialises state by reading `maeven_cart` from localStorage (with try/catch)
- Writes to localStorage on every cart update via `useEffect`
- Exposes: `cart`, `addToCart(product)`, `updateQty(id, delta)`, `clearCart()`,
  `totalQty`, `totalAmt`

### `useWishlist.js`
- Initialises state by reading `maeven_wishlist` from localStorage (with try/catch)
- Writes to localStorage on every wishlist update via `useEffect`
- Exposes: `wishlist`, `toggleWish(id)`, `isWishlisted(id)`

### Key implementation detail
Both hooks initialise with a lazy initialiser function passed to `useState`:

```js
const [cart, setCart] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('maeven_cart')) || [];
  } catch {
    return [];
  }
});
```

The `try/catch` is essential — localStorage can be unavailable in private
browsing modes on some Android browsers.

## Alternatives Considered

| Option | Verdict |
|---|---|
| `sessionStorage` | Clears on tab close — same UX problem |
| React Context | Solves prop drilling but not persistence |
| Zustand with persist middleware | Correct long-term solution, premature for v1.x |
| Backend cart (Supabase) | Required for multi-device sync — v3.x milestone |

## Consequences

**Positive:**
- Cart survives page refresh, tab close, app switch on Android
- Zero dependencies added — pure browser API
- Trivially testable (mock localStorage in tests)

**Negative:**
- Cart is device-specific — no sync across devices (acceptable for v1.x)
- localStorage is synchronous — negligible performance impact at this data volume
- No expiry — a cart from months ago will persist (acceptable; standard e-commerce behaviour)

## Future
When Supabase auth is introduced (v3.x), merge localStorage cart into the
server-side cart on login using a `mergeGuestCart()` utility.
