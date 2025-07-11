import React, {useState} from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import MentorChart from "../components/mentorApplication/MentorChart.jsx";
import ApplicationStatus from "../components/mentorApplication/ApplicationStatus.jsx";
import ApplicationTable from "../components/mentorApplication/ApplicationTable.jsx";
import SearchBar from "../components/mentorApplication/SearchBar.jsx";
import Pagination from "../common/Pagination.jsx";

const MentorApplicationPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체 상태');
    const [typeFilter, setTypeFilter] = useState('전체 분야');
    const [sortOrder, setSortOrder] = useState('최신순');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [applications, setApplications] = React.useState([
        {
            id: 'MN-2023-0002',
            applicationDate: '2025-05-14',
            name: '박민수',
            email: 'minsu.park@email.com',
            field: '개발',
            experience: '3년',
            status: '승인',
            processedDate: '2023-5-15'
        },
        {
            id: 'MN-2023-0003',
            applicationDate: '2025-06-13',
            name: '김하늘',
            email: 'haneul.kim@email.com',
            field: '디자인',
            experience: '5년',
            status: '대기',
            processedDate: '2023-9-14'
        },
        {
            id: 'MN-2023-0004',
            applicationDate: '2025-06-12',
            name: '이준호',
            email: 'junho.lee@email.com',
            field: '마케팅',
            experience: '2년',
            status: '거부',
            processedDate: ''
        },
        {
            id: 'MN-2023-0005',
            applicationDate: '2025-07-10',
            name: '최서연',
            email: 'seoyeon.choi@email.com',
            field: '개발/웹',
            experience: '4년',
            status: '승인',
            processedDate: '2023-11-11'
        },
        {
            id: 'MN-2023-0006',
            applicationDate: '2025-07-10',
            name: '정민규',
            email: 'mingyu.jung@email.com',
            field: '데이터',
            experience: '7년',
            status: '대기',
            processedDate: ''
        }
    ]);

    const filteredApplications = applications.filter(app => {
        const keyword = searchText.toLowerCase();
        const matchSearch = app.name.toLowerCase().includes(keyword)
            || app.email.toLowerCase().includes(keyword)
            || app.id.toLowerCase().includes(keyword);

        const matchStatus = statusFilter === '전체 상태' || app.status === statusFilter;
        const matchField = typeFilter === '전체 분야' || app.field.includes(typeFilter);

        return matchSearch && matchStatus && matchField;
    });

    const totalPages = Math.ceil(filteredApplications.length / usersPerPage);

    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('전체 상태');
        setTypeFilter('전체 분야');
        setSortOrder('최신순');
        setCurrentPage(1);
    };

    return(
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50">
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

                        <SearchBar
                            searchText={searchText}
                            setSearchText={setSearchText}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            resetFilters={resetFilters}/>
                        <ApplicationTable
                            applications={applications}
                            searchText={searchText}
                            statusFilter={statusFilter}
                            typeFilter={typeFilter}
                            currentPage={currentPage}
                            usersPerPage={usersPerPage}/>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalItems={filteredApplications.length}
                            usersPerPage={usersPerPage}
                            applications={applications}
                            searchText={searchText}
                            statusFilter={statusFilter}
                            typeFilter={typeFilter}/>
                        <ApplicationStatus applications={applications} />
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