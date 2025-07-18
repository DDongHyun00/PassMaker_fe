import React from 'react';
import {Bell, ChevronDown, Search, LayoutDashboard } from "lucide-react";

const Header = () => {
    return (
        <header className="border-b ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center space-x-2">
                            <LayoutDashboard />
                            <span className="text-lg font-semibold text-gray-900">관리자 대시보드</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/*<div className="relative">*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        placeholder="검색어를 입력하세요"*/}
                        {/*        className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">*/}
                        {/*    유저 관리*/}
                        {/*</button>*/}

                        {/*<button className="p-2 text-gray-400 hover:text-gray-500">*/}
                        {/*    <Bell className="h-5 w-5" />*/}
                        {/*</button>*/}

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">김관리</span>
                            <span className="text-xs text-gray-500">시스템 관리자</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;