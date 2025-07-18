import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

// 페이지 import
import MainPage from "../common/pages/MainPage.jsx";
import LoginSelectPage from "../common/pages/LoginSelectPage.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import SignupPage from "../auth/pages/SignupPage.jsx";
import MyPage from "../common/pages/MyPage.jsx";
import MentoringRoomPage from "../room/pages/MentoringRoomPage.jsx";
import Layout from "../common/components/Layout.jsx";

import UserListPage from "../admin/pages/UserListPage.jsx";
import UserDetailPage from "../admin/pages/UserDetailPage.jsx";
import MentorApplicationPage from "../admin/pages/MentorApplicationPage.jsx";
import MentorApplDetailPage from "../admin/pages/MentorApplDetailPage.jsx";
import ReportsReviewPage from "../admin/pages/ReportsReviewPage.jsx";
import ReportsDetailPage from "../admin/pages/ReportsDetailPage.jsx";
import InquiryListPage from "../admin/pages/InquiryListPage.jsx";
import InquiryDetailPage from "../admin/pages/InquiryDetailPage.jsx";
import Dashboard from "../admin/pages/Dashboard.jsx";

import ReservationPage from "../common/pages/ReservationPage.jsx";
import MentorDetailPage from "../mentor/pages/MentorDetailPage.jsx";

const Router = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* ───── 로그인 없이 접근 가능 ───── */}
      <Route path="/login-select" element={<LoginSelectPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reservation/:mentorId" element={<ReservationPage />} />

      <Route path="/payment/success" element={<MentorDetailPage />} /> {/* ✅ 결제 후 리다이렉트 */}

      <Route path="/mypage" element={<MyPage />} />


      {/* ───── 공통 레이아웃 적용 ───── */}
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/mypage"
          element={user ? <MyPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/mentoringroom/:roomId"
          element={
            user ? <MentoringRoomPage /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ 멘토 상세 페이지 (nickname 기준) */}
        <Route path="/mentors/:nickname" element={<MentorDetailPage />} />

        {/* ───── 관리자 전용 ───── */}
        <Route path="/admin/users" element={<UserListPage />} />
        <Route path="/admin/users/id" element={<UserDetailPage />} />
        <Route path="/admin/mentor-application" element={<MentorApplicationPage />}/>
        <Route path="/admin/mentor-application/id" element={<MentorApplDetailPage />}/>
        <Route path="/admin/report-review" element={<ReportsReviewPage />} />
        <Route path="/admin/report-review/id" element={<ReportsDetailPage />} />
        <Route path="/admin/inquiries" element={<InquiryListPage />} />
        <Route path="/admin/inquiries/id" element={<InquiryDetailPage />} />
        <Route path="/admin" element={<Dashboard />} />

        {/* ───── 관리자 상세 페이지 (동적 파라미터 경로) 중복 제거 ───── */}
        <Route path="/admin/users/:userId" element={<UserDetailPage />} />
        <Route path="/admin/mentor-application/:applyId" element={<MentorApplDetailPage />}/>
        <Route path="/admin/inquiries/:inquiryId" element={<InquiryDetailPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
