"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function Booksuccess({}: Props) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const captureScreenshot = async () => {
    const targetElement = document.getElementById("data-car-booking");
    //@ts-ignore
    const canvas = await html2canvas(targetElement);

    const screenshotURL = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = screenshotURL;
    a.download = "screenshot.png";
    a.click();
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
      <span className="fs-32px tc-darkBlue m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">กรุณาไปตามเวลานัดหมาย</span>
      <Box
        id="data-car-booking"
        display={"flex"}
        flexDirection={"column"}
        width={300}
      >
        <span>เวลานัดหมาย</span>
        <span>วันที่ {date}</span>
        <span>เวลา {time}</span>
      </Box>
        <ButtonPleumDesign
          title={"บันทึกรูป"}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
          onClick={captureScreenshot}
        />
    </Box>
  );
}
