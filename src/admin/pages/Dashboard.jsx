import React,{useEffect, useState} from 'react';
import axios from "../../common/lib/axios.js";
import StatCard from "../components/dashboard/StatCard.jsx";
import Footer from "../common/Footer.jsx";
import TableReports from "../components/dashboard/TableReports.jsx";
import BarChartCompo from "../components/dashboard/BarChartCompo.jsx";
import authApi from "../../common/lib/axios.js";


const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(null);
    const [mentorCount, setMentorCount] = useState(null);
    const [reportedReviewsCount, setReportedReviewsCount] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [unresolvedInquiries, setUnresolvedInquiries] = useState(null);
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        authApi.get("api/admin/stats")
            .then(res => {
                setTotalUsers(res.data.totalUserCount);
                setMentorCount(res.data.mentorCount);
                setUnresolvedInquiries(res.data.unresolvedInquiries);
                setReportedReviewsCount(res.data.reportedReviewsCount);
            })
            .catch(err => {
                console.error("관리자 통계 데이터 가져오기 실패", err);
            });

        // 매출 요약 데이터 불러오기
        authApi.get("api/admin/daily")
            .then(res => {
                const today = new Date().toISOString().split("T")[0]; // 'yyyy-MM-dd'
                const todayData = res.data.filter(item => item.date === today);
                setDailyData(todayData);
            })
            .catch(err => {
                console.error("매출 요약 데이터 가져오기 실패", err);
            });

        authApi.get("api/admin/weekly")
            .then(res => {
                // 서버에서 받은 데이터 예: [{dayName: "일", sales: 30000}, ...]
                // 요일 순서: 월(1), 화(2), 수(3), 목(4), 금(5), 토(6), 일(0)
                const dayOrder = { "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6, "일": 0 };

                // 서버 데이터 매핑 (없으면 0)
                const salesMap = new Map(res.data.map(item => [item.dayName, item.sales]));

                // 차트용 배열을 월~일 순서로 만듦
                const orderedDayNames = ["월", "화", "수", "목", "금", "토", "일"];
                const chartData = orderedDayNames.map(dayName => ({
                    name: dayName,
                    value: salesMap.get(dayName) ?? 0,
                }));

                setWeeklyData(chartData);
            })
            .catch(err => {
                console.error("매출 요약 데이터 가져오기 실패", err);
            });
    }, []);

        return (
            <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
                <div className="w-full max-w-7xl  rounded p-6">
                    <div className="min-h-screen bg-gray-50">
                        <div className=" border-b">
                            <div className="max-w-7xl mx-auto px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-gray-900">관리자 통계 대시보드</h1>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="max-w-7xl mx-auto px-6 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    title="총 사용자 수"
                                    value={totalUsers?.toLocaleString() ?? "로딩 중..."}
                                    icon="👥"
                                />
                                <StatCard
                                    title="활동 멘토 수"
                                    value={mentorCount?.toLocaleString() ?? "로딩 중..."}
                                    icon="👤"
                                />
                                <StatCard
                                    title="신고된 리뷰"
                                    value={reportedReviewsCount?.toLocaleString() ?? "로딩 중..."}
                                    icon="⚡"
                                />
                                <StatCard
                                    title="미해결 문의"
                                    value={unresolvedInquiries ?? "로딩 중..."}
                                    icon="💬"
                                />
                            </div>

                            {/* Data Table */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <TableReports
                                    data={dailyData}
                                    title="당일 매출 현황"
                                />
                                <BarChartCompo
                                    data={weeklyData}
                                    title="주간 매출 현황"
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    };
export default Dashboard;