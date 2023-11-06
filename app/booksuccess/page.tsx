"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import html2canvas from 'html2canvas';

type Props = {};

const mockdata = {
  image: "/images/car-blue.png",
  milages: "212345",
  plateId: "1กก9999",
  price: "1,000,000",
  deposit_price: "10,000",
  brand: "BMW",
  model: "series 3",
  submodel: "E30",
  date: "09 กันยายน พ.ศ. 2567",
  time: "09:41",
};

export default function Booksuccess({}: Props) {

  const captureScreenshot = async () => {
    const targetElement = document.getElementById("data-car-booking");
    //@ts-ignore
    const canvas = await html2canvas(targetElement);
  
    const screenshotURL = canvas.toDataURL('image/png');
  
    const a = document.createElement('a');
    a.href = screenshotURL;
    a.download = 'screenshot.png';
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
      <Image src={mockdata.image} alt="icon-success" width={300} height={200} />
      <span className="fs-32px tc-darkBlue m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">กรุณาไปตามเวลานัดหมาย</span>
      <Box id="data-car-booking" display={"flex"} flexDirection={"column"} width={300}>
        <span className="fs-20px fw-400">
          {mockdata.brand} {mockdata.model} {mockdata.submodel}
        </span>
        <span>เลขไมล์: <strong>{mockdata.milages}</strong></span>
        <span>ทะเบียน: <strong>{mockdata.plateId}</strong></span>
        <span>ราคา: <strong>{mockdata.price}</strong> บาท</span>
        <span>เวลานัดหมาย</span>
        <span>วันที่ {mockdata.date}</span>
        <span>เวลา {mockdata.time}</span>
      </Box>
      <br/>
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
