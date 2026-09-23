/**
 * data.js — Capa de datos simulada con localStorage.
 * Sustituye a una base de datos real: productos, usuarios, carrito y sesión.
 */

const DB_KEYS = {
  PRODUCTS: 'storego_products',
  USERS: 'storego_users',
  CART: 'storego_cart',
  SESSION: 'storego_session',
};

const SEED_PRODUCTS = [
  { id: 'p1', name: 'PlayStation 5', price: 900000, stock: 6, spec: 'Capacidad: 825 GB', image: 'img/ps5.avif' },
  { id: 'p2', name: 'PlayStation 4', price: 250000, stock: 10, spec: 'Capacidad: 500 GB', image: 'img/ps4.webp' },
  { id: 'p3', name: 'PlayStation 3', price: 70000, stock: 8, spec: 'Memoria interna: 160 GB HDD', image: 'img/ps3.jpg' },
];

const SEED_USERS = [
  { email: 'admin@storego.cl', password: 'admin123', role: 'admin', name: 'Administrador' },
];

function initDB() {
  if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
  }
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem(DB_KEYS.CART)) {
    localStorage.setItem(DB_KEYS.CART, JSON.stringify({}));
  }
}

const DB = {
  getProducts() {
    return JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]');
  },
  saveProducts(products) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
  },
  addProduct(product) {
    const products = DB.getProducts();
    products.push(product);
    DB.saveProducts(products);
  },
  updateProduct(id, changes) {
    const products = DB.getProducts().map(p => (p.id === id ? { ...p, ...changes } : p));
    DB.saveProducts(products);
  },
  deleteProduct(id) {
    DB.saveProducts(DB.getProducts().filter(p => p.id !== id));
  },
  getUsers() {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
  },
  saveUsers(users) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  },
  addUser(user) {
    const users = DB.getUsers();
    users.push(user);
    DB.saveUsers(users);
  },
  getCart() {
    return JSON.parse(localStorage.getItem(DB_KEYS.CART) || '{}');
  },
  saveCart(cart) {
    localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart));
  },
  clearCart() {
    DB.saveCart({});
  },
  getSession() {
    const raw = localStorage.getItem(DB_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  },
  setSession(session) {
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(session));
  },
  clearSession() {
    localStorage.removeItem(DB_KEYS.SESSION);
  },
};

function formatCLP(value) {
  return value.toLocaleString('es-CL') + ' CLP';
}

initDB();
