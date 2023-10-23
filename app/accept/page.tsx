import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from '@/style/page/accept/accept.module.css';
import { CardAccept } from "@/components/common/card";

type Props = {};

export default function Accept({}: Props) {
  return (
    <Box className={classes.container}>
      <span className="fs-20 fw-400">รายการขาย</span>
      <CardAccept/>
    </Box>
  );
}
