import styled from "styled-components";
import { useAppStore } from "../store/useAppStore";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
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
  const navigate = useNavigate();
  const { isLoggedIn } = useAppStore();
  logger.info(isLoggedIn);

  // 네비게이션 기능 추가 예정
  const homeHandler = () => {
    navigate("/");
  };

  const searchHandler = () => {
    logger.log("search");
  };

  const addHandler = () => {
    logger.log("add");
  };

  const profileHandler = () => {
    logger.log("profile");
    // 버튼 클릭시 로그인 여부에 따라서 페이지 이동
    // 로그인이 되어있는 경우 마이페이지
    // 로그인이 되어있지 않은 경우 로그인 페이지
    if (isLoggedIn === true) {
      navigate("/myPage");
    } else {
      navigate("/login");
    }
  };

  return (
    <LayoutContainer>
      <Main>{children}</Main>

      <BottomNav>
        <NavContainer>
          <NavButton onClick={homeHandler}>🏠</NavButton>
          <NavButton onClick={searchHandler}>🔍</NavButton>
          <NavButton onClick={addHandler}>➕</NavButton>
          <NavButton onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </NavButton>
          <NavButton onClick={profileHandler}>👤</NavButton>
        </NavContainer>
      </BottomNav>
    </LayoutContainer>
  );
};

export default Layout;
