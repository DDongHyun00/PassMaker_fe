import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import authApi from "../lib/axios";
import Modal from "../components/MyPageModal";
import MyInfoView from "../components/MyInfoView";
import MyInfoEdit from "../components/MyInfoEdit";
import MyPageButton from "../components/MyPageButton";
import MyPageCard from "../components/MyPageCard";
import WithdrawConfirmModal from "../components/WithdrawConfirmModal"
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


    const loadProfile = async () => {
        try {
            const res = await authApi.get("http://localhost:8080/api/mypage/profile");
            setProfile(res.data);
            setFormData({
                nickname: res.data.nickname || "",
                phone: res.data.phone || "",
                thumbnail: res.data.thumbnail || "",
            });
        } catch (err) {
            console.error("유저 정보 조회 실패", err);
        }
    };

    const handleUpdate = async () => {
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

    if (!profile) return <div className="p-6">불러오는 중...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">안녕하세요, {profile.name}님! 계정 정보와 멘토링 예약 내역을 확인하세요.</h2>

            {/* 버튼 영역 */}
            <div className="flex gap-4 mb-6">
                <MyPageButton onClick={() => setViewOpen(true)}>내 정보 조회</MyPageButton>
                <MyPageButton onClick={() => setEditOpen(true)}>내 정보 수정</MyPageButton>
            </div>

            {/* 프로필 카드 */}
            <MyPageCard>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">프로필 정보</h3>
                    <p><strong>이름:</strong> {profile.name}</p>
                    <p><strong>닉네임:</strong> {profile.nickname}</p>
                    <p><strong>이메일:</strong> {profile.email}</p>
                    <p><strong>전화번호:</strong> {profile.phone}</p>

                </div>
            </MyPageCard>

            {/* 계정 설정 카드 */}
            <MyPageCard>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">계정 설정</h3>
                    <ul className="space-y-2">
                        <li><MyPageButton className="w-full justify-start">알림 설정</MyPageButton></li>
                        <li><MyPageButton className="w-full justify-start">결제 정보 관리</MyPageButton></li>
                        <li><MyPageButton className="w-full justify-start">비밀번호 변경</MyPageButton></li>
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