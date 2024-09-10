import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionBtn from "../components/QuestionItems/QuestionBtn";
import { useContext } from "react";
import QuestionStateContext from "../contexts/QuestionStateContext";
import DataItem from "../interfaces/DataItem";

const Home = () => {
  const nav = useNavigate();
  const { data }: { data: DataItem[] } = useContext(QuestionStateContext);

  const onClickMe = () => {
    nav("/question/1");
  };
  const onClickYou = () => {
    nav("/question/2");
  };
  const onClickResult = () => {
    if (data.length === 0) {
      alert("자기소개표와 이미지표를 작성해주세요!");
    } else if (data.length === 1) {
      if (data.some((item) => item.id === "1")) {
        alert("이상형표를 작성해주세요!");
      } else if (data.some((item) => item.id === "2")) {
        alert("자기소개표를 작성해주세요!");
      } else {
        alert("잘못된 데이타 값입니다!");
      }
    } else {
      nav("/result");
    }
  };

  return (
    <HomeWrapper>
      <Header title={"반갑습니다!"} />
      <ContentWrapper>
        <QuestionBtn text={"자기소개표 만들기"} onClick={onClickMe} />
        <QuestionBtn text={"이상형표 만들기"} onClick={onClickYou} />
      </ContentWrapper>
      <Footer title={"이미지 출력하기"} onClick={onClickResult} />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
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
