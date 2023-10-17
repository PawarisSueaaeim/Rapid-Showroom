import React from "react";
import classes from "@/style/components/common/form.module.css";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  value?: string;
  alert?: string;
  onChange?: (value: any) => void;
};

export default function InputCustom({
  id,
  type,
  placeholder,
  value,
  alert,
  onChange,
}: Props) {
  return (
    <div>
      <input
        className={classes.input_custom}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="tc-red fs-10px">{alert}</span>
    </div>
  );
}
