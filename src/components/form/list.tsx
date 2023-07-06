import * as React from "react";
import { List as RcFormList } from "rc-field-form";
import { ListProps as RcFormListProps } from "rc-field-form/lib/List";

export interface ListProps extends RcFormListProps {
  /**
   * 若list校验有error的回调
   */
  onError?: (errors: string[]) => void;
}

const List: React.FC<ListProps> = (props) => {
  const { children, onError, ...restProps } = props;

  return (
    <RcFormList {...restProps}>
      {(fields, operation, meta) => {
        if (meta.errors.length && onError) {
          onError(meta.errors);
        }

        return children?.(fields, operation, meta);
      }}
    </RcFormList>
  );
};

export default List;
