import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import styled from "styled-components";
import Header from "../components/Header/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const [meImageSrc, setMeImageSrc] = useState<string | null>(null);
  const [youImageSrc, setYouImageSrc] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const generateImages = async () => {
      if (meRef.current && youRef.current) {
        try {
          const meDataUrl = await toPng(meRef.current, {});
          const youDataUrl = await toPng(youRef.current, {});
          setMeImageSrc(meDataUrl);
          setYouImageSrc(youDataUrl);
          setIsHidden(true); // 이미지 생성 완료 후 ResultItem 숨기기
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
      <ResultItemContainer isHidden={isHidden}>
        <ResultItem meRef={meRef} youRef={youRef} />
      </ResultItemContainer>
      {meImageSrc && (
        <ImageWrapper>
          <h2>이미지를 다운로드 하실 수 있습니다.</h2>
          <img src={meImageSrc} alt="Me Result" />
        </ImageWrapper>
      )}
      {youImageSrc && (
        <ImageWrapper>
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

// ResultItem을 display 속성으로 숨기고 보이게 합니다.
const ResultItemContainer = styled.div<{ isHidden: boolean }>`
  display: ${(props) => (props.isHidden ? "none" : "block")};
`;
