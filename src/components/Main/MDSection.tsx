import styled from "styled-components";
import Slider from "react-slick";

const MDSectionContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: #111;
  margin: 10px 0;
  overflow: hidden;
  position: relative;
`;

const MDSectionTitle = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #111;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

const MDSectionContents = styled.div`
  width: 80%;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  position: relative;

  /* Slick 슬라이더 스타일 오버라이드 */
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
    gap: 7.5px;
  }

  .slick-slide {
    width: calc(25% - 8px) !important;
    flex: 0 0 calc(25% - 8px) !important;
    padding: 0;
  }

  .slick-slide > div {
    width: 100% !important;
  }

  /* 화살표 버튼 스타일 */
  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &:before {
      font-size: 14px;
      color: #666;
      font-weight: bold;
    }
  }

  .slick-prev {
    left: -23px;
  }

  .slick-next {
    right: -23px;
  }
`;

const SlideItem = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
  }
`;

const MDSection = ({ md }: { md: any[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <MDSectionContainer>
      <MDSectionTitle>기획관</MDSectionTitle>
      <MDSectionContents>
        <Slider {...settings}>
          {md.map((item) => (
            <SlideItem key={item.id}>
              <div>{item.title}</div>
            </SlideItem>
          ))}
        </Slider>
      </MDSectionContents>
    </MDSectionContainer>
  );
};

export default MDSection;
