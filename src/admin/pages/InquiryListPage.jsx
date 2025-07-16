import React, {useState, useEffect} from 'react';
import axios from 'axios';
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

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/admin/inquiries')  // 실제 API 주소로 변경하세요
            .then(response => {
                setInquiries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('문의 목록 불러오기 실패:', error);
                setLoading(false);
            });
    }, []);

    const filteredInquiries = inquiries.filter((inquiry) => {
        const matchesText = inquiry.title.includes(searchText) || inquiry.inquirer.includes(searchText);
        const matchesStatus = statusFilter === '전체 상태' || inquiry.status === statusFilter;
        const matchesType = typeFilter === '전체 구분' || inquiry.type === typeFilter; // 필요하면 나중에

        return matchesText && matchesStatus && matchesType;
    });

    const resetFilters = () => {
        setSearchText("");
        setStatusFilter("전체 상태");
        setTypeFilter("전체 구분");
    };

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
                    inquiries={filteredInquiries}/>
                <Pagination />

            </div>
            </div>
            <Footer />
        </div>
            </div>
        </div>
    );
};

export default InquiryListPage;