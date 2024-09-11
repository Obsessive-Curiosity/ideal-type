import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";
import Footer from "../components/Footer/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const [meImageSrc, setMeImageSrc] = useState<string | null>(null);
  const [youImageSrc, setYouImageSrc] = useState<string | null>(null);

  const generateImage = async (
    ref: React.RefObject<HTMLDivElement>,
    setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (ref.current) {
      try {
        // DOM 요소를 이미지 데이터 URL로 변환
        const dataUrl = await toPng(ref.current);
        setImageSrc(dataUrl);
      } catch (err) {
        console.error("이미지 생성 중 오류가 발생했습니다.", err);
      }
    }
  };

  const handleGenerateImages = async () => {
    await generateImage(meRef, setMeImageSrc);
    await generateImage(youRef, setYouImageSrc);
  };

  return (
    <Container>
      <Header title={"결과 보기"} />
      <ResultItem meRef={meRef} youRef={youRef} />
      <Footer title={"이미지 저장하기"} onClick={handleGenerateImages} />
      {meImageSrc && (
        <ImageWrapper>
          <h2>Me Image</h2>
          <img src={meImageSrc} alt="Me Result" />
        </ImageWrapper>
      )}
      {youImageSrc && (
        <ImageWrapper>
          <h2>You Image</h2>
          <img src={youImageSrc} alt="You Result" />
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
