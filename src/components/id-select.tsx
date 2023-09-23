import { Raw } from "../types";
import { Select } from "antd";
import React from "react";

// React自带的类型映射,拿到组件的Props
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

/**
 * value可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(+value)为true是，代表选择默认类型, 触发onChange(undefined)
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...rest } = props;
  return (
    <Select
      value={options?.length ? toNum(value) : 0}
      onChange={(value) => onChange?.(toNum(value) || undefined)}
      {...rest}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNum = (val: unknown) => (isNaN(Number(val)) ? 0 : Number(val));
