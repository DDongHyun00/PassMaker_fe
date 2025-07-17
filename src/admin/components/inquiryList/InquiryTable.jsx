import React from "react";
import {Link} from "react-router-dom";

const InquiryTable = ({inquiries, searchText, statusFilter, typeFilter}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case '대기':
                return 'bg-yellow-100 text-yellow-800';
            case '처리중':
                return 'bg-green-100 text-green-800';
            case '처리완료':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
    const truncateText = (text, maxLength = 40) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border ">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            문의자
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            문의 제목
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            문의 내용
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            구분
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신청일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {inq.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {inq.inquirer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {inq.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[250px] truncate">
                                {truncateText(inq.content)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {inq.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {inq.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inq.status)}`}>
                        {inq.status}
                      </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link
                                    to={`/admin/inquiries/${inq.id}`}
                                    className="text-blue-600 hover:text-blue-500">
                                    상세보기
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        // <div className="bg-white border rounded-lg m-4">
        //     <TableHeader />
        //     {reportData.map((report) => (
        //         <TableRow key={report.no} {...report} />
        //     ))}
        // </div>
    )
}

export default InquiryTable;