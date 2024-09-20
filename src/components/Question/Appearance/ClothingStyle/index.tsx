import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import useInitialData from "../../../../hooks/useInitialData";

const clothingStyleList: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["미니멀룩", OPT_CHECKBOX.MULTI],
  ["페미닌룩", OPT_CHECKBOX.MULTI],
  ["심플 베이직룩", OPT_CHECKBOX.MULTI],
  ["아메카지", OPT_CHECKBOX.MULTI],
  ["비즈니스 캐쥬얼", OPT_CHECKBOX.MULTI],
  ["캐쥬얼", OPT_CHECKBOX.MULTI],
  ["댄디", OPT_CHECKBOX.MULTI],
];

const ClothingStyle = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    useInitialData(type, "clothingStyle")
  );

  useEffect(() => {
    setHandler("clothingStyle", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 옷스타일을 선택해주세요.</h2>
      <p>💡옷장에 있는 옷스타일</p>
      {clothingStyleList.map(([item, type], idx) => (
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

export default ClothingStyle;
