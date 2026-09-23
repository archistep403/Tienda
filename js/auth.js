/**
 * auth.js — Autenticación simulada con localStorage.
 * En producción esto llamaría a un backend con contraseñas hasheadas;
 * aquí queda simplificado para el prototipo.
 */

const Auth = {
  login(email, password) {
    const user = DB.getUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { ok: false, error: 'Correo o contraseña incorrectos.' };
    DB.setSession({ email: user.email, role: user.role, name: user.name });
    return { ok: true, user };
  },

  register(name, email, password) {
    const exists = DB.getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: 'Ya existe una cuenta con ese correo.' };
    const user = { email, password, role: 'cliente', name };
    DB.addUser(user);
    DB.setSession({ email: user.email, role: user.role, name: user.name });
    return { ok: true, user };
  },

  logout() {
    DB.clearSession();
  },

  currentUser() {
    return DB.getSession();
  },

  requireAdmin() {
    const session = Auth.currentUser();
    if (!session || session.role !== 'admin') {
      window.location.href = 'login.html?next=admin';
      return null;
    }
    return session;
  },
};
