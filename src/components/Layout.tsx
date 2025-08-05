import styled from "styled-components";
import { useAppStore } from "../store/useAppStore";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header<{ theme: "light" | "dark" }>`
  background-color: ${(props) => (props.theme === "dark" ? "#fff" : "#111")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#111")};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const ThemeToggle = styled.button<{ theme: "light" | "dark" }>`
  background: none;
  border: 1px solid ${(props) => (props.theme === "dark" ? "#fff" : "#111")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#111")};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #007bff;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const location = useLocation();
  const { theme, toggleTheme } = useAppStore();

  return (
    <LayoutContainer>
      <Header theme={theme}>
        <Nav>
          <ThemeToggle theme={theme} onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </ThemeToggle>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
