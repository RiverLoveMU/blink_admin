import * as React from "react";
import RcForm, { FormProps as RcFormProps, FormProvider } from "rc-field-form";
import clsx from "clsx";
import { FormContext, FormContextProps } from "./context";
import Item from "./item";
import List from "./list";
import useForm from "./useForm";
import "./style/index";

export interface FormProps<Values = any>
  extends RcFormProps<Values>,
    FormContextProps {}

export interface FormInterface {
  <Values = any>(
    props: React.PropsWithChildren<FormProps<Values>>
  ): React.ReactElement;
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
  FormProvider: typeof FormProvider;
}

export const Form: FormInterface = (props) => {
  const {
    readonly,
    form,
    className,
    children,
    type = "full",
    bordered,
    showErrors = true,
    ...restFormProps
  } = props;
  const [customForm] = useForm(form);

  const formContextValue = React.useMemo<FormContextProps>(
    () => ({
      readonly,
      type,
      bordered,
      showErrors,
    }),
    [readonly, type, bordered, showErrors]
  );

  return (
    <FormContext.Provider value={formContextValue}>
      <RcForm
        className={clsx("mui-form", className)}
        component={"div"}
        form={customForm}
        {...restFormProps}
      >
        {children}
      </RcForm>
    </FormContext.Provider>
  );
};

Form.useForm = useForm;
Form.Item = Item;
Form.List = List;
Form.FormProvider = FormProvider;
