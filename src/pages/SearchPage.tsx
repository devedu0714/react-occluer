import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import MainContents from "../components/Main/MainContents";
import { dummyData, dummyFood, dummySearch } from "../contexts/Dummy";
import SearchContents from "../components/Search/SearchContents";
import { theme } from "../utils/theme";
import DummyContents from "../components/Main/DummyContents";

const SearchPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  background: ${theme.colors.semiWhite};
  padding: 20px;
`;

const ContentCard = styled.div<{ $isFirstPage?: boolean }>`
  height: ${(props) => (props.$isFirstPage ? "100%" : "auto")};
  background: ${theme.colors.white};
  border-radius: 20px;
  flex: ${(props) => (props.$isFirstPage ? "1" : "0 1 auto")};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: start;
  padding: 10px 20px;
  color: #333;
`;

const FilterButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: ${(props) =>
    props.active
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.secondary}`};
  background: ${(props) => (props.active ? theme.colors.secondary : "white")};
  color: ${(props) => (props.active ? theme.colors.primary : "#666")};
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${(props) => (props.active ? "white" : theme.colors.primary)};
    background: ${(props) => (props.active ? theme.colors.primary : "white")};
  }
`;

const ContentsWrap = styled.div`
  padding: 0 10px 10px 10px;
`;

const DetailContentsWrap = styled.div`
  padding: 0 10px 10px 10px;
  min-height: 300px;
`;

const ButtonWrap = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const PageButton = styled(Button)`
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  background: ${theme.colors.white};
  font-weight: 500;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
  }
`;

const CompleteButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${theme.colors.primary};
  border-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: 500;

  &:hover {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    color: white;
  }
`;

const CloseSearchButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 0;
  margin-top: 10px;
  text-decoration: underline;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? theme.colors.primary : "#ddd")};
`;

const SearchPage = () => {
  const [isPage, setIsPage] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  // 임시 컨텐츠 데이터 상태
  const [contents, setContents] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const [detail, setDetail] = useState<any[]>([]);

  // todo : 컨텐츠 데이터 불러오기
  useEffect(() => {
    setContents(dummyData);
    setSearch(dummySearch);
    setDetail(dummyFood);
  }, []);

  // 페이지 핸들러
  const handleNext = () => {
    setIsPage(isPage + 1);
  };

  // 필터 토글 핸들러
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // 아이템 선택 핸들러
  const handleItemSelect = (itemId: string, itemTitle: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
    // 선택된 아이템의 제목도 저장
    if (selectedItem !== itemId) {
      setSelectedCategory(itemTitle);
    }
  };

  // 카테고리 선택 핸들러 (1페이지에서 2페이지로 이동)
  const handleCategorySelect = (categoryName: string) => {
    setSelectedSubCategory(categoryName);
    setIsPage(1);
  };

  // 서브카테고리 선택 핸들러 (2페이지에서 3페이지로 이동)
  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedItem(subCategoryName);
    setIsPage(2);
  };

  // 검색 닫기 핸들러
  const handleCloseSearch = () => {
    setIsPage(0);
    setSelectedItem(null);
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedFilters([]);
  };

  return (
    <SearchPageContainer>
      <ContentCard $isFirstPage={isPage === 0}>
        {/* 페이지별 타이틀 */}
        <ModalTitle>
          {isPage === 0 && "영업"}
          {isPage === 1 && `${selectedCategory}`}
          {isPage === 2 && `${selectedCategory} > ${selectedSubCategory}`}
        </ModalTitle>

        {/* 페이지 1: 지역 선택 */}
        {isPage === 0 && (
          <>
            <FilterButtonWrap>
              <FilterButton
                active={selectedFilters.includes("중복")}
                onClick={() => toggleFilter("중복")}
              >
                중복
                <CheckOutlined />
              </FilterButton>
              <FilterButton
                active={selectedFilters.includes("최근")}
                onClick={() => toggleFilter("최근")}
              >
                최근
                <CheckOutlined />
              </FilterButton>
              <FilterButton
                active={selectedFilters.includes("고급검색")}
                onClick={() => toggleFilter("고급검색")}
              >
                고급검색
                <CheckOutlined />
              </FilterButton>
            </FilterButtonWrap>
            <ContentsWrap>
              <DummyContents
                contents={contents}
                onItemSelect={handleItemSelect}
                selectedItem={selectedItem}
              />
            </ContentsWrap>

            <ButtonWrap>
              <PageButton onClick={handleNext}>다음</PageButton>
              <CompleteButton>완료</CompleteButton>
            </ButtonWrap>
            <div style={{ textAlign: "center" }}>
              <CloseSearchButton onClick={handleCloseSearch}>
                × 검색 닫기
              </CloseSearchButton>
            </div>
          </>
        )}

        {/* 페이지 2: 카테고리 선택 */}
        {isPage === 1 && (
          <>
            <DetailContentsWrap>
              <SearchContents
                contents={search}
                onItemSelect={handleCategorySelect}
                selectedItem={selectedSubCategory}
              />
            </DetailContentsWrap>
            <PaginationDots>
              <Dot />
              <Dot active={true} />
              <Dot />
              <Dot />
              <Dot />
            </PaginationDots>
            <ButtonWrap>
              <PageButton onClick={handleNext}>다음</PageButton>
              <CompleteButton>완료</CompleteButton>
            </ButtonWrap>
            <div style={{ textAlign: "center" }}>
              <CloseSearchButton onClick={handleCloseSearch}>
                × 검색 닫기
              </CloseSearchButton>
            </div>
          </>
        )}

        {/* 페이지 3: 서브카테고리 선택 */}
        {isPage === 2 && (
          <>
            <DetailContentsWrap>
              <SearchContents
                contents={detail}
                onItemSelect={handleSubCategorySelect}
                selectedItem={selectedItem}
              />
            </DetailContentsWrap>
            <PaginationDots>
              <Dot />
              <Dot />
              <Dot active={true} />
              <Dot />
              <Dot />
            </PaginationDots>
            <ButtonWrap>
              <CompleteButton>완료</CompleteButton>
            </ButtonWrap>
            <div style={{ textAlign: "center" }}>
              <CloseSearchButton onClick={handleCloseSearch}>
                × 검색 닫기
              </CloseSearchButton>
            </div>
          </>
        )}
      </ContentCard>
    </SearchPageContainer>
  );
};

export default SearchPage;
