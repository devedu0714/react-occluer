import styled from "styled-components";
import { Button, Modal } from "antd";
import { theme } from "../../utils/theme";

const ModalContent = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const ResultContainer = styled.div`
  margin-bottom: 30px;
`;

const ResultTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
`;

const IdContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const IdLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const IdValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
  word-break: break-all;
`;

const InfoText = styled.div`
  font-size: 13px;
  color: #888;
  line-height: 1.4;
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
`;

interface FindIdResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const FindIdResultModal = ({
  isOpen,
  onClose,
  email,
}: FindIdResultModalProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={400}
      centered
    >
      <ModalContent>
        <ResultContainer>
          <ResultTitle>회원님의 아이디를 찾았습니다</ResultTitle>
          <IdContainer>
            <IdLabel>아이디</IdLabel>
            <IdValue>{email}</IdValue>
          </IdContainer>
          <InfoText>
            로그인 페이지에서 찾은 아이디로 로그인하실 수 있습니다.
          </InfoText>
        </ResultContainer>

        <StyledButton type="primary" onClick={handleClose}>
          확인
        </StyledButton>
      </ModalContent>
    </Modal>
  );
};

export default FindIdResultModal;
