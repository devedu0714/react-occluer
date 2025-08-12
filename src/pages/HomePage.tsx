import styled from "styled-components";
import { useEffect, useState } from "react";
import { dummyData, dummyMD, dummyNotice } from "../contexts/Dummy";
import MainBanner from "../components/Main/MainBanner";
import SearchSection from "../components/Main/SearchSection";
import MainContents from "../components/Main/MainContents";
import MDSection from "../components/Main/MDSection";
import NoticeSection from "../components/Main/NoticeSection";
import { useAppHome } from "../hooks/useApi";
import logger from "../utils/logger";

const HomeContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const HomePage = () => {
  // 메인 컨텐츠 데이터 상태
  const [contents, setContents] = useState<any[]>([]);

  // 기획관 데이터 상태
  const [md, setMd] = useState<any[]>([]);

  // 공지사항 데이터 상태
  const [notice, setNotice] = useState<any[]>([]);

  const { mutate: homeContents } = useAppHome();

  useEffect(() => {
    homeContents(
      {},
      {
        onSuccess: (response) => {
          logger.log("============ >>>>>> 홈 컨텐츠 조회 성공 -", response);
          if (response.data?.resObject?.rsp_code === "100") {
            setContents(response.data?.resObject?.array);
          }
        },
      }
    );
  }, [homeContents]);

  useEffect(() => {
    setContents(dummyData);
    setMd(dummyMD);
    setNotice(dummyNotice);
  }, []);

  return (
    <HomeContainer>
      <MainBanner />
      <SearchSection />
      <MainContents contents={contents} />
      <MDSection md={md} />
      <NoticeSection notice={notice} />
    </HomeContainer>
  );
};

export default HomePage;
