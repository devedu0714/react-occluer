import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  m_app_login,
  m_app_join,
  m_app_email_check,
  m_app_handphone_check,
  m_app_id_search,
  m_app_pwd_search,
  m_app_home,
} from "../services/apiMethods";
import logger from "../utils/logger";

// ===== 범용 API 훅 =====
export const useApiQuery = <T>(
  key: string[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
  }
) => {
  return useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });
};

export const useApiMutation = <T, V>(
  mutationFn: (data: V) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // 캐시 무효화
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

// ===== 사용자 관련 훅 =====

// m_app_login 훅 (로그인)
export const useAppLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: m_app_login,
    onSuccess: (response) => {
      const data = response.data;
      // 로그인 성공 시 사용자 정보 캐시 설정
      queryClient.setQueryData(["user"], data);
    },
  });
};

// m_app_join 훅 (회원가입)
export const useAppJoin = () => {
  return useMutation({
    mutationFn: m_app_join,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 회원가입 요청 -", response);
    },
  });
};

// m_app_email_check 훅 (이메일 중복확인)
export const useAppEmailCheck = () => {
  return useMutation({
    mutationFn: m_app_email_check,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 이메일 중복확인 성공 -", response);
    },
  });
};

// m_app_handphone_check 훅 (휴대폰 중복확인)
export const useAppPhoneCheck = () => {
  return useMutation({
    mutationFn: m_app_handphone_check,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 휴대폰 중복확인 성공 -", response);
    },
  });
};

// 아이디 찾기
export const useAppIdSearch = () => {
  return useMutation({
    mutationFn: m_app_id_search,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 아이디 찾기 요청 -", response);
    },
  });
};

// 비밀번호 찾기
export const useAppPwdSearch = () => {
  return useMutation({
    mutationFn: m_app_pwd_search,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 비밀번호 찾기 요청 -", response);
    },
  });
};

// 홈 컨텐츠 조회
export const useAppHome = () => {
  return useMutation({
    mutationFn: m_app_home,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 홈 컨텐츠 조회 요청 -", response);
    },
  });
};
