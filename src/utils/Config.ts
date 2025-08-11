// 3.36~~ 운영
// 183.103~~ 개발

export const BASE_URL = "http://183.103.166.187/ocler/";

export const IMG_URL = "http://183.103.166.187/resimg/ocler/";

export const APP_VERSION = import.meta.env.VITE_APP_VERSION;

export default {
  // ***************** 서버 호출
  SERVER_URL: BASE_URL,
  API_URL: `${BASE_URL}`,
  IMG_URL: IMG_URL,

  // 개발 이미지 경로

  // S3_BUCKET: `gravity-s3bk`,
  // S3_REGION: `ap-northeast-2`,

  // ***************** 어싱크 키
  AS_KEY_LOGIN_INFO: "as_key_login_info",

  // ****************** 공통 사용 코드
  APP_VER: APP_VERSION,
  IS_LOG: import.meta.env.VITE_PUBLIC_NODE_ENV === "development",
};
