import styled from "styled-components";
import { useEffect } from "react";
import Age from "../Question/Basic/Age";
import Tendency from "../Question/Basic/Tendency";
import Region from "../Question/Basic/Region";
import ClothingStyle from "../Question/Appearance/ClothingStyle";
import Eye from "../Question/Appearance/Eye";
import Hair from "../Question/Appearance/Hair";
import Height from "../Question/Appearance/Height";
import Lip from "../Question/Appearance/Lip";
import Tattoo from "../Question/Appearance/Tattoo";
import Mbti from "../Question/Personality/Mbti";
import Beer from "../Question/Life/Beer";
import Night from "../Question/Life/Night";
import Religion from "../Question/Life/Religion";
import Smoking from "../Question/Life/Smoking";

interface UserQuestionProps {
  type: string;
  input: { [key: string]: string[] }; // input의 타입 정의
  setHandler: (name: string, value: string[]) => void; // setHandler 함수의 타입 정의
  refs: { [key: string]: React.RefObject<HTMLDivElement> }; // refs를 props로 받음
}

const UserQuestion = ({ type, input, setHandler, refs }: UserQuestionProps) => {
  const isAdult = !input.age.includes("19세 미만");

  useEffect(() => {
    if (!isAdult) {
      input.tendency = ["Platonic"];
      input.tattoo = ["타투 없음"];
      input.beer = ["음주 안함"];
      input.night = ["집에 있음"];
      input.smoking = ["흡연 안함"];
    }
  }, [isAdult, input]);

  return (
    <UserQuestionWrapper>
      <div ref={refs.age}>
        <Age type={type} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.tendency}>
          <Tendency type={type} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.region}>
        <Region type={type} setHandler={setHandler} />
      </div>
      <div ref={refs.clothingStyle}>
        <ClothingStyle type={type} setHandler={setHandler} />
      </div>
      <div ref={refs.eye}>
        <Eye type={type} setHandler={setHandler} />
      </div>
      <div ref={refs.hair}>
        <Hair type={type} setHandler={setHandler} />
      </div>
      <div ref={refs.height}>
        <Height type={type} setHandler={setHandler} />
      </div>
      <div ref={refs.lip}>
        <Lip type={type} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.tattoo}>
          <Tattoo type={type} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.mbti}>
        <Mbti type={type} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.beer}>
          <Beer type={type} setHandler={setHandler} />
        </div>
      )}
      {isAdult && (
        <div ref={refs.night}>
          <Night type={type} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.religion}>
        <Religion type={type} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.smoking}>
          <Smoking type={type} setHandler={setHandler} />
        </div>
      )}
    </UserQuestionWrapper>
  );
};

export default UserQuestion;

const UserQuestionWrapper = styled.div`
  height: 80vh;
  overflow: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #694e99; /* 스크롤바 색상 변경 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;
