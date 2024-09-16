import { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useEffect, useReducer } from "react";

//pages
import Home from "./pages/Home";
import QuestionMe from "./pages/QuestionMe";
import QuestionYou from "./pages/QuestionYou";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";

//interface
import DataItem from "./interfaces/DataItem";

// context
import QuestionStateContext from "./contexts/QuestionStateContext";
import QuestionDispatchContext from "./contexts/QuestionDispatchContext";

// 액션 타입 정의
type ActionType =
  | { type: "CREATE"; data: DataItem }
  | { type: "UPDATE"; data: DataItem }
  | { type: "RESET" };

function reducer(state: DataItem[], action: ActionType): DataItem[] {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.type === action.data.type ? action.data : item
      );
    case "RESET":
      return [];
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setVh(); // 처음 렌더링될 때 vh 설정
    window.addEventListener("resize", setVh); // 창 크기 변경 시
    window.addEventListener("scroll", setVh); // 스크롤 시 주소창이 숨겨질 때 적용
  }, []);

  // onCreate 함수
  const onCreate = (newData: DataItem) => {
    dispatch({
      type: "CREATE",
      data: newData,
    });
  };

  // onUpdate 함수
  const onUpdate = (updatedData: DataItem) => {
    dispatch({
      type: "UPDATE",
      data: updatedData,
    });
  };

  const onReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <>
      <GlobalStyle />
      <QuestionStateContext.Provider value={{ data }}>
        <QuestionDispatchContext.Provider
          value={{ onCreate, onUpdate, onReset }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionMe" element={<QuestionMe />} />
            <Route path="/questionYou" element={<QuestionYou />} />
            <Route path="/result" element={<Result />} />
            <Route element={<NotFound />} />
          </Routes>
        </QuestionDispatchContext.Provider>
      </QuestionStateContext.Provider>
    </>
  );
}

export default App;

// GlobalStyle 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NotoSans';
    src: url('/NotoSansKR-VariableFont_wght.ttf');
  }
  *{
    font-family: 'NotoSans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-x: hidden; /* 수평 스크롤 방지 */
    background-color: rgb(246,246,246);
  }

  #root{
    background-color:white;
    width:100%;
    max-width: 600px;
    margin: 0 auto;
    min-height: calc(var(--vh, 1vh) * 100);
    box-shadow: rgb(100,100,100, 0.2) 0px 0px 29px 0px;
    padding: 0px 20px;
  }
`;
