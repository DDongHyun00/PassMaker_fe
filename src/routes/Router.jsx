import React from "react";

// Page Imports
import MainPage from "../common/pages/MainPage.jsx";
import LoginSelectPage from "../common/pages/LoginSelectPage.jsx"; // 이름 변경된 파일 import
import LoginPage from "../auth/pages/LoginPage.jsx";
import SignupPage from "../auth/pages/SignupPage.jsx";
import MyPage from "../common/pages/MyPage.jsx"; // 새로 추가
import MentoringRoomPage from "../room/pages/MentoringRoomPage.jsx";
import Layout from '../common/components/Layout';

import UserListPage from "../admin/pages/UserListPage.jsx";
import UserDetailPage from "../admin/pages/UserDetailPage.jsx";
import MentorApplicationPage from "../admin/pages/MentorApplicationPage.jsx";
import MentorApplDetailPage from "../admin/pages/MentorApplDetailPage.jsx";
import ReportsReviewPage from "../admin/pages/ReportsReviewPage.jsx";
import ReportsDetailPage from "../admin/pages/ReportsDetailPage.jsx";
import InquiryListPage from "../admin/pages/InquiryListPage.jsx";
import InquiryDetailPage from "../admin/pages/InquiryDetailPage.jsx";
import Dashboard from "../admin/pages/Dashboard.jsx";

import { Routes, Route } from 'react-router-dom';


const Router = () => {
    return (
        <Routes>
            {/*<Route path="/" element={<TitlePage />} />*/}
            <Route path="/main" element={<MainPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mentoringroom" element={<MentoringRoomPage />} />

            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/users/id" element={<UserDetailPage />} />
            <Route path="/admin/mentor-application" element={<MentorApplicationPage />} />
            <Route path="/admin/mentor-application/id" element={<MentorApplDetailPage />} />
            <Route path="/admin/report-review" element={<ReportsReviewPage />} />
            <Route path="/admin/report-review/id" element={<ReportsDetailPage />} />
            <Route path="/admin/inquiries" element={<InquiryListPage />} />
            <Route path="/admin/inquiries/id" element={<InquiryDetailPage />} />
            <Route path="/admin" element={<Dashboard />} />

        </Routes>
    );
};
export default Router;
