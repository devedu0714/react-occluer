import styled from "styled-components";
import { BellOutlined } from "@ant-design/icons";
import { theme } from "../../utils/theme";

const HeaderContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${theme.colors.white};
  padding: 10px 20px;
  display: flex;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const HeaderWrap = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.semiBlack};
  margin: 0;
`;

const NotificationIcon = styled.div`
  font-size: 20px;
  color: #666;
  cursor: pointer;
`;

const HeaderSection = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <HeaderContainer $isVisible={isVisible}>
      <HeaderWrap>
        <Logo>오클러</Logo>
        <NotificationIcon>
          <BellOutlined />
        </NotificationIcon>
      </HeaderWrap>
    </HeaderContainer>
  );
};

export default HeaderSection;
