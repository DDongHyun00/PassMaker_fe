import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import authApi from "../lib/axios";
import Modal from "../components/MyPageModal";
import MyInfoView from "../components/MyInfoView";
import MyInfoEdit from "../components/MyInfoEdit";
import MyPageButton from "../components/MyPageButton";
import MyPageCard from "../components/MyPageCard";
import MentoringTogglePanel from "../../mentor/components/MentoringTogglePanel"
import WithdrawConfirmModal from "../components/WithdrawConfirmModal";
import { useAuth } from "../../auth/AuthContext.jsx";
import defaultUserImage from '../../assets/default_user.png'; // [추가] 기본 이미지 임포트

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
        setMentoringEnabled(prev => !prev); // UI 먼저 변경

        setToggleLoading(true); // 로딩 시작
        try {
            // MPR-006 API 사용: PATCH /api/mentors/me/status
            await authApi.patch("/api/mentors/me/status", { isActive: !previousState });
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
        // 1. 공백 검사
        if (!nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (!phone.trim()) {
            alert("전화번호를 입력해주세요.");
            return;
        }
        if (!thumbnail.trim()) {
            alert("썸네일 URL을 입력해주세요.");
            return;
        }

        // 2. 전화번호 형식 검사 (예: 010-1234-5678)
        const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            alert("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
            return;
        }

        try {
            const res = await authApi.patch("http://localhost:8080/api/mypage/profile/edit", formData);
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

    // 썸네일 파일 업로드 추가
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataFile = new FormData();
        formDataFile.append("file", file);

        try {
            setUploading(true);
            const res = await authApi.post(
                "http://localhost:8080/api/mypage/upload-thumbnail",
                formDataFile,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const imageUrl = res.data; // S3 업로드된 URL

            // formData에 URL 저장 (서버로 PATCH할 때 필요)
            setFormData(prev => ({
                ...prev,
                thumbnail: imageUrl,
            }));

            // 썸네일 미리보기에도 적용
            setThumbnailPreview(imageUrl);

        } catch (err) {
            console.error("썸네일 업로드 실패", err);
        } finally {
            setUploading(false);
        }
    };


    if (!profile) return <div className="p-6">불러오는 중...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">안녕하세요, {profile.name}님! 계정 정보와 멘토링 예약 내역을 확인하세요.</h2>

            {/* 버튼 영역 */}
            <div className="flex gap-4 mb-6">
                <MyPageButton onClick={() => setViewOpen(true)}>내 정보 조회</MyPageButton>
            </div>

            {/* 프로필 카드 */}
            <MyPageCard>
                <div className="flex items-center justify-center gap-8 p-4">
                    {/* 왼쪽 프로필 텍스트 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">☆프로필★</h3>
                        {/*<p><strong>닉네임:</strong> {profile.nickname}</p>*/}
                        {/*<p>{profile.nickname} <strong> 님 환영합니다!</strong></p>*/}
                        <h1></h1>
                        <p><strong>{profile.nickname}</strong></p>
                        <h1>님 환영합니다!</h1>
                    </div>

                    {/* 오른쪽 썸네일 이미지 */}
                    <div>
                        <img
                            src={thumbnailPreview || profile.thumbnail || defaultUserImage} // [수정] 기본 이미지 폴백 추가
                            alt="프로필 썸네일"
                            className="w-40 h-40 rounded-full object-cover border cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div className="bg-white p-4 rounded shadow-lg">
                            <img
                                src={thumbnailPreview || profile.thumbnail || defaultUserImage} // [수정] 기본 이미지 폴백 추가
                                alt="확대 프로필 썸네일"
                                className="max-w-full max-h-[90vh] object-contain"
                            />
                        </div>
                    </div>
                )}
            </MyPageCard>

        {/* 멘토링 토글 패널 */}
        {profile.isMentor && (
            <MentoringTogglePanel
                enabled={mentoringEnabled}
                onToggle={handleMentoringToggle}
                title="멘토링 활성화" // 제목 변경
                onCommentClick={() => {
                    /* 댓글 모달 열기 */
                }}
                onSettingsClick={() => navigate("/mentor/settings")}
            />
        )}

            {/* 계정 설정 카드 */}
            <MyPageCard>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">계정 설정</h3>
                    <ul className="space-y-2">
                        <li><MyPageButton className="w-full justify-start">알림 설정</MyPageButton></li>
                        <li>
                            <MyPageButton
                                className="w-full justify-start"
                                onClick={() => setEditOpen(true)}
                            >
                                내 정보 수정
                            </MyPageButton>
                        </li>
                        <li><MyPageButton className="w-full justify-start">결제 정보 관리</MyPageButton></li>
                        <li><MyPageButton className="w-full justify-start">찜한 멘토 조회</MyPageButton></li>
                        {profile.isMentor && (
                            <li>
                                <MyPageButton
                                    className="w-full justify-start"
                                    onClick={() => navigate("/mentor/settings")}
                                >
                                    멘토링 설정
                                </MyPageButton>
                            </li>
                        )}
                        <li>
                            <MyPageButton
                                className="w-full justify-start text-red-600"
                                onClick={() => setWithdrawOpen(true)}
                            >
                                회원탈퇴
                            </MyPageButton>
                        </li>

                    </ul>
                </div>
            </MyPageCard>

            {/* 예약된 멘토링 카드 */}
            <MyPageCard>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">예약된 멘토링</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                            <span>UX/UI 포트폴리오 리뷰 - 김지연 멘토 (11/20)</span>
                            <MyPageButton className="text-sm">세션 입장</MyPageButton>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>개발자 커리어 상담 - 박지성 멘토 (11/18)</span>
                            <MyPageButton className="text-sm">준비하기</MyPageButton>
                        </li>
                    </ul>
                </div>
            </MyPageCard>

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
                            await logout();      // 로그아웃 끝난 뒤
                            navigate("/");       // 홈으로 이동
                        }}
                    />
                </Modal>
            )}
        </div>
    );
};

export default MyPage;