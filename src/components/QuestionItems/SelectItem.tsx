import styled from "styled-components";

interface SelectItemProps {
  optList: string[];
}

function SelectItem({ optList }: SelectItemProps) {
  return (
    <Qselect>
      {optList.map((opt, idx) => (
        <option value={opt} key={idx}>
          {opt}
        </option>
      ))}
    </Qselect>
  );
}

export default SelectItem;

const Qselect = styled.select`
  all: unset;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: normal;
  justify-content: space-between;
  padding: 10px 16px;
  margin-bottom: 10px;
  border-radius: 16px;
  background-color: rgba(217, 217, 217, 0.12);
  color: rgb(51, 61, 75);
  width: 100%;
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기를 계산 */

  @media (max-width: 600px) {
    font-size: 15px; /* 모바일에서 폰트 크기 조정 */
  }
`;
