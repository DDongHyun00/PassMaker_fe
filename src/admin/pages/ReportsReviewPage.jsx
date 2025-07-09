import React from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import InfoCards from "../components/reportsReview/InfoCards.jsx";
import Pagination from "../components/reportsReview/Pagination.jsx";
import ReportTable from "../components/reportsReview/ReportTable.jsx";
import SearchSection from "../components/reportsReview/SearchSection.jsx";

const ReportsReviewPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-bold">신고된 리뷰 목록</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">실버 회원 | 전체</span>
                        <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                            새로고침
                        </button>
                    </div>
                </div>
                <p className="text-sm mt-2 opacity-90">
                    사용자가 신고한 리뷰 목록을 확인하고 처리할 수 있습니다.
                </p>
                <SearchSection />
                <ReportTable />
                <Pagination />
                <InfoCards />
            </div>
            <Footer />
        </div>
    );
};

export default ReportsReviewPage;