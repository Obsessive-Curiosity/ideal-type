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
      const meCanvas = await html2canvas(meRef.current, { scale: 2 });
      const youCanvas = await html2canvas(youRef.current, { scale: 2 });

      // 캔버스 크기를 HTML 기준 600px로 조정합니다.
      const scale = 600 / Math.max(meCanvas.width, youCanvas.width);
      const combinedCanvas = document.createElement("canvas");
      const ctx = combinedCanvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas context is not available.");
      }

      // 두 이미지의 크기를 결정합니다.
      const meImage = meCanvas.toDataURL("image/png");
      const youImage = youCanvas.toDataURL("image/png");

      const meImg = new Image();
      const youImg = new Image();

      const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      const [meImgLoaded, youImgLoaded] = await Promise.all([
        loadImage(meImage),
        loadImage(youImage),
      ]);

      // 결합된 캔버스의 크기를 설정합니다.
      combinedCanvas.width = (meImgLoaded.width + youImgLoaded.width) * scale;
      combinedCanvas.height =
        Math.max(meImgLoaded.height, youImgLoaded.height) * scale;

      // 두 이미지를 결합합니다.
      ctx.drawImage(
        meImgLoaded,
        0,
        0,
        meImgLoaded.width * scale,
        meImgLoaded.height * scale
      );
      ctx.drawImage(
        youImgLoaded,
        meImgLoaded.width * scale,
        0,
        youImgLoaded.width * scale,
        youImgLoaded.height * scale
      );

      // Blob으로 변환하고 저장합니다.
      combinedCanvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "combined-result.png");
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
