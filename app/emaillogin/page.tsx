"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function EmailLogin({}: Props) {
  const [password, setPassword] = useState("");

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <span className="fs-32px fw-400">RAPID AUTO</span>
      <span className="fs-14px">กรุณากรอกรหัสเพื่อรอดูผลการประเมินราคา</span>
      <InputPassword onChange={passwordHandler} />
      <Box marginTop={4}>
        <Link href={"/login"}>
          <ButtonPleumDesign
            title={"ยืนยัน"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
          />
        </Link>
      </Box>
    </Box>
  );
}
