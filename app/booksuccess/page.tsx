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
        <span className="fs-20px fw-400">{bookingData.brand} {bookingData.model}</span>
        <span className="fs-16px">ทะเบียน: {bookingData.plate_id}</span>
        <span className="fs-16px">ราคา: {bookingData.price} บาท</span>
        <span>เวลานัดหมาย</span>
        <span>วันที่ {daymontyearFormat(bookingData.date)}</span>
        <span>เวลา {bookingData.time} น.</span>
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
