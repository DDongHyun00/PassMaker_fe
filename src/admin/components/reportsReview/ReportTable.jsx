import React from "react";

const ReportTable = () => {

    const TableHeader = () => {
        return (
            <div className="bg-gray-50 border-b">
                <div className="grid grid-cols-12 gap-4 py-3 px-4 text-sm font-medium text-gray-700">
                    <div className="col-span-1">No.</div>
                    <div className="col-span-2">리뷰 ID</div>
                    <div className="col-span-1">작성자</div>
                    <div className="col-span-3">리뷰 내용</div>
                    <div className="col-span-1">신고 사유</div>
                    <div className="col-span-1">신고 접수</div>
                    <div className="col-span-1">신고일</div>
                    <div className="col-span-1">상태</div>
                    <div className="col-span-1">관리</div>
                </div>
            </div>
        );
    };

// Table Row Component
    const TableRow = ({ no, reviewId, author, content, reason, reports, date, status, isProcessed }) => {
        return (
            <div className="border-b hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 py-4 px-4 text-sm">
                    <div className="col-span-1">{no}</div>
                    <div className="col-span-2 text-blue-600">{reviewId}</div>
                    <div className="col-span-1">{author}</div>
                    <div className="col-span-3 text-gray-600">{content}</div>
                    <div className="col-span-1">
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            {reason}
          </span>
                    </div>
                    <div className="col-span-1">
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
            {reports}
          </span>
                    </div>
                    <div className="col-span-1">{date}</div>
                    <div className="col-span-1">
          <span className={`px-2 py-1 rounded-full text-xs ${
              isProcessed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
                    </div>
                    <div className="col-span-1">
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                            상세보기
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const reportData = [
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
            status: '처리중',
            isProcessed: false
        },
        {
            no: 3,
            reviewId: 'REV-2023-10-12-018',
            author: '이수민',
            content: '배송이 너무 시니적을 서로 아직것고. 네팜들 질은 높네요. 다음 취워내영능공익 맘은 회부터 구매해월 것의...',
            reason: '스팸',
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
            reason: '허위정보',
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