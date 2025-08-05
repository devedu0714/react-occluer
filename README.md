# React Occluer

현대적인 React 애플리케이션으로, 최신 기술 스택을 활용하여 구축되었습니다.

## 🚀 기술 스택

- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Zustand** - 상태 관리
- **React Query** - 서버 상태 관리
- **React Router** - 라우팅
- **Styled Components** - CSS-in-JS 스타일링
- **Axios** - HTTP 클라이언트

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── store/         # Zustand 스토어
├── hooks/         # 커스텀 훅
├── utils/         # 유틸리티 함수
├── types/         # TypeScript 타입 정의
├── services/      # API 서비스
└── styles/        # 글로벌 스타일
```

## 🛠️ 설치 및 실행

### 의존성 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 빌드

```bash
yarn build
```

### 린트 검사

```bash
yarn lint
```

### 빌드 미리보기

```bash
yarn preview
```

## ✨ 주요 기능

- **다크/라이트 테마** - Zustand를 사용한 테마 전환
- **라우팅** - React Router를 사용한 페이지 라우팅
- **API 통신** - Axios와 React Query를 사용한 효율적인 데이터 페칭
- **타입 안전성** - TypeScript를 통한 완전한 타입 지원
- **모던 스타일링** - Styled Components를 사용한 CSS-in-JS

## 🎯 사용 예시

### Zustand 스토어 사용

```typescript
import { useAppStore } from "./store";

const MyComponent = () => {
  const { theme, toggleTheme } = useAppStore();

  return <button onClick={toggleTheme}>현재 테마: {theme}</button>;
};
```

### React Query 사용

```typescript
import { useApiQuery } from "./hooks/useApi";

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useApiQuery<Post[]>(["posts"], "/posts");

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
```

## 🔧 환경 설정

프로젝트는 다음과 같이 설정되어 있습니다:

- **ESLint** - 코드 품질 관리
- **TypeScript** - 타입 체크
- **Vite** - 빠른 개발 환경
- **Styled Components** - CSS-in-JS 스타일링

## GIT 커밋 컨벤션

# 제목은 최대 50글자까지 아래에 작성: ex) Feat: Add Key mapping

# 본문은 아래에 작성

# 꼬릿말은 아래에 작성: ex) Github issue #23

# --- COMMIT END ---

# <타입> 리스트

# feat : 기능 (새로운 기능)

# fix : 버그 (버그 수정)

# refactor : 리팩토링

# design : CSS 등 사용자 UI 디자인 변경

# comment : 필요한 주석 추가 및 변경

# style : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)

# docs : 문서 수정 (문서 추가, 수정, 삭제, README)

# test : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)

# chore : 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등)

# init : 초기 생성

# rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우

# remove : 파일을 삭제하는 작업만 수행한 경우

# ------------------

# 제목 첫 글자를 대문자로

# 제목은 명령문으로

# 제목 끝에 마침표(.) 금지

# 제목과 본문을 한 줄 띄워 분리하기

# 본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.

# 본문에 여러줄의 메시지를 작성할 땐 "-"로 구분

# ------------------

# <꼬리말>

# 필수가 아닌 optioanl

# Fixes :이슈 수정중 (아직 해결되지 않은 경우)

# Resolves : 이슈 해결했을 때 사용

# Ref : 참고할 이슈가 있을 때 사용

# Related to : 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)

# ex) Fixes: #47 Related to: #32, #21
