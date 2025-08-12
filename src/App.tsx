import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useAppStore } from "./store/useAppStore";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import JoinPage from "./pages/JoinPage";
import SearchPage from "./pages/SearchPage";

const AppContainer = styled.div<{ theme: "light" | "dark" }>`
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#ffffff"};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  transition: all 0.3s ease;
`;

function App() {
  const { theme } = useAppStore();

  return (
    <>
      <GlobalStyles />
      <AppContainer theme={theme}>
        <Layout>
          <Routes>
            {/* no page */}
            <Route path="*" element={<NoPage />} />
            {/* main page */}
            <Route path="/" element={<HomePage />} />
            {/* 로그인 */}
            <Route path="/login" element={<LoginPage />} />
            {/* 마이페이지 */}
            <Route path="/myPage" element={<MyPage />} />
            {/* 회원가입 */}
            <Route path="/join" element={<JoinPage />} />
            {/* 검색 */}
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </AppContainer>
    </>
  );
}

export default App;
