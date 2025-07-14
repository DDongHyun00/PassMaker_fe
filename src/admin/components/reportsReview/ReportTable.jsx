import React from "react";
import {Link} from "react-router-dom";

const ReportTable = ({ searchText, statusFilter, typeFilter}) => {

    const [reports, setReports] = React.useState([
        {
            no: 1,
            reviewId: 'REV-2023-10-15-001',
            author: '김철수',
            content: '이 제품은 정말 좋습니다 집안 생활에 도움이 됩니다. 사고 방심하지 말고 날씨에 좋아서 뭔가 추천합니다. 허재혁기...',
            reason: '허위',
            reports: '3건',
            date: '2023-10-15',
            status: '처리중',
            isProcessed: false
        },
        {
            no: 2,
            reviewId: 'REV-2023-10-14-005',
            author: '박지영',
            content: '이 제품은 정말 사랑합니다. 끝고에 져웠 나같은 사람들한테 좋네요. 회원들 제습동무관 때문에 추천합니다만...',
            reason: '광고',
            reports: '2건',
            date: '2023-10-14',
            status: '처리완료',
            isProcessed: false
        },
        {
            no: 3,
            reviewId: 'REV-2023-10-12-018',
            author: '이수민',
            content: '배송이 너무 시니적을 서로 아직것고. 네팜들 질은 높네요. 다음 취워내영능공익 맘은 회부터 구매해월 것의...',
            reason: '비방/욕설',
            reports: '1건',
            date: '2023-10-12',
            status: '대기',
            isProcessed: false
        },
        {
            no: 4,
            reviewId: 'REV-2023-10-10-007',
            author: '정민호',
            content: '이 제품은 저희집의 없는데는 잘네요 추천합니다. 손님때 굉장히 의한업지나 튜림케이터 내피회점입니다.',
            reason: '허위',
            reports: '4건',
            date: '2023-10-10',
            status: '처리중',
            isProcessed: false
        },
        {
            no: 5,
            reviewId: 'REV-2023-10-08-022',
            author: '한서연',
            content: '상품 내용이 된다해서 공주호 문의 등 음는 사쁘품 나나늬 투지들 추천징. 번이승의 저작권 좀됨 원년기...',
            reason: '기타',
            reports: '2건',
            date: '2023-10-08',
            status: '대기',
            isProcessed: false
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case '처리중': return 'bg-green-100 text-green-800';
            case '대기': return 'bg-yellow-100 text-yellow-800';
            case '처리완료': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredReport = reports.filter((rep) => {
        const keyword = searchText.toLowerCase();

        const matchSearch = rep.author.toLowerCase().includes(keyword)
            || rep.reviewId.toLowerCase().includes(keyword)
            || rep.content.toLowerCase().includes(keyword);

        const matchStatus = statusFilter === '전체 상태' || rep.status === statusFilter;
        const matchType = typeFilter === '전체 사유' || rep.reason === typeFilter;

        return matchSearch && matchStatus && matchType;
    });

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };


    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm border ">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            리뷰 ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            작성자
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            리뷰 내용
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신고 사유
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신고 건수
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            신고일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            관리
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReport.map((rep) => (
                        <tr key={rep.no} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.no}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                {rep.reviewId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[250px] truncate">
                                {truncateText(rep.content)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800">
                                {rep.reason}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-800">
                                {rep.reports}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {rep.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rep.status)}`}>
                    {rep.status}
                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link
                                    to="/admin/report-review/id"
                                    className="text-blue-600 hover:text-blue-500">
                                    상세보기
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>

        // <div className="bg-white border rounded-lg m-4">
        //     <TableHeader />
        //     {reportData.map((report) => (
        //         <TableRow key={report.no} {...report} />
        //     ))}
        // </div>
    );
};

export default ReportTable;