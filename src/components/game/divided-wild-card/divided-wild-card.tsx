import { FaDivide } from "react-icons/fa6";

import { DividedWildCardProps } from "@models/ComponentPropsModels";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { PopUpContainer } from "./divided-wild-card.style";

const TwoAnswersWildCard = ({
  isPopUpVisible,
}: DividedWildCardProps): JSX.Element => {
  const { selectedAnswers } = useQuizMatchStore();

  return (
    <PopUpContainer positionx={isPopUpVisible ? 1 : 0}>
      <FaDivide />
      <p>Selecciona hasta dos preguntas</p>
      <span>{selectedAnswers} / 2</span>
    </PopUpContainer>
  );
};

export default TwoAnswersWildCard;
