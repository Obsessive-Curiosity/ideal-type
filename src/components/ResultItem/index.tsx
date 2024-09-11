import QuestionStateContext from "../../contexts/QuestionStateContext";
import styled from "styled-components";
import DataItem from "../../interfaces/DataItem";
import { useContext } from "react";

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

const translateKeys = (obj: Partial<DataItem>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyTranslations[key] || key, // 매핑된 한국어 키가 없으면 원래 키 사용
      value ? String(value) : "", // 값이 undefined일 경우 빈 문자열로 처리
    ])
  );

const filterAndCleanData = (data: DataItem[], id: string) =>
  data.filter((item) => item.id === id).map(({ id, ...rest }) => rest);

interface ResultItemProps {
  meRef: React.RefObject<HTMLDivElement>;
  youRef: React.RefObject<HTMLDivElement>;
}

const ResultItem = ({ meRef, youRef }: ResultItemProps) => {
  const { data }: { data: DataItem[] } = useContext(QuestionStateContext);
  const ME = filterAndCleanData(data, "1");
  const YOU = filterAndCleanData(data, "2");

  return (
    <>
      <DataList ref={meRef}>
        <SectionTitle>ME</SectionTitle>
        {ME.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(([key, value]) => (
              <DataListItem key={key}>
                {key}:
                {Array.isArray(value)
                  ? value.map((v, idx) => <Item key={idx}>{String(v)}</Item>)
                  : value
                      .split(",")
                      .map((v, idx) => <Item key={idx}>{v.trim()}</Item>)}
              </DataListItem>
            ))}
          </div>
        ))}
      </DataList>
      <DataList ref={youRef}>
        <SectionTitle>YOU</SectionTitle>
        {YOU.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(([key, value]) => (
              <DataListItem key={key}>
                {key}:
                {Array.isArray(value)
                  ? value.map((v, idx) => <Item key={idx}>{String(v)}</Item>)
                  : value
                      .split(",")
                      .map((v, idx) => <Item key={idx}>{v.trim()}</Item>)}
              </DataListItem>
            ))}
          </div>
        ))}
      </DataList>
    </>
  );
};

export default ResultItem;

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
