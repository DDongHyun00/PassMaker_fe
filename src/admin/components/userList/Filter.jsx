import React from 'react';

const Filter = ({ searchText, setSearchText, statusFilter, setStatusFilter, roleFilter, setRoleFilter, sortOrder, setSortOrder, resetFilters}) => {
    return (
        <div className="w-full mx-auto bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between">
                    <div className="relative flex-shrink-0">
                        <input
                            type="text"
                            placeholder="이름, 이메일 또는 ID로 검색"
                            className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={roleFilter || '모든 유형'}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option>모든 유형</option>
                            <option value="멘토">멘토</option>
                            <option value="멘티">멘티</option>
                        </select>
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>모든 상태</option>
                            <option>활동회원</option>
                            <option>탈퇴회원</option>
                            <option>블랙리스트</option>
                        </select>
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sortOrder}
                            onChange={(e)=> setSortOrder(e.target.value)}
                        >
                            <option>가입일순</option>
                            <option>이름순</option>
                        </select>
                        <button
                            className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={resetFilters}
                        >
                            필터 초기화
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default Filter;