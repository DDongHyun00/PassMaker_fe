import React from 'react';

const ReportsInfo = () => {
    return(
        <div className="p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">신고 정보</h3>

            <div className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-sm text-gray-500">신고자</div>
                        <div className="font-medium">김지혜</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">신고일</div>
                        <div className="font-medium">2023년 10월 14일 14:23</div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-sm text-gray-500">신고 사유</div>
                    <div className="font-medium">영업방해 / 허위사실 유포</div>
                </div>

                <div className="text-sm text-gray-700">
                    해당 리뷰는 사업자의 이익을 해치는 동정방어 입니다라고. 저는 이는 마음을 배려한 성실한 방역사위 안전처분다. 해당 및
                    직원의 성실한 업무처리다. 다음 방역기 해제 및 재신된 거쳐서 임시사항 돌 주님쪽 연락하여 연락하며
                    관련 집업방심사위의 출입문 집체 심정처리제도 외각처리다. 회정 사치 시정제빈 이쪽 집 내년에는
                    감사 이러던 정상처리다.
                </div>
            </div>
        </div>
    )
}
export default ReportsInfo;