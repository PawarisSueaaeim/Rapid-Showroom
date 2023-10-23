"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type Props = {
  title: string;
  textBtnColor: string;
  backgroundBtnColor: string;
  backgroundBtnHoverColor: string;
  width?: number;
  onClick?: (event: MouseEvent) => void;
};

//@ts-ignore
const ColorButton = styled(Button)<ButtonProps>(({textBtnColor,width,backgroundBtnColor,backgroundBtnHoverColor}) => ({
  color: textBtnColor,
  backgroundColor: backgroundBtnColor,
  "&:hover": {
    backgroundColor: backgroundBtnHoverColor,
  },
  width: width ? width : 170,
}));

export default function ButtonPleumDesign({onClick, title,width,textBtnColor, backgroundBtnColor, backgroundBtnHoverColor }: Props) {
  return (
    //@ts-ignore
      <ColorButton variant="contained" onClick={onClick} textBtnColor={textBtnColor} width={width} backgroundBtnColor={backgroundBtnColor} backgroundBtnHoverColor={backgroundBtnHoverColor}>{title}</ColorButton>
  );
}
