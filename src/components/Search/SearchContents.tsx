import styled from "styled-components";

const MainContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 15px;
  margin: 15px 0;
`;

const MainContentsItem = styled.div`
  width: 75px;
  height: 75px;
  background-color: #000;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentsTitle = styled.div`
  color: #fff;
`;

const ContentsBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -15px;
  background-color: #efefef;
  color: #222;
  padding: 5px 10px;
  border-radius: 5px;
`;

const SearchContents = ({ contents }: { contents: any[] }) => {
  return (
    <MainContentsContainer>
      {/* 한줄에 3개씩 컨텐츠 출력 */}
      {contents.map((item) => (
        <MainContentsItem key={item.id}>
          <ContentsBadge>{item.num}</ContentsBadge>
          <ContentsTitle>{item.title}</ContentsTitle>
        </MainContentsItem>
      ))}
    </MainContentsContainer>
  );
};

export default SearchContents;
