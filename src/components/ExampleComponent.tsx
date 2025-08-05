import styled from "styled-components";
import logger from "../utils/logger";

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExampleComponent = () => {
  const handleLogExample = () => {
    logger.log("일반 로그 메시지");
  };

  const handleInfoExample = () => {
    logger.info("정보 메시지");
  };

  const handleWarnExample = () => {
    logger.warn("경고 메시지");
  };

  const handleErrorExample = () => {
    logger.error("에러 메시지");
  };

  const handleDebugExample = () => {
    logger.debug("디버그 메시지");
  };

  const handleApiExample = () => {
    logger.api("POST", "/api/test", { test: "data" });
  };

  return (
    <Container>
      <h3>Logger 사용 예시</h3>
      <p>개발자 도구의 콘솔을 확인해보세요!</p>

      <div>
        <Button onClick={handleLogExample}>일반 로그</Button>
        <Button onClick={handleInfoExample}>정보 로그</Button>
        <Button onClick={handleWarnExample}>경고 로그</Button>
        <Button onClick={handleErrorExample}>에러 로그</Button>
        <Button onClick={handleDebugExample}>디버그 로그</Button>
        <Button onClick={handleApiExample}>API 로그</Button>
      </div>
    </Container>
  );
};

export default ExampleComponent;
