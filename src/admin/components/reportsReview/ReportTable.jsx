import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ReportTable = ({ searchText, statusFilter, typeFilter, currentPage, itemsPerPage}) => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/admin/report-review", {
            params: {
                keyword: searchText,
                status: statusFilter,
                category: typeFilter
            }
        })
            .then((res) => {
                const data = res.data.map((item, index) => ({
                    no: index + 1,
                    reviewId: item.reviewId,
                    author: item.author,
                    content: item.content,
                    category: item.category,
                    date: item.date,
                    status: item.status,
                    id: item.id // 상세 페이지 링크용
                }));
                setReports(data);
            })
            .catch((err) => {
                console.error("신고 리뷰 불러오기 실패:", err);
            });
    }, [searchText, statusFilter, typeFilter]);

    const filteredReport = reports.filter((rep) => {
        const keyword = searchText.toLowerCase();
        return (
            (rep.author.toLowerCase().includes(keyword) ||
                rep.reviewId.toLowerCase().includes(keyword) ||
                rep.content.toLowerCase().includes(keyword)) &&
            (statusFilter === '전체 상태' || rep.status === statusFilter) &&
            (typeFilter === '전체 사유' || rep.category === typeFilter)
        );
    });

    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedReports = filteredReport.slice(startIdx, startIdx + itemsPerPage);

    useEffect(() => {
        const event = new CustomEvent('updateTotalItems', { detail: filteredReport.length });
        window.dispatchEvent(event);
    }, [filteredReport.length]);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case '비방, 욕설':
                return 'bg-red-100 text-red-800';
            case '허위정보':
                return 'bg-yellow-100 text-yellow-800';
            case '광고':
                return 'bg-orange-100 text-orange-800';
            case '기타':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case '처리중': return 'bg-green-100 text-green-800';
            case '대기': return 'bg-yellow-100 text-yellow-800';
            case '처리완료': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border ">
            <div className="overflow-x-auto">
                <table className="min-w-full w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50 text-center">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            리뷰 ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작성자
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            리뷰 내용
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신고 사유
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신고일
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {filteredReport.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-8 text-gray-500">
                                신고된 리뷰가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        filteredReport.map((rep) => (
                        <tr key={rep.no} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.no}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.reviewId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[250px] truncate">
                                {truncateText(rep.content,100)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(rep.category)}`}>
                                    {rep.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rep.status)}`}>
                                    {rep.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link
                                    to={`/admin/report-review/${rep.id}`}
                                    className="text-blue-600 hover:text-blue-500">
                                    상세보기
                                </Link>
                            </td>
                        </tr>
                    )))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ReportTable;