import React, { useState } from 'react';

const UserTable = () => {
    const [users, setUsers] = useState([
        {
            id: 1001,
            name: '김지훈',
            email: 'jihoon.kim@example.com',
            type: '멤버',
            status: '활성',
            joinDate: '2023-05-12',
            lastAccess: '2023-11-28',
            actions: '작업'
        },
        {
            id: 1002,
            name: '이수진',
            email: 'sujin.lee@example.com',
            type: '일반 회원',
            status: '활성',
            joinDate: '2023-06-03',
            lastAccess: '2023-11-25',
            actions: '작업'
        },
        {
            id: 1003,
            name: '박민준',
            email: 'minjun.park@example.com',
            type: '멤버',
            status: '경고',
            joinDate: '2023-04-18',
            lastAccess: '2023-10-05',
            actions: '작업'
        },
        {
            id: 1004,
            name: '최서연',
            email: 'seoyeon.choi@example.com',
            type: '일반 회원',
            status: '활성',
            joinDate: '2023-07-22',
            lastAccess: '2023-11-27',
            actions: '작업'
        },
        {
            id: 1005,
            name: '정다은',
            email: 'daeun.jung@example.com',
            type: '관리자',
            status: '활성',
            joinDate: '2023-03-15',
            lastAccess: '2023-11-29',
            actions: '작업'
        }
    ]);

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case '활성':
                return `${baseClasses} bg-green-100 text-green-800`;
            case '경고':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case '비활성':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getTypeBadge = (type) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (type) {
            case '멤버':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case '관리자':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            case '일반 회원':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이름
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이메일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            유형
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            가입일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            최근 접속일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작업
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                                    {user.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getTypeBadge(user.type)}>
                    {user.type}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(user.status)}>
                    {user.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.joinDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.lastAccess}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="text-blue-600 hover:text-blue-500">
                                    관리
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default UserTable;