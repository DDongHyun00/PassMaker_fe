import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../lib/axios";
import Modal from "../modal/MyPageModal.jsx";
import MyInfoView from "../components/MyInfoView";
import MyInfoEdit from "../components/MyInfoEdit";
import MyPageButton from "../components/MyPageButton";
import MyPageCard from "../components/MyPageCard";
import MentoringTogglePanel from "../../mentor/components/MentoringTogglePanel";
import WithdrawConfirmModal from "../modal/WithdrawConfirmModal";
import { useAuth } from "../../auth/AuthContext.jsx";
import defaultUserImage from "../../assets/default_user.png"; // [추가] 기본 이미지 임포트
import ReservedMentoringPage from "./ReservedMentoringPage.jsx";

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
  const [mentoringEnabled, setMentoringEnabled] = useState(false); // 멘토링 활성화 상태
  const [toggleLoading, setToggleLoading] = useState(false); // 토글 로딩 상태

  // 멘토링 토글 핸들러
  const handleMentoringToggle = async () => {
    // Optimistic update: UI를 먼저 업데이트하고, API 실패 시 되돌립니다.
    const previousState = mentoringEnabled;
    setMentoringEnabled((prev) => !prev); // UI 먼저 변경

    setToggleLoading(true); // 로딩 시작
    try {
      // MPR-006 API 사용: PATCH /api/mentors/me/status
      await authApi.patch("/api/mentors/me/status", {
        isActive: !previousState,
      });
      console.log("멘토링 활성화 상태 업데이트 성공:", !previousState);
      // 성공 시 별도 처리 없음 (이미 UI 업데이트됨)
    } catch (err) {
      console.error("멘토링 활성화 상태 업데이트 실패:", err);
      alert("멘토링 상태 변경에 실패했습니다. 다시 시도해주세요.");
      setMentoringEnabled(previousState); // API 실패 시 UI 상태 되돌리기
    } finally {
      setToggleLoading(false); // 로딩 종료
    }
  };

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
      const res = await authApi.get("http://localhost:8080/api/mypage/profile");
      console.log("프론트엔드 profile 객체:", res.data); // [추가] 응답 데이터 콘솔 출력
      setProfile({ ...res.data, isMentor: res.data.mentor });
      setFormData({
        nickname: res.data.nickname || "",
        phone: res.data.phone || "",
        thumbnail: res.data.thumbnail ?? "",
      });
      // 프로필 로드 시 멘토링 활성화 상태도 설정 (isActive 필드 사용)
      setMentoringEnabled(res.data.active || false); // 백엔드에서 active 필드를 받아와 설정
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
    <div className="min-h-screen pt-8 pb-16 px-2 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl p-6 md:p-12 my-2">
        {/* 상단 인사 */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-primary mb-3 tracking-tight drop-shadow">
            안녕하세요, <span className="text-primary">{profile.name}</span>님!
          </h2>
          <p className="text-lg text-gray-500">
            계정 정보와 멘토링 예약 내역을 확인하세요.
          </p>
        </div>

        {/* 프로필 카드 */}
        <div className="bg-white/80 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-12 px-12 py-16 md:py-20 mb-10 shadow-xl border-2 border-primary/10 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 max-w-5xl mx-auto">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0">
            <img
              src={thumbnailPreview || profile.thumbnail || defaultUserImage}
              alt="프로필 썸네일"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-xl cursor-pointer transition-transform hover:scale-105 bg-white"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          {/* 프로필 정보 */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className="text-3xl font-extrabold mb-1 text-gray-900 drop-shadow">
              {profile.nickname}
            </h3>
            <span className="text-lg text-gray-500 mb-2">님 환영합니다!</span>
            <div className="flex gap-4 w-full">
              <button
                className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 flex-1"
                onClick={() => setViewOpen(true)}
              >
                내 정보 조회
              </button>
              <button
                className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 flex-1"
                onClick={() => setEditOpen(true)}
              >
                내 정보 수정
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="bg-white p-4 rounded-2xl shadow-2xl">
              <img
                src={thumbnailPreview || profile.thumbnail || defaultUserImage}
                alt="확대 프로필 썸네일"
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}

        {/* 멘토링 토글 패널 */}
        {profile.isMentor && (
          <MentoringTogglePanel
            enabled={mentoringEnabled}
            onToggle={handleMentoringToggle}
            title="멘토링 활성화"
            onCommentClick={() => {}}
            onSettingsClick={() => navigate("/mentor/settings")}
            className="mb-10"
          />
        )}

        {/* 계정 설정 카드 */}
        <div className="bg-white/80 rounded-2xl px-12 py-16 md:py-20 mb-10 shadow-xl border-2 border-primary/10 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 max-w-5xl mx-auto">
          <h3 className="text-2xl font-extrabold mb-8 text-primary drop-shadow">
            계정 설정
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 w-full">
              요약 목록
            </button>
            <button
              className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 w-full"
              onClick={() => setEditOpen(true)}
            >
              내 정보 수정
            </button>
            <button className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 w-full">
              찜한 멘토 조회
            </button>
            {profile.isMentor && (
              <button
                className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 w-full"
                onClick={() => navigate("/mentor/settings")}
              >
                멘토링 설정
              </button>
            )}
            <button
              className="px-8 py-3 bg-white text-red-600 font-semibold border-2 border-red-200 rounded-md shadow-md hover:bg-red-50 transition-all duration-150 w-full"
              onClick={() => setWithdrawOpen(true)}
            >
              회원탈퇴
            </button>
          </div>
        </div>

        {/* 1:1 문의 카드 */}
        <div className="bg-white/80 rounded-2xl px-12 py-16 md:py-20 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border-2 border-primary/10 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 max-w-5xl mx-auto">
          <div className="flex-1 text-left">
            <h3 className="text-2xl font-extrabold mb-2 text-primary drop-shadow">
              1:1 문의
            </h3>
            <span className="text-gray-700">
              문의사항이 있다면 여기를 눌러주세요
            </span>
          </div>
          <button
            className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 flex-shrink-0"
            onClick={() => navigate("/inquiry")}
          >
            문의하러 가기
          </button>
        </div>

        {/* 예약된 멘토링 카드 */}
        <div className="bg-white/80 rounded-2xl px-12 py-16 md:py-20 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border-2 border-primary/10 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 max-w-5xl mx-auto">
          <div className="flex-1 text-left">
            <h3 className="text-2xl font-extrabold mb-2 text-primary drop-shadow">
              멘토링
            </h3>
            <span className="text-gray-700">예약된 멘토링을 확인하세요</span>
          </div>
          <button
            className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150 flex-shrink-0"
            onClick={() => navigate("/ReservedMentoring")}
          >
            예약 내역 보기
          </button>
        </div>
      </div>

      {/* 모달 - 내 정보 조회 */}
      {viewOpen && (
        <Modal onClose={() => setViewOpen(false)}>
          <MyInfoView profile={profile} />
        </Modal>
      )}
      {/* 모달 - 내 정보 수정 */}
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
