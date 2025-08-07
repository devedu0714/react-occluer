import styled from "styled-components";
import { useAppStore } from "../store/useAppStore";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchModal } from "./SearchModal";

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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isLoggedIn } = useAppStore();

  // 검색 모달 오픈 상태
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // 네비게이션 기능 추가 예정
  const homeHandler = () => {
    navigate("/");
  };

  const searchHandler = () => {
    setIsSearchModalOpen(true);
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

      {/* 검색 모달 */}
      <SearchModal
        open={isSearchModalOpen}
        onCancel={() => setIsSearchModalOpen(false)}
      />
    </LayoutContainer>
  );
};

export default Layout;
