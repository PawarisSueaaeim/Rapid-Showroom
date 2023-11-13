"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { daymontyearFormat } from "@/utils/dateHelper";

type Props = {};

export default function Booksuccess({}: Props) {
  const bookingData = useSelector((state: any) => state.deposit);
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');
  const plateId = searchParams.get('plateId');
  const price = searchParams.get('price');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const deposit = searchParams.get('deposit');

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
        marginTop={4}
      >
        <span className="fs-20px fw-400">{brand} {model}</span>
        <span className="fs-16px">ทะเบียน: {plateId}</span>
        <span className="fs-16px">ราคา: {price} บาท</span>
        <span className="fs-16px">มัดจำ: {deposit ? deposit : "0"} บาท</span>
        <span className="fw-400">เวลานัดหมาย</span>
        <span>วันที่ {daymontyearFormat(date)}</span>
        <span>เวลา {time} น.</span>
      </Box>
      <Box marginTop={2}>
      <ButtonPleumDesign
          title={"บันทึกรูป"}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
          onClick={captureScreenshot}
        />
      </Box>
        
    </Box>
  );
}
