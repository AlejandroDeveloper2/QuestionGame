import { FaCoins } from "react-icons/fa6";
import { IoTimeOutline, IoHelpBuoyOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { formatSeconds } from "@utils/functions";

import { BadgeWithLabel } from "@components/index";

import { WinnerSvg, CheckSvg } from "@assets/index";
import { PlayerFinalStatistics, GameResultTitle } from "./GameOverWindow.style";

const GameOverWindow = (): JSX.Element => {
  const { quiz } = useQuizGameStore();
  const { match } = useQuizMatchStore();

  return (
    <>
      <GameResultTitle
        style={{
          color: "var(--green)",
        }}
      >
        {quiz.matchResult === "Correcta" ? "¡Felicitaciones" : "¡Ganancias de "}
        <span>{quiz.playerName}!</span>
      </GameResultTitle>
      {quiz.matchResult === "Correcta" ? <WinnerSvg /> : <CheckSvg />}

      <PlayerFinalStatistics>
        <li>
          <BadgeWithLabel
            id="badge-total-earns"
            label="Total Ganancias"
            Icon={FaCoins}
            style={{
              backgroundcolor: "var(--primary-color-base)",
              color: "var(--white)",
            }}
            value={
              window.parseInt(quiz.consolationAward) > 0
                ? "$" + quiz.consolationAward
                : "$" + String(match.accumulatedEarn)
            }
          />
        </li>
        <li>
          <BadgeWithLabel
            id="badge-total-time"
            label="Tiempo Total"
            Icon={IoTimeOutline}
            style={{
              backgroundcolor: "var(--gray)",
              color: "var(--white)",
            }}
            value={formatSeconds(match.timeTaken) + "s"}
          />
        </li>
        <li>
          <BadgeWithLabel
            id="badge-used-wildcards"
            label="Comodines usados"
            Icon={IoHelpBuoyOutline}
            style={{
              backgroundcolor: "var(--primary-color-100)",
              color: "var(--gray)",
            }}
            value={String(match.usedWildcards)}
          />
        </li>
      </PlayerFinalStatistics>
    </>
  );
};

export default GameOverWindow;
