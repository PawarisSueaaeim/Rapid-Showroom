"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { ColorSet } from "@/constants";

type Props = {
  title: string;
  textcolor: string;
  bgColor: string;
  bgHoverColor: string;
};

//@ts-ignore
const ColorButton = styled(Button)<ButtonProps>(({textColor,bgColor,bgHoverColor}) => ({
  color: textColor,
  backgroundColor: bgColor,
  "&:hover": {
    backgroundColor: bgHoverColor,
  },
  width: 150,
}));

export default function ButtonPleumDesign({ title,textcolor, bgColor, bgHoverColor }: Props) {
  return (
    //@ts-ignore
      <ColorButton variant="contained" textColor={textcolor} bgColor={bgColor} bgHoverColor={bgHoverColor}>{title}</ColorButton>
  );
}
