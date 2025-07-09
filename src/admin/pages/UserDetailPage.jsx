import React from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import HelpChat from '../components/userDetail/HelpChat.jsx'
import CommentSection from "../components/userDetail/CommentSection.jsx";
import PaymentHistory from "../components/userDetail/PaymentHistory.jsx";
import RecentActivity from "../components/userDetail/RecentActivity.jsx";
import UserChart from "../components/userDetail/UserChart.jsx";
import StateCards from "../components/userDetail/StateCards.jsx";
import UserProfile from "../components/userDetail/UserProfile.jsx";
import {Plus} from "lucide-react";


const UserDetailPage = () => {
    return(
        <div className="min-h-screen bg-gray-50">
            <Header />

                <div className=" px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">유저 상세 정보</h1>
                            <span className="text-sm text-gray-500">내 정보를 확인하고 편집할 수 있는 페이지 입니다.</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="text-gray-500 hover:text-gray-700">알림 설정</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                설정 변경
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - User Profile */}
                        <div className="lg:col-span-1">
                            <UserProfile />
                        </div>

                        {/* Right Column - Stats and Activity */}
                        <div className="lg:col-span-2 space-y-6">
                            <StateCards />
                            <UserChart />
                            <RecentActivity />
                            <PaymentHistory />
                            <CommentSection />
                            <HelpChat />
                        </div>
                    </div>
                </div>

            <Footer />
        </div>
    );
};
export default UserDetailPage;