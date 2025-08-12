import styled from "styled-components";
import { Input, Button, Modal, message } from "antd";
import { useState } from "react";
import { theme } from "../../utils/theme";
import { useAppIdSearch } from "../../hooks/useApi";
import logger from "../../utils/logger";
import FindIdResultModal from "./FindIdResultModal";

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

interface FindIdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindIdModal = ({ isOpen, onClose }: FindIdModalProps) => {
  const [name, setName] = useState("");
  const [handphone, setHandphone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [foundUserId, setFoundUserId] = useState("");

  const { mutate: findId } = useAppIdSearch();

  const handleSubmit = () => {
    if (!name.trim()) {
      message.error("이름을 입력해주세요.");
      return;
    }

    if (!handphone.trim()) {
      message.error("휴대폰 번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    findId(
      { name: name, handphone: handphone },
      {
        onSuccess: (response) => {
          if (response.data.resObject.rsp_code === "100") {
            logger.log("============ >>>>>> 아이디 찾기 성공 -", response);
            const userId = response.data.resObject.userid;
            setFoundUserId(userId);
            setIsLoading(false);
            onClose(); // 현재 모달 닫기
            setTimeout(() => {
              setIsResultModalOpen(true); // 결과 모달 열기
            }, 100);
          } else if (response.data.resObject.rsp_code === "200") {
            message.error(
              response.data.resObject.rsp_msg || "가입된 정보가 없습니다."
            );
            setIsLoading(false);
          } else {
            message.error(response.data.resObject.rsp_msg);
            setIsLoading(false);
          }
        },
        onError: (error) => {
          logger.log("============ >>>>>> 아이디 찾기 실패 -", error);
          message.error("아이디 찾기에 실패했습니다. 다시 시도해주세요.");
          setIsLoading(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setName("");
    setHandphone("");
    onClose();
  };

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
    setFoundUserId("");
  };

  return (
    <>
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
              <InputLabelText>이름</InputLabelText>
            </InputLabel>
            <StyledInput
              placeholder="가입 시 사용한 이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onPressEnter={handleSubmit}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              <InputLabelText>휴대폰</InputLabelText>
            </InputLabel>
            <StyledInput
              placeholder="가입 시 사용한 휴대폰을 입력하세요"
              value={handphone}
              onChange={(e) => setHandphone(e.target.value)}
              onPressEnter={handleSubmit}
            />
          </InputGroup>

          <StyledButton
            type="primary"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!name.trim() || !handphone.trim()}
          >
            아이디 찾기
          </StyledButton>
        </ModalContent>
      </Modal>

      <FindIdResultModal
        isOpen={isResultModalOpen}
        onClose={handleResultModalClose}
        email={foundUserId}
      />
    </>
  );
};

export default FindIdModal;
