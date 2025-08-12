import styled from "styled-components";
import { theme } from "../../utils/theme";

const NoticeSectionContainer = styled.div`
  padding: 10px 20px;
`;

const NoticeTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;

  text-align: left;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeItem = styled.div`
  background: transparent;
  padding: 5px 0;
  border-radius: 8px;
  text-align: left;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #e9ecef;
  }

  span {
    line-height: 24px;
  }
`;

const NoticeItemNum = styled.span`
  width: 30px;
  height: 20px;
  border-radius: 14px;
  font-size: 12px;
  color: #333;
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoticeSection = ({ notice }: { notice: any[] }) => {
  return (
    <NoticeSectionContainer>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeList>
        {[1, 2, 3].map((num) => (
          <NoticeItem key={num}>
            <NoticeItemNum>{num}</NoticeItemNum>
            <p>[필독] 업체를 등록했습니다</p>
          </NoticeItem>
        ))}
      </NoticeList>
    </NoticeSectionContainer>
  );
};

export default NoticeSection;
