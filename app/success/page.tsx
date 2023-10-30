"use client";
import { ButtonCapsule } from "@/components/common/button";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

export default function Success({}: Props) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      {status === "OK" ? (
        <>
          <Image
            src="/icons/icon-success.png"
            alt="icon-success"
            width={70}
            height={70}
          />
          <span className="fs-32px m-2 tc-darkblue">ส่งข้อมูลสำเร็จ</span>
          <span className="fs-16px">เราได้รับข้อมูลรถของท่านครบถ้วนแล้ว</span>
          <span className="fs-16px">ระบบจะจัดส่งราคาประเมินไปที่</span>
          <span className="fs-16px">
            E-mail ที่ได้ลงทะเบียนของท่านภายใน 30 นาที
          </span>
          <span className="fs-16px">
            (หากท่านไม่ได้รับกรุณาตรวจสอบใน Junk Mail)
          </span>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            marginTop={2}
          >
            {email && (
              <Box marginTop={2}>
                <Box marginTop={2} width={200}>
                  <Link href={`/emaillogin?email=${email}&name=${name}`}>
                    <ButtonCapsule
                      title={"Sign Up"}
                      bgColor={"#1A417B"}
                      color={"#fff"}
                    />
                  </Link>
                </Box>
                <Box marginTop={2} width={200}>
                  <Link href="/login">
                    <ButtonCapsule
                      title={"Sign In"}
                      bgColor={"#1A417B"}
                      color={"#fff"}
                    />
                  </Link>
                </Box>
                <Box marginTop={2} width={200}>
                  <Link href="/">
                    <ButtonCapsule
                      title={"Skip"}
                      bgColor={"#1A417B"}
                      color={"#fff"}
                    />
                  </Link>
                </Box>
                {isMobileMode ? (
                  <Box marginTop={2} width={200}>
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
            )}
          </Box>
        </>
      ) : <CircularProgress />}
    </Box>
  );
}
