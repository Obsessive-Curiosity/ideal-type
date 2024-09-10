import styled from "styled-components";

// HeaderProps 인터페이스 정의
interface HeaderProps {
  title: string; // title의 타입을 정의
}

// props를 객체 형태로 전달받아야 합니다.
const index = ({ title }: HeaderProps) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
};

export default index;

const HeaderWrapper = styled.header`
  color: #694e99;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 1px solid #d5c9e6;
  text-align: center;
  font-size: 25px;
`;
