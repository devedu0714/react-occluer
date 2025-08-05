import { create } from "zustand";

// zustand 사용법 핵심정리
// https://www.heropy.dev/p/n74Tgc

interface AppState {
  // 앱 상태
  isLoading: boolean;
  theme: "light" | "dark";

  // 액션
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 초기 상태
  isLoading: false,
  theme: "light",

  // 액션
  setLoading: (loading) => set({ isLoading: loading }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setTheme: (theme) => set({ theme }),
}));
