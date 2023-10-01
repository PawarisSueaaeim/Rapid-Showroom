import { ButtonCapsule } from "@/components/common/button";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Success({}: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={"402px"}
      paddingTop={18}
    >
      <Image
        src="/icons/icon-success.png"
        alt="icon-success"
        width={70}
        height={70}
      />
      <span className="fs-32px tc-green m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-14px">กรุณารอการติดต่อกลับจากเจ้าหน้าที่</span>
      <span className="fs-14px m-2">ภายใน...วัน</span>
      <Box marginTop={2}>
        <Link href="/">
          <ButtonCapsule
            title={"กลับหน้าหลัก"}
            bgColor={"#4679C7"}
            color={"#fff"}
          />
        </Link>
      </Box>
    </Box>
  );
}
