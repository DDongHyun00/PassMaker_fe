import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../common/lib/axios'; // 인터셉터 포함된 axios여야 함

const AuthContext = createContext();

// AuthProvider.jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 기본 true

  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/me", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false)); // 로딩 종료
  }, []);

  const value = { user, setUser, isLoggedIn, loading };

  // 로딩이 끝날 때까지 children 렌더링하지 않음
  if (loading) return null;

  // 로그인 성공 후 상태 설정 (localStorage x)
  const login = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/me");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // 로그아웃 요청 후 상태 초기화
  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
      await axios.post('http://localhost:8080/api/oauth/google/logout', {}, { withCredentials: true }).catch(() => {});
      await axios.post('http://localhost:8080/api/oauth/kakao/logout', {}, { withCredentials: true }).catch(() => {});

      alert('정상적으로 로그아웃되었습니다.'); // 사용자 피드백
      setUser(null);                            // 상태 초기화
      navigate('/login-select');               // 로그인 페이지로 이동
    } catch (e) {
      console.warn("서버 로그아웃 실패 (무시 가능)", e);
    }

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
