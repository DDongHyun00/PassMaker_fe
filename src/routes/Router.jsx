import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

// 페이지들 import
import MainPage from "../common/pages/MainPage.jsx";
import LoginSelectPage from "../common/pages/LoginSelectPage.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import SignupPage from "../auth/pages/SignupPage.jsx";
import MyPage from "../common/pages/MyPage.jsx";
import MentoringRoomPage from "../room/pages/MentoringRoomPage.jsx";
import Layout from '../common/components/Layout.jsx';

import UserListPage from "../admin/pages/UserListPage.jsx";
import UserDetailPage from "../admin/pages/UserDetailPage.jsx";
import MentorApplicationPage from "../admin/pages/MentorApplicationPage.jsx";
import MentorApplDetailPage from "../admin/pages/MentorApplDetailPage.jsx";
import ReportsReviewPage from "../admin/pages/ReportsReviewPage.jsx";
import ReportsDetailPage from "../admin/pages/ReportsDetailPage.jsx";
import InquiryListPage from "../admin/pages/InquiryListPage.jsx";
import InquiryDetailPage from "../admin/pages/InquiryDetailPage.jsx";
import Dashboard from "../admin/pages/Dashboard.jsx";

const Router = () => {
    const { user, loading } = useAuth();

    if (loading) return null; // 👉 유저 정보 로딩 중일 땐 아무것도 렌더링 안함

    return (
        <Routes>
            {/* 로그인 안 해도 접근 가능한 페이지 */}
            <Route path="/login-select" element={<LoginSelectPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 로그인 후 접근 가능한 레이아웃 포함 페이지 */}
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />

                {/* 🔒 보호 라우트 - 로그인한 유저만 접근 */}
                <Route path="/mypage" element={user ? <MyPage /> : <Navigate to="/login" replace />} />
                <Route path="/mentoringroom/:roomId" element={user ? <MentoringRoomPage /> : <Navigate to="/login" replace />} />

                {/* 관리자 페이지도 추후 권한 체크 확장 가능 */}
                <Route path="/admin/users" element={<UserListPage />} />
                <Route path="/admin/users/id" element={<UserDetailPage />} />
                <Route path="/admin/mentor-application" element={<MentorApplicationPage />} />
                <Route path="/admin/mentor-application/id" element={<MentorApplDetailPage />} />
                <Route path="/admin/report-review" element={<ReportsReviewPage />} />
                <Route path="/admin/report-review/id" element={<ReportsDetailPage />} />
                <Route path="/admin/inquiries" element={<InquiryListPage />} />
                <Route path="/admin/inquiries/id" element={<InquiryDetailPage />} />
                <Route path="/admin" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default Router;
