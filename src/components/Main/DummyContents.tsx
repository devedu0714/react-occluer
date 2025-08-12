import styled from "styled-components";
import { theme } from "../../utils/theme";

const MainContentsContainer = styled.div`
  padding: 20px 10px 10px 10px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const GridItem = styled.div<{ selected?: boolean }>`
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GridImage = styled.div<{ selected?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f0f0;
  margin: 0 auto 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  border: ${(props) =>
    props.selected ? `3px solid ${theme.colors.primary}` : "none"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${theme.colors.primary};
  color: white;
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
`;

const GridLabel = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

interface MainContentsProps {
  contents: any[];
  onItemSelect?: (itemId: string, itemTitle: string) => void;
  selectedItem?: string | null;
}

const DummyContents = ({
  contents,
  onItemSelect,
  selectedItem,
}: MainContentsProps) => {
  return (
    <MainContentsContainer>
      <GridContainer>
        {contents.map((item) => (
          <GridItem
            key={item.id}
            selected={selectedItem === item.id}
            onClick={() => onItemSelect?.(item.id, item.title)}
          >
            <GridImage selected={selectedItem === item.id}>
              <img src={item.image} alt={item.title} />
              <Badge>{item.num}</Badge>
            </GridImage>
            <GridLabel>{item.title}</GridLabel>
          </GridItem>
        ))}
      </GridContainer>
    </MainContentsContainer>
  );
};

export default DummyContents;
