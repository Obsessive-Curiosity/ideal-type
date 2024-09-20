import { useState, useEffect } from "react";
import styled from "styled-components";

// optMBTI 객체의 타입 정의
interface OptMBTI {
  item1: string[];
  item2: string[];
  item3: string[];
  item4: string[];
}

const optMBTI: OptMBTI = {
  item1: ["_", "I", "E"],
  item2: ["_", "N", "S"],
  item3: ["_", "F", "T"],
  item4: ["_", "P", "J"],
};

const getMbtiBtnInitial = (value: string): number[] => {
  const splitValue = value.split(""); // "I__P" -> ["I", "_", "_", "P"]

  return splitValue.map((char, index) => {
    // item1, item2, item3, item4에 맞게 값의 인덱스를 찾음
    const key = `item${index + 1}` as keyof typeof optMBTI;
    return optMBTI[key].indexOf(char);
  });
};

interface MbtiButtonItemProps {
  index: number;
  value: string;
  onChangeUpdate: (index: number, value: string) => void;
}

const MbtiButtonItem = ({
  index,
  value,
  onChangeUpdate,
}: MbtiButtonItemProps) => {
  // 각 항목의 현재 선택된 인덱스를 저장
  const [currentIndex, setCurrentIndex] = useState(getMbtiBtnInitial(value));

  const handleToggle = (buttonIndex: number) => {
    setCurrentIndex((prev) => {
      // 새 인덱스를 계산
      const key = `item${buttonIndex + 1}` as keyof OptMBTI;
      const newIndex = (prev[buttonIndex] + 1) % optMBTI[key].length;

      // 업데이트된 인덱스를 설정
      const updatedIndex = prev.map((index, idx) =>
        idx === buttonIndex ? newIndex : index
      );

      return updatedIndex;
    });
  };

  // currentIndex가 변경될 때마다 부모 컴포넌트에 업데이트된 값 전달
  useEffect(() => {
    const newValue = currentIndex
      .map((index, idx) => {
        const key = `item${idx + 1}` as keyof OptMBTI;
        return optMBTI[key][index];
      }) // 타입 캐스팅 추가
      .join("");

    onChangeUpdate(index, newValue);
  }, [currentIndex, index, onChangeUpdate]);

  return (
    <MbtiBtnsWrapper>
      {Object.keys(optMBTI).map((key, buttonIndex) => (
        <MbtiBtn key={key} onClick={() => handleToggle(buttonIndex)}>
          {optMBTI[key as keyof OptMBTI][currentIndex[buttonIndex]]}
        </MbtiBtn>
      ))}
    </MbtiBtnsWrapper>
  );
};

export default MbtiButtonItem;

const MbtiBtnsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const MbtiBtn = styled.button`
  width: 65px;
  height: 65px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 18px;
  &:hover,
  &:focus {
    color: #694e99;
    border: 2px solid #694e99;
    cursor: pointer;
  }
`;
