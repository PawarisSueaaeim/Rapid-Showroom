"use client";
import { ButtonCapsule } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { ColorSet } from "@/constants";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { green } from "@mui/material/colors";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Success({}: Props) {

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Image
        src="/icons/icon-success.png"
        alt="icon-success"
        width={70}
        height={70}
      />
      <span className="fs-32px tc-darkBlue m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">กรุณาไปตามเวลานัดหมาย</span>
    </Box>
  );
}
