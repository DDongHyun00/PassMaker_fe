import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
//import { ChevronDown, Plus, MoreHorizontal, MessageCircle, CheckCircle } from 'lucide-react';


const UserDetailPage = () => {
    const chartData = [
        { month: '10월', value1: 8, value2: 12 },
        { month: '11월', value1: 6, value2: 10 },
        { month: '12월', value1: 4, value2: 8 },
        { month: '1월', value1: 3, value2: 6 },
        { month: '2월', value1: 2, value2: 4 },
    ];

    return(
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">유저 상세 정보</h1>
                            <span className="text-sm text-gray-500">내 정보를 확인하고 편집할 수 있는 페이지 입니다.</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="text-gray-500 hover:text-gray-700">알림 설정</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                설정 변경
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - User Profile */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-blue-600">박</span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">박진만</h2>
                                    <p className="text-sm text-gray-500">팀장 역할</p>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">사용자 ID</span>
                                        <span className="font-medium">USER_2023_1042</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">이메일</span>
                                        <span className="font-medium">james.park@example.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">전화번호</span>
                                        <span className="font-medium">010-1234-5678</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">가입일</span>
                                        <span className="font-medium">2023년 1월 15일</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">최근 접속</span>
                                        <span className="font-medium">2023년 11월 8일 14:23</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">접속 국가</span>
                                        <span className="font-medium">미국(아마존 웹 서비스)</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100">
                                        계정 삭제
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Stats and Activity */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-600">총 글 수</h3>
                                        <span className="text-xs text-gray-400">지난 30일</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                                    <p className="text-sm text-gray-500">2023년 10월 대비</p>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-600">팔로워</h3>
                                        <span className="text-xs text-gray-400">지난 30일</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                                    <p className="text-sm text-gray-500">팔로워 변화</p>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-600">좋아요</h3>
                                        <span className="text-xs text-gray-400">지난 30일</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                                    <p className="text-sm text-gray-500">좋아요 변화</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">게시물 추이</h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600">글 수</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600">좋아요</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-48 flex items-end justify-between space-x-4">
                                    {chartData.map((item, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                                            <div className="w-full flex flex-col items-center space-y-1">
                                                <div
                                                    className="w-6 bg-blue-500 rounded-t"
                                                    style={{ height: `${item.value1 * 8}px` }}
                                                ></div>
                                                <div
                                                    className="w-6 bg-orange-500 rounded-t"
                                                    style={{ height: `${item.value2 * 6}px` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500">{item.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">정렬 방식</span>
                                        <button className="text-sm text-gray-700 hover:text-gray-900">최신순</button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-blue-600">글</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">새로운 글을 작성했습니다</p>
                                                <p className="text-xs text-gray-500">2023-11-08 10:30-11:00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-green-600">완료</span>
                                            <span className="text-sm text-blue-600">상세보기</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-green-600">댓글</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">댓글을 남겼습니다</p>
                                                <p className="text-xs text-gray-500">2023-11-08 14:30-17:00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-blue-600">답글달기</span>
                                            <span className="text-sm text-blue-600">상세보기</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-purple-600">공유</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">게시물을 공유했습니다</p>
                                                <p className="text-xs text-gray-500">2023-10-28 13:00-14:00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-blue-600">보기</span>
                                            <span className="text-sm text-blue-600">상세보기</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button className="text-sm text-blue-600 hover:text-blue-700">더 보기</button>
                                </div>
                            </div>

                            {/* Payment History */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 내역</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600">결제 번호</span>
                                            <span className="text-sm font-medium">PAY_2023_1421</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600">날짜</span>
                                            <span className="text-sm font-medium">2023-11-08</span>
                                            <span className="text-sm text-gray-600">금액</span>
                                            <span className="text-sm font-medium">₩50,000</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600">결제 번호</span>
                                            <span className="text-sm font-medium">PAY_2023_1319</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600">날짜</span>
                                            <span className="text-sm font-medium">2023-11-03</span>
                                            <span className="text-sm text-gray-600">금액</span>
                                            <span className="text-sm font-medium">₩50,000</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600">결제 번호</span>
                                            <span className="text-sm font-medium">PAY_2023_1142</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600">날짜</span>
                                            <span className="text-sm font-medium">2023-10-25</span>
                                            <span className="text-sm text-gray-600">금액</span>
                                            <span className="text-sm font-medium">₩50,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">관리자 메모</h3>

                                <div className="mb-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows="3"
                    placeholder="이 사용자에게 메모를 남겨주세요..."
                ></textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">최대 메모 길이 255자</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                        메모 등록
                                    </button>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {/*<CheckCircle className="w-4 h-4 text-blue-600" />*/}
                                            <span className="text-sm font-medium text-blue-900">질문함</span>
                                            <span className="text-xs text-blue-600">관리자가 등록한 메모</span>
                                        </div>
                                        <p className="text-sm text-blue-800">해당 사용자는 정상적으로 프로필을 업데이트했습니다.</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {/*<MessageCircle className="w-4 h-4 text-gray-600" />*/}
                                            <span className="text-sm font-medium text-gray-900">미답변</span>
                                            <span className="text-xs text-gray-500">관리자가 등록한 메모</span>
                                        </div>
                                        <p className="text-sm text-gray-700">이번 달 활동 빈도가 낮습니다. 확인이 필요합니다. 같은 메모를 계속 남겨주세요.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Help Chat */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">고객 지원</h3>
                                    {/*<CheckCircle className="w-5 h-5 text-green-500" />*/}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        {/*<CheckCircle className="w-5 h-5 text-green-600" />*/}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">온라인 지원 상태입니다</p>
                                        <p className="text-xs text-gray-500">고 사용자에게 바로 도움을 드릴 수 있습니다!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default UserDetailPage;