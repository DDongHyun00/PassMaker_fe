import React, { useEffect, useState } from 'react';
import axios from "../../common/lib/axios.js";
import { useParams } from 'react-router-dom';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Blindness from "../components/reportsDetail/Blindness.jsx";
import ReportsInfo from "../components/reportsDetail/ReportsInfo.jsx";
import ReviewContents from "../components/reportsDetail/ReviewContents.jsx";
import Back from "../common/Back.jsx";
import authApi from "../../common/lib/axios.js";

const ReportsDetailPage = () => {
    const { reportReviewId } = useParams();
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportedReviewDetail = async () => {
            try {
                const response = await authApi.get(`/admin/report-review/${reportReviewId}`);
                setReportData(response.data);
            } catch (error) {
                console.error("신고 상세 정보를 가져오는 데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReportedReviewDetail();
    }, [reportReviewId]);

    if (loading) return <div className="p-8 text-gray-700">로딩 중...</div>;
    if (!reportData) return <div className="p-8 text-red-500">데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-6">
            <div className="mb-4">
                <Back to="/admin/report-review"/>
            </div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">리뷰 신고 상세 조회</h1>
                <p className="text-gray-600 ">신고된 멘토의 리뷰 내역을 확인하고 블라인드 처리할 수 있습니다.</p>
            </div>
        </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ReviewContents
                            review={reportData.report.review}/>
                        <ReportsInfo
                            report={reportData.report}/>
                    </div>
                    <div className="space-y-6">
                        <Blindness reportReviewId={reportReviewId}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default ReportsDetailPage;