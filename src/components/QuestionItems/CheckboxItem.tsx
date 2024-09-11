import styled from "styled-components";
import OPT_CHECKBOX from "../../constants/OPT_CHECKBOX";

interface CheckboxItemProps {
  item: string;
  type: typeof OPT_CHECKBOX.SINGLE | typeof OPT_CHECKBOX.MULTI;
  isChecked: boolean;
  onChange: () => void;
}

const CheckboxItem = ({
  item,
  type,
  isChecked,
  onChange,
}: CheckboxItemProps) => {
  return (
    <QItem>
      {item}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={type === OPT_CHECKBOX.SINGLE && isChecked && !isChecked} // 싱글 선택일 때 체크된 경우 비활성화
      />
    </QItem>
  );
};

export default CheckboxItem;

const QItem = styled.label`
  width: 100%;
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

  input[type="checkbox"] {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 7px solid #999;
    appearance: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  input[type="checkbox"]:checked {
    border-color: #694e99;
  }

  @media (max-width: 600px) {
    font-size: 15px; /* 모바일에서 폰트 크기 조정 */
  }
`;
