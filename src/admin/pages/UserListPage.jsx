import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import Filter from '../components/userList/Filter.jsx';
import UserTable from '../components/userList/UserTable.jsx';
import Pagination from '../common/Pagination.jsx';
import { Plus } from 'lucide-react';

const UserListPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('모든 상태');
    const [sortOrder, setSortOrder] = useState('가입일순');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const [users, setUsers] = useState([]); // 선언되어 있어야 함
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [roleFilter, setRoleFilter] = useState('모든 유형');

    const roleParam = roleFilter === '모든 유형'
        ? ''
        : (roleFilter === '멘토' ? 'MENTOR' : 'MENTEE');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/admin/users', {
                params: {
                    name: searchName || '',
                    nickname: '',
                    role: roleParam,
                    sortOrder,
                    page: currentPage - 1,
                    size: usersPerPage,
                },
            });
            setUsers(response.data.content); // Page 객체의 content
            setTotalUsers(response.data.totalElements); // 전체 개수
        } catch (error) {
            console.error('유저 목록 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchName, roleFilter, sortOrder, currentPage]);

    const resetFilters = () => {
        setSearchText('');
        setStatusFilter('모든 상태');
        setRoleFilter('모든 유형');
        setSortOrder('가입일순');
        setCurrentPage(1);
    };
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
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
                            searchText={searchName}
                            setSearchText={setSearchName}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            roleFilter={roleFilter}
                            setRoleFilter={setRoleFilter}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            resetFilters={resetFilters}/>
                        <UserTable
                            users={users}
                            searchText={searchText}
                            statusFilter={statusFilter}
                            roleFilter={roleFilter}
                            sortOrder={sortOrder}
                            currentPage={currentPage}
                            usersPerPage={usersPerPage}/>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalItems={totalUsers}
                            usersPerPage={usersPerPage}
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
