"use client"
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function WhyRapid({}: Props) {
    const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={isMobileMode ? 2 : 100}
    >
      <span className="fs-20px">ทำไมต้อง Rapid Auto</span>
      <Box display={"flex"} alignItems={"center"} gap={6} paddingTop={3}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-reward.png"
            alt="icon-reward"
            width={91}
            height={91}
          />
          <span className="fs-12px">เรามั่นใจในคุณภาพ</span>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-carclean.png"
            alt="icon-reward"
            width={91}
            height={91}
          />
          <span className="fs-12px">รถสวย</span>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-carcheck.png"
            alt="icon-reward"
            width={91}
            height={91}
          />
          <span className="fs-12px">ไม่ย้อมแมว</span>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={8} marginTop={4}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-check.png"
            alt="icon-check"
            width={91}
            height={91}
          />
          <span className="fs-12px">รับประกัน...ปี</span>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-givemoney.png"
            alt="icon-givemoney"
            width={91}
            height={91}
          />
          <span className="fs-12px">การันตีคืนเงิน</span>
        </Box>
      </Box>
      <Box
        position={"relative"}
        overflow={"hidden"}
        width={isMobileMode ? 440 : 500}
        marginTop={4}
        left={-25}
      >
        <Image
          src="/images/image-car-03.png"
          alt="image-car-03"
          width={455}
          height={160}
        />
      </Box>
    </Box>
  );
}
