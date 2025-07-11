import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // 토큰 삭제 등 로그아웃 처리
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen pt-16">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}