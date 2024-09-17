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
  padding: 20px 0;
  border-top: 1px solid #d5c9e6;
  justify-content: center;
  box-sizing: border-box;
  font-size: 25px;

  @media (max-width: 600px) {
    padding: 15px 0; /* 모바일에서 패딩 조정 */
    font-size: 20px; /* 모바일에서 폰트 크기 조정 */
  }
`;
const Button = styled.button`
  color: #694e99;
  background-color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
