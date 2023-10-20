"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type Props = {
  title: string;
  textBtnColor: string;
  backgroundBtnColor: string;
  backgroundBtnHoverColor: string;
};

//@ts-ignore
const ColorButton = styled(Button)<ButtonProps>(({textBtnColor,backgroundBtnColor,backgroundBtnHoverColor}) => ({
  color: textBtnColor,
  backgroundColor: backgroundBtnColor,
  "&:hover": {
    backgroundColor: backgroundBtnHoverColor,
  },
  width: 150,
}));

export default function ButtonPleumDesign({ title,textBtnColor, backgroundBtnColor, backgroundBtnHoverColor }: Props) {
  return (
    //@ts-ignore
      <ColorButton variant="contained" textBtnColor={textBtnColor} backgroundBtnColor={backgroundBtnColor} backgroundBtnHoverColor={backgroundBtnHoverColor}>{title}</ColorButton>
  );
}
