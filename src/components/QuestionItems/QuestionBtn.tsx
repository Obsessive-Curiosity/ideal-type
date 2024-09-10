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
  width: 200px;
  height: 100px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgba(
    105,
    78,
    153,
    0.5
  ); /* 배경색을 설정하고 투명도 50% 적용 */
  color: black;
  font-size: 18px;
  cursor: pointer;
`;
