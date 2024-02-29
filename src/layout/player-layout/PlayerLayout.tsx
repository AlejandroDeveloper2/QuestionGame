/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import useSWR from "swr";

import { FaHourglass, FaCoins } from "react-icons/fa";
import { FaRegFaceSmile, FaRegFaceMeh, FaRegFaceAngry } from "react-icons/fa6";

import { usePlayGameSounds, useQuizMatchLoad, useTimer } from "@hooks/index";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { getMatch } from "@services/match.service";
import { getQuiz } from "@services/questions.service";
import useQuizGameStore from "@zustand/quizGameStore";

import { BadgeBase, BadgeWithLabel, Header } from "@components/index";

import { MainContainer } from "./PlayerLayout.style";
import { TitleContainer } from "@components/shared/header/Header.style";

const PlayerLayout = (): JSX.Element => {
  useQuizMatchLoad();
  usePlayGameSounds();
  const { match, setMatch } = useQuizMatchStore();
  const { setQuiz, quiz } = useQuizGameStore();

  useSWR("api/collections/quiz/records", getQuiz, {
    refreshInterval: 100,
    onSuccess: (quiz) => {
      setQuiz(quiz);
    },
  });
  useSWR("api/collections/match/records", getMatch, {
    refreshInterval: 100,
    onSuccess: (match) => {
      setMatch(match);
    },
  });
  const { seconds } = useTimer();

  return (
    <MainContainer>
      <Header
        style={{
          height: { sm: 150, md: 180, lg: 180 },
          direction: { sm: "row", md: "row", lg: "row" },
        }}
      >
        <BadgeBase
          id="difficulty-badge"
          style={{
            backgroundcolor:
              match.currentQuestion?.difficulty === "Basico"
                ? "var(--green)"
                : match.currentQuestion?.difficulty === "Intermedio"
                ? "var(--orange)"
                : "var(--red)",
            color: "var(--white)",
          }}
          Icon={
            match.currentQuestion?.difficulty === "Basico"
              ? FaRegFaceSmile
              : match.currentQuestion?.difficulty === "Intermedio"
              ? FaRegFaceMeh
              : FaRegFaceAngry
          }
          value={match.currentQuestion?.difficulty}
        />

        <BadgeWithLabel
          id="badge-time"
          label="Tiempo restante"
          style={{
            backgroundcolor: "var(--gray)",
            color: "var(--white)",
          }}
          Icon={FaHourglass}
          value={seconds + "s"}
        />

        <TitleContainer id="title-container">
          <h1>{`${match.currentQuestionIndex + 1}/${
            match?.randomQuestions?.length
          }`}</h1>

          <p>
            <span>Bienvenido:</span>
            {quiz.playerName ? quiz.playerName : "Sin Nombre"}
          </p>
        </TitleContainer>

        <BadgeWithLabel
          id="badge-money"
          label="Dinero acumulado"
          style={{
            backgroundcolor: "var(--primary-color-base)",
            color: "var(--white)",
            padding: "var(--spacing-md)",
            fontsize: "var(--font-size-3xl)",
          }}
          Icon={FaCoins}
          value={"$" + String(match.accumulatedEarn)}
        />
      </Header>
      <Outlet />
    </MainContainer>
  );
};

export default PlayerLayout;
