import styled from "styled-components";

const NoPageContainer = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoPageText = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const NoPage = () => {
  return (
    <NoPageContainer>
      <NoPageText>404 Not Found</NoPageText>
    </NoPageContainer>
  );
};

export default NoPage;
