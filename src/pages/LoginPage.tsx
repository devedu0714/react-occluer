import styled from "styled-components";
import { Input, Button, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppLogin } from "../hooks/useApi";
import { useAppStore } from "../store/useAppStore";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";

import KakaoLogo from "../assets/logo/kakao.svg";
import GoogleLogo from "../assets/logo/google.svg";
import AppleLogo from "../assets/logo/apple.svg";

const LoginContainer = styled.div`
  padding: 0 25px;
  margin: 0 auto;
  height: calc(100vh - 50px);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  margin: 24px 0 32px 0;

  img {
    width: 200px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const SocialLoginContainer = styled.div<{ isIOS: boolean }>`
  display: ${({ isIOS }) => (isIOS ? "none" : "flex")};
  justify-content: center;
  gap: 1rem;
`;

const LoginFormWrap = styled.div`
  width: 100%;
  padding: 0 15px;

  .ant-input {
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    padding: 0 0 10px 0;
    font-size: 16px;
    font-weight: 400;
    color: #000;
  }

  .ant-input-affix-wrapper {
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    padding: 0 0 10px 0;
    margin: 0;
    font-size: 16px;
  }

  .ant-btn {
    width: 100%;
    font-size: 18px !important;
    padding: 6px !important;
    border-radius: 50px !important;

    color: white !important;
  }
`;

const LoginButton = styled(Button)<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled ? "#ccc" : "#00b375"} !important;
`;

const StyledSocialButton = styled.button<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "#fff"} !important;
  border: none;
  border-radius: 6px !important;
  width: 50px !important;
  height: 50px !important;
  line-height: 0 !important;
  cursor: pointer;

  img {
    margin: 0 auto;
    width: 24px;
    height: 24px;
  }
`;

const NaverLoginButton = styled.div`
  #naverIdLogin {
    display: inline-block;
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    height: 50px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useAppLogin();
  const { setLogin, isLoggedIn } = useAppStore();

  // 로그인 핸들러
  const loginHandler = () => {
    if (!id.trim() || !password.trim()) {
      message.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    login(
      { email: id, password, easy_yn: "n", uniq_key: "", token: "" },
      {
        onSuccess: (response) => {
          const data = response.data;
          message.success("로그인 성공!");
          setLogin(true, data);
          logger.log("로그인 성공!");
          // 로그인 성공 후 홈페이지로 이동
          navigate("/");
        },
        onError: (error: any) => {
          message.error("로그인에 실패했습니다. 다시 시도해주세요.");
          console.error("로그인 에러:", error);
        },
      }
    );
  };

  // 로그인 되어있다면 홈페이지로 이동
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/myPage");
    }
  }, [isLoggedIn]);

  //   소셜로그인
  const handleKakaoLogin = () => {
    logger.log("카카오 로그인");
  };

  // 네이버 로그인
  //   네이버 로그인은 id값으로 자체 처리

  //   구글 로그인
  const handleGoogleLogin = () => {
    logger.log("구글 로그인");
  };

  //   애플 로그인
  const handleAppleLogin = () => {
    logger.log("애플 로그인");
  };

  return (
    <LoginContainer>
      <Logo>
        <p>오클러</p>
      </Logo>
      <LoginFormWrap>
        <Input
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onPressEnter={loginHandler}
          style={{ marginBottom: "10px" }}
        />
        <Input.Password
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={loginHandler}
        />
        <LoginButton
          type="primary"
          onClick={loginHandler}
          loading={isPending}
          style={{ marginTop: "20px" }}
          disabled={!id.trim() || !password.trim()}
        >
          로그인
        </LoginButton>
      </LoginFormWrap>
      <LinkContainer>
        <Button variant="text" onClick={() => navigate("/Edit/MissID")}>
          <Typography color="#000">아이디 찾기</Typography>
        </Button>
        <Button variant="text" onClick={() => navigate("/Edit/MissPassword")}>
          <Typography color="#000">비밀번호 재설정</Typography>
        </Button>
        <Button variant="text" onClick={() => navigate("/SignUp/Select")}>
          <Typography color="#000">회원가입</Typography>
        </Button>
      </LinkContainer>
      <SocialLoginContainer isIOS={false}>
        <NaverLoginButton>
          <div id="naverIdLogin"></div>
        </NaverLoginButton>
        <StyledSocialButton
          onClick={handleKakaoLogin}
          backgroundColor="#ffe812"
        >
          <img src={KakaoLogo} alt="카카오" />
        </StyledSocialButton>
        <StyledSocialButton onClick={handleGoogleLogin} backgroundColor="#fff">
          <img src={GoogleLogo} alt="구글" />
        </StyledSocialButton>
        <StyledSocialButton onClick={handleAppleLogin} backgroundColor="#000">
          <img src={AppleLogo} alt="애플" />
        </StyledSocialButton>
      </SocialLoginContainer>
    </LoginContainer>
  );
};

export default LoginPage;
