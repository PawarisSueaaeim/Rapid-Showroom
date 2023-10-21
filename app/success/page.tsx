"use client";
import { ButtonCapsule } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function Success({}: Props) {
  const searchParams = useSearchParams();
  const havepasswd = searchParams.get("havepasswd");

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
      <Image
        src="/icons/icon-success.png"
        alt="icon-success"
        width={70}
        height={70}
      />
      <span className="fs-32px tc-green m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-14px">กรุณารอการติดต่อกลับจากเจ้าหน้าที่</span>
      <span className="fs-14px m-2">ภายใน 1 วัน</span>
      {havepasswd === "NO" ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          marginTop={2}
        >
          <span className="fs-14px">
            กรุณากรอกรหัสเพื่อรอดูผลการประเมินราคา
          </span>
          <InputPassword onChange={passwordHandler} />
          <Box marginTop={2}>
            <Link href="/login">
              <ButtonCapsule
                title={"ยืนยัน"}
                bgColor={"#4679C7"}
                color={"#fff"}
              />
            </Link>
          </Box>
        </Box>
      ) : (
        <Box marginTop={2}>
          <Link href="/">
            <ButtonCapsule
              title={"กลับหน้าหลัก"}
              bgColor={"#4679C7"}
              color={"#fff"}
            />
          </Link>
        </Box>
      )}
    </Box>
  );
}
