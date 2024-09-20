import { useState, useEffect, useReducer, useCallback } from "react";
import styled from "styled-components";
import QuestionWrapper from "../../../../styles/QuestionWrapper";
import QuesiotnProps from "../../../../interfaces/QuestionProps";
import MbtiButtonItem from "../../../QuestionItems/MbtiButtonItem";
import useInitialData from "../../../../hooks/useInitialData";

// 액션 타입 정의
type ActionType =
  | { type: "CREATE"; selectedItems: string[] }
  | { type: "UPDATE"; index: number; value: string }
  | { type: "DELETE" };

function reducer(state: string[], action: ActionType): string[] {
  switch (action.type) {
    case "CREATE":
      return [...state, ...action.selectedItems];
    case "UPDATE":
      return state.map((item, idx) =>
        idx === action.index ? action.value : item
      );
    case "DELETE":
      return state.slice(0, -1);
    default:
      return state;
  }
}

function Mbti({ type, setHandler }: QuesiotnProps) {
  const [selectedItems, dispatch] = useReducer(
    reducer,
    useInitialData(type, "mbti")
  );
  const [buttonCount, setButtonCount] = useState<number>(selectedItems.length); // 초기 버튼 개수

  useEffect(() => {
    const filteredItems = selectedItems.filter((item) => item !== "____");

    setHandler("mbti", filteredItems); // setHandler 처리
    setButtonCount(filteredItems.length); // 필터링된 아이템의 길이에 맞게 버튼 개수 조정
  }, [selectedItems, setHandler]);

  const onClickAdd = () => {
    dispatch({ type: "CREATE", selectedItems: ["____"] });
  };

  const onClickDelete = () => {
    dispatch({ type: "DELETE" });
  };

  const onChangeUpdate = useCallback((index: number, value: string) => {
    dispatch({ type: "UPDATE", index, value });
  }, []);

  return (
    <QuestionWrapper>
      <h2>{type === "ME" ? "본인" : "상대방"}의 MBTI를 선택해주세요.</h2>
      <p>💡중복 선택 가능</p>
      {type === "ME" && (
        <p>
          <LinkToMbti
            href="https://www.16personalities.com/ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            💡MBTI 검사하러 가기
          </LinkToMbti>
        </p>
      )}

      {selectedItems.map((item, idx) => (
        <MbtiButtonItem
          key={idx}
          index={idx}
          value={item} // item 값을 props로 전달
          onChangeUpdate={onChangeUpdate}
        />
      ))}
      <OptBtnsWrapper>
        <AddBtn onClick={onClickAdd}>+</AddBtn>
        <DeleteBtn onClick={onClickDelete}>-</DeleteBtn>
      </OptBtnsWrapper>
    </QuestionWrapper>
  );
}

export default Mbti;

const LinkToMbti = styled.a`
  font-style: italic;
  color: #694e99;
  &:hover {
    background-color: #d5c9e6;
    color: #694e99;
    text-decoration: wavy;
  }
`;

const OptBtnsWrapper = styled.div`
  display: flex;
  gap: 10px;
  button {
    width: 30px;
    height: 30px;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    margin: 5px 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AddBtn = styled.button`
  &:hover {
    border: 1px solid green;
    color: green;
  }
`;
const DeleteBtn = styled.button`
  &:hover {
    border: 1px solid red;
    color: red;
  }
`;
