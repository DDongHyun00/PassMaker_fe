import React, {useState} from "react";

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8;

    return (
        <div className="flex justify-center items-center gap-2 p-4">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={currentPage === 1}
            >
                이전
            </button>

            {[1, 2, 3, 4, 5].map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}

            <span className="px-2">...</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">8</button>

            <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;