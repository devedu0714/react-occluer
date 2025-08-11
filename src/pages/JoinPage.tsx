import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import logger from "../utils/logger";
import {
  useAppEmailCheck,
  useAppJoin,
  useAppPhoneCheck,
} from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";
import type { JoinData } from "../types";

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

const JoinTitle = styled(Text)`
  font-weight: 700;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SignupButton = styled(Button)`
  width: 100%;
  padding: 5px;
  border-radius: 6px !important;
  background-color: ${theme.colors.primary} !important;
  color: #fefefe !important;
  border: none !important;

  &:hover {
    background-color: ${theme.colors.primary} !important;
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

  input,
  .ant-input-affix-wrapper,
  .ant-input-password {
    border-radius: 6px;
    border: 1px solid ${theme.colors.inputBorder};
    background-color: ${theme.colors.input} !important;
  }
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

const InputLabel = styled(Text)`
  font-weight: 300;
  font-size: 14px;
  display: block;
`;

const InputSectionLabel = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
`;

const PostcodeButton = styled.button`
  position: absolute;
  right: 5px;
  top: 15px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary};
`;

const PhoneAuthButton = styled.button`
  position: absolute;
  right: 5px;
  top: 16px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary};
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
  background-color: ${theme.colors.primary};
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
  background-color: ${theme.colors.primary} !important;
  border-color: ${theme.colors.primary} !important;
  color: white !important;
  border-radius: 20px !important;
  font-weight: 500;

  &:hover {
    background-color: ${theme.colors.primary} !important;
    border-color: ${theme.colors.primary} !important;
    color: white !important;
  }
`;

const JoinPage: React.FC = () => {
  const { handleSubmit, control, setValue, getValues, watch } = useForm<any>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const [postcodeModalOpen, setPostcodeModalOpen] = useState(false);
  // 이메일 중복확인 상태
  const [isEmailCheckPending, setIsEmailCheckPending] = useState(false);
  // 휴대폰 중복확인 상태
  const [isPhoneCheckPending, setIsPhoneCheckPending] = useState(false);

  // 회원가입 성공 모달
  const [isJoinSuccessOpen, setIsJoinSuccessOpen] = useState(false);

  // 폼 값들을 실시간으로 감시
  const emailValue = watch("email");
  const handphoneValue = watch("handphone");

  // const handlePhoneAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setIsPhoneAuthenticated(true);

  //   todo : 휴대폰 인증 로직 추가
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (!isEmailConfirmed) {
  //     setModalMessageTwo("먼저 아이디 인증을 진행해주세요.");
  //     setIsModalOpenTwo(true);
  //     return;
  //   }
  //   const { IMP } = window;
  //   IMP.init(import.meta.env.VITE_IMP_ID_CODE);
  //   const data = {
  //     merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
  //     company: "오클러", // 회사명 또는 URL
  //     phone: getValues("handphone"), // 사용자 전화번호
  //     name: getValues("name"), // 사용자 이름
  //   };
  //   console.log("휴대폰인증 데이터", data);
  //   IMP.certification(data, callback);
  // };

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

  // 이메일 중복확인
  const { mutate: m_app_email_check } = useAppEmailCheck();

  // 이메일 중복확인 버튼 클릭 시
  // 이메일 중복확인 성공 시 isEmailCheckPending 상태 변경
  // 이메일 중복확인 실패 시 에러 메시지 표시
  // 이메일 중복확인 누르고 api 호출이 끝나고나서 에러메세지 여부 표시
  const handleEmailCheck = () => {
    m_app_email_check(
      { userid: getValues("email") },
      {
        onSuccess: (response) => {
          if (response.data?.resObject?.rsp_code === "100") {
            setIsEmailCheckPending(true);
          } else {
            const errorMessage =
              response.data?.rsp_msg || "이메일 중복확인에 실패했습니다.";
            message.error(errorMessage);
          }
        },
        onError: (error) => {
          logger.log("============ >>>>>> 이메일 중복확인 실패 -", error);
        },
      }
    );
  };

  // 휴대폰 중복확인
  const { mutate: m_app_phone_check } = useAppPhoneCheck();

  // 휴대폰 중복확인 버튼 클릭 시
  // 휴대폰 중복확인 성공 시 isPhoneCheckPending 상태 변경
  // 휴대폰 중복확인 실패 시 에러 메시지 표시
  // 휴대폰 중복확인 누르고 api 호출이 끝나고나서 에러메세지 여부 표시
  const handlePhoneCheck = () => {
    m_app_phone_check(
      { handphone: getValues("handphone") },
      {
        onSuccess: (response) => {
          logger.log("============ >>>>>> 휴대폰 중복확인 성공 -", response);
          if (response.data?.resObject?.rsp_code === "100") {
            setIsPhoneCheckPending(true);
          } else {
            const errorMessage =
              response.data?.rsp_msg || "휴대폰 중복확인에 실패했습니다.";
            message.error(errorMessage);
          }
        },
      }
    );
  };

  const { mutate: m_app_join, isPending } = useAppJoin();

  // join_type : e - 이메일, k - 카카오, n - 네이버, g - 구글,
  // c_gb : 회원유형 (c : 개인 - 현재는 개인만 가입가능)
  // uniq_key : 간편가입 구분키 (카카오, 네이버, 구글 간편가입 시 사용)
  const onSubmit = async (data: JoinData) => {
    logger.log("============ >>>>>> 회원가입 데이터 -", data);
    m_app_join(
      {
        userid: data.userid,
        password: data.password,
        handphone: data.handphone,
        name: data.name,
        join_type: "e",
        uniq_key: "",
        c_gb: "c",
        token: "",
        add1: data.add1,
        add2: data.add2,
        zip: data.zip,
      },
      {
        onSuccess: (response) => {
          logger.log("============ >>>>>> 회원가입 성공 <<<<<< =============");

          // rsp_code에 따른 예외처리
          if (response.data?.rsp_code === "100") {
            setIsJoinSuccessOpen(true);
          } else {
            const errorMessage =
              response.data?.rsp_msg || "회원가입에 실패했습니다.";
            message.error(errorMessage);
          }
        },
        onError: (error: any) => {
          logger.log("============ >>>>>> 회원가입 실패 -", error);

          // API 에러 응답 처리
          if (error.response?.data?.rsp_code) {
            const errorMessage =
              error.response.data.rsp_msg || "회원가입에 실패했습니다.";
            message.error(errorMessage);
          } else {
            message.error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
          }
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
      <JoinTitle>회원가입</JoinTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <JoinBox>
            <InputLabel>이메일</InputLabel>
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
                    onChange={(e) => {
                      field.onChange(e);
                      // 이메일이 변경되면 인증 상태 초기화
                      if (isEmailCheckPending) {
                        setIsEmailCheckPending(false);
                      }
                    }}
                  />
                )}
              />
              <PhoneAuthButton
                onClick={handleEmailCheck}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={isEmailCheckPending || !emailValue?.trim()}
              >
                {isEmailCheckPending ? "인증 완료" : "이메일 인증"}
              </PhoneAuthButton>
            </JoinBoxStyle>
          </JoinBox>
          <JoinBox>
            <InputLabel>비밀번호</InputLabel>
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
          <InputSectionLabel>기본 정보</InputSectionLabel>
          <JoinBox>
            <InputLabel>이름</InputLabel>
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
            <InputLabel>휴대폰 번호</InputLabel>
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
                    onChange={(e) => {
                      field.onChange(e);
                      // 휴대폰번호가 변경되면 인증 상태 초기화
                      if (isPhoneCheckPending) {
                        setIsPhoneCheckPending(false);
                      }
                    }}
                  />
                )}
              />
              <PhoneAuthButton
                onClick={handlePhoneCheck}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={isPhoneCheckPending || !handphoneValue?.trim()}
              >
                {isPhoneCheckPending ? "인증 완료" : "휴대폰 인증"}
              </PhoneAuthButton>
            </JoinBoxStyle>
          </JoinBox>
          <InputLabel>주소</InputLabel>

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

        <SignupButton
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
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
