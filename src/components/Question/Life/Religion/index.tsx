import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

const religionList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["종교 없음", OPT_CHECKBOX.SINGLE],
  ["불교", OPT_CHECKBOX.SINGLE],
  ["천주교", OPT_CHECKBOX.SINGLE],
  ["기독교", OPT_CHECKBOX.SINGLE],
  ["기타", OPT_CHECKBOX.SINGLE],
];
const religionList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["종교 없음", OPT_CHECKBOX.MULTI],
  ["불교", OPT_CHECKBOX.MULTI],
  ["천주교", OPT_CHECKBOX.MULTI],
  ["기독교", OPT_CHECKBOX.MULTI],
  ["기타", OPT_CHECKBOX.MULTI],
];

const Religion = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const religionList = id === "1" ? religionList1 : religionList2;
  const contentTip = id === "1" ? "중복 선택 불가능" : "중복 선택 가능";
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("religion", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 종교를 선택해주세요.</h2>
      <p>💡{contentTip}</p>
      {religionList.map(([item, type], idx) => (
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

export default Religion;
