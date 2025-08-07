import styled from "styled-components";

const MainContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 15px;
  margin: 15px 0;
`;

const MainContentsItem = styled.div`
  width: 100%;
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

const SearchDetailContents = ({ contents }: { contents: any[] }) => {
  return (
    <MainContentsContainer>
      {contents.map((item) => (
        <MainContentsItem key={item.id}>
          <ContentsBadge>{item.num}</ContentsBadge>
          <ContentsTitle>{item.title}</ContentsTitle>
        </MainContentsItem>
      ))}
    </MainContentsContainer>
  );
};

export default SearchDetailContents;
