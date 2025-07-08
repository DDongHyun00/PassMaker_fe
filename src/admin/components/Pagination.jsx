import React, { useState } from 'react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    return (
        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">총 23개 유저 중 1-10개 표시</span>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    이전
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm border rounded ${
                            currentPage === page
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    다음
                </button>

                <select className="px-3 py-1 text-sm border rounded">
                    <option>10개씩 보기</option>
                    <option>20개씩 보기</option>
                    <option>50개씩 보기</option>
                </select>
            </div>
        </div>
    );
};
export default Pagination;