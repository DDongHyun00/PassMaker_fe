import React from 'react';
import { ChevronLeft} from 'lucide-react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../components/reportsDetail/Sidebar.jsx";
import ReportsInfo from "../components/reportsDetail/ReportsInfo.jsx";
import ReviewContents from "../components/reportsDetail/ReviewContents.jsx";
import Back from "../common/Back.jsx";


const ReportsDetailPage = () => {
    return (
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="mb-4 px-12">
                <Back />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ReviewContents />
                        <ReportsInfo />
                    </div>

                    <div className="space-y-6">
                        <Sidebar />
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ReportsDetailPage;