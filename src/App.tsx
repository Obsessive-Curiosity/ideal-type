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
  // const storedData = localStorage.getItem("questionData");
  const [data, dispatch] = useReducer(
    reducer,
    []
    // storedData ? JSON.parse(storedData) : []
  );

  // 로컬 스토리지에 데이터를 저장
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("questionData", JSON.stringify(data));
    }
  }, [data]);

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
            <Route path="/*" element={<NotFound />} />
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
    background-color: #694e99;
    height:100%;
  }

  #root {
    background-color: white;
    max-width: 600px;
    min-height: 100svh;
    margin: 0 auto;
    box-shadow: rgb(100,100,100, 0.2) 0px 0px 29px 0px;
    padding: 0px 20px;
    flex: 1;
  }
`;
