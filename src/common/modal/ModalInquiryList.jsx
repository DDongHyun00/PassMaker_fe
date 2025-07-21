import React, { useEffect, useState } from "react";
import {
  getMyInquiries,
  getInquiryDetail,
  deleteInquiry,
  updateInquiry,
} from "../lib/inquiryApi";

export default function ModalInquiryList({ onClose }) {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditTitle("");
    setEditContent("");
    setEditId(null);
  };

  useEffect(() => {
    fetchInquiries();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await getMyInquiries();
      setInquiries(res);
    } catch (err) {
      console.log("[🔍오류]", err);
      alert("문의 목록 불러오기 실패");
    }
  };

  const handleSelect = async (id, displayNumber) => {
    setSelected(id);
    setSelectedNumber(displayNumber);
    try {
      const res = await getInquiryDetail(id);
      setDetail(res);
    } catch {
      alert("문의 상세 조회 실패");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteInquiry(id);
      if (selected === id) {
        setSelected(null);
        setDetail(null);
      }
      fetchInquiries();
    } catch {
      alert("삭제 실패");
    }
  };

  const handleUpdate = async () => {
    console.log("수정 요청 확인:", editId, editTitle, editContent);
    try {
      await updateInquiry(editId, {
        inquiryTitle: editTitle,
        inquiryContent: editContent,
      });
      alert("수정 완료");
      setIsEditOpen(false);
      fetchInquiries();
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 실패");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">문의 내역</h2>

        <div className="max-h-64 overflow-y-auto border rounded mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">번호</th>
                <th className="p-2">제목</th>
                <th className="p-2">작성일시</th>
                <th className="p-2">수정</th>
                <th className="p-2">삭제</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inquiries) && inquiries.length > 0 ? (
                inquiries.map((inq, idx) => (
                  <tr key={inq.id}>
                    <td className="p-2 text-center">{idx + 1}</td>
                    <td
                      className="p-2 text-purple-700 hover:underline cursor-pointer"
                      onClick={() => handleSelect(inq.id, idx + 1)}
                    >
                      {inq.inquiryTitle}
                    </td>
                    <td className="p-2 text-center">
                      {new Date(inq.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          setEditId(inq.id);
                          setEditTitle(inq.inquiryTitle);
                          setEditContent(inq.inquiryContent);
                          setSelectedNumber(idx + 1);
                          setIsEditOpen(true);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        수정
                      </button>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-4">
                    문의 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 상세 내용 */}
        {!isEditOpen && detail && (
          <div className="bg-gray-50 p-4 border rounded mt-6">
            <p className="text-sm font-medium mb-1">문의 번호:</p>
            <p className="mb-3">{selectedNumber}</p>

            <p className="text-sm font-medium mb-1">문의 제목:</p>
            <p className="mb-3">{detail.inquiryTitle}</p>

            <p className="text-sm font-medium mb-1">문의 내용:</p>
            <p className="mb-3 whitespace-pre-wrap">{detail.inquiryContent}</p>

            <p className="text-sm font-medium mb-1">작성 일시:</p>
            <p>
              {new Date(detail.createdAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* 답변 정보 표시 추가 */}
            <hr className="my-4" />
            <p className="text-sm font-bold mb-2 text-purple-700">관리자 답변</p>

            {detail.respondTitle || detail.respondContent ? (
                <>
                  <p className="text-sm font-medium mb-1">답변 제목:</p>
                  <p className="mb-2">{detail.respondTitle || "(제목 없음)"}</p>

                  <p className="text-sm font-medium mb-1">답변 내용:</p>
                  <p className="whitespace-pre-wrap">{detail.respondContent || "(내용 없음)"}</p>
                </>
            ) : (
                <p className="text-gray-500 italic">아직 답변이 등록되지 않았습니다.</p>
            )}

          </div>
        )}

        {/* 수정 모달 */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">문의 수정</h2>

              {/* 글 번호 표시 (읽기 전용) */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">글 번호</p>
                <p className="text-md">{selectedNumber}</p>
              </div>

              {/* 제목 */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">제목</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              {/* 내용 */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">내용</label>
                <textarea
                  className="w-full border px-3 py-2 rounded resize-none"
                  rows={5}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-purple-500 text-white rounded"
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
