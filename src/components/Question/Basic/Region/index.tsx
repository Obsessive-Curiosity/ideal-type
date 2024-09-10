import { useEffect } from "react";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import SelectItem from "../../../QuestionItems/SelectItem";
import CheckboxItem from "../../../QuestionItems/CheckboxItem";
import OPT_CHECKBOX from "../../../../constants/OPT_CHECKBOX";
import useCheckbox from "../../../../hooks/useCheckbox";

// `SelectItem`이 받을 수 있는 형태로 리스트를 정의합니다.
const regionList: [string, typeof OPT_CHECKBOX.MULTI][] = [
  ["서울", OPT_CHECKBOX.MULTI],
  ["경기도", OPT_CHECKBOX.MULTI],
  ["인천", OPT_CHECKBOX.MULTI],
  ["부산", OPT_CHECKBOX.MULTI],
  ["대구", OPT_CHECKBOX.MULTI],
  ["광주", OPT_CHECKBOX.MULTI],
  ["대전", OPT_CHECKBOX.MULTI],
  ["울산", OPT_CHECKBOX.MULTI],
  ["세종", OPT_CHECKBOX.MULTI],
  ["충청도", OPT_CHECKBOX.MULTI],
  ["경상도", OPT_CHECKBOX.MULTI],
  ["전라도", OPT_CHECKBOX.MULTI],
  ["강원도", OPT_CHECKBOX.MULTI],
  ["제주도", OPT_CHECKBOX.MULTI],
];

const Region = ({ id, setHandler }: QuesiotnProps) => {
  const user = id === "1" ? "본인" : "상대방";
  const { selectedItems, onChangeCheckbox } = useCheckbox(
    id === "1" ? ["서울"] : []
  );

  useEffect(() => {
    setHandler("region", selectedItems);
  }, [selectedItems, setHandler]);

  return (
    <QuestionWrapper>
      <h2>{user}의 사는 지역을 선택해주세요.</h2>
      <p>💡한국지역 기준</p>
      {id === "1" && (
        <SelectItem
          optList={regionList.map(([item]) => item)} // optList에 문자열 배열 전달
        />
      )}
      {id === "2" &&
        regionList.map(([item, type], idx) => (
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

export default Region;
