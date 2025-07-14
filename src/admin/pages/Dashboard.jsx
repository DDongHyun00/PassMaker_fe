import React from 'react';
import StatCard from "../components/dashboard/StatCard.jsx";
import Footer from "../common/Footer.jsx";
import LineUserNum from "../components/dashboard/LineUserNum.jsx";
import PieChartCompo from "../components/dashboard/PieChartCompo.jsx";
import TableReports from "../components/dashboard/TableReports.jsx";
import BarChartCompo from "../components/dashboard/BarChartCompo.jsx";
import HorizontalMentor from "../components/dashboard/HorizontalMentor.jsx";

const Dashboard = () => {

    // 데이터 설정
    const lineChartData = [
        { name: '1월', value1: 4000, value2: 2400 },
        { name: '2월', value1: 3000, value2: 1398 },
        { name: '3월', value1: 2000, value2: 9800 },
        { name: '4월', value1: 2780, value2: 3908 },
        { name: '5월', value1: 1890, value2: 4800 },
        { name: '6월', value1: 2390, value2: 3800 },
    ];

    const pieChartData = [
        { name: '완료', value: 65, color: '#3b82f6' },
        { name: '진행중', value: 25, color: '#f59e0b' },
        { name: '대기', value: 10, color: '#ef4444' },
    ];

    const tableData = [
        { name: '프로젝트 A', status: '정상', quantity: '150개', date: '2024.1.15', note: '완료' },
        { name: '프로젝트 B', status: '대기', quantity: '75개', date: '2024.1.14', note: '검토중' },
        { name: '프로젝트 C', status: '정상', quantity: '200개', date: '2024.1.13', note: '진행중' },
        { name: '프로젝트 D', status: '오류', quantity: '50개', date: '2024.1.12', note: '수정필요' },
        { name: '프로젝트 E', status: '정상', quantity: '125개', date: '2024.1.11', note: '완료' },
    ];

    const barChartData = [
        { name: '1주', value: 4000 },
        { name: '2주', value: 3000 },
        { name: '3주', value: 2000 },
        { name: '4주', value: 2780 },
        { name: '5주', value: 1890 },
        { name: '6주', value: 2390 },
    ];

    const horizontalBarData = [
        { name: '마케팅', value: 84, percentage: 84 },
        { name: '개발', value: 72, percentage: 72 },
        { name: '디자인', value: 68, percentage: 68 },
        { name: '기획', value: 56, percentage: 56 },
        { name: '운영', value: 42, percentage: 42 },
    ];

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="min-h-screen bg-gray-50">
            <div className=" border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">관리자 통계 대시보드</h1>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                                데이터 다운로드
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="총 사용자 수"
                        value="24,582"
                        change="↑ 12.5% 지난 달 대비"
                        changeType="increase"
                        icon="👥"
                    />
                    <StatCard
                        title="활동 멘토 수"
                        value="1,247"
                        change="↑ 8.3% 지난 달 대비"
                        changeType="increase"
                        icon="👤"
                    />
                    <StatCard
                        title="신고된 리뷰"
                        value="187"
                        change="↓ 2.4% 지난 달 대비"
                        changeType="decrease"
                        icon="💰"
                    />
                    <StatCard
                        title="미해결 문의"
                        value="42"
                        change="↑ 5.2% 지난 달 대비"
                        changeType="increase"
                        icon="⚡"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <LineUserNum
                        data={lineChartData}
                        title="사용자 증가 추이"
                    />
                    <HorizontalMentor
                        data={horizontalBarData}
                        title="분야별 멘토 분포"
                    />

                </div>

                {/* Data Table */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <TableReports
                        data={tableData}
                        title="당일 매출 현황"
                    />
                    <BarChartCompo
                        data={barChartData}
                        title="일별 매출 현황"
                    />
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <PieChartCompo
                        data={pieChartData}
                        title="분야별 매출 현황"
                    />
                    <PieChartCompo
                        data={pieChartData}
                        title="신고 현황 분석"
                    />
                    <PieChartCompo
                        data={pieChartData}
                        title="문의 유형 분석"
                    />
                </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};
export default Dashboard;