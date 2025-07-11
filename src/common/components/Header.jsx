import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-8 bg-white shadow-sm flex justify-between items-center z-10">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/')}>
        PassMaker
      </h1>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <button onClick={onLogout} className="px-4 py-1 rounded hover:bg-gray-100">
              로그아웃
            </button>
            <button onClick={() => navigate('/mypage')} className="px-4 py-1 rounded hover:bg-gray-100">
              마이페이지
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login-select')} className="px-4 py-1 rounded hover:bg-gray-100">
              로그인
            </button>
            <button onClick={() => navigate('/signup')} className="px-4 py-1 rounded bg-purple-600 text-white hover:bg-purple-700">
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
);
}