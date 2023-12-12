import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function RegisterFail({}: Props) {
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
      <span className="fs-32px m-2 tc-darkblue">การสร้าง Password ผิดพลาด</span>
      <span className="fs-16px">กรุณาติดต่อผู้ดูแลระบบ</span>
      <span className="fs-16px">ระบบจะจัดส่งราคาประเมินไปที่</span>
      <span className="fs-16px">
        E-mail ที่ได้ลงทะเบียนของท่านภายใน 30 นาที
      </span>
      <span className="fs-16px">
        (หากท่านไม่ได้รับกรุณาตรวจสอบใน Junk Mail)
      </span>
    </Box>
  );
}
