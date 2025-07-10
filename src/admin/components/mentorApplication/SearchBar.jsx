import React, {useState} from 'react';
import {ChevronDown, Search} from "lucide-react";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체 분야');
    const [status, setStatus] = useState('전체 상태');

        return(
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                    {/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
                    <input
                        type="text"
                        placeholder="이름이나 이메일 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>전체 분야</option>
                        <option>개발</option>
                        <option>디자인</option>
                        <option>마케팅</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>전체 상태</option>
                        <option>승인</option>
                        <option>대기</option>
                        <option>거부</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                    필터초기화
                </button>

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                    엑셀 다운로드
                </button>

            </div>
        </div>
    )
}
export default SearchBar;