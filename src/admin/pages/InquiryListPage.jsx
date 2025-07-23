import React, {useState, useEffect} from 'react';
import axios from "../../common/lib/axios.js";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import InquiryTable from "../components/inquiryList/InquiryTable.jsx";
import Search from "../components/inquiryList/Search.jsx"
import Pagination from "../common/Pagination.jsx";

const InquiryListPage = () => {
    const [searchText, setSearchText] = useState("");
    const [typeFilter, setTypeFilter] = useState("전체 구분");
    const [statusFilter, setStatusFilter] = useState("전체 상태");
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/admin/inquiries', {
                params: {
                    searchText,
                    status: statusFilter,
                    type: typeFilter,
                    page: currentPage - 1,
                    size: itemsPerPage
                }
            });
            setInquiries(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalItems(res.data.totalElements);
        } catch (err) {
            console.error('문의 목록 요청 실패:', err);
            setError('문의 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [searchText, typeFilter, statusFilter, currentPage]);

    const resetFilters = () => {
        setSearchText("");
        setStatusFilter("전체 상태");
        setTypeFilter("전체 구분");
        setCurrentPage(1);
    };

    if (loading) return <div className="text-center p-10">로딩 중...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50">
            <Header />
            <div className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">1:1 문의 목록</h1>
                    <p className="text-gray-600">
                        사용자가 보낸 1:1 문의 목록을 확인하고 답변할 수 있습니다.
                    </p>
                    </div>

                </div>
                <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    resetFilters={resetFilters}/>
                <InquiryTable
                    inquiries={inquiries}/>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    usersPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}/>

            </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default InquiryListPage;