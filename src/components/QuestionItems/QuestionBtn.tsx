import styled from "styled-components";

interface QuestionBtnProps {
  text: string; // props의 타입을 정의
  onClick: () => void;
}

const QuestionBtn = ({ text, onClick }: QuestionBtnProps) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default QuestionBtn;

const Button = styled.button`
  width: 220px;
  padding: 30px 0;
  margin: 10px;
  border: 1px solid #694e99;
  border-radius: 10px;
  background-color: #d5c9e6;
  color: #694e99;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 200px;
    padding: 20px 0;
    font-size: 18px; /* 모바일에서 폰트 크기 조정 */
  }
`;
