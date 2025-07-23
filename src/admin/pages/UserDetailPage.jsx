import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../common/lib/axios.js";
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import UserProfile from "../components/userDetail/UserProfile.jsx";
import Back from "../common/Back.jsx";

const UserDetailPage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStatus, setUserStatus] = useState('');

    useEffect(() => {
        axios.get(`/admin/users/${userId}`)
            .then(res => {
                setUserData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("유저 데이터 불러오기 실패", err);
                setLoading(false);
            });
    }, [userId]);

// 3) 로딩 중 처리
    if (loading) return <div>로딩 중...</div>;
    if (!userData) return <div>유저 데이터를 불러올 수 없습니다.</div>;

    const handleStatusChange = (status) => {
        setUserStatus(status);
        axios.get(`/admin/users/${userId}`)
            .then(res => {
                setUserData(res.data);  // 유저 데이터를 새로 갱신
            })
            .catch(err => {
                console.error("유저 데이터 불러오기 실패", err);
            });
    };

    const handleUserUpdate = (updatedUser) => {
        setUserData(updatedUser);  // 새로운 유저 정보로 업데이트
    };

    return(
        <div className="fixed inset-0 flex justify-center overflow-auto items-start bg-gray-50 mt-12">
            <div className="w-full max-w-7xl  rounded p-6">
        <div className="w-full mx-auto min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="mb-4 px-12">
                <Back to="/admin/users" />
            </div>
                <div className="px-4 lg:px-12 ">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">유저 상세 정보</h1>
                            <p className="text-gray-600">유저의 정보를 확인하고 편집할 수 있는 페이지 입니다.</p>
                        </div>
                </div>

                <div className="px-12 py-6">
                        <div className="lg:col-span-1">
                            <UserProfile
                                user={userData}
                                onStatusChange={handleStatusChange}
                                onUserUpdate={handleUserUpdate}/>
                        </div>
                </div>

            <Footer />
        </div>
            </div>
        </div>
    );
};
export default UserDetailPage;