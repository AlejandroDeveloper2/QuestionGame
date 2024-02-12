import { useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";
import { IoTimeOutline, IoHelpBuoyOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { formatSeconds } from "@utils/functions";

import { BadgeWithLabel, Spinner } from "@components/index";

import { WinnerSvg, XSvg } from "@assets/index";
import { PlayerFinalStatistics, GameResultTitle } from "./GameOverWindow.style";

const GameOverWindow = (): JSX.Element => {
  const location = useLocation();
  const { quiz, isLoading } = useQuizGameStore();
  const { accumulatedEarn, usedWildcards, timeTaken } = useQuizMatchStore();

  const playerName = location.pathname.split("/")[2].replace("%20", " ");

  return isLoading ? (
    <Spinner
      message="Cargando resultados finales..."
      color="var(--primary-color-base)"
    />
  ) : (
    <>
      <GameResultTitle
        style={{
          color: quiz.matchResult === "Correcta" ? "var(--gray)" : "var(--red)",
        }}
      >
        {quiz.matchResult === "Correcta"
          ? "¡Felicitaciones"
          : "¡Upps perdiste "}
        <span>{playerName}!</span>
      </GameResultTitle>
      {quiz.matchResult === "Correcta" ? <WinnerSvg /> : <XSvg />}

      <PlayerFinalStatistics>
        <li>
          <BadgeWithLabel
            label="Total Ganancias"
            Icon={FaCoins}
            style={{
              backgroundColor: "var(--primary-color-base)",
              color: "var(--white)",
            }}
            value={String(accumulatedEarn)}
          />
        </li>
        <li>
          <BadgeWithLabel
            label="Tiempo Total"
            Icon={IoTimeOutline}
            style={{
              backgroundColor: "var(--gray)",
              color: "var(--white)",
            }}
            value={formatSeconds(timeTaken) + "s"}
          />
        </li>
        <li>
          <BadgeWithLabel
            label="Comodines usados"
            Icon={IoHelpBuoyOutline}
            style={{
              backgroundColor: "var(--primary-color-100)",
              color: "var(--gray)",
            }}
            value={String(usedWildcards)}
          />
        </li>
      </PlayerFinalStatistics>
    </>
  );
};

export default GameOverWindow;