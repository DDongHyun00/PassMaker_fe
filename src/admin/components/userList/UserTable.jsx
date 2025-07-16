import React from 'react';
import { Link } from "react-router-dom";

const UserTable = ({users, searchText, statusFilter, roleFilter, sortOrder, currentPage, usersPerPage}) => {
    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case '활동회원':
                return `${baseClasses} bg-green-100 text-green-800`;
            case '탈퇴회원':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            case '블랙리스트':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getTypeBadge = (type) => {
        const base = "px-2 py-1 rounded-full text-xs font-medium";
        if (type === '멘토') return `${base} bg-blue-100 text-blue-800`;
        if (type === '멘티') return `${base} bg-purple-100 text-purple-800`;
        return null;
    };

    const filteredUsers = users.filter(user => {
        const name = (user.name || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        const search = (searchText || '').toLowerCase();

        return (
            name.includes(search) ||
            email.includes(search)
        );
    });

    const statusFiltered = statusFilter === '모든 상태'
        ? filteredUsers
        : filteredUsers.filter(user => user.status === statusFilter);

    const roleFiltered = roleFilter === '모든 유형'
        ? statusFiltered
        : statusFiltered.filter(user => user.type === roleFilter);

    const sortedUsers = [...roleFiltered].sort((a, b) => {
        if (sortOrder === '가입일순') {
            return new Date(b.joinDate) - new Date(a.joinDate);
        }
        if (sortOrder === '이름순') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const startIndex = (currentPage -1)*usersPerPage;
    const pageUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                        </th>
                        <th className="w-16 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">이름</th>
                        <th className="w-64 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">이메일</th>
                        <th className="w-20 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">유형</th>
                        <th className="w-20 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                        <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">가입일</th>
                        <th className="w-20 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">관리</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {pageUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="w-12 px-4 py-3 text-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            </td>
                            <td className="w-16 px-4 py-3 text-center text-sm text-gray-900">{user.id}</td>
                            <td className="w-24 px-4 py-3 text-center">
                                <div className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                                    {user.name}
                                </div>
                            </td>
                            <td className="w-64 px-4 py-3 text-sm text-center text-gray-900">{user.email}</td>
                            <td className="w-20 px-4 py-3 text-center">
                                <span className={getTypeBadge(user.type)}>{user.type}</span>
                            </td>
                            <td className="w-20 px-4 py-3 text-center">
                                <span className={getStatusBadge(user.status)}>{user.status}</span>
                            </td>
                            <td className="w-24 px-4 py-3 text-sm text-center text-gray-900">{user.joinDate}</td>
                            <td className="w-20 px-4 py-3 text-center text-sm text-gray-900">
                                <Link to={`/admin/users/${user.id}`} className="text-blue-600 hover:text-blue-500">상세보기</Link>
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