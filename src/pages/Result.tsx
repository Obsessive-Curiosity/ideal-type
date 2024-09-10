import { useContext } from "react";
import DataItem from "../interfaces/DataItem";
import QuestionStateContext from "../contexts/QuestionStateContext";
import styled from "styled-components";
import Header from "../components/Header/index";
import html2canvas from "html2canvas";

const keyTranslations: { [key: string]: string } = {
  age: "나이",
  tendency: "성향",
  region: "사는 지역",
  clothingStyle: "옷스타일",
  eye: "눈매",
  hair: "머리 스타일",
  height: "키",
  lip: "입술",
  tattoo: "타투",
  mbti: "MBTI",
  beer: "음주",
  night: "밤문화",
  religion: "종교",
  smoking: "흡연",
};

const translateKeys = (obj: {
  [key: string]: string;
}): { [key: string]: string } =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyTranslations[key] ?? key, // 매핑된 한국어 키가 없으면 원래 키 사용
      value,
    ])
  );

const filterAndCleanData = (
  data: DataItem[],
  id: string
): Partial<DataItem>[] =>
  data
    .filter((item) => item.id === id) // id가 일치하는 객체 필터링
    .map(({ id, ...rest }) => rest); // id 속성 제거하고 나머지 속성 반환

const saveAsImage = (elementId) => {
  const element = document.getElementById(elementId);

  if (element) {
    html2canvas(element, {
      useCORS: true,
      backgroundColor: null, // 투명 배경 유지
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
    }).then((canvas) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 배경을 흰색으로 설정한 새로운 캔버스 생성
        const backgroundCanvas = document.createElement("canvas");
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        const backgroundCtx = backgroundCanvas.getContext("2d");
        if (backgroundCtx) {
          // 흰색 배경을 채우기
          backgroundCtx.fillStyle = "#ffffff";
          backgroundCtx.fillRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
          );

          // 원본 캔버스를 배경 위에 그리기
          backgroundCtx.drawImage(canvas, 0, 0);

          // 새로운 캔버스를 이미지로 저장
          const link = document.createElement("a");
          link.href = backgroundCanvas.toDataURL("image/png");
          link.download = "result_with_shadow.png";
          link.click();
        }
      }
    });
  }
};

const Result = () => {
  const { data } = useContext(QuestionStateContext);
  const ME = filterAndCleanData(data, "1");
  const YOU = filterAndCleanData(data, "2");

  return (
    <Cotainer>
      <Header title={"결과 보기"} />
      <DataList
        id="data-list-container-me"
        style={{ backgroundColor: "#ffffff" }}
      >
        <SectionTitle>ME</SectionTitle>
        {ME.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(([key, value]) => (
              <DataListItem key={key}>
                {key}:
                {Array.isArray(value) ? (
                  value.map((v, idx) => <Item key={idx}>{String(v)}</Item>)
                ) : (
                  <Item>{String(value)}</Item>
                )}
              </DataListItem>
            ))}
          </div>
        ))}
      </DataList>
      <Button onClick={() => saveAsImage("data-list-container-me")}>
        ME 이미지 저장
      </Button>

      <DataList
        id="data-list-container-you"
        style={{ backgroundColor: "#ffffff" }}
      >
        <SectionTitle>YOU</SectionTitle>
        {YOU.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(([key, value]) => (
              <DataListItem key={key}>
                {key}:
                {Array.isArray(value) ? (
                  value.map((v, idx) => <Item key={idx}>{String(v)}</Item>)
                ) : (
                  <Item>{String(value)}</Item>
                )}
              </DataListItem>
            ))}
          </div>
        ))}
      </DataList>
      <Button onClick={() => saveAsImage("data-list-container-you")}>
        YOU 이미지 저장
      </Button>
    </Cotainer>
  );
};

export default Result;

const Cotainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #694e99;
  padding: 10px;
  margin-bottom: 20px;
`;

const DataList = styled.div`
  padding: 0 20px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 박스 쉐도우 추가 */
  background-color: #ffffff; /* 배경색 흰색 */
  padding: 5px 20px;
`;

const DataListItem = styled.p`
  font-size: 18px;
  color: black;
  margin-bottom: 20px;

  &::before {
    content: "• ";
    color: #694e99;
    font-weight: bold;
  }
`;

const Item = styled.div`
  background-color: white;
  color: black;
  font-size: 12px;
  border-radius: 10px;
  padding: 4px 8px;
  display: inline-block; /* 글자 크기에 맞게 너비 조정 */
  margin-left: 10px; /* 키와 값 사이의 간격 추가 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 박스 쉐도우 추가 */
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const Button = styled.button`
  background-color: #694e99;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #5a3f7a;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #4a2e5b;
  }
`;
