import React, {useState} from 'react';

const Search = ({
                    searchText,
                    setSearchText,
                    statusFilter,
                    setStatusFilter,
                    typeFilter,
                    setTypeFilter,
                    resetFilters
                }) => {

    return (
        <div className="w-full mx-auto bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between">
                <div className="relative flex-shrink-0">
                    <input
                        type="text"
                        placeholder="이름이나 제목으로 검색"
                        className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={typeFilter || '전체 구분'}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>전체 구분</option>
                        <option>멘토링</option>
                        <option>계정</option>
                        <option>결제</option>
                        <option>기타</option>
                    </select>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>전체 상태</option>
                        <option>대기</option>
                        <option>처리중</option>
                        <option>처리완료</option>
                    </select>
                    <button
                        className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={resetFilters}
                    >
                        필터 초기화
                    </button>
                </div>
                {/*<button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">*/}
                {/*    엑셀 다운로드*/}
                {/*</button>*/}
            </div>
        </div>
    )
}
export default Search;