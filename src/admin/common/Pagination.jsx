import React, { useState } from 'react';

const Pagination = ({currentPage, setCurrentPage, totalPages, totalItems, usersPerPage}) => {
    const startItem = (currentPage -1) * usersPerPage + 1;
    const endItem = Math.min(currentPage * usersPerPage, totalItems);

    return (
        <div className="w-full mx-auto px-6 py-4 flex justify-end mb-8">
            {/*<div className="flex items-center space-x-2">*/}
            {/*    <span className="text-sm text-gray-700">*/}
            {/*        총 {totalItems}명 유저 중 {startItem}-{endItem}명 표시*/}
            {/*    </span>*/}
            {/*</div>*/}

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    이전
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
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
                    );
                })}

                <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
};
export default Pagination;