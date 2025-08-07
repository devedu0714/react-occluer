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
  easy_yn: string;
  uniq_key: string;
  token: string;
}) => {
  logger.log("============ >>>>>> 로그인 요청 -", JSON.stringify(data));
  return _httpReq("m_app_login", data);
};

// 회원가입 FAKE API 함수
export const m_app_join = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  logger.log("============ >>>>>> 회원가입 요청 -", JSON.stringify(data));
  return _fakeReq("users", data);
};
