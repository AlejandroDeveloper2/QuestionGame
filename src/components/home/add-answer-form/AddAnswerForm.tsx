import { CgRename } from "react-icons/cg";
import { MdOutlineCancel, MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { addAnswerFormInitialValues } from "@constants/formsInitialValues";
import { AddAnswerFormProps } from "@models/ComponentPropsModels";
import { AddAnswerFormData } from "@models/FormDataModel";

import { useComposedForm } from "@hooks/index";

import { CustomForm } from "@components/index";
import { IoMdAdd } from "react-icons/io";

const AddAnswerForm = ({
  addOption,
  toggleForm,
}: AddAnswerFormProps): JSX.Element => {
  const action = () => {
    addOption(data);
    toggleForm();
  };

  const { formRef, data, errors, handleChange, handleSubmit, markOption } =
    useComposedForm<AddAnswerFormData, boolean>(
      addAnswerFormInitialValues,
      [],
      action,
      {
        options: [true, false],
        defaultOption: false,
        inputKey: "isCorrectAnswer",
      }
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
          onChange={handleChange}
        />
        <CustomForm.MultiOptionInput
          label="¿Respuesta Correcta?"
          name="isCorrectAnswer"
          options={[true, false]}
          icons={[FaCheck, MdClose]}
          selectedOption={data.isCorrectAnswer}
          markOption={markOption}
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
      <CustomForm.ErrorBox errors={errors} />
    </CustomForm>
  );
};

export default AddAnswerForm;
