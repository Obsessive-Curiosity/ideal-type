import { createContext } from "react";
import DataItem from "../interfaces/DataItem";

interface QuestionStateContextType {
  data: DataItem[];
}
const QuestionStateContext = createContext<QuestionStateContextType>({
  data: [],
});

export default QuestionStateContext;
