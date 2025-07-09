// src/auth/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ login: () => {}, logout: () => {}, user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (credentials) => { /* 로그인 로직 */ };
  const logout = () => { /* 로그아웃 로직 */ };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
