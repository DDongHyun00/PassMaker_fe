import React, {useState} from 'react';
import {BarChart3} from "lucide-react";

const ApplicationTable = ({applications =[], searchText, statusFilter, typeFilter, currentPage, usersPerPage}) => {
    // const [applications , setApplications]= useState([
    //     {
    //         id: 'MN-2023-0002',
    //         applicationDate: '2023-11-14',
    //         name: '박민수',
    //         email: 'minsu.park@email.com',
    //         field: '개발',
    //         experience: '3년',
    //         status: '승인',
    //         processedDate: '2023-11-15'
    //     },
    //     {
    //         id: 'MN-2023-0003',
    //         applicationDate: '2023-11-13',
    //         name: '김하늘',
    //         email: 'haneul.kim@email.com',
    //         field: '디자인',
    //         experience: '5년',
    //         status: '대기',
    //         processedDate: '2023-11-14'
    //     },
    //     {
    //         id: 'MN-2023-0004',
    //         applicationDate: '2023-11-12',
    //         name: '이준호',
    //         email: 'junho.lee@email.com',
    //         field: '마케팅',
    //         experience: '2년',
    //         status: '거부',
    //         processedDate: ''
    //     },
    //     {
    //         id: 'MN-2023-0005',
    //         applicationDate: '2023-11-10',
    //         name: '최서연',
    //         email: 'seoyeon.choi@email.com',
    //         field: '개발/웹',
    //         experience: '4년',
    //         status: '승인',
    //         processedDate: '2023-11-11'
    //     },
    //     {
    //         id: 'MN-2023-0006',
    //         applicationDate: '2023-11-10',
    //         name: '정민규',
    //         email: 'mingyu.jung@email.com',
    //         field: '데이터',
    //         experience: '7년',
    //         status: '대기',
    //         processedDate: ''
    //     }
    // ]);

    const totalApplications = applications.length;
    const approvedCount = applications.filter(app => app.status === '승인').length;
    const waitingCount = applications.filter(app => app.status === '대기').length;

    const getStatusColor = (status) => {
        switch (status) {
            case '승인': return 'bg-green-100 text-green-800';
            case '대기': return 'bg-yellow-100 text-yellow-800';
            case '거부': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplications = applications.filter((application) => {
        const keyword = searchText.toLowerCase();

        const matchSearch = application.name.toLowerCase().includes(keyword)
            || application.email.toLowerCase().includes(keyword)
            || application.id.toLowerCase().includes(keyword);

        const matchStatus = statusFilter === '전체 상태' || application.status === statusFilter;
        const matchField = typeFilter === '전체 분야' || application.field.includes(typeFilter); // 부분 일치 허용

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
                            신청자 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            분야
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            경력
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
                                    <div className="text-sm text-blue-600">{app.email}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.field}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {app.experience}
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
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                    상세보기
                                </button>
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