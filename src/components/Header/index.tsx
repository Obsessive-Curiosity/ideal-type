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
  padding: 20px 0;
  border-bottom: 1px solid #d5c9e6;
  text-align: center;
  font-size: 25px;
  box-sizing: border-box; /* 패딩과 보더를 포함하여 크기 조정 */

  @media (max-width: 600px) {
    padding: 15px 0; /* 모바일에서 패딩 조정 */
    font-size: 20px; /* 모바일에서 폰트 크기 조정 */
  }
`;
