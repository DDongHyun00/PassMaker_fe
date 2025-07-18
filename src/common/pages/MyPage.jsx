import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../lib/axios";
import Modal from "../modal/MyPageModal.jsx";
import MyInfoView from "../components/MyInfoView";
import MyInfoEdit from "../components/MyInfoEdit";
import MyPageButton from "../components/MyPageButton";
import MyPageCard from "../components/MyPageCard";
import WithdrawConfirmModal from "../modal/WithdrawConfirmModal.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

const MyPage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    nickname: "",
    phone: "",
    thumbnail: "",
  });
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const loadProfile = async () => {
    try {
      const res = await authApi.get("/api/mypage/profile");
      setProfile(res.data);
      setFormData({
        nickname: res.data.nickname || "",
        phone: res.data.phone || "",
        thumbnail: res.data.thumbnail ?? "",
      });
    } catch (err) {
      console.error("유저 정보 조회 실패", err);
    }
  };

  const handleUpdate = async () => {
    const { nickname, phone, thumbnail } = formData;
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");
    if (!phone.trim()) return alert("전화번호를 입력해주세요.");
    if (!thumbnail.trim()) return alert("썸네일 URL을 입력해주세요.");

    const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(phone))
      return alert("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");

    try {
      const res = await authApi.patch("/api/mypage/profile/edit", formData);
      setProfile(res.data);
      setEditOpen(false);
    } catch (err) {
      console.error("정보 수정 실패", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    try {
      setUploading(true);
      const res = await authApi.post(
        "/api/mypage/upload-thumbnail",
        formDataFile,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imageUrl = res.data;
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
      setThumbnailPreview(imageUrl);
    } catch (err) {
      console.error("썸네일 업로드 실패", err);
    } finally {
      setUploading(false);
    }
  };

  if (!profile) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="bg-[#fafbfc] min-h-screen pt-32 py-10 px-2">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* 상단 프로필 카드 */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 px-10 py-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.015]">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
            <img
              src={thumbnailPreview || profile.thumbnail}
              alt="프로필 썸네일"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md bg-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          {/* 프로필 정보 및 버튼 */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
              {profile.nickname}
            </h2>
            <div className="inline-flex items-center gap-2 mb-1 px-4 py-1 bg-primary/10 border border-primary/20 text-primary font-semibold rounded-full text-base tracking-wide shadow-sm select-all">
              <span className="text-primary/70 text-lg">✉️</span>
              <span className="mx-1">{profile.email}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
                {profile.phone}
              </span>
              <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
                가입일: {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-3 w-full max-w-xs mt-4">
              <button
                className="flex-1 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold shadow-sm border border-gray-200 hover:bg-primary/10 hover:text-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => setViewOpen(true)}
              >
                내 정보
              </button>
              <button
                className="flex-1 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold shadow-sm border border-gray-200 hover:bg-inflearn/20 hover:text-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => setEditOpen(true)}
              >
                수정
              </button>
              <button
                className="flex-1 py-2 rounded-full bg-red-500 text-white font-semibold shadow-sm border border-red-400 hover:bg-red-100 hover:text-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => setWithdrawOpen(true)}
              >
                회원탈퇴
              </button>
            </div>
          </div>
          {/* 썸네일 확대 모달 */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
                <img
                  src={thumbnailPreview || profile.thumbnail}
                  alt="확대 프로필 썸네일"
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </div>
        {/* 하단 2단 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 계정 설정 카드 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="text-xl font-bold mb-4 text-gray-800">계정 설정</h3>
            <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-lg font-medium text-gray-700 border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
              알림 설정
            </button>
            <button
              className="w-full text-left py-3 px-4 bg-gray-50 rounded-lg font-medium text-gray-700 border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => setEditOpen(true)}
            >
              내 정보 수정
            </button>
            <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-lg font-medium text-gray-700 border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
              결제 정보 관리
            </button>
            <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-lg font-medium text-gray-700 border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
              찜한 멘토 조회
            </button>
          </div>
          {/* 멘토링 예약 현황 카드 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="text-xl font-bold mb-4 text-gray-800">1:1 문의</h3>
            <button
              className="w-full py-3 rounded-lg bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => navigate("/inquiry")}
            >
              1:1 문의하기
            </button>
            <p></p>
            <p></p>
            <p></p>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              멘토링 예약 현황
            </h3>

            <button
              className="w-full py-3 rounded-lg bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-primary hover:text-gary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => navigate("/reservedMentoring")}
            >
              예약된 멘토링 확인하기
            </button>
          </div>
        </div>
      </div>
      {/* 모달 */}
      {viewOpen && (
        <Modal onClose={() => setViewOpen(false)}>
          <MyInfoView profile={profile} />
        </Modal>
      )}
      {editOpen && (
        <Modal onClose={() => setEditOpen(false)}>
          <MyInfoEdit
            formData={formData}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSave={handleUpdate}
            onCancel={() => setEditOpen(false)}
          />
        </Modal>
      )}
      {withdrawOpen && (
        <Modal onClose={() => setWithdrawOpen(false)}>
          <WithdrawConfirmModal
            onClose={() => setWithdrawOpen(false)}
            onSuccess={async () => {
              await logout();
              navigate("/");
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyPage;
