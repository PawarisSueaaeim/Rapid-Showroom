"use client";
import { ButtonCapsule } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { ColorSet } from "@/constants";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { green } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function Success({}: Props) {
  const searchParams = useSearchParams();
  const havepasswd = searchParams.get("havepasswd");

  const isMobileMode = useMediaQuery("(max-width:600px)");

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
      <span className="fs-32px tc-green m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">กรุณาไปตามเวลานัดหมาย</span>
    </Box>
  );
}
