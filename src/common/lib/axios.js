import axios from "axios";

const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://localhost:8080
    withCredentials: true, // 쿠키 포함 필수!
});

authApi.interceptors.response.use(
    res => res,
    async (err) => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                await authApi.post("/auth/reissue");
                return authApi(original);
            } catch {
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    }
);

export default authApi;
