/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useSWR from "swr";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAnswerForm, useLoadRecords, useModal } from "@hooks/index";
import {
  addCategoryFormInitialValues,
  addQuestionFormInitialValues,
} from "@constants/formsInitialValues";
import useQuizGameStore from "@zustand/quizGameStore";
import { getQuiz } from "@services/questions.service";

import {
  Navigation,
  AddQuestionForm,
  AddCategoryForm,
} from "@components/index";
const Modal = lazy(() => import("@components/shared/modal/Modal"));

import { MainContainer } from "./AdminLayout.style";

const AdminLayout = (): JSX.Element => {
  const setQuiz = useQuizGameStore((state) => state.setQuiz);
  useSWR("api/collections/quiz/records", getQuiz, {
    refreshInterval: 100,
    onSuccess: (quiz) => {
      setQuiz(quiz);
    },
  });
  useLoadRecords();
  const { toggleForm, isAddAnswerFormOpen } = useAnswerForm();
  const { isModalVisible, closeModal, openModal } = useModal();
  const {
    isModalVisible: isSecondModalVisible,
    closeModal: closeSecondModal,
    openModal: openSecondModal,
  } = useModal();
  const location = useLocation();

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
          initialValues={addQuestionFormInitialValues}
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
          initialValues={addCategoryFormInitialValues}
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
