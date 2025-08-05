// 3.36~~ 운영
// 183.103~~ 개발

export const BASE_URL = "http://183.103.166.187/carbon/";
// export const BASE_URL = "http://3.36.23.21:8080/carbon/";

// export const IMG_URL = "http://183.103.166.187/resimg/carbon";
export const IMG_URL = "http://3.36.23.21:8080/resource/carbon";

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
  APP_VER: "0.1.01",
  IS_LOG: import.meta.env.VITE_PUBLIC_NODE_ENV === "development",
};
