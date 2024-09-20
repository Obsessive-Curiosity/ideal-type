import styled from "styled-components";
import html2canvas from "html2canvas";
import { useRef, useState, useEffect } from "react";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const [combinedImage, setCombinedImage] = useState<string | null>(null); // 캡처된 이미지를 저장할 상태

  useEffect(() => {
    const handleDownload = async () => {
      if (!meRef.current || !youRef.current) return;

      try {
        const meCanvas = await html2canvas(meRef.current, {
          scale: 2,
          useCORS: true,
        });
        const youCanvas = await html2canvas(youRef.current, {
          scale: 2,
          useCORS: true,
        });

        const combinedCanvas = document.createElement("canvas");
        const ctx = combinedCanvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas context is not available.");
        }

        combinedCanvas.width = meCanvas.width + youCanvas.width;
        combinedCanvas.height = Math.max(meCanvas.height, youCanvas.height);

        ctx.drawImage(meCanvas, 0, 0);
        ctx.drawImage(youCanvas, meCanvas.width, 0);

        const dataUrl: string = combinedCanvas.toDataURL("image/png");
        setCombinedImage(dataUrl); // 상태에 이미지 URL 저장
      } catch (error) {
        console.error("Error capturing or combining images:", error);
      }
    };

    handleDownload(); // 컴포넌트가 마운트될 때 다운로드 함수 호출
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <Container>
      <Header title={"결과 보기"} />
      <ResultItemWrapper>
        {combinedImage === null && <ResultItem meRef={meRef} youRef={youRef} />}
      </ResultItemWrapper>

      {combinedImage && ( // 합쳐진 이미지를 화면에 표시
        <ImageWrapper>
          <img src={combinedImage} alt="Combined Result" />
        </ImageWrapper>
      )}
    </Container>
  );
};

export default Result;

const Container = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`;

const ResultItemWrapper = styled.div`
  position: absolute; // 화면에서 보이지 않게 함
  opacity: 0; // 투명하게 설정
  pointer-events: none; // 클릭 이벤트 방지
`;

const ImageWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;
