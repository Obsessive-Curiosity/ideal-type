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

const translateKeys = (obj: Omit<DataItem, "id">): Record<string, string[]> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyTranslations[key] || key,
      value,
    ])
  );

const filterData = (data: DataItem[], id: string) => {
  const findDataWithId = (item: DataItem) => item.id === id;
  const deleteId = ({ id, ...rest }: DataItem) => rest;
  return data.filter(findDataWithId).map(deleteId);
};

interface ResultItemProps {
  meRef: React.RefObject<HTMLDivElement>;
  youRef: React.RefObject<HTMLDivElement>;
}

const ResultItem = ({ meRef, youRef }: ResultItemProps) => {
  const { data } = useContext(QuestionStateContext) as { data: DataItem[] };
  const ME = filterData(data, "1");
  const YOU = filterData(data, "2");

  return (
    <>
      <DataList ref={meRef}>
        <SectionTitle>ME</SectionTitle>
        {ME.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(([key, value]) => (
              <DataListItem key={key}>
                <ItemTitle>{key}</ItemTitle>
                {value.map((v, idx) => (
                  <Item key={idx}>{v}</Item>
                ))}
              </DataListItem>
            ))}
          </div>
        ))}
      </DataList>
      <DataList ref={youRef}>
        <SectionTitle>YOU</SectionTitle>
        {YOU.map((item, index) => (
          <div key={index}>
            {Object.entries(translateKeys(item)).map(
              ([key, value]: [string, string[]]) => (
                <DataListItem key={key}>
                  <ItemTitle>{key}</ItemTitle>
                  {value.map((v, idx) => (
                    <Item key={idx}>{v}</Item>
                  ))}
                </DataListItem>
              )
            )}
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
  top: -13px;
  left: 12px;
  background-color: white;
  padding: 0 3px;
  font-size: 16px;
`;

const Item = styled.div`
  background-color: #c09cff33;
  color: black;
  font-size: 20px;
  border-radius: 8px;
  padding: 4px 8px;
  margin-top: 7px;
  display: inline-block;
  margin-left: 10px;
  white-space: nowrap;
  &:first-child {
    margin-left: 0;
  }
`;
