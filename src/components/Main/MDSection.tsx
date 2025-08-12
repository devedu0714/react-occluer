import styled from "styled-components";
import { useState } from "react";
import { theme } from "../../utils/theme";

const TabSection = styled.div`
  padding: 10px 20px;
`;

const TabTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TabButton = styled.button<{ active?: boolean }>`
  padding: 6px 14px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? theme.colors.primary : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  box-shadow: ${(props) =>
    props.active ? "0 2px 8px rgba(0,0,0,0.1)" : "none"};

  &:hover {
    transform: translateY(-1px);
  }
`;

const MDSection = ({ md }: { md: any[] }) => {
  const [activeTab, setActiveTab] = useState("폐업");
  const tabs = ["폐업", "알바", "서비스", "임대"];

  return (
    <TabSection>
      <TabTitle>기획관</TabTitle>
      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>
    </TabSection>
  );
};

export default MDSection;
