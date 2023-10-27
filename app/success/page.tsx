"use client";
import { ButtonCapsule } from "@/components/common/button";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

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
      <span className="fs-32px m-2 tc-darkblue">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">เราได้รับข้อมูลรถของท่านครบถ้วนแล้ว</span>
      <span className="fs-16px">ระบบจะจัดส่งราคาประเมินไปที่</span>
      <span className="fs-16px">E-mail ที่ได้ลงทะเบียนของท่านภายใน 30 นาที</span>
      <span className="fs-16px">(หากท่านไม่ได้รับกรุณาตรวจสอบใน Junk Mail)</span>
      {havepasswd === "NO" ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          marginTop={2}
        >
          <Box marginTop={2} gap={4}>
            <Box>
              <Link href="/emaillogin">
                <ButtonCapsule
                  title={"ดูผลทันทีผ่าน RAPID AUTO"}
                  bgColor={"#1A417B"}
                  color={"#fff"}
                />
              </Link>
            </Box>
            {isMobileMode ? (
              <Box marginTop={2}>
                <Link href="/linelogin">
                  <ButtonCapsule
                    title={"LINE"}
                    fontWeight={500}
                    bgColor={"#00B900"}
                    color={"#fff"}
                  />
                </Link>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : (
        <Box marginTop={2}>
          <Link href="/login">
            <ButtonCapsule
              title={"ดูผลทันทีผ่าน RAPID AUTO"}
              bgColor={"#1A417B"}
              color={"#fff"}
            />
          </Link>
        </Box>
      )}
    </Box>
  );
}
