import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterMain from './FooterMain'
import { useAuth } from '../../auth/AuthContext'; // AuthContext에서 useAuth 임포트

export default function Layout() {
  const { isLoggedIn, logout } = useAuth(); // AuthContext에서 isLoggedIn과 logout 가져오기

  return (
    <div className="min-h-screen pt-16">
      <Header isLoggedIn={isLoggedIn} onLogout={logout} /> {/* AuthContext의 logout 함수 전달 */}
      <main>
        <Outlet />
      </main>
      <FooterMain />
    </div>
  );
}