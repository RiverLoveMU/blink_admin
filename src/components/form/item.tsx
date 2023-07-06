import * as React from "react";
import { Field } from "rc-field-form";
import type { FieldProps } from "rc-field-form/es/Field";
import { useFormContext } from "./context";
import clsx from "clsx";

export interface FormItemProps extends FieldProps {
  /**
   * 标签的文本
   */
  label?: React.ReactNode;
  /**
   * 额外提示内容
   */
  extra?: React.ReactNode;
  /**
   * 是否只读
   * @desc 向子组件传递readonly参数，若子组件已传入readonly则被子组件的覆盖
   * @default false
   */
  readonly?: boolean;
  /**
   * 是否展示必填的星号
   * @desc 若不传则根据rules以及readonly判断是否添加星号
   */
  showRequired?: boolean;
  /**
   * 布局方式
   * @desc horizental水平排布，vertical竖直排布
   * @default horizental
   */
  layout?: "horizental" | "vertical";
  /**
   * 是否有下边框
   */
  bordered?: boolean;
  /**
   * 不带样式，为了表单联动包裹用
   * @default false
   */
  noStyle?: boolean;
  /**
   * 是否在item上展示错误信息
   */
  showErrors?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Item: React.FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    style,
    className,
    rules,
    readonly: itemReadonly,
    showErrors: itemShowErrors,
    bordered,
    extra,
    showRequired,
    layout = "horizental",
    noStyle = false,
    ...fieldProps
  } = props;

  const {
    type: formType,
    readonly: formReadonly,
    bordered: formBordered,
    showErrors: formShowErrors,
  } = useFormContext();

  const readonly = React.useMemo(() => {
    return itemReadonly ?? formReadonly ?? false;
  }, [itemReadonly, formReadonly]);

  const showErrors = React.useMemo(() => {
    return itemShowErrors ?? formShowErrors ?? false;
  }, [itemShowErrors, formShowErrors]);

  return (
    <Field rules={rules} {...fieldProps}>
      {(control, meta, context) => {
        const childNode =
          typeof children === "function"
            ? children(control, meta, context)
            : React.cloneElement(children as React.ReactElement, {
                readonly,
                ...(children as React.ReactElement).props,
                ...control,
              });

        if (noStyle) {
          return <>{childNode}</>;
        }

        const showDot = (() => {
          //若传入showRequired则根据该参数判断
          if (typeof showRequired === "boolean") {
            return showRequired;
          }
          //若只读则不显示星号
          if (readonly) {
            return false;
          }

          if (rules) {
            return rules.some((rule) => {
              if (
                rule &&
                typeof rule === "object" &&
                rule.required &&
                !rule.warningOnly
              ) {
                return true;
              }
              if (typeof rule === "function") {
                const ruleEntity = rule(context);
                return (
                  ruleEntity && ruleEntity.required && !ruleEntity.warningOnly
                );
              }
              return false;
            });
          }

          return false;
        })();

        return (
          <div
            style={style}
            className={clsx("mui-form-item", className, {
              "mui-form-item-vertial": layout === "vertical",
              "mui-form-item-card": formType === "card",
            })}
          >
            <div
              className={clsx("mui-form-item-inner", {
                "mui-form-item-bordered": bordered ?? formBordered ?? false,
              })}
            >
              <div
                className={clsx("mui-form-item-label", {
                  "mui-form-item-label-required": showDot,
                })}
              >
                <div className={"mui-form-item-label-inner"}>{label}</div>
                {Boolean(extra) && layout == "vertical" && (
                  <div
                    className={clsx(
                      "mui-form-item-extra",
                      "mui-form-item-extra-vertical"
                    )}
                  >
                    {extra}
                  </div>
                )}
              </div>
              <div className={"mui-form-item-control"}>
                <div className={"mui-form-item-control-inner"}>{childNode}</div>
                {showErrors && Boolean(meta.errors[0]) && (
                  <div className={"mui-form-item-error"}>{meta.errors[0]}</div>
                )}

                {Boolean(extra) && layout == "horizental" && (
                  <div
                    className={clsx(
                      "mui-form-item-extra",
                      "mui-form-item-extra-horizental"
                    )}
                  >
                    {extra}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default Item;
