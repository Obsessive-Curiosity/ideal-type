import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import UserQuestion from "../components/UserQuestion/index";
import QuestionStateContext from "../contexts/QuestionStateContext";
import QuestionDispatchContext from "../contexts/QuestionDispatchContext";
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

const Question = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>(); // URL에서 id를 받아옴
  const questionTitle = id === "1" ? "자기소개표 만들기" : "이상형표 만들기";
  const { data } = useContext(QuestionStateContext);
  const { onCreate, onUpdate } = useContext(QuestionDispatchContext);

  const [input, setInput] = useState({
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
  });

  const refs = {
    age: useRef<HTMLDivElement>(null),
    region: useRef<HTMLDivElement>(null),
    tendency: useRef<HTMLDivElement>(null),
    clothingStyle: useRef<HTMLDivElement>(null),
    eye: useRef<HTMLDivElement>(null),
    hair: useRef<HTMLDivElement>(null),
    height: useRef<HTMLDivElement>(null),
    lip: useRef<HTMLDivElement>(null),
    tattoo: useRef<HTMLDivElement>(null),
    mbti: useRef<HTMLDivElement>(null),
    beer: useRef<HTMLDivElement>(null),
    night: useRef<HTMLDivElement>(null),
    religion: useRef<HTMLDivElement>(null),
    smoking: useRef<HTMLDivElement>(null),
  };

  const setHandler = useCallback((name: string, value: string[]) => {
    setInput((prev) => ({
      ...prev,
      [name]: value, // 객체의 특정 속성을 동적으로 업데이트
    }));
  }, []);

  useEffect(() => {
    if (id !== "1" && id !== "2") {
      nav("/notfound");
      return;
    }
  }, [id, nav]);

  const getInput = () => {
    if (hasAllValues(input)) {
      const newData: DataItem = { id, ...input };
      const existingData = data.find((item) => String(item.id) === String(id));
      if (existingData) {
        onUpdate(newData);
      } else {
        onCreate(newData);
      }
      nav("/"); // 이동
    } else {
      const missingKeys = Object.keys(input).filter(
        (key) => input[key as keyof typeof input].length === 0
      );
      scrollToElement(refs, missingKeys);
    }
  };

  const onClickHome = () => {
    getInput();
  };

  return (
    <QuestionWrapper>
      <Header title={questionTitle} />
      <ContentWrapper>
        {id && (
          <UserQuestion
            id={id}
            input={input}
            setHandler={setHandler}
            refs={refs}
          />
        )}
      </ContentWrapper>
      <Footer title={"제출하기"} onClick={onClickHome} />
    </QuestionWrapper>
  );
};

export default Question;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 전체 높이 차지
`;
const ContentWrapper = styled.div`
  display: flex;
  flex: 1; // 남은 공간을 채우기
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
`;
