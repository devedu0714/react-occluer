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

## 📝 Git 커밋 컨벤션

프로젝트의 일관성 있는 커밋 메시지를 위해 다음 컨벤션을 따릅니다.

### 🏷️ 커밋 타입

| 타입       | 설명                                       | 예시                                     |
| ---------- | ------------------------------------------ | ---------------------------------------- |
| `feat`     | 새로운 기능 추가                           | `feat: Add user authentication`          |
| `fix`      | 버그 수정                                  | `fix: Resolve login validation issue`    |
| `refactor` | 코드 리팩토링                              | `refactor: Simplify API call logic`      |
| `design`   | UI/UX 디자인 변경                          | `design: Update button styling`          |
| `style`    | 코드 스타일 변경 (비즈니스 로직 변경 없음) | `style: Add semicolons`                  |
| `docs`     | 문서 수정                                  | `docs: Update README installation guide` |
| `test`     | 테스트 코드 추가/수정                      | `test: Add unit tests for utils`         |
| `chore`    | 빌드 프로세스, 패키지 매니저 등            | `chore: Update dependencies`             |
| `init`     | 프로젝트 초기 설정                         | `init: Setup React project`              |
| `rename`   | 파일/폴더명 변경                           | `rename: Move components to src/`        |
| `remove`   | 파일 삭제                                  | `remove: Delete unused assets`           |

### 📋 커밋 메시지 구조

```
<타입>: <제목>

<본문>

<꼬리말>
```

### ✨ 작성 규칙

#### 제목 (Title)

- **최대 50자**로 제한
- **첫 글자는 대문자**로 시작
- **명령문**으로 작성 (Add, Fix, Update 등)
- **마침표(.) 사용 금지**
- **한국어 사용 가능**

#### 본문 (Body)

- **제목과 한 줄 띄워서** 작성
- **"무엇을", "왜"**에 집중하여 설명
- **여러 줄** 작성 시 `-`로 구분

#### 꼬리말 (Footer)

- **선택사항** (optional)
- **이슈 번호** 연결 시 사용

### 🔗 이슈 연결

| 키워드       | 설명                  | 예시                   |
| ------------ | --------------------- | ---------------------- |
| `Fixes`      | 이슈 수정 중 (미해결) | `Fixes: #47`           |
| `Resolves`   | 이슈 해결 완료        | `Resolves: #23`        |
| `Ref`        | 참고 이슈             | `Ref: #12`             |
| `Related to` | 관련 이슈             | `Related to: #32, #21` |

### 📝 커밋 예시

```bash
# 기능 추가
feat: Add dark mode toggle functionality

- Implement theme switching with Zustand
- Add theme persistence in localStorage
- Update all components to support dark mode

Resolves: #15

# 버그 수정
fix: Resolve API timeout issue

- Increase timeout from 5s to 10s
- Add retry mechanism for failed requests
- Update error handling for timeout cases

Fixes: #28

# 문서 수정
docs: Update API documentation

- Add new endpoint examples
- Update authentication guide
- Fix broken links in README

# 스타일 변경
style: Format code with Prettier

- Apply consistent indentation
- Add missing semicolons
- Remove trailing whitespace
```
