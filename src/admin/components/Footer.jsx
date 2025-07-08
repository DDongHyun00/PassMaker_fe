import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">관리자 기능</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            효율적인 관리자 시스템으로 서비스 품질을 향상시키고 사용자 경험을 개선합니다.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">관리자 페이지</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">전체 유저 목록 조회</a></li>
                            <li><a href="#" className="hover:text-gray-900">유저 상태 조회</a></li>
                            <li><a href="#" className="hover:text-gray-900">멤버 신청 목록 조회</a></li>
                            <li><a href="#" className="hover:text-gray-900">멤버 신청 상세 조회</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 기능</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">신고된 리뷰 목록</a></li>
                            <li><a href="#" className="hover:text-gray-900">리뷰 신고 상세 처리</a></li>
                            <li><a href="#" className="hover:text-gray-900">1:1 문의 목록</a></li>
                            <li><a href="#" className="hover:text-gray-900">관리자 통계 대시보드</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">고객 지원</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>support@admin-system.com</p>
                            <p>02-123-4567</p>
                            <p>서울특별시 강남구 테헤란로 123</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">© 2023 관리자 기능 와이어프레임. All rights reserved.</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900">개인정보처리방침</a>
                            <a href="#" className="hover:text-gray-900">이용약관</a>
                            <a href="#" className="hover:text-gray-900">쿠키 정책</a>
                            <a href="#" className="hover:text-gray-900">사이트맵</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;