import { GrSearch } from "react-icons/gr";
import {
  MdRocketLaunch,
  MdOutlineAccessTime,
  MdOutlineCategory,
} from "react-icons/md";
import { FaRegCircleQuestion, FaPowerOff } from "react-icons/fa6";
import { FaRegStar, FaCoins } from "react-icons/fa";

import useQuestionStore from "@zustand/questionStore";
import { useModal, useSearch } from "@hooks/index";
import { Question } from "@models/DataModels";
import useQuizGameStore from "@zustand/quizGameStore";

import {
  AdminQuizControls,
  ButtonIconOnly,
  ButtonWithIcon,
  CardList,
  Empty,
  Header,
  Input,
  Modal,
  Spinner,
} from "@components/index";

import { TitleContainer } from "@components/shared/header/Header.style";
import useAuthStore from "@zustand/authStore";

const HomePage = (): JSX.Element => {
  const questions = useQuestionStore((state) => state.questions);
  const isLoading = useQuestionStore((state) => state.isLoading);
  const { searchValue, records, handleSearch } = useSearch<Question>(
    questions,
    "name"
  );
  const quizStore = useQuizGameStore();
  const logout = useAuthStore((state) => state.logout);

  const { closeModal, openModal } = useModal();

  return (
    <>
      <Modal
        isModalVisible={quizStore.quiz.isQuizStarted}
        closeModal={closeModal}
        modalTitle="Controles del Quiz"
      >
        <AdminQuizControls />
      </Modal>
      <Header
        style={{
          height: { sm: 344, md: 300, lg: 300 },
          direction: { sm: "column", md: "column", lg: "column" },
        }}
      >
        <ButtonIconOnly
          type="button"
          title="Cerrar sesión!"
          onClick={logout}
          style={{
            background: "var(--white)",
            color: "var(--primary-color-base)",
            width: { sm: 60, md: 60, lg: 70 },
            height: { sm: 60, md: 60, lg: 70 },
          }}
          Icon={FaPowerOff}
        />
        <TitleContainer>
          <h1>Panel de administración</h1>
        </TitleContainer>
        <Input
          type="text"
          placeholder="Ejemplo: Pregunta 1"
          label="Buscar pregunta"
          name="question"
          value={searchValue}
          Icon={GrSearch}
          errorMessage=""
          onChange={handleSearch}
        />
        <ButtonWithIcon
          label="Comenzar quiz"
          title="Ejecutar quiz!"
          onClick={() => {
            openModal();
            quizStore.startQuiz(quizStore.quiz.id, questions.length);
          }}
          style={{
            background: "var(--primary-color-900)",
            color: "var(--white)",
            width: { sm: 300, md: 400, lg: 400 },
            height: { sm: 78, md: 88, lg: 88 },
          }}
          Icon={MdRocketLaunch}
        />
      </Header>
      <h2 style={{ marginTop: "var(--spacing-xl)" }}>
        Banco de preguntas ({records.length})
      </h2>
      {isLoading ? (
        <Spinner message="Cargando preguntas..." />
      ) : (
        <CardList>
          {records.length === 0 ? (
            <Empty />
          ) : (
            records.map((question) => (
              <CardList.Card
                key={question.id}
                Icon={FaRegCircleQuestion}
                title={question.name}
                id={question.id}
                type="question"
                data={question}
              >
                <CardList.Card.Item
                  Icon={FaRegStar}
                  itemTitle="Dificultad"
                  itemValue={question.difficulty}
                />
                <CardList.Card.Item
                  Icon={MdOutlineAccessTime}
                  itemTitle="Tiempo"
                  itemValue={question.time}
                />
                <CardList.Card.Item
                  Icon={FaCoins}
                  itemTitle="Recompensa"
                  itemValue={question.reward}
                />
                <CardList.Card.Item
                  Icon={MdOutlineCategory}
                  itemTitle="Categoría"
                  itemValue={question.category}
                />
              </CardList.Card>
            ))
          )}
        </CardList>
      )}
    </>
  );
};

export default HomePage;
