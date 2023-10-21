import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from '@/style/page/accept/accept.module.css';

type Props = {};

export default function Accept({}: Props) {
  return (
    <Box className={classes.container}>
      <span className="fs-20 fw-400">รายการขาย</span>
      <Box className={classes.btn_container}>
        <ButtonPleumDesign
          title={"ยอมรับราคา"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
        <ButtonPleumDesign
          title={"ไม่ยอมรับราคา"}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
        />
      </Box>
    </Box>
  );
}
