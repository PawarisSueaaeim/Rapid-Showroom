import React from "react";
import classes from "@/style/components/common/form.module.css";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  alert?: string | null;
  onChange?: (value: any) => void;
  padding?: string;
};

export default function InputCustom({
  id,
  type,
  placeholder,
  value,
  alert,
  onChange,
  padding
}: Props) {
  return (
    <div>
      <input
        className={classes.input_custom}
        style={{
          padding: padding,
        }}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="tc-red fs-8px">{alert}</span>
    </div>
  );
}
