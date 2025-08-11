import styled from "styled-components";
import { useAppStore } from "../store/useAppStore";
import logger from "../utils/logger";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { theme } from "../utils/theme";

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
  padding: 6px 0;
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
  color: ${(props) => (props.$active ? theme.colors.primary : "#666")};
  font-size: 12px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  outline: none;

  &:hover {
    color: #007bff;
  }

  .icon {
    font-size: 20px;
    margin-bottom: 4px;
    color: ${(props) => (props.$active ? theme.colors.primary : "#666")};
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isMenuOpen } = useAppStore();

  // 현재 경로에 따른 활성화 상태 확인
  const isHomeActive = location.pathname === "/";
  const isSearchActive = location.pathname === "/search";
  const isMenuActive = isMenuOpen;
  const isProfileActive =
    location.pathname === "/myPage" || location.pathname === "/login";

  // 네비게이션 기능 추가 예정
  const homeHandler = () => {
    navigate("/");
  };

  const searchHandler = () => {
    navigate("/search");
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
          <NavButton onClick={homeHandler} $active={isHomeActive}>
            <HomeOutlined
              className="icon"
              style={{ color: isHomeActive ? theme.colors.primary : "#666" }}
            />
          </NavButton>
          <NavButton onClick={searchHandler} $active={isSearchActive}>
            <SearchOutlined
              className="icon"
              style={{ color: isSearchActive ? theme.colors.primary : "#666" }}
            />
          </NavButton>
          <NavButton onClick={addHandler} $active={isMenuActive}>
            <MenuOutlined
              className="icon"
              style={{ color: isMenuActive ? theme.colors.primary : "#666" }}
            />
          </NavButton>
          <NavButton onClick={profileHandler} $active={isProfileActive}>
            <UserOutlined
              className="icon"
              style={{ color: isProfileActive ? theme.colors.primary : "#666" }}
            />
          </NavButton>
        </NavContainer>
      </BottomNav>
    </LayoutContainer>
  );
};

export default Layout;
