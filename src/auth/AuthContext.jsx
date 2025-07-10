import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../common/lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 초기 로그인 상태 확인 (/api/auth/me)
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setIsLoggedIn(true);
      return;
    }

    axios.get("/api/auth/me", { withCredentials: true })
        .then(res => {
          setUser(res.data);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => {
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("user");
        });
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true }).catch(() => {});
      await axios.post('/api/oauth/google/logout', {}, { withCredentials: true }).catch(() => {});
      await axios.post('/api/oauth/kakao/logout', {}, { withCredentials: true }).catch(() => {});
    } catch (e) {
      console.warn("서버 로그아웃 실패 (무시 가능)", e);
    }

    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  return (
      <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
