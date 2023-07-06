import * as React from "react";

export type FormType = "card" | "full";

export interface FormContextProps {
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 表单基本样式类型
   * @description card左右间距为12,full左右间距为16
   * @default card
   */
  type?: FormType;
  /**
   * 是否有下边框
   */
  bordered?: boolean;
  /**
   * 是否在item上展示错误信息
   * @default true
   */
  showErrors?: boolean;
}

export const FormContext = React.createContext<FormContextProps>({
  readonly: false,
  type: "full",
  showErrors: true,
});

export const useFormContext = () => React.useContext(FormContext);
