/**
 * cart.js — Operaciones sobre el carrito guardado en localStorage.
 */

const Cart = {
  add(productId, qty = 1) {
    const cart = DB.getCart();
    cart[productId] = (cart[productId] || 0) + qty;
    DB.saveCart(cart);
  },

  setQty(productId, qty) {
    const cart = DB.getCart();
    if (qty <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = qty;
    }
    DB.saveCart(cart);
  },

  remove(productId) {
    const cart = DB.getCart();
    delete cart[productId];
    DB.saveCart(cart);
  },

  items() {
    const cart = DB.getCart();
    const products = DB.getProducts();
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return product ? { ...product, qty } : null;
      })
      .filter(Boolean);
  },

  count() {
    return Object.values(DB.getCart()).reduce((sum, qty) => sum + qty, 0);
  },

  total() {
    return Cart.items().reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  checkout() {
    const total = Cart.total();
    DB.clearCart();
    return total;
  },
};
