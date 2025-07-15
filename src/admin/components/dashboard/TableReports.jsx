import React from "react";
import {Link} from "react-router-dom";

const TableReports = ({ data, title }) => (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border">
        <div className="w-full flex text-between justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex-grow">{title}</h3>
            <Link to="/admin/report-review" className="text-blue-600 text-sm">
                더보기
            </Link>
        </div>
        <div className="w-full">
            <table className=" w-full text-sm table-fixed">
                <thead>
                <tr className="border-b">
                    <th className="w-1/4 py-2 ">결제ID</th>
                    <th className="w-1/4 py-2 ">멘토</th>
                    <th className="w-1/4 py-2 ">멘티</th>
                    <th className="w-1/4 py-2 ">결제금액</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b">
                        <td className="w-1/4 text-center py-2">{item.id}</td>
                        <td className="w-1/4 text-center py-2">{item.mentor}</td>
                        <td className="w-1/4 text-center py-2">{item.mentee}</td>
                        <td className="w-1/4 text-center py-2">{item.amount}</td>

                        {/*<td className="py-2">*/}
                        {/*    <span className={`px-2 py-1 rounded-full text-xs ${*/}
                        {/*        item.status === '정상' ? 'bg-green-100 text-green-800' :*/}
                        {/*            item.status === '대기' ? 'bg-yellow-100 text-yellow-800' :*/}
                        {/*                'bg-red-100 text-red-800'*/}
                        {/*    }`}>*/}
                        {/*      {item.status}*/}
                        {/*    </span>*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default TableReports;