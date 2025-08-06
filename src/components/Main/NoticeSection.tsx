import styled from "styled-components";

const NoticeSectionContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
`;

const NoticeSectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  text-align: start;
  padding: 0px 15px 5px 15px;
`;

const NoticeSectionContents = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
`;

const NoticeSectionItem = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NoticeSectionItemContent = styled.div`
  width: 75%;
  font-size: 12px;
  font-weight: 400;
  color: #000;
  text-align: start;
  padding: 0 15px 0 0;
  word-break: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NoticeSectionItemDate = styled.div`
  width: 25%;
  font-size: 12px;
  font-weight: 400;
  color: #000;
  text-align: start;
  padding: 0 0 0 15px;
  word-break: nowrap;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`;

const NoticeSection = ({ notice }: { notice: any[] }) => {
  return (
    <NoticeSectionContainer>
      <NoticeSectionTitle>공지사항</NoticeSectionTitle>
      <NoticeSectionContents>
        {notice.map((item) => (
          <NoticeSectionItem key={item.id}>
            <NoticeSectionItemDate>{item.date}</NoticeSectionItemDate>
            <NoticeSectionItemContent>{item.content}</NoticeSectionItemContent>
          </NoticeSectionItem>
        ))}
      </NoticeSectionContents>
    </NoticeSectionContainer>
  );
};

export default NoticeSection;
