import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Instagram from "../../assets/logo/instagram.png";
import Blog from "../../assets/logo/blog.png";

const SearchSectionContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
`;

const SearchSection = () => {
  return (
    <SearchSectionContainer>
      <SocialLinks>
        <SocialIcon>
          <img src={Instagram} alt="Instagram" />
        </SocialIcon>
        <SocialIcon>
          <img src={Blog} alt="Blog" />
        </SocialIcon>
      </SocialLinks>
      <SearchBar>
        <Input
          placeholder="검색어를 입력해주세요"
          suffix={<SearchOutlined onClick={() => {}} />}
          style={{ borderRadius: "20px" }}
          allowClear
        />
      </SearchBar>
    </SearchSectionContainer>
  );
};

export default SearchSection;
