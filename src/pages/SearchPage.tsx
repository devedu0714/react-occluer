import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import MainContents from "../components/Main/MainContents";
import { dummyData, dummySearch } from "../contexts/Dummy";
import SearchContents from "../components/Search/SearchContents";
import SearchDetailContents from "../components/Search/SearchDetailContents";

const SearchModalContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  background-color: transparent;
  border: 1px solid #222;
  width: fit-content;
  margin: 15px auto 0 auto;
  padding: 0 10px;
  border-radius: 5px;
  color: #222;
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled(Button)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const CompleteButton = styled(Button)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchPage = () => {
  const [isPage, setIsPage] = useState(0);

  // 임시 컨텐츠 데이터 상태
  const [contents, setContents] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);

  // todo : 컨텐츠 데이터 불러오기
  useEffect(() => {
    setContents(dummyData);
    setSearch(dummySearch);
  }, []);

  // 페이지 핸들러
  const handleNext = () => {
    setIsPage(isPage + 1);
  };

  const handlePrev = () => {
    setIsPage(isPage - 1);
  };

  return (
    <SearchModalContainer>
      <ModalTitle>영업</ModalTitle>
      {isPage === 0 && (
        <>
          <ContentsWrap>
            <MainContents contents={contents} />
          </ContentsWrap>
          <ButtonWrap>
            <Button>중복</Button>
            <Button>최근</Button>
            <Button>고급검색</Button>
          </ButtonWrap>
          <PageButton onClick={handleNext}>다음</PageButton>
          <CompleteButton>완료</CompleteButton>
        </>
      )}
      {isPage === 1 && (
        <>
          <ContentsWrap>
            <SearchContents contents={search} />
          </ContentsWrap>
          <PageButton onClick={handlePrev}>이전</PageButton>
          <PageButton onClick={handleNext}>다음</PageButton>
          <CompleteButton>완료</CompleteButton>
        </>
      )}
      {isPage === 2 && (
        <>
          <ContentsWrap>
            <SearchDetailContents contents={contents} />
          </ContentsWrap>
          <PageButton onClick={handlePrev}>이전</PageButton>
          <CompleteButton>완료</CompleteButton>
        </>
      )}
    </SearchModalContainer>
  );
};

export default SearchPage;
