import React, {useState} from "react";
import {AlertTriangle, Search} from "lucide-react";

const SearchSection = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <span className="font-semibold text-yellow-800">신고된 리뷰: 24건</span>
            </div>
            <div className="flex gap-2 mt-3">
                <div className="relative flex-1">
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="검색어 내용 입력"*/}
                    {/*    value={searchTerm}*/}
                    {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
                    {/*    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*/>*/}

                </div>
            </div>
        </div>
    );
};

export default SearchSection;