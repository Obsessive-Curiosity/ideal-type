import styled from "styled-components";
import { createRef, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import UserQuestion from "../components/UserQuestion/index";
import QuestionStateContext from "../contexts/QuestionStateContext";
import QuestionDispatchContext from "../contexts/QuestionDispatchContext";
import refsKeys from "../constants/refsKeys";
import DataItem from "../interfaces/DataItem";

const hasAllValues = (input: { [key: string]: string[] }) => {
  return Object.values(input).every((array) => array.length > 0);
};

const scrollToElement = (
  refs: { [key: string]: React.RefObject<HTMLDivElement> },
  missingKeys: string[]
) => {
  if (missingKeys.length > 0) {
    const firstMissingKey = missingKeys[0]; // 첫 번째 누락된 key만 가져오기
    const ref = refs[firstMissingKey];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
};

const initialState = {
  age: [] as string[],
  region: [] as string[],
  tendency: [] as string[],
  clothingStyle: [] as string[],
  eye: [] as string[],
  hair: [] as string[],
  height: [] as string[],
  lip: [] as string[],
  tattoo: [] as string[],
  mbti: [] as string[],
  beer: [] as string[],
  night: [] as string[],
  religion: [] as string[],
  smoking: [] as string[],
};

const QuestionMe = () => {
  const nav = useNavigate();
  const type = "ME";
  const { data } = useContext(QuestionStateContext);
  const { onCreate, onUpdate } = useContext(QuestionDispatchContext);
  const [input, setInput] = useState(initialState);
  const isDone = data.length > 0;

  const refs = refsKeys.reduce((acc, key) => {
    acc[key] = createRef<HTMLDivElement>();
    return acc;
  }, {} as { [key: string]: React.RefObject<HTMLDivElement> });

  const setHandler = useCallback((name: string, value: string[]) => {
    setInput((prev) => ({
      ...prev,
      [name]: value, // 객체의 특정 속성을 동적으로 업데이트
    }));
  }, []);

  const onClickSubmit = () => {
    if (hasAllValues(input)) {
      const newData: DataItem = { type, ...input };
      const existingData = data.find((item) => item.type === type);
      if (existingData) {
        onUpdate(newData);
      } else {
        onCreate(newData);
      }
      nav(isDone ? "/" : "/questionYou");
    } else {
      const missingKeys = Object.keys(input).filter(
        (key) => input[key as keyof typeof input].length === 0
      );
      scrollToElement(refs, missingKeys);
    }
  };

  return (
    <>
      <QuestionWrapper>
        <Header title={"자기소개표 만들기"} />
        <ContentWrapper>
          <UserQuestion
            type={type}
            input={input}
            setHandler={setHandler}
            refs={refs}
          />
        </ContentWrapper>
        <Footer title={"제출하기"} onClick={onClickSubmit} />
      </QuestionWrapper>
    </>
  );
};
export default QuestionMe;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
  overflow: scroll;
  padding-bottom: auto;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  justify-content: center; /* 콘텐츠 중앙 정렬 */
  box-sizing: border-box; /* 패딩과 여백을 포함한 크기 조정 */

  @media (max-width: 600px) {
    font-size: 12px; /* 모바일에서 폰트 크기 조정 */
  }
`;
