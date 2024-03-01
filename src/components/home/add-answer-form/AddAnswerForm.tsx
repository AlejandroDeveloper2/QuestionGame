import { CgRename } from "react-icons/cg";
import { MdOutlineCancel, MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

import { AddAnswerFormProps } from "@models/ComponentPropsModels";
import { AddAnswerFormData } from "@models/FormDataModel";
import {
  initialValues,
  initialErrors,
} from "@constants/form-initial-values/AnswerFormInitialValues";

import { useForm, useMultiOptionInput } from "@hooks/index";
import { validationSchema } from "./ValidationSchema";

import { CustomForm } from "@components/index";

const AddAnswerForm = ({
  addOption,
  toggleForm,
}: AddAnswerFormProps): JSX.Element => {
  const action = () => {
    addOption(data);
    toggleForm();
  };

  const { formRef, data, errors, updateFormData, handleChange, handleSubmit } =
    useForm<AddAnswerFormData>(
      initialValues,
      initialErrors,
      validationSchema,
      action
    );

  const { markOption } = useMultiOptionInput<boolean>(
    [true, false],
    false,
    "isCorrectAnswer",
    updateFormData
  );

  return (
    <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
      <CustomForm.FieldSet
        fieldSetStyle={{ width: { sm: 100, md: 100, lg: 380 } }}
      >
        <CustomForm.Input
          type="text"
          placeholder="Escribe el enunciado"
          label="Respuesta"
          name="answerText"
          value={data.answerText}
          Icon={CgRename}
          errorMessage={errors.answerText.message}
          onChange={handleChange}
        />
        <CustomForm.MultiOptionInput
          label="¿Respuesta Correcta?"
          name="isCorrectAnswer"
          options={[true, false]}
          icons={[FaCheck, MdClose]}
          selectedOption={data.isCorrectAnswer}
          markOption={markOption}
          errorMessage={errors.isCorrectAnswer.message}
        />
      </CustomForm.FieldSet>
      <CustomForm.Button
        label="Agregar"
        title="Agregar opción respuesta!"
        onClick={() => {}}
        style={{
          background: "var(--primary-color-base)",
          color: "var(--white)",
          width: { sm: 300, md: 400, lg: 500 },
          height: { sm: 78, md: 84, lg: 84 },
        }}
        Icon={IoMdAdd}
        type="submit"
      />
      <CustomForm.Button
        label="Cancelar"
        title="Volver a la pregunta!"
        onClick={toggleForm}
        style={{
          background: "var(--light-gray)",
          color: "var(--gray)",
          width: { sm: 300, md: 400, lg: 500 },
          height: { sm: 78, md: 84, lg: 84 },
        }}
        Icon={MdOutlineCancel}
        type="button"
      />
    </CustomForm>
  );
};

export default AddAnswerForm;
