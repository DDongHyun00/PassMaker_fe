import React,{ useState } from "react";
import {CheckCircle, XCircle} from "lucide-react";
import axios from "axios";

const Blindness = ({ reportReviewId }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");

    const handleApprove = async () => {
        setLoading(true);
        try {
            await axios.patch(`/admin/report-review/${reportReviewId}?status=REVIEWED`);
            alert('신고 처리가 승인되었습니다.');
        } catch (error) {
            setErrorMessage('승인 처리 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason || rejectionReason.trim() === "") {
            alert("반려 사유를 입력해 주세요.");
            return;
        }
        setLoading(true);
        try {
            await axios.patch(`/admin/report-review/${reportReviewId}?status=REJECTED&reason=${encodeURIComponent(rejectionReason)}`);
            alert('신고 처리가 반려되었습니다.');
        } catch (error) {
            setErrorMessage('반려 처리 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="w-96 h-50 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">블라인드 승인 여부</h2>
            <div className="w-full space-y-4">
                <div className=" bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <textarea
                        className="text-gray-700 resize-none w-full focus:outline-none"
                        placeholder="리뷰 신고를 반려하시는 경우, 반려 사유를 필수로 작성하셔야합니다."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}>
                    </textarea>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-6">
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        <CheckCircle className="mr-2" size={18} />
                        {loading ? "승인 중..." : "승인하기"}
                    </button>
                    <button
                        onClick={handleReject}
                        disabled={loading}
                        className="flex items-center justify-center bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                        <XCircle className="mr-2" size={18} />
                        {loading ? "반려 중..." : "반려하기"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blindness;