import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../common/lib/axios"; // 인터셉터 포함된 axios여야 함

export const AuthContext = createContext();

// AuthProvider.jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 기본 true

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        console.log("Raw res.data (useEffect):", res.data); // <-- 이 라인을 추가합니다.
        setUser({ ...res.data, isMentor: res.data.mentor }); // 'mentor' 값을 'isMentor'로 매핑
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false)); // 로딩 종료
  }, []);


  // 로딩이 끝날 때까지 children 렌더링하지 않음
  if (loading) return null;

  // 로그인 성공 후 상태 설정 (localStorage x)
  const login = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      console.log("Raw res.data (login):", res.data); // <-- 이 라인을 추가합니다.
      setUser({ ...res.data, isMentor: res.data.mentor }); // 'mentor' 값을 'isMentor'로 매핑
      console.log("AuthContext user after mapping (login):", { ...res.data, isMentor: res.data.mentor }); // <-- 이 라인을 추가합니다.
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // 로그아웃 요청 후 상태 초기화
  const logout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      await axios
        .post(
          "/api/oauth/google/logout",
          {},
          { withCredentials: true }
        )
        .catch(() => {});
      await axios
        .post(
          "/api/oauth/kakao/logout",
          {},
          { withCredentials: true }
        )
        .catch(() => {});

      alert("정상적으로 로그아웃되었습니다."); // 사용자 피드백
      setUser(null); // 상태 초기화
      navigate("/login-select"); // 로그인 페이지로 이동
    } catch (e) {
      console.warn("서버 로그아웃 실패 (무시 가능)", e);
    }

    setUser(null);
    setIsLoggedIn(false);
  };

  const value = { user, setUser, isLoggedIn, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
