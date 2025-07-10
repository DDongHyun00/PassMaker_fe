import React, {useState} from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import InfoCards from "../components/reportsReview/InfoCards.jsx";
import Pagination from "../common/Pagination.jsx";
import ReportTable from "../components/reportsReview/ReportTable.jsx";
import SearchSection from "../components/reportsReview/SearchSection.jsx";
import {ChevronDown} from "lucide-react";

const ReportsReviewPage = () => {
    const [category, setCategory] = useState('전체');

    return (
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">신고된 리뷰 목록</h1>
                        <p className=" mt-2 opacity-90">
                            사용자가 신고한 리뷰 목록을 확인하고 처리할 수 있습니다.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 ">
                        <span className="text-medium text-gray-900"> 처리상태 </span>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>---</option>
                                <option>대기</option>
                                <option>처리중</option>
                                <option>완료</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-medium">
                            새로고침
                        </button>
                    </div>
                </div>

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