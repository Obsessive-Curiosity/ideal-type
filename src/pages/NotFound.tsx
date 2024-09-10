import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h1>페이지를 찾을 수 없습니다.</h1>
    </NotFoundWrapper>
  );
};

export default NotFound;

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  font-size: 24px;
`;
