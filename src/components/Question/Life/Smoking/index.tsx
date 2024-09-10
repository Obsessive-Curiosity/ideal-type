import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

const smokingList1: [
  string,
  typeof OPT_CHECKBOX.SINGLE | typeof OPT_CHECKBOX.MULTI
][] = [
  ["흡연 안함", OPT_CHECKBOX.SINGLE],
  ["전자담배", OPT_CHECKBOX.MULTI],
  ["연초", OPT_CHECKBOX.MULTI],
];
const smokingList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["흡연 안함", OPT_CHECKBOX.MULTI],
  ["전자담배", OPT_CHECKBOX.MULTI],
  ["연초", OPT_CHECKBOX.MULTI],
];

const Smoking = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const smokingList = id === "1" ? smokingList1 : smokingList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("smoking", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 흡연 유무를 선택해주세요.</h2>
      <p>💡없음 제외하고 중복 선택 가능</p>
      {smokingList.map(([item, type], idx) => (
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

export default Smoking;
