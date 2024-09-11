import { useEffect, useRef, useState } from "react";
import { toPng, toBlob } from "html-to-image";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const [combinedImageSrc, setCombinedImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateImages = async () => {
      if (meRef.current && youRef.current) {
        try {
          await document.fonts.ready;

          const meBlob = await toBlob(meRef.current);
          const youBlob = await toBlob(youRef.current);

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Canvas context is not available.");
          }

          const meImage = new Image();
          const youImage = new Image();

          const loadImage = (blob: Blob) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
              const image = new Image();
              image.onload = () => resolve(image);
              image.onerror = reject;
              image.src = URL.createObjectURL(blob);
            });
          };

          const [meImageLoaded, youImageLoaded] = await Promise.all([
            loadImage(meBlob),
            loadImage(youBlob),
          ]);

          const devicePixelRatio = window.devicePixelRatio || 1;
          canvas.width =
            (meImageLoaded.width + youImageLoaded.width) * devicePixelRatio;
          canvas.height =
            Math.max(meImageLoaded.height, youImageLoaded.height) *
            devicePixelRatio;
          ctx.scale(devicePixelRatio, devicePixelRatio);

          ctx.drawImage(meImageLoaded, 0, 0);
          ctx.drawImage(youImageLoaded, meImageLoaded.width, 0);

          const combinedBlob = await new Promise<Blob>((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          const url = URL.createObjectURL(combinedBlob);
          setCombinedImageSrc(url);
          setIsLoading(false);
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
    width: 100%;
  }
`;

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
