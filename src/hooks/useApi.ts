import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService, m_app_login } from "../services/apiMethods";

// ===== 사용자 관련 훅 =====
export const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ApiService.user.login,
    onSuccess: (data) => {
      // 로그인 성공 시 사용자 정보 캐시 설정
      queryClient.setQueryData(["user"], data);
    },
  });
};

// m_app_login 훅
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

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: ApiService.user.getProfile,
    staleTime: 10 * 60 * 1000, // 10분
  });
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ApiService.user.updateProfile,
    onSuccess: (data) => {
      // 사용자 정보 캐시 업데이트
      queryClient.setQueryData(["user", "profile"], data);
    },
  });
};

// ===== 범용 API 훅 (기존 방식과 호환) =====
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
