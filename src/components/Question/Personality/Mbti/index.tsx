import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import QuesiotnProps from "../../../../interfaces/QuestionProps";

// MBTI 옵션 배열 정의
const MBTI_OPTIONS = [
  ["I", "E"],
  ["N", "S"],
  ["F", "T"],
  ["P", "J"],
];

function Mbti({ id, setHandler }: QuesiotnProps) {
  const user = id === "1" ? "본인" : "상대방";
  const [mbti, setMbti] = useState<string[]>(["I", "N", "F", "P"]);

  // MBTI 항목 클릭 시 선택 변경
  const onClickMbti = useCallback((index: number) => {
    setMbti((prevMbti) => {
      const newMbti = [...prevMbti];
      newMbti[index] = MBTI_OPTIONS[index].find(
        (option) => option !== prevMbti[index]
      )!;
      return newMbti;
    });
  }, []);

  // MBTI 변경 시 handler에 새로운 값 전달
  useEffect(() => {
    setHandler("mbti", [mbti.join("")]);
  }, [mbti, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 MBTI를 선택해주세요.</h2>
      <p>
        <LinkToMbti
          href="https://www.16personalities.com/ko"
          target="_blank"
          rel="noopener noreferrer"
        >
          MBTI 검사하러 가기
        </LinkToMbti>
      </p>
      {mbti.map((item, index) => (
        <MbtiBtn key={index} onClick={() => onClickMbti(index)}>
          {item}
        </MbtiBtn>
      ))}
    </QuestionWrapper>
  );
}

export default Mbti;

// 스타일링
const MbtiBtn = styled.button`
  font-size: 30px;
  width: 15vw;
  max-width: 100px;
  height: 15vw;
  max-height: 100px;
  margin: 0 1vw;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: #694e99;
  }
`;

const LinkToMbti = styled.a`
  font-style: italic;
  color: #d5c9e6;
  text-decoration: none;
  &:hover {
    color: #694e99;
    text-decoration: wavy;
  }
`;
