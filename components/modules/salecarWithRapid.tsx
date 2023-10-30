"use client";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/home/home.module.css";

type Props = {};

export default function SalecarWithRapid({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={isMobileMode ? "column" : "row"}
      margin={3}
      marginLeft={isMobileMode ? 3 : 16}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <span className="fs-24px">
          ขายรถกับ<span className="fw-400"> Rapid Auto</span>
        </span>
        <span className="fs-16px m-2">
          เปิดประสบการณ์การขายรถรูปแบบใหม่ที่เดียวในโลก
        </span>
        <span className="fs-16px">เพียงแค่ปลายนิ้วสัมผัส</span>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={3}
        >
          <Box display={"flex"} gap={10}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Image
                src="/icons/icon-moneydow.png"
                alt="icon-moneydow"
                width={70}
                height={70}
              />
              <span className="fs-12px">การันตีราคาเหมาะสม</span>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Image
                src="/icons/icon-checkhand.png"
                alt="icon-checkhand"
                width={70}
                height={70}
              />
              <span className="fs-12px">รับซื้อจบใน 45 นาที</span>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={4}
          marginBottom={2}
        >
          <Image
            src="/icons/icon-holdmoney.png"
            alt="icon-holdmoney"
            width={70}
            height={70}
          />
          <span className="fs-12px">รับเงินทันที หลังเซ็นสัญญา</span>
        </Box>
      </Box>
      <Link href="/salecar" className={classes.box_btn_homepage}>
        <Image
          src="/icons/icon-sellcar.png"
          alt="icon-sellcar"
          width={122}
          height={120}
        />
        <span>SELL CAR</span>
      </Link>
    </Box>
  );
}
