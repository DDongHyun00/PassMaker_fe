import React, {useState} from 'react';
import {ChevronDown, Search} from "lucide-react";

const SearchBar = ({searchText, setSearchText, statusFilter, setStatusFilter, typeFilter, setTypeFilter, sortOrder, setSortOrder, resetFilters}) => {

        return(
        <div className="w-full mx-auto bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between">
                <div className="relative flex-shrink-0">
                    <input
                        type="text"
                        placeholder="이름이나 이메일 검색"
                        className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={typeFilter || '전체 분야'}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>전체 분야</option>
                        <option>개발</option>
                        <option>디자인</option>
                        <option>마케팅</option>
                    </select>
                    {/*<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>전체 상태</option>
                        <option>승인</option>
                        <option>대기</option>
                        <option>거부</option>
                    </select>
                    {/*<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
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
export default SearchBar;