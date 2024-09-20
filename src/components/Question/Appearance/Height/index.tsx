import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import useInitialData from "../../../../hooks/useInitialData";

const heightList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["140cm 미만", OPT_CHECKBOX.SINGLE],
  ["150cm 초반", OPT_CHECKBOX.SINGLE],
  ["150cm 중반", OPT_CHECKBOX.SINGLE],
  ["150cm 후반", OPT_CHECKBOX.SINGLE],
  ["160cm 초반", OPT_CHECKBOX.SINGLE],
  ["160cm 중반", OPT_CHECKBOX.SINGLE],
  ["160cm 후반", OPT_CHECKBOX.SINGLE],
  ["170cm 초반", OPT_CHECKBOX.SINGLE],
  ["170cm 중반", OPT_CHECKBOX.SINGLE],
  ["170cm 후반", OPT_CHECKBOX.SINGLE],
  ["180cm 이상", OPT_CHECKBOX.SINGLE],
];

const heightList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["140cm 미만", OPT_CHECKBOX.MULTI],
  ["150cm 초반", OPT_CHECKBOX.MULTI],
  ["150cm 중반", OPT_CHECKBOX.MULTI],
  ["150cm 후반", OPT_CHECKBOX.MULTI],
  ["160cm 초반", OPT_CHECKBOX.MULTI],
  ["160cm 중반", OPT_CHECKBOX.MULTI],
  ["160cm 후반", OPT_CHECKBOX.MULTI],
  ["170cm 초반", OPT_CHECKBOX.MULTI],
  ["170cm 중반", OPT_CHECKBOX.MULTI],
  ["170cm 후반", OPT_CHECKBOX.MULTI],
  ["180cm 이상", OPT_CHECKBOX.MULTI],
];

const Height = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const heightList = type === ME ? heightList1 : heightList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    useInitialData(type, "height")
  );

  useEffect(() => {
    setHandler("height", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 키를 선택해주세요.</h2>
      <p>💡현재 키 기준</p>
      {heightList.map(([item, type], idx) => (
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

export default Height;
