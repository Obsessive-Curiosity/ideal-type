import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import useInitialData from "../../../../hooks/useInitialData";

const beerList1: [
  string,
  typeof OPT_CHECKBOX.SINGLE | typeof OPT_CHECKBOX.MULTI
][] = [
  ["음주 안함", OPT_CHECKBOX.SINGLE],
  ["와인", OPT_CHECKBOX.MULTI],
  ["칵테일", OPT_CHECKBOX.MULTI],
  ["소주", OPT_CHECKBOX.MULTI],
  ["맥주", OPT_CHECKBOX.MULTI],
  ["막걸리", OPT_CHECKBOX.MULTI],
];
const beerList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["음주 안함", OPT_CHECKBOX.MULTI],
  ["와인", OPT_CHECKBOX.MULTI],
  ["칵테일", OPT_CHECKBOX.MULTI],
  ["소주", OPT_CHECKBOX.MULTI],
  ["맥주", OPT_CHECKBOX.MULTI],
  ["막걸리", OPT_CHECKBOX.MULTI],
];

const Beer = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const beerList = type === ME ? beerList1 : beerList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    useInitialData(type, "beer")
  );

  useEffect(() => {
    setHandler("beer", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 음주 스타일을 선택해주세요.</h2>
      <p>💡음주 종목이 여러개인 경우 다수 선택가능</p>
      {beerList.map(([item, type], idx) => (
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

export default Beer;
