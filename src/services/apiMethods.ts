import logger from "../utils/logger";
import { API_CONFIG } from "./api";
import axios from "axios";

// 기존 방식과 호환되는 API 호출 함수
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

// FAKE API 함수
export function _fakeReq(methodName: string, data?: any) {
  let url = "https://fakestoreapi.com/" + methodName;

  logger.log("============ >>>>>> FAKE 요청 -", JSON.stringify(data));

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

// 로그인 API 함수
export const m_app_login = (data: {
  email: string;
  password: string;
  join_type?: string;
  uniq_key?: string;
}) => {
  return _httpReq("m_app_login", data);
};

// 회원가입 API 함수
export const m_app_join = (data: {
  email: string;
  handphone: string;
  password: string;
  name: string;
  join_type: string;
  uniq_key: string;
  c_gb: string;
  token: string;
  add1: string;
  add2: string;
  zip: string;
}) => {
  return _httpReq("m_app_join", data);
};

// 이메일 중복확인 API 함수
export const m_app_email_check = (data: { email: string }) => {
  logger.log(
    "============ >>>>>> 이메일 중복확인 요청 -",
    JSON.stringify(data)
  );
  return _httpReq("m_app_email_check", data);
};

// 휴대폰 중복확인 API 함수
export const m_app_handphone_check = (data: { handphone: string }) => {
  return _httpReq("m_app_handphone_check", data);
};

// 간편로그인으로 가입되어 있는지 체크
export const m_app_easy_check = (data: {
  join_type: string;
  uniq_key: string;
}) => {
  return _httpReq("m_app_join_check", data);
};

// 아이디 찾기
export const m_app_id_search = (data: { name: string; handphone: string }) => {
  return _httpReq("m_app_id_search", data);
};

// 비밀번호 찾기
export const m_app_pwd_search = (data: { email: string }) => {
  return _httpReq("m_app_pwd_search", data);
};

// 홈 컨텐츠 조회
export const m_app_home = (data: {}) => {
  return _httpReq("m_app_home", data);
};
