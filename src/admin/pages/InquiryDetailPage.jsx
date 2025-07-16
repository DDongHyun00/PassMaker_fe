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
            <div className="mb-4 px-12">
                <Back to="/admin/inquiries"/>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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