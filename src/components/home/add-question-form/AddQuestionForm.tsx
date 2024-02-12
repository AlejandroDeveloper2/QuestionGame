import { IoMdAdd } from "react-icons/io";
import { CgRename } from "react-icons/cg";
import { MdAttachMoney, MdOutlineCategory, MdEdit } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { CiTextAlignJustify } from "react-icons/ci";
import {
  FaRegFaceAngry,
  FaRegFaceGrinBeam,
  FaRegFaceMeh,
} from "react-icons/fa6";

import { useSpecialForm } from "@hooks/index";
import { AddQuestionFormData } from "@models/FormDataModel";
import { AddQuestionFormProps } from "@models/ComponentPropsModels";
import { Answer, Difficulty } from "@models/DataModels";
import { validateAnswerOptions } from "@utils/formValidations";

import useQuestionStore from "@zustand/questionStore";
import useCategoryStore from "@zustand/categoryStore";

import { CustomForm, AddAnswerForm } from "@components/index";

const AddQuestionForm = ({
  id,
  initialValues,
  isAddAnswerFormOpen,
  mode,
  closeModal,
  toggleForm,
}: AddQuestionFormProps): JSX.Element => {
  const addQuestion = useQuestionStore((state) => state.addQuestion);
  const editQuestion = useQuestionStore((state) => state.editQuestion);
  const categories = useCategoryStore((state) => state.categories);

  const action = () => {
    if (mode === "add") addQuestion(data);
    else if (mode === "edit" && id) editQuestion(id, data);
    closeModal();
  };

  const {
    formRef,
    data,
    errors,
    handleChange,
    handleSubmit,
    addOption,
    removeOption,
    markOption,
  } = useSpecialForm<AddQuestionFormData, Answer, Difficulty>(
    initialValues,
    [validateAnswerOptions],
    action,
    { inputKey: "answers", options: initialValues.answers },
    {
      inputKey: "difficulty",
      options: ["Basico", "Intermedio", "Experto"],
      defaultOption: "Basico",
    },
    mode
  );

  if (isAddAnswerFormOpen)
    return <AddAnswerForm addOption={addOption} toggleForm={toggleForm} />;
  return (
    <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
      <CustomForm.FieldSet
        fieldSetStyle={{ width: { sm: 100, md: 100, lg: 1100 } }}
      >
        <CustomForm.Input
          type="text"
          placeholder="Escribe el nombre de la pregunta"
          label="Nombre"
          name="name"
          value={data.name}
          Icon={CgRename}
          onChange={handleChange}
        />
        <CustomForm.Input
          type="text"
          placeholder="Escribe el enunciado"
          label="Enunciado"
          name="questionBody"
          value={data.questionBody}
          Icon={CiTextAlignJustify}
          onChange={handleChange}
        />
        <CustomForm.ListInputControl
          label="Opciones de respuesta"
          name="answers"
          options={data.answers}
          toggleForm={toggleForm}
          removeOption={removeOption}
        />
        <CustomForm.Input
          type="number"
          placeholder="Escribe tiempo para responder"
          label="Tiempo para responder (segundos)"
          name="time"
          value={data.time}
          Icon={IoTimeOutline}
          onChange={handleChange}
        />
        <CustomForm.Input
          type="number"
          placeholder="Escribe la recompensa"
          label="Recompensa"
          name="reward"
          value={data.reward}
          Icon={MdAttachMoney}
          onChange={handleChange}
        />
        <CustomForm.Select
          label="Categoría"
          name="category"
          inputKey="name"
          value={data.category}
          Icon={MdOutlineCategory}
          options={categories}
          onChange={handleChange}
        />
        <CustomForm.MultiOptionInput
          label="Dificultad"
          name="difficulty"
          options={["Basico", "Intermedio", "Experto"]}
          icons={[FaRegFaceGrinBeam, FaRegFaceMeh, FaRegFaceAngry]}
          selectedOption={data.difficulty}
          markOption={markOption}
        />
      </CustomForm.FieldSet>
      <CustomForm.Button
        label={mode === "add" ? "Agregar pregunta" : "Editar pregunta"}
        title={
          mode === "add" ? "Agregar pregunta al banco!" : "Guardar cambios!"
        }
        onClick={() => {}}
        style={{
          background: "var(--primary-color-base)",
          color: "var(--white)",
          width: { sm: 300, md: 400, lg: 500 },
          height: { sm: 78, md: 84, lg: 84 },
        }}
        Icon={mode === "add" ? IoMdAdd : MdEdit}
        type="submit"
      />
      <CustomForm.ErrorBox errors={errors} />
    </CustomForm>
  );
};

export default AddQuestionForm;
