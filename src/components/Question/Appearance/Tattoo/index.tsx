import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

const tattooList1: [
  string,
  typeof OPT_CHECKBOX.SINGLE | typeof OPT_CHECKBOX.MULTI
][] = [
  ["타투 없음", OPT_CHECKBOX.SINGLE],
  ["건들면 죽는다 이레즈미", OPT_CHECKBOX.MULTI],
  ["아기자기한 작은 타투", OPT_CHECKBOX.MULTI],
];
const tattooList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["타투 없음", OPT_CHECKBOX.MULTI],
  ["건들면 죽는다 이레즈미", OPT_CHECKBOX.MULTI],
  ["아기자기한 작은 타투", OPT_CHECKBOX.MULTI],
];

const Tattoo = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const tattooList = id === "1" ? tattooList1 : tattooList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("tattoo", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 타투유무를 선택해주세요.</h2>
      <p>💡타투 여러개인 경우 다수 선택가능</p>
      {tattooList.map(([item, type], idx) => (
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
};

export default Tattoo;
