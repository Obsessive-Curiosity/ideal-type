import styled from "styled-components";
import { useEffect } from "react";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";

const mbtiList: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["ISTJ", OPT_CHECKBOX.MULTI],
  ["ISFJ", OPT_CHECKBOX.MULTI],
  ["INFJ", OPT_CHECKBOX.MULTI],
  ["INTJ", OPT_CHECKBOX.MULTI],
  ["ISTP", OPT_CHECKBOX.MULTI],
  ["ISFP", OPT_CHECKBOX.MULTI],
  ["INFP", OPT_CHECKBOX.MULTI],
  ["INTP", OPT_CHECKBOX.MULTI],
  ["ESTP", OPT_CHECKBOX.MULTI],
  ["ESFP", OPT_CHECKBOX.MULTI],
  ["ENFP", OPT_CHECKBOX.MULTI],
  ["ENTP", OPT_CHECKBOX.MULTI],
  ["ESTJ", OPT_CHECKBOX.MULTI],
  ["ESFJ", OPT_CHECKBOX.MULTI],
  ["ENFJ", OPT_CHECKBOX.MULTI],
  ["ENTJ", OPT_CHECKBOX.MULTI],
];

function Mbti({ id, setHandler }: QuesiotnProps) {
  const user = id === "1" ? "본인" : "상대방";
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("mbti", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 MBTI를 선택해주세요.</h2>
      <p>💡중복 선택 가능</p>
      <p>
        <LinkToMbti
          href="https://www.16personalities.com/ko"
          target="_blank"
          rel="noopener noreferrer"
        >
          💡MBTI 검사하러 가기
        </LinkToMbti>
      </p>
      {mbtiList.map(([item, type], idx) => (
        <CheckboxItem
          key={idx}
          item={item}
          type={type}
          isChecked={selectedItems.includes(item)}
          onChange={() => onChangeCheckbox(item, type)}
        />
      ))}
    </QuestionWrapper>
  );
}

export default Mbti;

const LinkToMbti = styled.a`
  font-style: italic;
  color: #694e99;
  &:hover {
    background-color: #d5c9e6;
    color: #694e99;
    text-decoration: wavy;
  }
`;
