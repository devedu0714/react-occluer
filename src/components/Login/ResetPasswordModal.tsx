import styled from "styled-components";
import { Input, Button, Modal, message } from "antd";
import { useState } from "react";
import { theme } from "../../utils/theme";
import { useAppPwdSearch } from "../../hooks/useApi";
import logger from "../../utils/logger";

const ModalContent = styled.div`
  padding: 20px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.div`
  text-align: left;
  margin-bottom: 8px;
`;

const InputLabelText = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const StyledInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid ${theme.colors.inputBorder};
  background-color: ${theme.colors.input};
`;

const StyledPasswordInput = styled(Input.Password)`
  border-radius: 6px;
  border: 1px solid ${theme.colors.inputBorder};
  background-color: ${theme.colors.input};
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 45px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  background: ${theme.colors.primary};
  border-color: ${theme.colors.primary};
  color: white;

  &:hover {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    color: white;
  }

  &:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666;
  }
`;

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal = ({ isOpen, onClose }: ResetPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: findPwd } = useAppPwdSearch();

  const handleSubmit = () => {
    if (!email.trim()) {
      message.error("이메일을 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    findPwd(
      { email },
      {
        onSuccess: (response) => {
          if (response.data.resObject.rsp_code === "100") {
            logger.log("============ >>>>>> 비밀번호 찾기 성공 -", response);
            message.success("임시 비밀번호가 발송되었습니다.");
            onClose();
            setEmail("");
          } else if (response.data.resObject.rsp_code === "200") {
            message.error(
              response.data.resObject.rsp_msg || "가입된 정보가 없습니다."
            );
          } else {
            message.error(response.data.resObject.rsp_msg);
          }
        },
        onError: (error) => {
          logger.log("============ >>>>>> 비밀번호 찾기 실패 -", error);
        },
      }
    );
  };

  const handleCancel = () => {
    setEmail("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
    >
      <ModalContent>
        <InputGroup>
          <InputLabel>
            <InputLabelText>이메일</InputLabelText>
          </InputLabel>
          <StyledInput
            placeholder="가입 시 사용한 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onPressEnter={handleSubmit}
          />
        </InputGroup>

        <StyledButton
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!email.trim()}
        >
          비밀번호 재설정
        </StyledButton>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
