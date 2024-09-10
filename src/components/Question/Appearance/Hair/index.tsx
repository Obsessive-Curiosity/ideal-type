import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

const hairList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["긴머리", OPT_CHECKBOX.SINGLE],
  ["단발머리", OPT_CHECKBOX.SINGLE],
  ["숏단발", OPT_CHECKBOX.SINGLE],
  ["짧은머리", OPT_CHECKBOX.SINGLE],
];
const hairList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["긴머리", OPT_CHECKBOX.MULTI],
  ["단발머리", OPT_CHECKBOX.MULTI],
  ["숏단발", OPT_CHECKBOX.MULTI],
  ["짧은머리", OPT_CHECKBOX.MULTI],
];

const Hair = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const hairList = id === "1" ? hairList1 : hairList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("hair", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 머리카락 길이를 선택해주세요.</h2>
      <p>💡현재 머리카락 길이 기준</p>
      {hairList.map(([item, type], idx) => (
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

export default Hair;
