import React from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import ReportTable from "../components/inquiryList/ReportTable.jsx";
import Pagination from "../components/inquiryList/Pagination.jsx";


const InquiryListPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="mb-4">
                    <h1 className="text-xl font-bold">1:1 문의 목록</h1>
                    <p className="text-sm mt-2 opacity-90">
                        사용자가 보낸 1:1 문의 목록을 확인하고 답변할 수 있습니다.
                    </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm">실버 회원 | 전체</span>
                        <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                            새로고침
                        </button>

                    </div>

                </div>



                <ReportTable />
                <Pagination />
            </div>
            <Footer />
        </div>
    );
};

export default InquiryListPage;