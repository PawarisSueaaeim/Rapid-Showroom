import React from "react";
import classes from "./input.module.css";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  alert?: string | null;
  onChange?: (value: any) => void;
  padding?: string;
  helper?: any;
  disabled?: boolean;
};

export default function InputCustom({
  id,
  type,
  placeholder,
  value,
  helper,
  alert,
  onChange,
  padding,
  disabled,
}: Props) {
  return (
    <div>
      <input
        className={classes.input_custom}
        style={{
          padding: padding,
          textAlign: disabled ? "center" : "left",
        }}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span>{helper}</span>
      <span className="tc-red fs-8px">{alert}</span>
    </div>
  );
}
