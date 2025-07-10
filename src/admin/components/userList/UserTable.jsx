import React from 'react';

const UserTable = ({users, searchText, statusFilter, typeFilter, sortOrder, currentPage, usersPerPage}) => {
    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case '활동중':
                return `${baseClasses} bg-green-100 text-green-800`;
            case '비활동중':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            case '정지중':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getTypeBadge = (type) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (type) {
            case '멘토':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case '멘티':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const filteredUsers = users.filter((user) => {
        const keyword = searchText.toLowerCase();
        return (user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.id.toString().includes(keyword)
        );
    });

    const statusFiltered = statusFilter === '모든 상태'
        ? filteredUsers
        : filteredUsers.filter(user => user.status === statusFilter);

    const typeFiltered = typeFilter === '모든 유형'
        ? statusFiltered
        : statusFiltered.filter(user => user.type === typeFilter);

    const sortedUsers = [...typeFiltered].sort((a, b) => {
        if (sortOrder === '가입일순') {
            return new Date(b.joinDate) - new Date(a.joinDate);
        }
        if (sortOrder === '이름순') {
            return a.name.localeCompare(b.name);
        }
        if (sortOrder === '최근 접속순') {
            return new Date(b.lastAccess) - new Date(a.lastAccess);
        }
        return 0;
    });

    const startIndex = (currentPage -1)*usersPerPage;
    const pageUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

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
                    {pageUsers.map((user) => (
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