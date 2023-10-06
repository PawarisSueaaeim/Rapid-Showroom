import React from "react";
import { FaSistrix } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  title: string;
  color: string;
  bgColor: string;
  border?: string;
  boxShadow?: boolean;
  outline?: boolean;
  fontSize?: number;
  fontWeight?: number;
  height?: number;
  marginX?: number;
  paddingX?: number;
  icon?: string;
};

export default function ButtonCapsule({
  disabled,
  title,
  color,
  bgColor,
  border,
  boxShadow,
  outline,
  fontSize,
  fontWeight,
  height,
  marginX,
  paddingX,
  icon,
}: Props) {
  
  const renderIcon = (icon: string | undefined) => {
    switch (icon) {
      case "search":
        return <FaSistrix style={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: disabled ? "gray" : bgColor,
          border: border ? border : "none",
          borderRadius: "28px",
          boxShadow: boxShadow ? "0 0 10px rgba(0,0,0,0.1)" : "none",
          width: "100%",
          marginInline: marginX,
          paddingInline: paddingX,
          height: height,
          fontSize: fontSize,
          fontWeight: fontWeight ? fontWeight : 300,
          color: color,
          textAlign: "center",
          textDecoration: "none",
          outline: outline ? "" : "none",
          cursor: "pointer",
        }}
      >
        <p className="fs-14px fw-200 m-4">{title}</p>
        {renderIcon(icon)}
      </button>
    </div>
  );
}
