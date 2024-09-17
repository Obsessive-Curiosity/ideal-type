import styled from "styled-components";
import { replace, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionBtn from "../components/QuestionItems/QuestionBtn";
import { useContext } from "react";
import QuestionStateContext from "../contexts/QuestionStateContext";
import QuestionDispatchContext from "../contexts/QuestionDispatchContext";
import DataItem from "../interfaces/DataItem";

const Home = () => {
  const nav = useNavigate();
  const { data }: { data: DataItem[] } = useContext(QuestionStateContext);
  const { onReset } = useContext(QuestionDispatchContext);
  const isDone = data.length > 1;

  const onClickMe = () => {
    nav("/questionMe", { replace: true });
  };
  const onClickYou = () => {
    nav("/questionYou", { replace: true });
  };
  const onClickReset = () => {
    onReset();
  };

  const onClickResult = () => {
    nav("/result");
  };

  return (
    <HomeWrapper>
      <Header title={"반갑습니다!"} />
      <DivWrapper>
        <p>사파리</p> 또는 <p>크롬</p> 브라우저를 사용해주세요!
      </DivWrapper>
      <ContentWrapper>
        {isDone ? (
          <>
            <QuestionBtn text={"자기소개표 수정하기"} onClick={onClickMe} />
            <QuestionBtn text={"이상형표 수정하기"} onClick={onClickYou} />
            <QuestionBtn text={"다시 시작하기"} onClick={onClickReset} />
          </>
        ) : (
          <>
            <QuestionBtn text={"시작하기"} onClick={onClickMe} />
          </>
        )}
      </ContentWrapper>
      {isDone && (
        <>
          {" "}
          <Footer title={"이미지 출력하기"} onClick={onClickResult} />
        </>
      )}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
`;
const DivWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 15px;

  p {
    display: inline;
    color: #694e99;
    font-size: 18px;
  }
`;
