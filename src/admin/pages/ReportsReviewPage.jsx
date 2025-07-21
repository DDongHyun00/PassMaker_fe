import React, {useState, useEffect} from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";

import Pagination from "../common/Pagination.jsx";
import ReportTable from "../components/reportsReview/ReportTable.jsx";

import FilterBar from "../components/reportsReview/FilterBar.jsx";

const ReportsReviewPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체 상태');
    const [typeFilter, setTypeFilter] = useState('전체 사유');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10; // 한 페이지당 보여줄 개수

    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('전체 상태');
        setTypeFilter('전체 사유');
        setCurrentPage(1); // 페이지도 초기화
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const handleUpdate = (e) => {
            setTotalItems(e.detail);
        };
        window.addEventListener('updateTotalItems', handleUpdate);
        return () => window.removeEventListener('updateTotalItems', handleUpdate);
    }, []);

    return (
    <div className="w-full fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
        <div className="w-full max-w-7xl  rounded p-6">
    <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-8">
                <div>
                        <h1 className="text-2xl font-bold text-gray-900">신고된 리뷰 목록</h1>
                        <p className=" mt-2 opacity-90">
                            멘토가 신고한 리뷰 목록을 확인하고 처리할 수 있습니다.
                        </p>
                </div>
            </div>
            <FilterBar
                searchText={searchText}
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                resetFilters={resetFilters}/>
            <ReportTable
                searchText={searchText}
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage} />
            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}/>
        </div>
        <Footer />
    </div>
        </div>
    </div>
    );
};

export default ReportsReviewPage;