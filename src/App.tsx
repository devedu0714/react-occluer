import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useAppStore } from "./store/useAppStore";
import NoPage from "./pages/NoPage";

const AppContainer = styled.div<{ theme: "light" | "dark" }>`
  min-height: 100vh;
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
            <Route path="/" element={<HomePage />} />
            {/* no page */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
      </AppContainer>
    </>
  );
}

export default App;
