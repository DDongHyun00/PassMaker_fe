import React, {useState} from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import InquiryTable from "../components/inquiryList/InquiryTable.jsx";
import Search from "../components/inquiryList/Search.jsx"
import Pagination from "../common/Pagination.jsx";

const InquiryListPage = () => {
    const [searchText, setSearchText] = useState("");
    const [typeFilter, setTypeFilter] = useState("전체 구분");
    const [statusFilter, setStatusFilter] = useState("전체 상태");
    const [inquiries, setInquiries] = React.useState([
        {
            id: 1,
            title: '제품 문의',
            inquirer: '김철수',
            content: '제품에 대해 궁금한 점이 있습니다. 배송은 얼마나 걸리나요?',
            type: "멘토링",
            date: '2023-10-15',
            status: '처리중',
            isProcessed: false,
        },
        {
            id: 2,
            title: '사용법 질문',
            inquirer: '박지영',
            content: '사용 설명서가 너무 간단해서 자세한 방법이 궁금합니다.',
            type: "기타",
            date: '2023-10-14',
            status: '처리완료',
            isProcessed: true,
        },
        {
            id: 3,
            title: '환불 요청',
            inquirer: '이수민',
            content: '환불을 원합니다. 제품이 기대와 달랐습니다.',
            type: "결제",
            date: '2023-10-12',
            status: '대기',
            isProcessed: false,
        },
        {
            id: 4,
            title: '환불 요청',
            inquirer: '이수민',
            content: '환불을 원합니다. 제품이 기대와 달랐습니다.',
            type: "계정",
            date: '2023-10-12',
            status: '처리중',
            isProcessed: false,
        }
    ]);

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