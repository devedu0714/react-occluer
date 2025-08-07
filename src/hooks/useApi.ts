import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { m_app_login, m_app_join } from "../services/apiMethods";
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

// fake join 훅 (회원가입)
export const useAppJoin = () => {
  return useMutation({
    mutationFn: m_app_join,
    onSuccess: (response) => {
      logger.log("============ >>>>>> 회원가입 성공 -", response);
    },
  });
};
