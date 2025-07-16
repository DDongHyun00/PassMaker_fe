import React from 'react';
import { Link } from "react-router-dom";

const ApplicationTable = ({applications =[], searchText, statusFilter, typeFilter}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case '승인': return 'bg-green-100 text-green-800';
            case '대기': return 'bg-yellow-100 text-yellow-800';
            case '거부': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplications = applications.filter((application) => {
        const keyword = (searchText || '').toLowerCase();

        const matchSearch =
            !keyword ||
            application.name?.toLowerCase().includes(keyword) ||
            application.email?.toLowerCase().includes(keyword);

        const matchStatus =
            statusFilter === '전체 상태' ||
            ((application.status?? '').trim() === statusFilter?.trim());

        const matchField =
            typeFilter === '전체 분야' ||
            application.field?.toLowerCase().includes(typeFilter?.toLowerCase());

        return matchSearch && matchStatus && matchField;
    });

    return(
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border ">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신청번호
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신청일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이름
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이메일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            분야
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            처리일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.applicationDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.email}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.field}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.processedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link
                                    to={`/admin/mentor-application/${app.id}`}
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
    )
}

export default ApplicationTable;