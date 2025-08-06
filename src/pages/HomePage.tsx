import styled from "styled-components";
import logger from "../utils/logger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainBanner from "../components/MainBanner";

const HomeContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <MainBanner />
    </HomeContainer>
  );
};

export default HomePage;
