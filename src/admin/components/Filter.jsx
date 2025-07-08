import React from 'react';
//import { Search } from 'lucide-react';

const Filter = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="이름, 이메일 또는 ID로 검색"
                            className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/*<Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />*/}
                    </div>

                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>모든 상태</option>
                        <option>활성</option>
                        <option>비활성</option>
                    </select>

                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>모든 유형</option>
                        <option>관리자</option>
                        <option>멤버</option>
                    </select>

                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>가입일순</option>
                        <option>이름순</option>
                        <option>최근 접속순</option>
                    </select>

                    <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        필터 초기화
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">엑셀 다운로드</span>
                </div>
            </div>
        </div>
    );
};

export default Filter;