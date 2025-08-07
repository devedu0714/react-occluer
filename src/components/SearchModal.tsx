import { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Modal, Input, Button } from "antd";
import MainContents from "./Main/MainContents";
import { dummyData, dummySearch } from "../contexts/Dummy";
import SearchContents from "./Search/SearchContents";
import SearchDetailContents from "./Search/SearchDetailContents";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const GlobalStyle = createGlobalStyle<{ isClosing: boolean }>`
  .ant-modal {
    top: 5% !important;
    padding-bottom: 10px;
  }

  .ant-modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .ant-modal-content {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${({ isClosing }) =>
      isClosing ? slideDown : slideUp} 0.3s ease-out forwards;
  }
  
  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .ant-modal-close {
    top: 16px;
    right: 16px;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  background-color: transparent;
  border: 1px solid #222;
  width: fit-content;
  margin: 0 auto;
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

export const SearchModal = ({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isPage, setIsPage] = useState(0);

  // 임시 컨텐츠 데이터 상태
  const [contents, setContents] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);

  // todo : 컨텐츠 데이터 불러오기
  useEffect(() => {
    setContents(dummyData);
    setSearch(dummySearch);
  }, []);

  // 모달 오픈 상태 변경 시 애니메이션 적용
  useEffect(() => {
    if (!open) {
      setIsClosing(false);
    }
  }, [open]);

  // 모달 닫기 핸들러
  const handleCancel = () => {
    setIsClosing(true);
    setIsPage(0);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  // 페이지 핸들러
  const handleNext = () => {
    setIsPage(isPage + 1);
  };

  const handlePrev = () => {
    setIsPage(isPage - 1);
  };

  return (
    <Modal open={open} onCancel={handleCancel} footer={null} width="100%">
      <GlobalStyle isClosing={isClosing} />
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
    </Modal>
  );
};
