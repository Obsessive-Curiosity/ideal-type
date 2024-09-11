import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const [combinedImageSrc, setCombinedImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 추적

  useEffect(() => {
    const generateImages = async () => {
      if (meRef.current && youRef.current) {
        try {
          // 폰트가 로드될 때까지 기다립니다.
          await document.fonts.ready;

          // 각 이미지를 캡처합니다.
          const meDataUrl = await toPng(meRef.current, {});
          const youDataUrl = await toPng(youRef.current, {});

          // 캔버스를 사용하여 이미지를 결합합니다.
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Canvas context is not available.");
          }

          const meImage = new Image();
          const youImage = new Image();

          // 이미지 로드가 완료되면 캔버스에 그립니다.
          const loadImage = (src: string, image: HTMLImageElement) => {
            return new Promise<void>((resolve, reject) => {
              image.onload = () => resolve();
              image.onerror = reject;
              image.src = src;
            });
          };

          await Promise.all([
            loadImage(meDataUrl, meImage),
            loadImage(youDataUrl, youImage),
          ]);

          // 캔버스 크기를 설정합니다. 두 이미지를 나란히 배치합니다.
          const devicePixelRatio = window.devicePixelRatio || 1;
          canvas.width = (meImage.width + youImage.width) * devicePixelRatio;
          canvas.height =
            Math.max(meImage.height, youImage.height) * devicePixelRatio;
          ctx.scale(devicePixelRatio, devicePixelRatio);

          // 두 이미지를 캔버스에 그립니다.
          ctx.drawImage(meImage, 0, 0);
          ctx.drawImage(youImage, meImage.width, 0);

          // 결합된 이미지의 Data URL을 가져옵니다.
          const combinedDataUrl = canvas.toDataURL("image/png");
          setCombinedImageSrc(combinedDataUrl);
          setIsLoading(false); // 로딩 완료 후 상태 변경
        } catch (err) {
          console.error("이미지 생성 중 오류가 발생했습니다.", err);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(generateImages);
    });
  }, []);

  return (
    <Container>
      <Header title={"결과 보기"} />
      <ResultItemContainer isLoading={isLoading}>
        <h4>이미지 로딩중 입니다.</h4>
        <ResultItem meRef={meRef} youRef={youRef} />
      </ResultItemContainer>
      {combinedImageSrc && (
        <ImageWrapper>
          <h4>이미지를 다운로드 하실 수 있습니다.</h4>
          <img src={combinedImageSrc} alt="Combined Result" />
        </ImageWrapper>
      )}
    </Container>
  );
};

export default Result;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  margin: 20px;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

// ResultItem을 visibility와 position 속성으로 숨기고 보이게 합니다.
const ResultItemContainer = styled.div<{ isLoading: boolean }>`
  h4 {
    text-align: center;
    margin-top: 20px;
  }
  visibility: ${(props) => (props.isLoading ? "visible" : "hidden")};
  position: ${(props) => (props.isLoading ? "relative" : "absolute")};
  opacity: ${(props) => (props.isLoading ? 1 : 0)};
  transition: opacity 0.5s ease;
`;
