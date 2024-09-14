import styled from "styled-components";
import { useEffect } from "react";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";

const mbtiList: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["ISTJ 세상의 소금형", OPT_CHECKBOX.MULTI],
  ["ISFJ 임금뒷편의 권력형", OPT_CHECKBOX.MULTI],
  ["INFJ 예언자형", OPT_CHECKBOX.MULTI],
  ["INTJ 과학자형", OPT_CHECKBOX.MULTI],
  ["ISTP 백과사전형", OPT_CHECKBOX.MULTI],
  ["ISFP 성인군자형", OPT_CHECKBOX.MULTI],
  ["INFP 잔다르크형", OPT_CHECKBOX.MULTI],
  ["INTP 아이디어 뱅크형", OPT_CHECKBOX.MULTI],
  ["ESTP 수완좋은 활동가형", OPT_CHECKBOX.MULTI],
  ["ESFP 사교적인 유형", OPT_CHECKBOX.MULTI],
  ["ENFP 스파크형", OPT_CHECKBOX.MULTI],
  ["ENTP 발명가형", OPT_CHECKBOX.MULTI],
  ["ESTJ 사업가형", OPT_CHECKBOX.MULTI],
  ["ESFJ 친선도모형", OPT_CHECKBOX.MULTI],
  ["ENFJ 언변능숙형", OPT_CHECKBOX.MULTI],
  ["ENTJ 지도자형", OPT_CHECKBOX.MULTI],
];

function Mbti({ id, setHandler }: QuesiotnProps) {
  const user = id === "1" ? "본인" : "상대방";
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("age", selectedItems);
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
