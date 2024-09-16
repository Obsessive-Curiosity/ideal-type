import { useContext, useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import QuestionStateContext from "../../../../contexts/QuestionStateContext";
import getInitialData from "../../../../features/getInitialData";

const eyeList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["평범한 눈", OPT_CHECKBOX.SINGLE],
  ["치켜올라간 눈", OPT_CHECKBOX.SINGLE],
  ["처진 눈", OPT_CHECKBOX.SINGLE],
  ["실눈", OPT_CHECKBOX.SINGLE],
  ["삼백안", OPT_CHECKBOX.SINGLE],
  ["사백안", OPT_CHECKBOX.SINGLE],
  ["동태눈", OPT_CHECKBOX.SINGLE],
];
const eyeList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["평범한 눈", OPT_CHECKBOX.MULTI],
  ["치켜올라간 눈", OPT_CHECKBOX.MULTI],
  ["처진 눈", OPT_CHECKBOX.MULTI],
  ["실눈", OPT_CHECKBOX.MULTI],
  ["삼백안", OPT_CHECKBOX.MULTI],
  ["사백안", OPT_CHECKBOX.MULTI],
  ["동태눈", OPT_CHECKBOX.MULTI],
];

const Eye = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const eyeList = type === ME ? eyeList1 : eyeList2;
  const { data } = useContext(QuestionStateContext);
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    getInitialData(type, data, "eye")
  );

  useEffect(() => {
    setHandler("eye", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 눈매를 선택해주세요.</h2>
      <p>💡눈매 기준</p>
      {eyeList.map(([item, type], idx) => (
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

export default Eye;
