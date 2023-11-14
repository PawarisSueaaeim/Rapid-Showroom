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
  onClick?: () => void;
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
  onClick,
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
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: disabled ? "gray" : bgColor,
          border: border ? border : "none",
          borderRadius: "28px",
          boxShadow: boxShadow ? "1px 1px 2px 0.5px rgba(0,0,0,0.5)" : "none",
          width: "100%",
          marginInline: marginX,
          paddingInline: paddingX,
          height: height,
          fontSize: fontSize,
          color: disabled ? "#fff" : color,
          textAlign: "center",
          textDecoration: "none",
          outline: outline ? "" : "none",
          cursor: "pointer",
        }}
      >
        <span className="fs-14px m-4" style={{
          fontWeight: fontWeight ? fontWeight : "200",
        }}>{title}</span>
        {renderIcon(icon)}
      </button>
    </div>
  );
}
