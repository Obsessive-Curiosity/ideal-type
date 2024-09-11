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
                <ItemTitle>{key}</ItemTitle>
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
                <ItemTitle>{key}</ItemTitle>
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
  background-color: white;
  padding: 0 20px;
  margin-top: 10px;
  padding: 5px 20px;
`;

const DataListItem = styled.div`
  position: relative;
  font-size: 12px;
  border: 1px solid #d5c9e6;
  border-radius: 10px;
  padding: 10px 3px;
  color: #694e99;
  margin-bottom: 20px;
`;

const ItemTitle = styled.div`
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: white;
  padding: 3px;
`;

const Item = styled.div`
  position: relative;
  background-color: white;
  color: black;
  font-size: 15px;
  border-radius: 10px;
  padding: 4px 8px;
  margin: 5px;
  display: inline-block; /* 글자 크기에 맞게 너비 조정 */
  margin-left: 10px; /* 키와 값 사이의 간격 추가 */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  white-space: nowrap; /* 줄바꿈 방지 */
  &:first-child {
    margin-left: 0;
  }
`;
