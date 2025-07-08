import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
//import { Search, ChevronDown, BarChart3 } from 'lucide-react';

const MentorApplicationPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체 분야');
    const [status, setStatus] = useState('전체 상태');

    const applications = [
        {
            id: 'MN-2023-0002',
            applicationDate: '2023-11-14',
            name: '박민수',
            email: 'minsu.park@email.com',
            field: '개발',
            experience: '3년',
            status: '승인',
            processedDate: '2023-11-15'
        },
        {
            id: 'MN-2023-0003',
            applicationDate: '2023-11-13',
            name: '김하늘',
            email: 'haneul.kim@email.com',
            field: '디자인',
            experience: '5년',
            status: '대기',
            processedDate: '2023-11-14'
        },
        {
            id: 'MN-2023-0004',
            applicationDate: '2023-11-12',
            name: '이준호',
            email: 'junho.lee@email.com',
            field: '마케팅',
            experience: '2년',
            status: '거부',
            processedDate: ''
        },
        {
            id: 'MN-2023-0005',
            applicationDate: '2023-11-10',
            name: '최서연',
            email: 'seoyeon.choi@email.com',
            field: '개발/웹',
            experience: '4년',
            status: '승인',
            processedDate: '2023-11-11'
        },
        {
            id: 'MN-2023-0006',
            applicationDate: '2023-11-10',
            name: '정민규',
            email: 'mingyu.jung@email.com',
            field: '데이터',
            experience: '7년',
            status: '대기',
            processedDate: ''
        }
    ];

    const chartData = [
        { month: '01', value: 20 },
        { month: '02', value: 35 },
        { month: '03', value: 42 },
        { month: '04', value: 28 },
        { month: '05', value: 55 },
        { month: '06', value: 38 },
        { month: '07', value: 65 },
        { month: '08', value: 48 },
        { month: '09', value: 72 },
        { month: '10', value: 58 },
        { month: '11', value: 45 },
        { month: '12', value: 62 }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value));

    const getStatusColor = (status) => {
        switch (status) {
            case '승인': return 'bg-green-100 text-green-800';
            case '대기': return 'bg-yellow-100 text-yellow-800';
            case '거부': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return(
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 신청 현황</h1>
                        <p className="text-gray-600">멘토 신청자를 확인하고 승인 여부를 결정할 수 있습니다</p>
                    </div>

                    {/* 검색 바 */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-1">
                                {/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
                                <input
                                    type="text"
                                    placeholder="이름이나 이메일 검색"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>전체 분야</option>
                                    <option>개발</option>
                                    <option>디자인</option>
                                    <option>마케팅</option>
                                </select>
                                {/*<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
                            </div>

                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>전체 상태</option>
                                    <option>승인</option>
                                    <option>대기</option>
                                    <option>거부</option>
                                </select>
                                {/*<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
                            </div>

                            <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                                필터초기화
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                                엑셀 다운로드
                            </button>

                        </div>
                    </div>

                    {/* 테이블 */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        신청번호
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        신청일
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        신청자 정보
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        분야
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        경력
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        상태
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        처리일
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        관리
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {app.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {app.applicationDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                                <div className="text-sm text-blue-600">{app.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {app.field}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {app.experience}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {app.processedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                                상세보기
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
                            <div className="text-sm text-gray-700">
                                전체 {applications.length}개 중 1-{applications.length}개
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    1
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    2
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    3
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    4
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    5
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                                    6
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 통계 섹션 */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">멘토 신청 현황</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">총 신청</p>
                                        <p className="text-2xl font-bold text-gray-900">24</p>
                                        <p className="text-sm text-gray-500">전월 대비 12% 증가</p>
                                    </div>
                                    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                                        {/*<BarChart3 className="w-6 h-6" />*/}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">승인</p>
                                        <p className="text-2xl font-bold text-gray-900">15</p>
                                        <p className="text-sm text-gray-500">승인률 62.5%</p>
                                    </div>
                                    <div className="p-3 rounded-full bg-green-50 text-green-600">
                                        {/*<BarChart3 className="w-6 h-6" />*/}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">대기중</p>
                                        <p className="text-2xl font-bold text-gray-900">5</p>
                                        <p className="text-sm text-gray-500">빠른 처리 필요</p>
                                    </div>
                                    <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                                        {/*<BarChart3 className="w-6 h-6" />*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 차트 섹션 */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">월별 신청 현황</h3>
                        <div className="flex items-end justify-between h-32 space-x-2">
                            {chartData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-blue-500 rounded-t"
                                        style={{ height: `${(data.value / maxValue) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            최근 12개월 신청 추이
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MentorApplicationPage;