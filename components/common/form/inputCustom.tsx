import React from "react";
import classes from "@/style/components/common/form.module.css";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: any) => void;
};

export default function InputCustom({
  id,
  type,
  placeholder,
  value,
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
    </div>
  );
}
