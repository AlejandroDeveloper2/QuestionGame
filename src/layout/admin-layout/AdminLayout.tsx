/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useSWR from "swr";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useAnswerForm,
  useLoadRecords,
  useModal,
  useQuizMatchLoad,
} from "@hooks/index";
import { getQuiz } from "@services/questions.service";
import { getMatch } from "@services/match.service";
import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { initialValues } from "@constants/form-initial-values/CategoryFormInitialValues";
import { initialValues as questionInitialValues } from "@constants/form-initial-values/QuestionFormInitialValues";

import {
  Navigation,
  AddQuestionForm,
  AddCategoryForm,
} from "@components/index";
const Modal = lazy(() => import("@components/shared/modal/Modal"));

import { MainContainer } from "./AdminLayout.style";

const AdminLayout = (): JSX.Element => {
  useLoadRecords();
  useQuizMatchLoad();
  const { toggleForm, isAddAnswerFormOpen } = useAnswerForm();
  const { isModalVisible, closeModal, openModal } = useModal();
  const {
    isModalVisible: isSecondModalVisible,
    closeModal: closeSecondModal,
    openModal: openSecondModal,
  } = useModal();
  const location = useLocation();
  const { setQuiz } = useQuizGameStore();
  const { setMatch } = useQuizMatchStore();

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

  return (
    <MainContainer>
      <Modal
        modalTitle={
          isAddAnswerFormOpen
            ? "Agregar opción de respuesta"
            : "Agregar nueva pregunta"
        }
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        <AddQuestionForm
          mode="add"
          isAddAnswerFormOpen={isAddAnswerFormOpen}
          closeModal={closeModal}
          toggleForm={toggleForm}
          initialValues={questionInitialValues}
        />
      </Modal>
      <Modal
        modalTitle="Agregar nueva categoría"
        isModalVisible={isSecondModalVisible}
        closeModal={closeSecondModal}
        hasCloseButton
      >
        <AddCategoryForm
          mode="add"
          initialValues={initialValues}
          closeModal={closeSecondModal}
        />
      </Modal>
      <Outlet />
      <Navigation
        addingFunction={
          location.pathname === "/admin" ? openModal : openSecondModal
        }
      />
      {/* Toast */}
      <ToastContainer position="top-right" />
    </MainContainer>
  );
};

export default AdminLayout;
