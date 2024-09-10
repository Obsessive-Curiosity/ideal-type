import styled from "styled-components";

interface FooterProps {
  title: string; // title의 타입을 정의
  onClick: () => void;
}

// props를 객체 형태로 전달받아야 합니다.
const index = ({ title, onClick }: FooterProps) => {
  return (
    <FooterWrapper>
      <Button onClick={onClick}>{title}</Button>
    </FooterWrapper>
  );
};

export default index;

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  border-top: 1px solid #d5c9e6;
  justify-content: center;
`;
const Button = styled.button`
  color: #694e99;
  background-color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
