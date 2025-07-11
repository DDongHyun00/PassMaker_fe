import React from "react";

const ReportTable = () => {
    
    const TableHeader = () => {
        return (
            <div className="bg-gray-50 border-b">
                <div className="grid grid-cols-12 gap-4 py-3 px-4 text-sm font-semibold text-gray-700">
                    <div className="col-span-1 text-center">No.</div>
                    <div className="col-span-5">문의 제목</div>
                    <div className="col-span-2">문의자</div>
                    <div className="col-span-2">신청일</div>
                    <div className="col-span-2">상태</div>
                </div>
            </div>
        );
    };

    const TableRow = ({ no, title, inquirer, date, status, isProcessed }) => {
        return (
            <div className="border-b hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 py-4 px-4 text-sm items-center">
                    {/* 번호 */}
                    <div className="col-span-1 text-center text-gray-700 font-medium">{no}</div>

                    {/* 제목 */}
                    <div className="col-span-5 text-gray-900 truncate">{title}</div>

                    {/* 문의자 */}
                    <div className="col-span-2 text-gray-700">{inquirer}</div>

                    {/* 날짜 */}
                    <div className="col-span-2 text-gray-500">{date}</div>

                    {/* 상태 */}
                    <div className="col-span-2">
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold 
                        ${isProcessed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                        {status}
                    </span>
                    </div>
                </div>
            </div>
        );
    };


    const reportData = [
        {
            no: 1,
            title: '궁금해요',
            inquirer: '김철수',
            date: '2023-10-15',
            status: '처리중',
            isProcessed: false
        }
    ];

    return (
        <div className="bg-white border rounded-lg m-4">
            <TableHeader />
            {reportData.map((report) => (
                <TableRow key={report.no} {...report} />
            ))}
        </div>
    );
};

export default ReportTable;