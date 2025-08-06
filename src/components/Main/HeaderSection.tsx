import styled from "styled-components";
import Blog from "../../assets/logo/blog.png";
import Insta from "../../assets/logo/instagram.png";
import { Button, Input } from "antd";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
`;

const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
`;

const LogoImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const SearchWrap = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 0;
  margin: 0 auto;

  .ant-input-affix-wrapper {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-color: #d9d9d9;
    font-size: 14px;
    height: 35px;

    &:hover,
    &:focus {
      border-color: #1890ff;
    }
  }

  .ant-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 35px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
    }
  }
`;

const HeaderSection = () => {
  // todo : 인스타그램, 네이버 블로그 열기 기능 추가

  // todo : 검색 핸들러 및 API 함수 추가

  return (
    <HeaderContainer>
      <ImageWrap>
        <LogoImg src={Insta} alt="instagram" />
        <LogoImg src={Blog} alt="blog" />
      </ImageWrap>
      <SearchWrap>
        <Input
          type="text"
          placeholder="검색어를 입력해주세요"
          allowClear
          size="large"
        />
        <Button type="primary" size="large">
          검색
        </Button>
      </SearchWrap>
    </HeaderContainer>
  );
};

export default HeaderSection;
