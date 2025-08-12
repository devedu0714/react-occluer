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

const MainContentsItem = styled.div<{ selected?: boolean }>`
  width: 75px;
  height: 75px;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#000")};
  border: ${(props) => (props.selected ? "3px solid #8B5CF6" : "none")};
  border-radius: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentsTitle = styled.div<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? "#333" : "#fff")};
  font-size: 12px;
  text-align: center;
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

interface SearchContentsProps {
  contents: any[];
  onItemSelect?: (itemId: string) => void;
  selectedItem?: string | null;
}

const SearchContents = ({
  contents,
  onItemSelect,
  selectedItem,
}: SearchContentsProps) => {
  return (
    <MainContentsContainer>
      {/* 한줄에 3개씩 컨텐츠 출력 */}
      {contents.map((item) => (
        <MainContentsItem
          key={item.id}
          selected={selectedItem === item.title}
          onClick={() => onItemSelect?.(item.title)}
        >
          <ContentsBadge>{item.num}</ContentsBadge>
          <ContentsTitle selected={selectedItem === item.title}>
            {item.title}
          </ContentsTitle>
        </MainContentsItem>
      ))}
    </MainContentsContainer>
  );
};

export default SearchContents;
