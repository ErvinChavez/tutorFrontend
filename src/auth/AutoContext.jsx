import { createContext, useContext, useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import {
  getToken,
  getStoredAdmin,
  setSession,
  clearSession,
} from './token.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [admin, setAdmin] = useState(() => getStoredAdmin());
  const [token, setToken] = useState(() => getToken());

  const login = useCallback((newToken, newAdmin) => {
    setSession(newToken, newAdmin);
    setToken(newToken);
    setAdmin(newAdmin);
  }, []);

  const logout = useCallback(async () => {
    clearSession();
    setToken(null);
    setAdmin(null);
    await client.clearStore();
  }, [client]);

  return (
    <AuthContext.Provider
      value={{ admin, token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};