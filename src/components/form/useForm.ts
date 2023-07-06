import * as React from "react";
import { useForm as useRcForm } from "rc-field-form";
import type { FormInstance } from "rc-field-form/es/interface";

const useForm = <Values = any>(
  form?: FormInstance<Values>
): [FormInstance<Values>] => {
  const [rcForm] = useRcForm();

  const customForm = React.useMemo(() => {
    return form ?? rcForm;
  }, [form, rcForm]);

  return [customForm];
};

export default useForm;
