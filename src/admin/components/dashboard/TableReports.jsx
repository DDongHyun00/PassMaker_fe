import React from "react";
import {Link} from "react-router-dom";

const TableReports = ({ data, title }) => (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border">
        <div className="w-full flex text-between justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex-grow">{title}</h3>
            {/*<Link to="/admin/report-review" className="text-blue-600 text-sm">*/}
            {/*    더보기*/}
            {/*</Link>*/}
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
                        <td className="w-1/4 text-center py-2">{item.payId}</td>
                        <td className="w-1/4 text-center py-2">{item.mentorName}</td>
                        <td className="w-1/4 text-center py-2">{item.userName}</td>
                        <td className="w-1/4 text-center py-2">{item.amount.toLocaleString()}원</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default TableReports;