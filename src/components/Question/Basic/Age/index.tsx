import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";
import useInitialData from "../../../../hooks/useInitialData";

const ageList1: [string, typeof OPT_CHECKBOX.SINGLE][] = [
  ["19세 미만", OPT_CHECKBOX.SINGLE],
  ["20대 초반", OPT_CHECKBOX.SINGLE],
  ["20대 중반", OPT_CHECKBOX.SINGLE],
  ["20대 후반", OPT_CHECKBOX.SINGLE],
  ["30대 초반", OPT_CHECKBOX.SINGLE],
  ["30대 중반", OPT_CHECKBOX.SINGLE],
  ["30대 후반", OPT_CHECKBOX.SINGLE],
  ["40대 초반", OPT_CHECKBOX.SINGLE],
  ["40대 중반", OPT_CHECKBOX.SINGLE],
  ["40대 후반", OPT_CHECKBOX.SINGLE],
  ["50대 후반", OPT_CHECKBOX.SINGLE],
];

const ageList2: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["19세 미만", OPT_CHECKBOX.MULTI],
  ["20대 초반", OPT_CHECKBOX.MULTI],
  ["20대 중반", OPT_CHECKBOX.MULTI],
  ["20대 후반", OPT_CHECKBOX.MULTI],
  ["30대 초반", OPT_CHECKBOX.MULTI],
  ["30대 중반", OPT_CHECKBOX.MULTI],
  ["30대 후반", OPT_CHECKBOX.MULTI],
  ["40대 초반", OPT_CHECKBOX.MULTI],
  ["40대 중반", OPT_CHECKBOX.MULTI],
  ["40대 후반", OPT_CHECKBOX.MULTI],
  ["50대 후반", OPT_CHECKBOX.MULTI],
];

const Age = ({ type, setHandler }: QuesiotnProps) => {
  const ME = "ME";
  const user = type === ME ? "본인" : "상대방";
  const ageList = type === ME ? ageList1 : ageList2;
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    useInitialData(type, "age")
  );

  useEffect(() => {
    setHandler("age", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 나이를 선택해주세요.</h2>
      <p>💡연나이(현재 연도에서 출생연도를 뺀 나이) 기준</p>
      <p>💡초반: 1~3, 중반: 4~6, 후반: 7~9</p>
      <p>💡19세 미만이 포함될 경우 성향을 선택할 수 없습니다!</p>
      {ageList.map(([item, type], idx) => (
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

export default Age;
