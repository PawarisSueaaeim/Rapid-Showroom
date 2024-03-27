import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from "./buttonGroup.module.css";

type Props = {};

export default function ButtonGroup({}: Props) {
  return (
    <Box className={classes.container}>
      <Link href={"/vehicles"}>
        <ButtonPleumDesign
          title={"ซื้อรถ"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
      </Link>
      <Link href={"/salecar"}>
        <ButtonPleumDesign
          title={"ขายรถ"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
      </Link>
      <Link href={"/rent"}>
        <ButtonPleumDesign
          title={"เช่ารถ"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
      </Link>
    </Box>
  );
}
