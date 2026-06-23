// Small wrapper around localStorage for the admin session. The Apollo auth
// link reads getToken() on every request; React state is managed separately
// by AuthContext (which writes here on login/logout).

const TOKEN_KEY = 'tutor_admin_token';
const ADMIN_KEY = 'tutor_admin_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredAdmin = () => {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setSession = (token, admin) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};