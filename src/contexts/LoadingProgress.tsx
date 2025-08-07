import styled from "styled-components";
import { Spin } from "antd";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #00b375 !important;
  }
  margin-bottom: 20px;
`;

const LoadingProgress = () => {
  return (
    <LoadingContainer>
      <StyledSpin size="large" />
    </LoadingContainer>
  );
};

export default LoadingProgress;
