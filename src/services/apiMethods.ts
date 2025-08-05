import logger from "../utils/logger";
import { api, API_CONFIG } from "./api";
import axios from "axios";

// API 메서드 상수 정의
export const API_METHODS = {
  // 사용자 관련
  USER: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    PROFILE: "user/profile",
    UPDATE: "user/update",
  },
} as const;

export interface LoginRequest {
  email: string;
  password: string;
}

// API 서비스 클래스
export class ApiService {
  // 사용자 관련 API
  static user = {
    // 로그인
    login: (data: LoginRequest) => api.post(API_METHODS.USER.LOGIN, data),

    // 회원가입
    register: (data: any) => api.post(API_METHODS.USER.REGISTER, data),

    // 프로필 조회
    getProfile: () => api.get(API_METHODS.USER.PROFILE),

    // 프로필 수정
    updateProfile: (data: any) => api.put(API_METHODS.USER.UPDATE, data),
  };
}

// 기존 방식과 호환되는 함수들 (점진적 마이그레이션용)
export function _httpReq(methodName: string, data?: any) {
  let url = API_CONFIG.BASE_URL + methodName;

  logger.log(
    "============ >>>>>> " + url + " () 요청 - " + JSON.stringify(data)
  );

  return axios({
    method: "post",
    url: url,
    headers: { "Content-Type": "application/json" },
    data: data,
  });
}

// ----------------------------------------------------------------------------
// /////////////////////////// 여기서부터 API 메서드 정의 ///////////////////////////
// ----------------------------------------------------------------------------

// 기존 방식과 호환되는 함수들 예시 (점진적 마이그레이션용)
export const m_app_gift_i = (data: any) => {
  logger.log("============ >>>>>> 선물 등록 요청 -", JSON.stringify(data));
  return _httpReq("m_app_gift_i", data);
};

export default ApiService;
