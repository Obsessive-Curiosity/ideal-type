import { useState, useCallback } from "react";
import OPT_CHECKBOX from "../constants/OPT_CHECKBOX";

type CheckboxType = typeof OPT_CHECKBOX.SINGLE | typeof OPT_CHECKBOX.MULTI;

const useCheckbox = (initial: string[] = []) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(initial);
  const [isSingle, setIsSingle] = useState<boolean>(false);

  const onChangeCheckbox = useCallback(
    (value: string, type: CheckboxType) => {
      if (type === OPT_CHECKBOX.SINGLE) {
        setSelectedItems([value]); // 기존의 항목을 모두 제거하고 새로운 항목을 설정
        setIsSingle(true); // 싱글 선택 활성화
      } else {
        setSelectedItems((prev) => {
          if (isSingle) {
            // 이전에 싱글 선택이 있었던 경우, 빈 배열로 초기화
            return [value];
          }
          // 멀티 선택 상태에서 이미 선택된 항목은 제거하고, 선택되지 않은 항목은 추가
          return prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value];
        });
        setIsSingle(false); // 멀티 선택 활성화
      }
    },
    [isSingle]
  );

  return { selectedItems, onChangeCheckbox };
};

export default useCheckbox;
