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
  id: string; // id의 타입 정의
  input: { [key: string]: string[] }; // input의 타입 정의
  setHandler: (name: string, value: string[]) => void; // setHandler 함수의 타입 정의
  refs: { [key: string]: React.RefObject<HTMLDivElement> }; // refs를 props로 받음
}

const UserQuestion = ({ id, input, setHandler, refs }: UserQuestionProps) => {
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
        <Age id={id} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.tendency}>
          <Tendency id={id} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.region}>
        <Region id={id} setHandler={setHandler} />
      </div>
      <div ref={refs.clothingStyle}>
        <ClothingStyle id={id} setHandler={setHandler} />
      </div>
      <div ref={refs.eye}>
        <Eye id={id} setHandler={setHandler} />
      </div>
      <div ref={refs.hair}>
        <Hair id={id} setHandler={setHandler} />
      </div>
      <div ref={refs.height}>
        <Height id={id} setHandler={setHandler} />
      </div>
      <div ref={refs.lip}>
        <Lip id={id} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.tattoo}>
          <Tattoo id={id} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.mbti}>
        <Mbti id={id} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.beer}>
          <Beer id={id} setHandler={setHandler} />
        </div>
      )}
      {isAdult && (
        <div ref={refs.night}>
          <Night id={id} setHandler={setHandler} />
        </div>
      )}
      <div ref={refs.religion}>
        <Religion id={id} setHandler={setHandler} />
      </div>
      {isAdult && (
        <div ref={refs.smoking}>
          <Smoking id={id} setHandler={setHandler} />
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
