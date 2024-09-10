import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

const tendencyList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["Only Take", OPT_CHECKBOX.SINGLE],
  ["Take", OPT_CHECKBOX.SINGLE],
  ["Give & Take", OPT_CHECKBOX.SINGLE],
  ["Give", OPT_CHECKBOX.SINGLE],
  ["Only Give", OPT_CHECKBOX.SINGLE],
  ["Platonic", OPT_CHECKBOX.SINGLE],
];
const tendencyList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["Only Take", OPT_CHECKBOX.MULTI],
  ["Take", OPT_CHECKBOX.MULTI],
  ["Give & Take", OPT_CHECKBOX.MULTI],
  ["Give", OPT_CHECKBOX.MULTI],
  ["Only Give", OPT_CHECKBOX.MULTI],
  ["Platonic", OPT_CHECKBOX.MULTI],
];

const Tendency = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const tendencyList = id === "1" ? tendencyList1 : tendencyList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox([]);

  useEffect(() => {
    setHandler("tendency", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 성향을 선택해주세요.</h2>
      <p>💡잠자리 기준</p>
      {tendencyList.map(([item, type], idx) => (
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

export default Tendency;
