import styled from "styled-components";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!meRef.current || !youRef.current) return;

    try {
      // 두 요소를 각각 캡처합니다.
      const meCanvas = await html2canvas(meRef.current, {
        scale: 1,
        useCORS: true,
      });
      const youCanvas = await html2canvas(youRef.current, {
        scale: 1,
        useCORS: true,
      });

      // 결합될 캔버스 생성
      const combinedCanvas = document.createElement("canvas");
      const ctx = combinedCanvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context is not available.");
      }

      // 결합된 캔버스의 크기를 설정합니다.
      combinedCanvas.width = meCanvas.width + youCanvas.width;
      combinedCanvas.height = Math.max(meCanvas.height, youCanvas.height);

      // 두 이미지를 결합하여 캔버스에 그립니다.
      ctx.drawImage(meCanvas, 0, 0);
      ctx.drawImage(youCanvas, meCanvas.width, 0);

      // Blob으로 변환하고 이미지 저장
      combinedCanvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "ideal-type.png");
        }
      }, "image/png");
    } catch (error) {
      console.error("Error capturing or combining images:", error);
    }
  };

  return (
    <Container>
      <Header title={"결과 보기"} />
      <ResultItem meRef={meRef} youRef={youRef} />
      <Footer title={"다운로드"} onClick={handleDownload} />
    </Container>
  );
};

export default Result;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
