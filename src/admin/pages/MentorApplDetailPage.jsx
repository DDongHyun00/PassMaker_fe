import React, { useState } from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Permission from "../components/mentorApplDetail/Permission.jsx";
import MentoringPlan from "../components/mentorApplDetail/MentoringPlan.jsx";
import Attachment from "../components/mentorApplDetail/Attachment.jsx";
import Projects from "../components/mentorApplDetail/Projects.jsx";
import Experience from "../components/mentorApplDetail/Experience.jsx";
import Introduce from "../components/mentorApplDetail/Introduce.jsx";
import Information from "../components/mentorApplDetail/Information.jsx";
import Back from "../common/Back.jsx";

const MentorApplDetailPage = () => {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-7xl mx-auto px-4 py-1">
                    <div className="mb-4">
                        <Back />
                    </div>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 신청 상세 조회</h1>
                        <p className="text-gray-600 ">신청하신 멘토의 상세 정보를 확인하고 승인/반려 처리를 할 수 있습니다.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 기본 정보 */}
                        <Information />
                        <Introduce />
                        <Experience />
                        <Projects />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        <Attachment />
                        <MentoringPlan />
                        <Permission />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default MentorApplDetailPage;