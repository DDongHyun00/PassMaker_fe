import React, {useState} from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import Filter from '../components/userList/Filter.jsx';
import UserTable from '../components/userList/UserTable.jsx';
import Pagination from '../common/Pagination.jsx';
import { Plus } from 'lucide-react';

const UserListPage = () => {
    const [users, setUsers] = useState([
        {
            id: 1001,
            name: '김지훈',
            email: 'jihoon.kim@example.com',
            type: '멘티',
            status: '활동중',
            joinDate: '2023-05-12',
            lastAccess: '2023-11-28',
            actions: '작업'
        },
        {
            id: 1002,
            name: '이수진',
            email: 'sujin.lee@example.com',
            type: '멘티',
            status: '비활동중',
            joinDate: '2023-06-03',
            lastAccess: '2023-11-25',
            actions: '작업'
        },
        {
            id: 1003,
            name: '박민준',
            email: 'minjun.park@example.com',
            type: '멘토',
            status: '정지중',
            joinDate: '2023-04-18',
            lastAccess: '2023-10-05',
            actions: '작업'
        },
        {
            id: 1004,
            name: '최서연',
            email: 'seoyeon.choi@example.com',
            type: '멘티',
            status: '활동중',
            joinDate: '2023-07-22',
            lastAccess: '2023-11-27',
            actions: '작업'
        },
        {
            id: 1005,
            name: '정다은',
            email: 'daeun.jung@example.com',
            type: '멘토',
            status: '활동중',
            joinDate: '2023-03-15',
            lastAccess: '2023-11-29',
            actions: '작업'
        }
    ]);

    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('모든 상태');
    const [typeFilter, setTypeFilter] = useState('모든 유형');
    const [sortOrder, setSortOrder] = useState('가입일순');
    const [currentPage, setCurrentPage] = useState(1);
    const totalUsers = 23;
    const usersPerPage = 10;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('모든 상태');
        setTypeFilter('모든 유형');
        setSortOrder('가입일순');
        setCurrentPage(1);
    };

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="h-screen w-full mx-auto bg-gray-50 flex flex-col">
                <Header />
            <div className="flex-glow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">전체 유저 목록</h1>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                                <Plus className="h-4 w-4" />
                                <span>새 유저 추가</span>
                            </button>
                        </div>
                        <Filter
                            searchText={searchText}
                            setSearchText={setSearchText}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            resetFilters={resetFilters}/>
                        <UserTable
                            users={users}
                            searchText={searchText}
                            statusFilter={statusFilter}
                            typeFilter={typeFilter}
                            sortOrder={sortOrder}
                            currentPage={currentPage}
                            usersPerPage={usersPerPage}/>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>
                <Footer />
        </div>
            </div>
        </div>
    );
};

export default UserListPage;
