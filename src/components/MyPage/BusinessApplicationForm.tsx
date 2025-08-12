import { useState } from "react";
import styled from "styled-components";
import { Input, Button, Checkbox, message } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { theme } from "../../utils/theme";
import { Controller, useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import logger from "../../utils/logger";

Modal.setAppElement("#root");

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

const FormContainer = styled.div`
  padding: 20px;
  background: ${theme.colors.white};
`;

const InstructionBox = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;

const InstructionText = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.5;
`;

const AgreementSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #333;
`;

const ImageUploadSection = styled.div`
  margin-bottom: 20px;
`;

const ImageUploadTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

const ImageUploadBoxWrap = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

const ImageUploadBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${theme.colors.semiWhite};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ImageLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const ImageLabel = styled.div`
  font-size: 12px;
  color: #666;

  &:first-child {
    color: #333;
    font-weight: 500;
  }
`;

const FormSection = styled.div`
  margin-bottom: 20px;

  input,
  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-password {
    border-radius: 6px;
    border: 1px solid ${theme.colors.inputBorder};
    background-color: ${theme.colors.input} !important;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #ddd;
  background: ${theme.colors.semiWhite};
`;

const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressButton = styled(Button)`
  height: 30px;
  border-radius: 6px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  background: ${theme.colors.semiWhite};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #ddd;
  resize: none !important;
  background: ${theme.colors.semiWhite};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
  }
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

const SubmitButton = styled(Button)`
  width: 100%;
  height: 50px;
  background: ${theme.colors.primary};
  border-color: ${theme.colors.primary};
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;

  &:hover {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    color: white;
    opacity: 0.9;
  }
`;

const BusinessApplicationForm = () => {
  const { handleSubmit, control, setValue } = useForm<any>({
    mode: "onChange",
  });

  const [postcodeModalOpen, setPostcodeModalOpen] = useState(false);

  const [agreed, setAgreed] = useState(true);

  const handleImageUpload = (type: string) => {
    message.info(`${type} 이미지 업로드 기능은 추후 구현 예정입니다.`);
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

  const onSubmit = async (data: any) => {
    logger.log("============ >>>>>> 업체신청 데이터 -", data);
    message.success("업체신청이 완료되었습니다.");
  };

  return (
    <FormContainer>
      {/* 안내 및 동의 섹션 */}
      <InstructionBox>
        <InstructionText>
          정확하게 작성해주시기 바랍니다.
          <br />
          신청 후 고객센터 문의 주시면 더욱 빨리 처리해드립니다.
          <br />
          감사합니다.
        </InstructionText>
        <AgreementSection>
          동의
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
        </AgreementSection>
      </InstructionBox>

      {/* 이미지 업로드 섹션 */}
      <ImageUploadSection>
        <ImageUploadTitle>이미지 업로드</ImageUploadTitle>
        <ImageUploadContainer>
          <ImageUploadBoxWrap>
            <ImageUploadBox onClick={() => handleImageUpload("사업자등록증")}>
              <PlusOutlined style={{ fontSize: "24px" }} />
            </ImageUploadBox>
            <ImageUploadBox onClick={() => handleImageUpload("가게입구")}>
              <PlusOutlined style={{ fontSize: "24px" }} />
            </ImageUploadBox>
            <ImageUploadBox onClick={() => handleImageUpload("가게내부")}>
              <PlusOutlined style={{ fontSize: "24px" }} />
            </ImageUploadBox>
          </ImageUploadBoxWrap>
          <ImageLabels>
            <ImageLabel>사업자등록증(필수)</ImageLabel>
            <ImageLabel>가게입구(선택)</ImageLabel>
            <ImageLabel>가게내부(선택)</ImageLabel>
          </ImageLabels>
        </ImageUploadContainer>
      </ImageUploadSection>

      {/* 폼 필드들 */}
      <FormSection>
        <FormLabel>상호</FormLabel>

        <Controller
          name="tradeName"
          control={control}
          defaultValue=""
          rules={{
            required: "상호를 입력해주세요.",
          }}
          render={({ field }) => (
            <Input
              placeholder="상호를 입력"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
              {...field}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </FormSection>

      <FormSection>
        <FormLabel>지정명</FormLabel>
        <Controller
          name="designatedName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledInput placeholder="없는경우 미입력" {...field} />
          )}
        />
      </FormSection>

      <FormSection>
        <FormLabel>주소</FormLabel>
        <AddressSection>
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
                      event.preventDefault();
                      event.stopPropagation();
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
        </AddressSection>
      </FormSection>

      <FormSection>
        <FormLabel>이메일</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledInput placeholder="이메일을 입력하세요" {...field} />
          )}
        />
      </FormSection>

      <FormSection>
        <FormLabel>전화번호</FormLabel>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledInput
              placeholder="관리자 전화번호"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </FormSection>

      <FormSection>
        <FormLabel>광고등급</FormLabel>
        <AddressButton
          onClick={() =>
            message.info("광고등급 선택 기능은 추후 구현 예정입니다.")
          }
        >
          선택
          <DownOutlined />
        </AddressButton>
      </FormSection>

      <FormSection>
        <FormLabel>요청사항</FormLabel>
        <Controller
          name="requestDetails"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledTextArea
              rows={4}
              placeholder="요청사항을 입력하세요"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </FormSection>

      <FormSection>
        <FormLabel>추천모드</FormLabel>
        <Controller
          name="recommendMode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledInput
              placeholder="추천모드를 입력하세요"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </FormSection>

      <SubmitButton type="primary" onClick={handleSubmit(onSubmit)}>
        업체신청
      </SubmitButton>
      <Modal
        isOpen={postcodeModalOpen}
        onRequestClose={() => setPostcodeModalOpen(false)}
        style={customStyles}
      >
        <DaumPostcode onComplete={handlePostcodeComplete} />
      </Modal>
    </FormContainer>
  );
};

export default BusinessApplicationForm;
