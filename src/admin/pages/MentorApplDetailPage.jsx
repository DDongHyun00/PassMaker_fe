import React, { useEffect, useState } from 'react';
import axios from "../../common/lib/axios.js";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Permission from "../components/mentorApplDetail/Permission.jsx";
import Experience from "../components/mentorApplDetail/Experience.jsx";
import Introduce from "../components/mentorApplDetail/Introduce.jsx";
import Information from "../components/mentorApplDetail/Information.jsx";
import Back from "../common/Back.jsx";
import { useParams } from 'react-router-dom';

const MentorApplDetailPage = () => {
    const { applyId } = useParams(); // URL 파라미터에서 applyId 가져오기
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/admin/mentor-application/${applyId}`)
            .then(res => setData(res.data))
            .catch(err => {
                console.error(err);
                setError("데이터를 불러오는 데 실패했습니다.");
            })
            .finally(() => setLoading(false));
    }, [applyId]);

    if (loading) return <div className="text-center mt-10">로딩 중...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!data) return null;

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-7xl mx-auto px-4 py-1">
                    <div className="mb-4">
                        <Back to="/admin/mentor-application"/>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 신청 상세 조회</h1>
                        <p className="text-gray-600 ">신청한 멘티의 상세 정보를 확인하고 승인/반려 처리를 할 수 있습니다.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 기본 정보 */}
                        <Information data={data}/>
                        <Introduce intro={data.intro}/>
                        <Experience careers={data.careers}/>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        <Permission applyId={data.applyId} status={data.status} reason={data.reason}/>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default MentorApplDetailPage;