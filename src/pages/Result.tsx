import styled from "styled-components";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import ResultItem from "../components/ResultItem/index";

const Result = () => {
  const meRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!meRef.current) return;

    try {
      const div = meRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
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
