import axios from "axios";
import { BASE_URL } from "../utils/Config";

// API 설정
export const API_CONFIG = {
  BASE_URL: BASE_URL, // 실제 API URL로 변경
  TIMEOUT: 10000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 로깅
    console.log(
      `🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`,
      config.data ? `데이터: ${JSON.stringify(config.data)}` : ""
    );

    // 토큰 추가 (필요시)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ 요청 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API 응답: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error.response?.data || error.message);

    // 에러 처리 (401, 403 등)
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem("accessToken");
      // 로그인 페이지로 리다이렉트
    }

    return Promise.reject(error);
  }
);

// HTTP 요청 헬퍼 함수
export const httpRequest = async <T = any>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  try {
    const response = await apiClient({
      method,
      url,
      data: method === "get" ? undefined : data,
      params: method === "get" ? data : undefined,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API 메서드별 헬퍼 함수들
export const api = {
  get: <T = any>(url: string, params?: any) =>
    httpRequest<T>("get", url, params),

  post: <T = any>(url: string, data?: any) => httpRequest<T>("post", url, data),

  put: <T = any>(url: string, data?: any) => httpRequest<T>("put", url, data),

  delete: <T = any>(url: string) => httpRequest<T>("delete", url),
};

export default apiClient;
