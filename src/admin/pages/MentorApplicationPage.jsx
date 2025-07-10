import React from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import MentorChart from "../components/mentorApplication/MentorChart.jsx";
import ApplicationStatus from "../components/mentorApplication/ApplicationStatus.jsx";
import ApplicationTable from "../components/mentorApplication/ApplicationTable.jsx";
import SearchBar from "../components/mentorApplication/SearchBar.jsx";

const MentorApplicationPage = () => {


    return(
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 신청 현황</h1>
                        <p className="text-gray-600">멘토 신청자를 확인하고 승인 여부를 결정할 수 있습니다</p>
                    </div>

                    <SearchBar />
                    <ApplicationTable />
                    <ApplicationStatus />
                    <MentorChart />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MentorApplicationPage;