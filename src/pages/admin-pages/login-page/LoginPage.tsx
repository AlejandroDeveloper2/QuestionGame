import { ToastContainer } from "react-toastify";
import { IoLogInOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import { useForm, useLoader } from "@hooks/index";
import { validationSchema } from "./ValidationSchema";
import useAuthStore from "@zustand/authStore";

import { LoginFormData } from "@models/FormDataModel";
import {
  initialErrors,
  initialValues,
} from "@constants/form-initial-values/LoginInitialValues";

import {
  CustomForm,
  LoaderBar,
  LoadingWindow,
  Logo,
  Spinner,
} from "@components/index";

import { LoginFormContainer, PageContainer } from "./LoginPage.style";
import { IconIllustration1, IconIllustration2 } from "@assets/index";

const LoginPage = (): JSX.Element => {
  function action() {
    login(data);
  }
  const { login, isLoading } = useAuthStore();
  const { data, formRef, errors, handleChange, handleSubmit } =
    useForm<LoginFormData>(
      initialValues,
      initialErrors,
      validationSchema,
      action
    );
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
        <LoginFormContainer>
          <h1>Iniciar Sesión Admin</h1>
          {isLoading ? (
            <Spinner message="Validando usuario..." />
          ) : (
            <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
              <CustomForm.FieldSet
                fieldSetStyle={{ width: { sm: 100, md: 100, lg: 400 } }}
              >
                <CustomForm.Input
                  type="text"
                  placeholder="Escribe tu nombre de usuario"
                  label="Nombre de usuario"
                  name="username"
                  value={data.username}
                  errorMessage={errors.username.message}
                  Icon={FaRegUser}
                  onChange={handleChange}
                />
                <CustomForm.Input
                  type="password"
                  placeholder="Escribe tu contraseña"
                  label="Contraseña"
                  name="password"
                  value={data.password}
                  errorMessage={errors.password.message}
                  Icon={RiLockPasswordLine}
                  onChange={handleChange}
                />
              </CustomForm.FieldSet>
              <CustomForm.Button
                type="submit"
                label="Iniciar sesión"
                title="Ingresar al panel de admin!"
                onClick={() => {}}
                style={{
                  background: "var(--primary-color-200)",
                  color: "var(--gray)",
                  width: { sm: 300, md: 400, lg: 500 },
                  height: { sm: 78, md: 84, lg: 84 },
                }}
                Icon={IoLogInOutline}
              />
            </CustomForm>
          )}
        </LoginFormContainer>
      </PageContainer>
      {/* Toast */}
      <ToastContainer position="top-right" />
    </>
  );
};

export default LoginPage;
