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

import {
  useForm,
  useListInputControl,
  useMultiOptionInput,
} from "@hooks/index";
import useQuestionStore from "@zustand/questionStore";
import useCategoryStore from "@zustand/categoryStore";
import { validationSchema } from "./ValidationSchema";

import { AddQuestionFormData } from "@models/FormDataModel";
import { AddQuestionFormProps } from "@models/ComponentPropsModels";
import { Answer, Difficulty } from "@models/DataModels";
import { initialErrors } from "@constants/form-initial-values/QuestionFormInitialValues";

import { CustomForm, AddAnswerForm } from "@components/index";

const AddQuestionForm = ({
  id,
  initialValues,
  isAddAnswerFormOpen,
  mode,
  closeModal,
  toggleForm,
}: AddQuestionFormProps): JSX.Element => {
  const { addQuestion, editQuestion } = useQuestionStore();
  const categories = useCategoryStore((state) => state.categories);

  function action() {
    if (mode === "add") {
      addQuestion(data);
      clearOptionList();
    } else if (mode === "edit" && id) {
      editQuestion(id, data);
    }
    closeModal();
  }

  const { formRef, data, errors, updateFormData, handleChange, handleSubmit } =
    useForm<AddQuestionFormData>(
      initialValues,
      initialErrors,
      validationSchema,
      action
    );

  const { markOption } = useMultiOptionInput<Difficulty>(
    ["Basico", "Intermedio", "Experto"],
    "Basico",
    "difficulty",
    updateFormData
  );

  const { addOption, removeOption, clearOptionList } =
    useListInputControl<Answer>(
      initialValues.answers,
      "answers",
      updateFormData
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
          errorMessage={errors.name.message}
          onChange={handleChange}
        />
        <CustomForm.Input
          type="text"
          placeholder="Escribe el enunciado"
          label="Enunciado"
          name="questionBody"
          value={data.questionBody}
          Icon={CiTextAlignJustify}
          errorMessage={errors.questionBody.message}
          onChange={handleChange}
        />
        <CustomForm.ListInputControl
          label="Opciones de respuesta"
          name="answers"
          options={data.answers}
          errorMessage={errors.answers.message}
          toggleForm={toggleForm}
          removeOption={removeOption}
        />
        <CustomForm.Input
          type="number"
          placeholder="Escribe tiempo para responder"
          label="Tiempo para responder (segundos)"
          name="time"
          value={data.time}
          errorMessage={errors.time.message}
          Icon={IoTimeOutline}
          onChange={handleChange}
        />
        <CustomForm.Input
          type="number"
          placeholder="Escribe la recompensa"
          label="Recompensa"
          name="reward"
          value={data.reward}
          errorMessage={errors.reward.message}
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
          errorMessage={errors.category.message}
          onChange={handleChange}
        />
        <CustomForm.MultiOptionInput
          label="Dificultad"
          name="difficulty"
          options={["Basico", "Intermedio", "Experto"]}
          icons={[FaRegFaceGrinBeam, FaRegFaceMeh, FaRegFaceAngry]}
          selectedOption={data.difficulty}
          errorMessage={errors.difficulty.message}
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
    </CustomForm>
  );
};

export default AddQuestionForm;
