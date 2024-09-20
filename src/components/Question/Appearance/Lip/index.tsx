import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import useInitialData from "../../../../hooks/useInitialData";

const lipList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["얇은 입술", OPT_CHECKBOX.SINGLE],
  ["중간 입술", OPT_CHECKBOX.SINGLE],
  ["두꺼운 입술", OPT_CHECKBOX.SINGLE],
];

const lipList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["얇은 입술", OPT_CHECKBOX.MULTI],
  ["중간 입술", OPT_CHECKBOX.MULTI],
  ["두꺼운 입술", OPT_CHECKBOX.MULTI],
];

const Lip = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const lipList = type === ME ? lipList1 : lipList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    useInitialData(type, "lip")
  );

  useEffect(() => {
    setHandler("lip", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 입술 두께를 선택해주세요.</h2>
      <p>💡명란젓은 예외에요~</p>
      {lipList.map(([item, type], idx) => (
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

export default Lip;
