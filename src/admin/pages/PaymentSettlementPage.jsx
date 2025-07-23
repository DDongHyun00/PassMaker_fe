import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DollarSign, CreditCard, Users, AlertTriangle } from 'lucide-react';
import Footer from "../common/Footer.jsx";
import StatsCard from "../components/paymentSettlement/StatsCard.jsx";
import TablePayments from "../components/paymentSettlement/TablePayments.jsx";
import Pagination from "../common/Pagination.jsx";

const PaymentSettlementPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('이번달');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [settlementData, setSettlementData] = useState([]);

    // 페이지네이션 상태 추가
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;  // 한 페이지에 보여줄 항목 수

    // 총 페이지 수 계산
    const totalPages = Math.ceil(settlementData.length / usersPerPage);

    // 현재 페이지에 보여줄 데이터 슬라이싱
    const currentPageData = settlementData.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/admin/statscard`);
                setStats(response.data);
            } catch (err) {
                setError('통계 데이터를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchSettlementData = async () => {
            try {
                const response = await axios.get(`/api/admin/table`);
                setSettlementData(response.data);
            } catch (err) {
                console.error("정산 리스트 데이터를 불러오는 데 실패했습니다.", err);
                setSettlementData([]);
            }
        };

        fetchSettlementData();
    }, []);

    // formatCurrency, getStatusColor 함수도 여기서 정의하거나 TablePayments에 전달
    const formatCurrency = (value) =>
        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const getStatusColor = (status) => {
        switch (status) {
            case "지급완료":
                return "bg-green-100 text-green-800";
            case "지급대기":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl rounded p-6">
                <div className="min-h-screen bg-gray-50">
                    <div className="border-b">
                        <div className="max-w-7xl mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">정산 관리</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-8 mr-8 gap-4 justify-end">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        >
                            <option>이번달</option>
                            <option>지난달</option>
                            <option>최근 3개월</option>
                        </select>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Stats Cards */}
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : stats && stats.totalPayment !== undefined ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {/* 총 결제금액 */}
                            <StatsCard
                                title="총 결제금액"
                                value={`₩${formatCurrency(stats.totalPayment)}`}
                                icon={DollarSign}
                                iconColor="text-blue-600"
                                bgColor="bg-blue-100"
                            />
                            <StatsCard
                                title="멘토 정산금액 (70%)"
                                value={`₩${formatCurrency(stats.mentorShare)}`}
                                icon={Users}
                                iconColor="text-green-600"
                                bgColor="bg-green-100"
                            />
                            <StatsCard
                                title="관리자 정산금액 (30%)"
                                value={`₩${formatCurrency(stats.adminShare)}`}
                                icon={CreditCard}
                                iconColor="text-blue-600"
                                bgColor="bg-blue-100"
                            />
                            <StatsCard
                                title="정산 대기금액"
                                value={`₩${formatCurrency(stats.pendingAmount)}`}
                                icon={AlertTriangle}
                                iconColor="text-orange-600"
                                bgColor="bg-orange-100"
                            />
                        </div>
                        ) : (
                            <p>데이터 없음</p>
                        )}

                        {/* Settlement Table */}
                        <TablePayments
                            settlementData={currentPageData}
                            formatCurrency={formatCurrency}
                            getStatusColor={getStatusColor}/>

                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalItems={settlementData.length}
                            usersPerPage={usersPerPage}/>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettlementPage;