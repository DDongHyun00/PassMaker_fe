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
      <div className="bg-white p-10 rounded-3xl w-full max-w-3xl shadow-2xl border border-primary/10 relative">
        <h2 className="text-2xl font-extrabold mb-8 text-primary text-center tracking-tight">
          문의 내역
        </h2>
        <div className="max-h-64 overflow-y-auto border rounded-2xl mb-8 shadow-sm">
          <table className="w-full text-base">
            <thead>
              <tr className="bg-primary/10 text-primary">
                <th className="p-3">번호</th>
                <th className="p-3">제목</th>
                <th className="p-3">작성일시</th>
                <th className="p-3">수정</th>
                <th className="p-3">삭제</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inquiries) && inquiries.length > 0 ? (
                inquiries.map((inq, idx) => (
                  <tr key={inq.id} className="hover:bg-primary/5 transition">
                    <td className="p-3 text-center font-semibold">{idx + 1}</td>
                    <td
                      className="p-3 text-primary font-bold hover:underline cursor-pointer text-center"
                      onClick={() => handleSelect(inq.id, idx + 1)}
                    >
                      {inq.inquiryTitle}
                    </td>
                    <td className="p-3 text-center text-gray-500">
                      {new Date(inq.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setEditId(inq.id);
                          setEditTitle(inq.inquiryTitle);
                          setEditContent(inq.inquiryContent);
                          setSelectedNumber(idx + 1);
                          setIsEditOpen(true);
                        }}
                        className="mypage-btn-outline px-4 py-1 text-sm"
                      >
                        수정
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="mypage-btn-outline px-4 py-1 text-sm text-red-500 border-red-200 hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-6">
                    문의 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* 상세 내용 */}
        {!isEditOpen && detail && (
          <div className="bg-primary/5 p-6 border border-primary/10 rounded-2xl mt-8 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-1 text-primary">
                  문의 번호
                </p>
                <p className="mb-3 font-bold">{selectedNumber}</p>
                <p className="text-sm font-medium mb-1 text-primary">
                  문의 제목
                </p>
                <p className="mb-3 font-bold">{detail.inquiryTitle}</p>
                <p className="text-sm font-medium mb-1 text-primary">
                  문의 내용
                </p>
                <p className="mb-3 whitespace-pre-wrap">
                  {detail.inquiryContent}
                </p>
                <p className="text-sm font-medium mb-1 text-primary">
                  작성 일시
                </p>
                <p className="mb-3">
                  {new Date(detail.createdAt).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold mb-2 text-primary">
                  관리자 답변
                </p>
                {detail.respondTitle || detail.respondContent ? (
                  <>
                    <p className="text-sm font-medium mb-1 text-primary">
                      답변 제목
                    </p>
                    <p className="mb-2 font-bold">
                      {detail.respondTitle || "(제목 없음)"}
                    </p>
                    <p className="text-sm font-medium mb-1 text-primary">
                      답변 내용
                    </p>
                    <p className="whitespace-pre-wrap">
                      {detail.respondContent || "(내용 없음)"}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">
                    아직 답변이 등록되지 않았습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 수정 모달 */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-primary/10">
              <h2 className="text-xl font-extrabold mb-6 text-primary text-center">
                문의 수정
              </h2>
              <div className="mb-4">
                <p className="text-sm font-medium text-primary">글 번호</p>
                <p className="text-md font-bold">{selectedNumber}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-primary">
                  제목
                </label>
                <input
                  type="text"
                  className="w-full border border-primary/30 px-4 py-3 rounded-xl text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-primary">
                  내용
                </label>
                <textarea
                  className="w-full border border-primary/30 px-4 py-3 rounded-xl resize-none text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
                  rows={5}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleCancelEdit}
                  className="mypage-btn-outline px-6 py-2 text-base"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  className="mypage-btn px-6 py-2 text-base"
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-primary text-2xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}
