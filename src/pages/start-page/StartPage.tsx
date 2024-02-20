import { FaRegUser, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useLoader, useForm } from "@hooks/index";
import { StartFormData } from "@models/FormDataModel";
import { startFormInitialValues } from "@constants/formsInitialValues";
import { validateUsername } from "@utils/formValidations";

import { CustomForm, LoaderBar, LoadingWindow, Logo } from "@components/index";

import { FormContainer, PageContainer } from "./StartPage.style";
import { IconIllustration1, IconIllustration2 } from "@assets/index";
import useQuizGameStore from "@zustand/quizGameStore";

const StartPage = (): JSX.Element => {
  const navigate = useNavigate();
  const setPlayerName = useQuizGameStore((state) => state.setPlayerName);

  const { formRef, data, errors, handleChange, handleSubmit } =
    useForm<StartFormData>(startFormInitialValues, [validateUsername], () => {
      setPlayerName(data.username);
      navigate("/quiz");
    });
  const { isScreenLoading, load } = useLoader();

  return (
    <>
      <LoadingWindow
        opacity={!isScreenLoading ? 0 : 1}
        isLoading={isScreenLoading}
      >
        <LoaderBar load={load} />
      </LoadingWindow>
      <PageContainer>
        <IconIllustration1 />
        <IconIllustration2 />
        <Logo
          width={{ sm: 200, md: 300, lg: 350 }}
          height={{ sm: 200, md: 300, lg: 350 }}
        />
        <FormContainer>
          <h1>¡Bienvenido!</h1>
          <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
            <CustomForm.FieldSet
              fieldSetStyle={{ width: { sm: 100, md: 100, lg: 500 } }}
            >
              <CustomForm.Input
                type="text"
                placeholder="Escribe el nombre del juagdor"
                label="Nombre del jugador"
                name="username"
                value={data.username}
                Icon={FaRegUser}
                onChange={handleChange}
              />
            </CustomForm.FieldSet>
            <CustomForm.Button
              label="Iniciar Quiz"
              title="Empezar Quiz!"
              onClick={() => {}}
              style={{
                background: "var(--primary-color-200)",
                color: "var(--gray)",
                width: { sm: 300, md: 400, lg: 500 },
                height: { sm: 78, md: 84, lg: 84 },
              }}
              Icon={FaPlay}
            />
            <CustomForm.ErrorBox errors={errors} />
          </CustomForm>
        </FormContainer>
      </PageContainer>
    </>
  );
};

export default StartPage;
