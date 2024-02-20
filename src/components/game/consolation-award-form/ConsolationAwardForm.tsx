import { MdAttachMoney } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

import { consolationAwardFormInitialValues } from "@constants/formsInitialValues";
import { useForm } from "@hooks/index";
import { ConsolationAwardFormData } from "@models/FormDataModel";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { CustomForm } from "@components/index";

const ConsolationAwardForm = (): JSX.Element => {
  const { quiz, setConsolationAward } = useQuizGameStore();
  const { setConsolationAwardToAccumulatedEarn } = useQuizMatchStore();
  const action = () => {
    setConsolationAward(quiz.id, data);
    setConsolationAwardToAccumulatedEarn(String(data.consolationAward));
  };

  const { formRef, data, errors, handleChange, handleSubmit } =
    useForm<ConsolationAwardFormData>(
      consolationAwardFormInitialValues,
      [],
      action
    );
  return (
    <CustomForm formRef={formRef} handleSubmit={handleSubmit}>
      <CustomForm.FieldSet
        fieldSetStyle={{ width: { sm: 100, md: 100, lg: 500 } }}
      >
        <CustomForm.Input
          type="number"
          placeholder="Digita el valor del premio seguro"
          label="Premio seguro"
          name="consolationAward"
          value={data.consolationAward}
          Icon={MdAttachMoney}
          onChange={handleChange}
        />
      </CustomForm.FieldSet>
      <CustomForm.Button
        label="Conceder premio"
        title="Pagar premio"
        onClick={() => {}}
        style={{
          background: "var(--primary-color-base)",
          color: "var(--white)",
          width: { sm: 300, md: 400, lg: 500 },
          height: { sm: 78, md: 84, lg: 84 },
        }}
        Icon={TbMoneybag}
        type="submit"
      />
      <CustomForm.ErrorBox errors={errors} />
    </CustomForm>
  );
};

export default ConsolationAwardForm;
