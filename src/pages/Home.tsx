import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionBtn from "../components/QuestionItems/QuestionBtn";

const Home = () => {
  const nav = useNavigate();

  const onClickMe = () => {
    nav("/question/1");
  };
  const onClickYou = () => {
    nav("/question/2");
  };
  const onClickResult = () => {
    nav("/result");
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
