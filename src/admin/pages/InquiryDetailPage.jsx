import React from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Back from "../common/Back.jsx";
import InquiryContents from "../components/inquiryDetail/InquiryContents.jsx";


const InquiryDetailPage= () => {
    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-1 ml-6 ">
                <div className="mb-4">
                    <Back to="/admin/inquiries"/>
                </div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">1:1 문의 상세 정보</h1>
                    <p className="text-gray-600 ">관리자에게 문의된 내용를 확인하고 답변을 등록할 수 있습니다.</p>
                </div>
            </div>
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div className="lg:col-span-2 space-y-6">
                        <InquiryContents />
                    </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default InquiryDetailPage;