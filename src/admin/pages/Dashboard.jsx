import React,{useEffect, useState} from 'react';
import axios from 'axios';
import StatCard from "../components/dashboard/StatCard.jsx";
import Footer from "../common/Footer.jsx";
import TableReports from "../components/dashboard/TableReports.jsx";
import BarChartCompo from "../components/dashboard/BarChartCompo.jsx";


const Dashboard = () => {
    const barChartData = [
        {name: '1주', value: 4000},
        {name: '2주', value: 3000},
        {name: '3주', value: 2000},
        {name: '4주', value: 2780},
        {name: '5주', value: 1890},
        {name: '6주', value: 2390},
    ];

    const [totalUsers, setTotalUsers] = useState(null);
    const [mentorCount, setMentorCount] = useState(null);
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/stats")
            .then(res => {
                setTotalUsers(res.data.totalUserCount);
                setMentorCount(res.data.mentorCount);
            })
            .catch(err => {
                console.error("관리자 통계 데이터 가져오기 실패", err);
            });

        // 매출 요약 데이터 불러오기
        axios.get("http://localhost:8080/admin/daily")
            .then(res => {
                setDailyData(res.data);
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
                                    value={totalUsers !== null ? totalUsers.toLocaleString() : "로딩 중..."}
                                    // change="↑ 12.5% 지난 달 대비"
                                    // changeType="increase"
                                    icon="👥"
                                />
                                <StatCard
                                    title="활동 멘토 수"
                                    value={mentorCount !== null ? mentorCount.toLocaleString() : "로딩 중..."}
                                    // change="↑ 8.3% 지난 달 대비"
                                    // changeType="increase"
                                    icon="👤"
                                />
                                <StatCard
                                    title="신고된 리뷰"
                                    value="187"
                                    // change="↓ 2.4% 지난 달 대비"
                                    // changeType="decrease"
                                    icon="⚡"
                                />
                                <StatCard
                                    title="미해결 문의"
                                    value="42"
                                    // change="↑ 5.2% 지난 달 대비"
                                    // changeType="increase"
                                    icon="💰"
                                />
                            </div>

                            {/*/!* Charts Row 1 *!/*/}
                            {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">*/}
                            {/*    <LineUserNum*/}
                            {/*        data={lineChartData}*/}
                            {/*        title="사용자 증가 추이"*/}
                            {/*    />*/}
                            {/*    <HorizontalMentor*/}
                            {/*        data={horizontalBarData}*/}
                            {/*        title="분야별 멘토 분포"*/}
                            {/*    />*/}

                            {/*</div>*/}

                            {/* Data Table */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <TableReports
                                    data={dailyData}
                                    title="당일 매출 현황"
                                />
                                <BarChartCompo
                                    data={barChartData}
                                    title="일별 매출 현황"
                                />
                            </div>

                            {/*/!* Charts Row 2 *!/*/}
                            {/*<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">*/}
                            {/*    <PieChartCompo*/}
                            {/*        data={pieChartData}*/}
                            {/*        title="분야별 매출 현황"*/}
                            {/*    />*/}
                            {/*    <PieChartCompo*/}
                            {/*        data={pieChartData}*/}
                            {/*        title="신고 현황 분석"*/}
                            {/*    />*/}
                            {/*    <PieChartCompo*/}
                            {/*        data={pieChartData}*/}
                            {/*        title="문의 유형 분석"*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    };
export default Dashboard;