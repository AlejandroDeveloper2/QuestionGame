import useSWR from "swr";
import { Outlet, useLocation } from "react-router-dom";

import { FaHourglass, FaCoins } from "react-icons/fa";
import { FaRegFaceSmile, FaRegFaceMeh, FaRegFaceAngry } from "react-icons/fa6";

import { getQuiz } from "@services/questions.service";
import { useQuizMatchLoad, useTimer } from "@hooks/index";
import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { BadgeBase, BadgeWithLabel, Header, Spinner } from "@components/index";

import { MainContainer } from "./PlayerLayout.style";
import { TitleContainer } from "@components/shared/header/Header.style";

const PlayerLayout = (): JSX.Element => {
  const location = useLocation();
  const { setQuiz, isLoading } = useQuizGameStore();
  useSWR("api/collections/quiz/records", getQuiz, {
    onSuccess: (quiz) => {
      setQuiz(quiz);
    },
    refreshInterval: 100,
  });

  useQuizMatchLoad();

  const { seconds } = useTimer();
  const {
    accumulatedEarn,
    currentQuestion,
    randomQuestions,
    currentQuestionIndex,
  } = useQuizMatchStore();

  const playerName = location.pathname.split("/")[2].replace("%20", " ");

  return (
    <MainContainer>
      <Header
        style={{
          height: { sm: 400, md: 170, lg: 170 },
          direction: { sm: "column", md: "row", lg: "row" },
        }}
      >
        <div id="difficulty-badge">
          <BadgeBase
            style={{
              backgroundcolor:
                currentQuestion?.difficulty === "Basico"
                  ? "var(--green)"
                  : currentQuestion?.difficulty === "Intermedio"
                  ? "var(--orange)"
                  : "var(--red)",
              color: "var(--white)",
            }}
            Icon={
              currentQuestion?.difficulty === "Basico"
                ? FaRegFaceSmile
                : currentQuestion?.difficulty === "Intermedio"
                ? FaRegFaceMeh
                : FaRegFaceAngry
            }
            value={currentQuestion?.difficulty}
          />
        </div>
        {isLoading ? (
          <Spinner color="var(--primary-color-base)" />
        ) : (
          <>
            <BadgeWithLabel
              label="Tiempo restante"
              style={{ backgroundcolor: "var(--gray)", color: "var(--white)" }}
              Icon={FaHourglass}
              value={seconds + "s"}
            />

            <TitleContainer>
              <h1>{`Pregunta ${currentQuestionIndex + 1}/${
                randomQuestions.length
              }`}</h1>

              <p>
                <span>Bienvenido:</span>
                {playerName ? playerName : "Sin Nombre"}
              </p>
            </TitleContainer>

            <BadgeWithLabel
              label="Dinero acumulado"
              style={{
                backgroundcolor: "var(--primary-color-base)",
                color: "var(--white)",
              }}
              Icon={FaCoins}
              value={"$" + String(accumulatedEarn)}
            />
          </>
        )}
      </Header>
      <Outlet />
    </MainContainer>
  );
};

export default PlayerLayout;
