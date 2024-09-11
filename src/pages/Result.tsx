import { toPng } from "html-to-image";
import { useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";
import Footer from "../components/Footer/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);

  const saveToImages = async () => {
    try {
      if (meRef.current) {
        const meDataUrl = await toPng(meRef.current);
        const meLink = document.createElement("a");
        meLink.href = meDataUrl;
        meLink.download = "me-result-image.png";
        meLink.click();
      }

      if (youRef.current) {
        const youDataUrl = await toPng(youRef.current);
        const youLink = document.createElement("a");
        youLink.href = youDataUrl;
        youLink.download = "you-result-image.png";
        youLink.click();
      }
    } catch (err) {
      console.error("이미지 생성 중 오류가 발생했습니다.", err);
    }
  };

  return (
    <Cotainer>
      <Header title={"결과 보기"} />
      <ResultItem meRef={meRef} youRef={youRef} />
      <Footer title={"이미지 저장하기"} onClick={saveToImages} />
    </Cotainer>
  );
};

export default Result;

const Cotainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
