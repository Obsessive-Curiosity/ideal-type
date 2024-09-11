import { toPng } from "html-to-image";
import { useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";
import Footer from "../components/Footer/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);

  const resizeAndSaveImage = async (
    ref: React.RefObject<HTMLDivElement>,
    fileName: string
  ) => {
    if (ref.current) {
      try {
        // 현재 크기 저장
        const originalWidth = ref.current.style.width;
        // 원하는 크기로 설정
        ref.current.style.width = "600px";

        // 기본 이미지 데이터 URL 생성
        const dataUrl = await toPng(ref.current);

        // 원래 크기로 복원
        ref.current.style.width = originalWidth;

        // 이미지 객체 생성 및 로드
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          // canvas 생성 및 크기 설정
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // 이미지 폭을 600px로 설정
            const targetWidth = 600;
            const scale = targetWidth / img.width;
            canvas.width = targetWidth;
            canvas.height = img.height * scale;

            // canvas에 이미지 그리기
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // canvas의 데이터 URL 생성
            const resizedDataUrl = canvas.toDataURL("image/png");

            // 다운로드 링크 생성
            const link = document.createElement("a");
            link.href = resizedDataUrl;
            link.download = fileName;
            link.click();
          }
        };
      } catch (err) {
        console.error("이미지 생성 중 오류가 발생했습니다.", err);
      }
    }
  };

  const saveToImages = async () => {
    await resizeAndSaveImage(meRef, "ideal-table-me.png");
    await resizeAndSaveImage(youRef, "ideal-table-you.png");
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
