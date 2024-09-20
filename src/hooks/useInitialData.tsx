import { useContext } from "react";
import DataItem from "../interfaces/DataItem";
import QuestionStateContext from "../contexts/QuestionStateContext";

const useInitialData = (type: string, itemName: keyof DataItem): string[] => {
  const { data } = useContext(QuestionStateContext);
  const hasMe = data.some((item: DataItem) => item.type === "ME");
  const hasYou = data.some((item: DataItem) => item.type === "YOU");
  const hasData = type === "ME" ? hasMe : hasYou;

  if (hasData) {
    const MeData = data
      .filter((item: DataItem) => item.type === "ME")
      .flatMap((item: DataItem) => item[itemName]);
    const YouData = data
      .filter((item: DataItem) => item.type === "YOU")
      .flatMap((item: DataItem) => item[itemName]);
    return type === "ME" ? MeData : YouData;
  } else {
    switch (itemName) {
      case "region":
        return type === "ME" ? ["서울"] : [];
      case "mbti":
        return ["____"];
      default:
        return [];
    }
  }
};

export default useInitialData;
