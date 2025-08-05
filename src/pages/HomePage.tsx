import styled from "styled-components";
import ExampleComponent from "../components/ExampleComponent";
import logger from "../utils/logger";

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HomePage = () => {
  // logger 사용 예시
  logger.info("홈페이지가 렌더링되었습니다");

  return (
    <HomeContainer>
      <Title>React Occluer</Title>
      <ExampleComponent />
    </HomeContainer>
  );
};

export default HomePage;
