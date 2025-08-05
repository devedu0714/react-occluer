import styled from "styled-components";
import { useAppStore } from "../store/useAppStore";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100%;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 100%;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 8px 4px;
  min-width: 60px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.$active ? "#007bff" : "#666")};
  font-size: 12px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};

  &:hover {
    color: #007bff;
  }

  .icon {
    font-size: 20px;
    margin-bottom: 4px;
  }
`;

const ThemeToggle = styled.button<{ theme: "light" | "dark" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
  border: 1px solid ${(props) => (props.theme === "dark" ? "#555" : "#ddd")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <LayoutContainer>
      <Main>{children}</Main>

      <BottomNav>
        <NavContainer>
          <NavButton>🏠</NavButton>
          <NavButton>🔍</NavButton>
          <NavButton>➕</NavButton>
          <NavButton onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </NavButton>
          <NavButton>👤</NavButton>
        </NavContainer>
      </BottomNav>
    </LayoutContainer>
  );
};

export default Layout;
