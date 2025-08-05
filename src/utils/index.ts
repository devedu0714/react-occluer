// 날짜 포맷팅
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 텍스트 자르기
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// 로컬 스토리지 유틸리티
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("로컬 스토리지 저장 실패:", error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

// 디바운스 함수
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 쿼리 파라미터 파싱
export const parseQueryParams = (
  queryString: string
): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

// 클래스명 조합
export const classNames = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
