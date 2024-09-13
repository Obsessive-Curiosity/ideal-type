import { createContext } from "react";
import DataItem from "../interfaces/DataItem";

interface QuestionDispatchContextType {
  onCreate: (newData: DataItem) => void;
  onUpdate: (updatedData: DataItem) => void;
  onReset: () => void;
}
const QuestionDispatchContext = createContext<QuestionDispatchContextType>({
  onCreate: () => {}, // 기본값으로 빈 함수 설정
  onUpdate: () => {}, // 기본값으로 빈 함수 설정
  onReset: () => {}, // 기본값으로 빈 함수 설정
});

export default QuestionDispatchContext;
