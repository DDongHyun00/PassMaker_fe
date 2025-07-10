import { Routes, Route } from "react-router-dom";
import React from "react";

// Page Imports
import MainPage from "../common/pages/MainPage.jsx";
import LoginSelectPage from "../common/pages/LoginSelectPage.jsx"; // 이름 변경된 파일 import
import LoginPage from "../auth/pages/LoginPage.jsx";
import SignupPage from "../auth/pages/SignupPage.jsx";
import MyPage from "../common/pages/MyPage.jsx"; // 새로 추가
import MentoringRoomPage from "../room/pages/MentoringRoomPage.jsx";
import Layout from '../common/components/Layout';


const Router = () => (
  <Routes>
      <Route path="/login-select" element={<LoginSelectPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    <Route element={<Layout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mentoringroom" element={<MentoringRoomPage />} />
    </Route>
  </Routes>
);

export default Router;
