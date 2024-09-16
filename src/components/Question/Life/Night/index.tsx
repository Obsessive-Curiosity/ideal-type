import { useContext, useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import QuestionStateContext from "../../../../contexts/QuestionStateContext";
import getInitialData from "../../../../features/getInitialData";

const nightList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["밤에는 집이지 어딜나가...!", OPT_CHECKBOX.SINGLE],
  ["그냥 문화생활이지~", OPT_CHECKBOX.SINGLE],
  ["클럽퀸 밤의 여왕", OPT_CHECKBOX.SINGLE],
];
const nightList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["밤에는 집이지 어딜나가...!", OPT_CHECKBOX.MULTI],
  ["그냥 문화생활이지~", OPT_CHECKBOX.MULTI],
  ["클럽퀸 밤의 여왕", OPT_CHECKBOX.MULTI],
];

const Night = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const nightList = type === ME ? nightList1 : nightList2;
  const { data } = useContext(QuestionStateContext);
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    getInitialData(type, data, "night")
  );

  useEffect(() => {
    setHandler("night", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 밤문화 스타일을 선택해주세요.</h2>
      <p>💡중복 선택 불가능</p>
      {nightList.map(([item, type], idx) => (
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

export default Night;
