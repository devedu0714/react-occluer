import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Typography, Checkbox, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import logger from "../utils/logger";
import { useAppJoin } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

Modal.setAppElement("#root");

const Container = styled.div`
  padding: 20px 25px;
  max-width: 600px;
  margin: 0 auto;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Section = styled.section`
  margin-bottom: 25px;
`;

const SignupButton = styled(Button)<{ disabled: boolean }>`
  width: 100%;
  padding: 5px;
  border-radius: 50px !important;
  background-color: ${({ disabled }) =>
    disabled ? "#ccc" : "#00b375"} !important;
  color: #fefefe !important;
  border: none !important;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#ccc" : "#00a366"} !important;
    color: #fefefe !important;
  }
`;

const JoinBox = styled.div`
  width: 100%;
  position: relative;
`;

const JoinBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

const JoinLayOut = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    margin-right: 20px;
  }
  div:last-child {
    margin-right: 0;
  }
`;

const TermsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewButton = styled.button`
  background: transparent;
  border: none;
  color: #00b375;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const PostcodeButton = styled.button`
  position: absolute;
  right: 5px;
  top: 16px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #00b375;
`;

const PhoneAuthButton = styled.button`
  position: absolute;
  right: 5px;
  top: 16px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #00b375;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9999,
  },
  content: {
    margin: "auto",
    padding: 0,
    maxWidth: "350px",
    borderRadius: "10px",
    height: "400px",
  },
};

const SuccessModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #00b375;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const SuccessTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const SuccessMessage = styled(Text)`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ConfirmButton = styled(Button)`
  width: 120px;
  height: 40px;
  background-color: #00b375 !important;
  border-color: #00b375 !important;
  color: white !important;
  border-radius: 20px !important;
  font-weight: 500;

  &:hover {
    background-color: #00a366 !important;
    border-color: #00a366 !important;
    color: white !important;
  }
`;

const RequiredMark = styled.span`
  color: #ad2d2d;
`;

const JoinPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm<any>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [serviceTermsAccepted, setServiceTermsAccepted] = useState(false);
  const [privacyTermsAccepted, setPrivacyTermsAccepted] = useState(false);
  const [postcodeModalOpen, setPostcodeModalOpen] = useState(false);
  const [isIdAuthenticated, setIsIdAuthenticated] = useState(false);
  const [isPhoneAuthenticated, setIsPhoneAuthenticated] = useState(false);

  // 회원가입 성공 모달
  const [isJoinSuccessOpen, setIsJoinSuccessOpen] = useState(false);

  const handleIdAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsIdAuthenticated(true);
  };

  const handlePhoneAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPhoneAuthenticated(true);

    // todo : 휴대폰 인증 로직 추가
    // event.preventDefault();
    // event.stopPropagation();
    // if (!isEmailConfirmed) {
    //   setModalMessageTwo("먼저 아이디 인증을 진행해주세요.");
    //   setIsModalOpenTwo(true);
    //   return;
    // }
    // const { IMP } = window;
    // IMP.init(import.meta.env.VITE_IMP_ID_CODE);
    // const data = {
    //   merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    //   company: "카본업슈", // 회사명 또는 URL
    //   phone: getValues("handphone"), // 사용자 전화번호
    //   name: getValues("name"), // 사용자 이름
    // };
    // console.log("휴대폰인증 데이터", data);
    // IMP.certification(data, callback);
  };

  // todo : 휴대폰 인증 콜백 핸들러 추가
  // const callback = (response: any) => {
  //   const { success, error_msg } = response;
  //   if (success) {
  //     setIsPhoneAuthenticated(true);
  //     logger.info("휴대폰 인증 성공");
  //     // 인증된 이름과 전화번호를 비활성화
  //     setValue("name", watchName, { shouldValidate: true });
  //     setValue("handphone", watchHandphone, { shouldValidate: true });
  //   } else {
  //     logger.error("휴대폰 인증 실패", error_msg);
  //   }
  // };

  // todo : 약관 동의 모달 추가
  const handleViewTerms = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  // todo : 개인정보 동의 모달 추가
  const handleViewPrivacy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const { mutate: m_app_join } = useAppJoin();

  // todo : 회원가입 버튼 핸들러 추가
  const onSubmit = async (data: any) => {
    logger.log("============ >>>>>> 회원가입 데이터 -", data);
    m_app_join(
      {
        username: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          logger.log("============ >>>>>> 회원가입 성공 <<<<<< =============");
          setIsJoinSuccessOpen(true);
        },
        onError: (error) => {
          logger.log("============ >>>>>> 회원가입 실패 -", error);
        },
      }
    );
  };

  const handlePostcodeComplete = (data: any) => {
    setValue("zip", data.zonecode);
    setValue("add1", data.roadAddress);
    setValue("add2", "");
    setValue("jibeonAddress", data.jibunAddress);
    setValue("add_dosi", data.sido);
    setValue("add_gun", data.sigungu);
    setValue("add_dong", data.bname || data.buildingName || "");
    setPostcodeModalOpen(false);
  };

  const handleJoinSuccessConfirm = () => {
    setIsJoinSuccessOpen(false);
    // 필요시 로그인 페이지나 홈페이지로 이동
    navigate("/login");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <Text
            style={{
              fontWeight: "600",
              marginBottom: "10px",
              fontSize: "18px",
              display: "block",
            }}
          >
            아이디 및 비밀번호
          </Text>
          <JoinBox>
            <Text
              style={{
                fontWeight: "300",
                fontSize: "14px",
                display: "block",
              }}
            >
              아이디 <RequiredMark>*</RequiredMark>
            </Text>
            <JoinBoxStyle>
              <Controller
                name="id"
                control={control}
                defaultValue=""
                disabled={isIdAuthenticated}
                rules={{
                  required: "아이디를 입력해주세요.",
                  minLength: {
                    value: 6,
                    message: "아이디는 6자 이상 입력해주세요.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    placeholder="아이디를 입력해주세요."
                    inputMode="text"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                  />
                )}
              />
              <PhoneAuthButton
                onClick={handleIdAuth}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={isIdAuthenticated}
              >
                {isIdAuthenticated ? "인증 완료" : "아이디 인증"}
              </PhoneAuthButton>
            </JoinBoxStyle>
          </JoinBox>
          <JoinBox>
            <Text
              style={{
                fontWeight: "300",
                fontSize: "14px",
                display: "block",
              }}
            >
              이메일 <RequiredMark>*</RequiredMark>
            </Text>
            <JoinBoxStyle>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    placeholder="이메일을 입력해주세요."
                    inputMode="email"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {/* <EmailButton onClick={idConfirm} disabled={isEmailConfirmed}>
                중복확인
              </EmailButton> */}
            </JoinBoxStyle>
          </JoinBox>
          <JoinBox>
            <Text
              style={{
                fontWeight: "300",
                fontSize: "14px",
                display: "block",
              }}
            >
              비밀번호 <RequiredMark>*</RequiredMark>
            </Text>
            <JoinBoxStyle>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 4자 이상 입력해주세요.",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    placeholder="사용하실 비밀번호를 입력해주세요."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                  />
                )}
              />
            </JoinBoxStyle>
          </JoinBox>
        </Section>
        <Section>
          <Text
            style={{
              fontWeight: "600",
              marginBottom: "10px",
              fontSize: "18px",
              display: "block",
            }}
          >
            기본 정보
          </Text>
          <JoinBox>
            <Text
              style={{
                fontWeight: "300",
                fontSize: "14px",
                display: "block",
              }}
            >
              이름 <RequiredMark>*</RequiredMark>
            </Text>
            <JoinBoxStyle>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "이름을 입력해주세요." }}
                render={({ field }) => (
                  <Input
                    placeholder="이름"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                  />
                )}
              />
            </JoinBoxStyle>
          </JoinBox>
          <JoinBox>
            <Text
              style={{
                fontWeight: "300",
                fontSize: "14px",
                display: "block",
              }}
            >
              휴대폰 번호 <RequiredMark>*</RequiredMark>
            </Text>
            <JoinBoxStyle>
              <Controller
                name="handphone"
                control={control}
                defaultValue=""
                rules={{
                  required: "휴대폰번호를 입력해주세요.",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "휴대폰번호는 10~11글자 이내로 입력해주세요.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    placeholder="(-) 없이 휴대폰번호를 입력해주세요."
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                    disabled={isPhoneAuthenticated}
                  />
                )}
              />
              <PhoneAuthButton
                onClick={handlePhoneAuth}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={
                  // !isEmailConfirmed ||
                  isPhoneAuthenticated
                }
              >
                {isPhoneAuthenticated ? "인증 완료" : "휴대폰 인증"}
              </PhoneAuthButton>
            </JoinBoxStyle>
          </JoinBox>
          <Text
            style={{
              fontWeight: "300",
              fontSize: "14px",
              display: "block",
            }}
          >
            주소
          </Text>

          <JoinLayOut>
            <JoinBox>
              <JoinBoxStyle>
                <Controller
                  name="zip"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      placeholder="우편번호"
                      disabled
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                      suffix={
                        <PostcodeButton
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            setPostcodeModalOpen(true);
                          }}
                        >
                          우편번호 검색
                        </PostcodeButton>
                      }
                      {...field}
                    />
                  )}
                />
              </JoinBoxStyle>
            </JoinBox>
            <JoinBox>
              <JoinBoxStyle>
                <Controller
                  name="add1"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      placeholder="주소"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                      {...field}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </JoinBoxStyle>
            </JoinBox>
          </JoinLayOut>
          <JoinBox>
            <JoinBoxStyle>
              <Controller
                name="add2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    placeholder="상세주소"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    {...field}
                  />
                )}
              />
            </JoinBoxStyle>
          </JoinBox>
        </Section>

        <Modal
          isOpen={postcodeModalOpen}
          onRequestClose={() => setPostcodeModalOpen(false)}
          style={customStyles}
        >
          <DaumPostcode onComplete={handlePostcodeComplete} />
        </Modal>

        <Section>
          <Text
            style={{
              fontWeight: "600",
              fontSize: "18px",
              display: "block",
            }}
          >
            약관 동의 <RequiredMark>*</RequiredMark>
          </Text>
          <Form.Item>
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setServiceTermsAccepted(e.target.checked);
                setPrivacyTermsAccepted(e.target.checked);
              }}
            >
              전체 동의합니다.
            </Checkbox>
            {/* {errors.termsAccepted && (
              <Error>{errors.termsAccepted.message}</Error>
            )} */}
            <TermsBox>
              <Checkbox
                checked={serviceTermsAccepted}
                onChange={(e) => {
                  setServiceTermsAccepted(e.target.checked);
                }}
              >
                [필수] 서비스 이용약관
              </Checkbox>
              <ViewButton onClick={handleViewTerms}>전체보기</ViewButton>
            </TermsBox>
            <TermsBox>
              <Checkbox
                checked={privacyTermsAccepted}
                onChange={(e) => {
                  setPrivacyTermsAccepted(e.target.checked);
                }}
              >
                [필수] 개인정보 수집 및 이용
              </Checkbox>
              <ViewButton onClick={handleViewPrivacy}>전체보기</ViewButton>
            </TermsBox>
          </Form.Item>
        </Section>

        <SignupButton
          disabled={!isValid || !termsAccepted || !isPhoneAuthenticated}
          onClick={handleSubmit(onSubmit)}
        >
          가입하기
        </SignupButton>
      </form>

      <Modal
        isOpen={isJoinSuccessOpen}
        onRequestClose={() => setIsJoinSuccessOpen(false)}
        style={customStyles}
      >
        <SuccessModalContent onClick={(e) => e.stopPropagation()}>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessTitle>회원가입 성공</SuccessTitle>
          <SuccessMessage>
            회원가입이 성공적으로 완료되었습니다.
            <br />
            로그인 후 서비스를 이용해주세요.
          </SuccessMessage>
          <ConfirmButton
            onClick={(e) => {
              e.stopPropagation();
              handleJoinSuccessConfirm();
            }}
          >
            확인
          </ConfirmButton>
        </SuccessModalContent>
      </Modal>
    </Container>
  );
};

export default JoinPage;
