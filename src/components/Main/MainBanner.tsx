import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;

  /* Slick 슬라이더 스타일 오버라이드 */
  /* 필수적으로 넣어두기 */
  .slick-slider {
    width: 100% !important;
  }

  .slick-list {
    width: 100% !important;
    overflow: hidden;
  }

  .slick-track {
    width: 100% !important;
    display: flex !important;
  }

  .slick-slide {
    width: 100% !important;
    flex: 0 0 100% !important;
  }

  .slick-slide > div {
    width: 100% !important;
  }

  /* 화살표 버튼 위치 조정 */
  .slick-prev,
  .slick-next {
    z-index: 1;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  /* dots 위치 조정 */
  .slick-dots {
    bottom: 10px;
  }
`;

const SlideItem = styled.div`
  width: 100% !important;
  height: 200px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;

  font-size: 2rem;
  font-weight: bold;
  color: #333;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const MainBanner = () => {
  // 슬라이드 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    adaptiveHeight: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  // todo : 추후 배너 데이터 불러오기

  return (
    <SliderContainer>
      <Slider {...settings}>
        <SlideItem>슬라이드 1</SlideItem>
        <SlideItem>슬라이드 2</SlideItem>
        <SlideItem>슬라이드 3</SlideItem>
      </Slider>
    </SliderContainer>
  );
};

export default MainBanner;
