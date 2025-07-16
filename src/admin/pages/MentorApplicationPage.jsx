import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import MentorChart from "../components/mentorApplication/MentorChart.jsx";
import ApplicationStatus from "../components/mentorApplication/ApplicationStatus.jsx";
import ApplicationTable from "../components/mentorApplication/ApplicationTable.jsx";
import SearchBar from "../components/mentorApplication/SearchBar.jsx";
import Pagination from "../common/Pagination.jsx";

const MentorApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체 상태');
    const [typeFilter, setTypeFilter] = useState('전체 분야');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const translateStatus = (status) => {
        switch (status) {
            case 'APPROVED': return '승인';
            case 'PENDING': return '대기';
            case 'REJECTED': return '거부';
            default: return '기타';
        }
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/mentor-application', {
                    params: {
                        searchText,
                        status: statusFilter === '전체 상태' ? '' : statusFilter,
                        type: typeFilter  === '전체 분야' ? '' : typeFilter,
                        page: currentPage - 1, // 백엔드는 0부터 시작
                        size: usersPerPage
                    }
                });

                const mapped = response.data.map(item => ({
                    id: item.applyId, // 실제 ID 포맷 조정
                    name: item.name,
                    email: item.email,
                    field: item.fields.join('/'), // ["개발", "디자인"] → "개발/디자인"
                    experience: item.experiences.join(', '), // ["3년", "5년"] → "3년, 5년"
                    status: translateStatus(item.status), // 영어 상태 → 한글로 변경
                    applicationDate: item.applicationDate?.split('T')[0], // 날짜 포맷 정리
                    processedDate: item.processedDate?.split('T')[0] || '' // null 처리
                }));

                setApplications(mapped);
                setError(null);
            } catch (err) {
                console.error('데이터 요청 실패:', err);
                setError('멘토 신청 목록을 불러오는 데 실패했습니다.');
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [searchText, statusFilter, typeFilter, currentPage]);

    const totalPages = Math.ceil(applications.length / usersPerPage);

    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('전체 상태');
        setTypeFilter('전체 분야');
        setCurrentPage(1);
    };

    if (loading) return <div className="text-center p-10">로딩 중...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return(
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 신청 현황</h1>
                            <p className="text-gray-600">멘토 신청자를 확인하고 승인 여부를 결정할 수 있습니다</p>
                        </div>
                        <ApplicationStatus
                            applications={applications} />
                        <SearchBar
                            searchText={searchText}
                            setSearchText={setSearchText}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            resetFilters={resetFilters}/>
                        <ApplicationTable
                            applications={applications}
                            searchText={searchText}
                            statusFilter={statusFilter}
                            typeFilter={typeFilter}
                            />
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalItems={applications.length}
                            usersPerPage={usersPerPage} />

                        <MentorChart applications={applications} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default MentorApplicationPage;