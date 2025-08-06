import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainBanner from "../components/Main/MainBanner";
import HeaderSection from "../components/Main/HeaderSection";
import MainContents from "../components/Main/MainContents";
import { useEffect, useState } from "react";
import { dummyData, dummyMD, dummyNotice } from "../contexts/Dummy";
import MDSection from "../components/Main/MDSection";
import NoticeSection from "../components/Main/NoticeSection";

const HomeContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HomePage = () => {
  // 메인 컨텐츠 데이터 상태
  const [contents, setContents] = useState<any[]>([]);

  // 기획관 데이터 상태
  const [md, setMd] = useState<any[]>([]);

  // 공지사항 데이터 상태
  const [notice, setNotice] = useState<any[]>([]);

  // todo : 메인 컨텐츠 데이터 불러오기
  // todo : 기획관 데이터 불러오기
  useEffect(() => {
    setContents(dummyData);
    setMd(dummyMD);
    setNotice(dummyNotice);
  }, []);

  return (
    <HomeContainer>
      <MainBanner />
      <HeaderSection />
      {/* 메인 컨텐츠 영역 */}
      <MainContents contents={contents} />
      {/* 기획관 슬라이더 영역 */}
      <MDSection md={md} />
      {/* 공지사항 영역 */}
      <NoticeSection notice={notice} />
    </HomeContainer>
  );
};

export default HomePage;
