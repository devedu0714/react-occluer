import styled from "styled-components";
import { Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useAppLogin } from "../hooks/useApi";
import { useAppStore } from "../store/useAppStore";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";

import KakaoLogo from "../assets/logo/kakao.svg";
import GoogleLogo from "../assets/logo/google.svg";
import AppleLogo from "../assets/logo/apple.svg";
import { theme } from "../utils/theme";

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
  font-weight: 700;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

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
  margin-bottom: 20px;
`;

const LoginFormWrap = styled.div`
  width: 100%;
  padding: 0 5px;

  input,
  .ant-input-affix-wrapper,
  .ant-input-password {
    border-radius: 6px;
    border: 1px solid ${theme.colors.inputBorder};
    background-color: ${theme.colors.input} !important;
  }
`;

const SmallButton = styled(Button)`
  font-size: 10px !important;
  padding: 6px 8px !important;
  color: #777 !important;
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
`;

const LoginButton = styled(Button)<{ disabled: boolean }>`
  width: 100% !important;
  margin-top: 30px !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  background-color: ${(props) =>
    props.disabled ? "#ccc" : theme.colors.primary} !important;
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

// 네이버 로그인 추후 추가
// const NaverLoginButton = styled.div`
//   #naverIdLogin {
//     display: inline-block;
//     margin: 0 auto;
//     width: 100%;
//     max-width: 300px;
//     height: 50px;
//   }
// `;

const HomeButton = styled(Button)`
  font-size: 12px !important;
  color: #777 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  width: fit-content !important;
  margin: 0 auto !important;
  text-decoration: underline !important;
`;

const InputLabel = styled.div`
  text-align: left;
  margin-bottom: 4px;
`;

const InputLabelText = styled.span`
  font-size: 14px;
  color: #777;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const StyledPasswordInput = styled(Input.Password)`
  margin-bottom: 0;
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
      { email: id, password, join_type: "e", uniq_key: "" },
      {
        onSuccess: (response) => {
          const data = response.data;
          if (data.resObject.rsp_code === "100") {
            message.success("로그인 성공!");
            setLogin(true, data);
            logger.log("로그인 성공!");
            // 로그인 성공 후 홈페이지로 이동
            navigate("/");
          } else {
            message.error(data.resObject.rsp_msg || "로그인에 실패했습니다.");
          }
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
        <InputLabel>
          <InputLabelText>아이디</InputLabelText>
        </InputLabel>
        <StyledInput
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onPressEnter={loginHandler}
        />
        <InputLabel>
          <InputLabelText>비밀번호</InputLabelText>
        </InputLabel>
        <StyledPasswordInput
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={loginHandler}
        />
        <LoginButton
          type="primary"
          onClick={loginHandler}
          loading={isPending}
          disabled={!id.trim() || !password.trim()}
        >
          로그인
        </LoginButton>
      </LoginFormWrap>
      <LinkContainer>
        <SmallButton variant="text" onClick={() => navigate("/Edit/MissID")}>
          아이디 찾기
        </SmallButton>
        <SmallButton
          variant="text"
          onClick={() => navigate("/Edit/MissPassword")}
        >
          비밀번호 재설정
        </SmallButton>
        <SmallButton variant="text" onClick={() => navigate("/Join")}>
          회원가입
        </SmallButton>
      </LinkContainer>
      <SocialLoginContainer isIOS={false}>
        {/* 네이버 로그인 추후 추가 */}
        {/* <NaverLoginButton>
          <div id="naverIdLogin"></div>
        </NaverLoginButton> */}
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
      <HomeButton type="link" onClick={() => navigate("/")}>
        둘러보기
      </HomeButton>
    </LoginContainer>
  );
};

export default LoginPage;
