import { CgRename } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { useForm } from "@hooks/index";

import { AddCategoryFormProps } from "@models/ComponentPropsModels";
import { AddCategoryFormData } from "@models/FormDataModel";
import useCategoryStore from "@zustand/categoryStore";

import { CustomForm } from "@components/index";

const AddCategoryForm = ({
  id,
  initialValues,
  mode,
  closeModal,
}: AddCategoryFormProps): JSX.Element => {
  const addCategory = useCategoryStore((state) => state.addCategory);
  const editCategory = useCategoryStore((state) => state.editCategory);

  const action = () => {
    if (mode === "add") addCategory(data);
    else if (mode === "edit" && id) editCategory(id, data);
    closeModal();
  };
  const { formRef, data, errors, handleChange, handleSubmit } =
    useForm<AddCategoryFormData>(initialValues, [], action);

  return (
    <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
      <CustomForm.FieldSet
        fieldSetStyle={{ width: { sm: 100, md: 100, lg: 500 } }}
      >
        <CustomForm.Input
          type="text"
          placeholder="Escribe el nombre de la categoría"
          label="Nombre de la categoría"
          name="name"
          value={data.name}
          Icon={CgRename}
          onChange={handleChange}
        />
      </CustomForm.FieldSet>
      <CustomForm.Button
        label={mode === "add" ? "Agregar categoría" : "Editar categoría"}
        title={mode === "add" ? "Agregar nueva categoría!" : "Guardar cambios!"}
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

export default AddCategoryForm;
