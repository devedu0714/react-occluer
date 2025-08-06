import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// zustand 사용법 핵심정리
// https://www.heropy.dev/p/n74Tgc

interface AppState {
  // 앱 상태
  isLoading: boolean;
  theme: "light" | "dark";
  isLoggedIn: boolean;
  user: any | null;

  // 액션
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setLogin: (isLoggedIn: boolean, user?: any) => void;
  logout: () => void;
}

// localStorage에서 초기값 가져오기
const getInitialState = () => {
  try {
    const stored = localStorage.getItem("app-store");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        isLoading: false,
        theme: parsed.state?.theme || "light",
        isLoggedIn: parsed.state?.isLoggedIn || false,
        user: parsed.state?.user || null,
      };
    }
  } catch (error) {
    console.error("localStorage 파싱 에러:", error);
  }

  return {
    isLoading: false,
    theme: "light",
    isLoggedIn: false,
    user: null,
  };
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      ...getInitialState(),

      // 액션
      setLoading: (loading) => set({ isLoading: loading }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),
      setLogin: (isLoggedIn, user) => {
        set({ isLoggedIn, user });
        // localStorage에도 직접 저장
        localStorage.setItem("isLogin", isLoggedIn ? "true" : "false");
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      },
      logout: () => {
        set({ isLoggedIn: false, user: null });
        // localStorage에서도 삭제
        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      },
    }),
    {
      name: "app-store", // localStorage 키 이름
      storage: createJSONStorage(() => localStorage),
      // persist할 상태만 선택
      partialize: (state) => ({
        theme: state.theme,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
