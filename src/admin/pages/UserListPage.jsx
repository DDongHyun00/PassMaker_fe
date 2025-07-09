import React from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import Filter from '../components/userList/Filter.jsx';
import UserTable from '../components/userList/UserTable.jsx';
import Pagination from '../common/Pagination.jsx';
import { Plus } from 'lucide-react';

const UserListPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 ">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">전체 유저 목록</h1>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                                <Plus className="h-4 w-4" />
                                <span>새 유저 추가</span>
                            </button>
                        </div>
                    <Filter />
                    <UserTable />
                    <Pagination />
                </div>

                <Footer />
        </div>
    );
};

export default UserListPage;
