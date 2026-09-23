/**
 * nav.js — Sincroniza el menú superior con la sesión y el carrito actuales.
 * Se incluye en todas las páginas, después de data.js, auth.js y cart.js.
 */

function renderNav() {
  const session = Auth.currentUser();
  const authLink = document.getElementById('navAuthLink');
  const adminLink = document.getElementById('navAdminLink');
  const badge = document.getElementById('cartBadge');

  if (authLink) {
    if (session) {
      authLink.textContent = `Salir (${session.name})`;
      authLink.href = '#';
      authLink.onclick = (e) => {
        e.preventDefault();
        Auth.logout();
        window.location.href = 'index.html';
      };
    } else {
      authLink.textContent = 'Ingresar';
      authLink.href = 'login.html';
      authLink.onclick = null;
    }
  }

  if (adminLink) {
    adminLink.style.display = session && session.role === 'admin' ? '' : 'none';
  }

  if (badge) {
    const count = Cart.count();
    badge.textContent = count > 0 ? count : '';
  }
}

document.addEventListener('DOMContentLoaded', renderNav);
