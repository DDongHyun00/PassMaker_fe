// /api/inquiryApi.js
import axios from './axios';
import authApi from "./axios"; // 쿠키 포함된 axios 인스턴스 사용

// 문의 작성
export const createInquiry = async (data) => {
    const response = await authApi.post('/inquiry', data, { withCredentials: true });
    return response.data;
};

// 문의 삭제
export const deleteInquiry = async (id) => {
    const response = await authApi.delete(`/inquiry/${id}`, { withCredentials: true });
    return response.data;
};

// 문의 목록 조회
export const getMyInquiries = async () => {
    const response = await authApi.get('/inquiry/my', { withCredentials: true });
    console.log('[문의 응답]', response.data);
    return response.data;
};

// 문의 상세 조회
export const getInquiryDetail = async (id) => {
    const response = await authApi.get(`/inquiry/${id}`, { withCredentials: true });
    return response.data;
};


// 문의 글 수정
export const updateInquiry = async (id, data) => {
    try {
        const response = await authApi.put(`/inquiry/${id}`, data, {
            withCredentials: true
        });
        return response.data; // 응답 반환
    } catch (error) {
        console.error('[문의 수정 실패]', error);
        throw error;
    }
};
