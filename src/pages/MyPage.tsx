import styled from "styled-components";
import { useAppStore } from "../store";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyPage = () => {
  const navigate = useNavigate();
  // 현재 로그인 되어있는 정보 콘솔에 띄우기

  // 로그인 데이터 불러오기
  const { user, setLogin } = useAppStore();

  // 로그아웃 핸들러
  // 로그아웃시 로그인 상태 초기화 및 홈페이지로 이동
  const logoutHandler = () => {
    localStorage.removeItem("isLogin");
    setLogin(false, null);
    navigate("/");
  };
  return (
    <MyPageContainer>
      MyPage
      {/* 로그아웃 버튼 */}
      <Button type="primary" onClick={logoutHandler}>
        로그아웃
      </Button>
    </MyPageContainer>
  );
};

export default MyPage;
