// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// 사용자 타입
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// 게시물 타입
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 댓글 타입
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// 테마 타입
export type Theme = "light" | "dark";

// 앱 상태 타입
export interface AppState {
  isLoading: boolean;
  theme: Theme;
  user?: User;
}

// 네비게이션 아이템 타입
export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}
