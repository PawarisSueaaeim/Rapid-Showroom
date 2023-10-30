"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import classes from "@/style/page/home/home.module.css";
import Link from "next/link";

type Props = {};

export default function Certified({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={isMobileMode ? 4 : 20}
    >
      <Typography fontSize={30} fontWeight={700} color={"#000"}>
        Rapid Certified car
      </Typography>
      <span>รับประกันคุณภาพ</span>
      <span>ด้วยการตรวจเช็คสภาพกว่า….จุดจากผู้ชำนาญการ</span>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        gap={3}
        marginRight={isMobileMode ? 20 : 0}
      >
        <Image
          src="/images/image-car-02.png"
          alt="image-car-02"
          width={351}
          height={260}
          className={classes.image_car_02}
        />
        <Link href="/buycar" className={classes.box_btn_homepage}>
          <Image
            src="/icons/icon-buycar.png"
            alt="icon-buycar"
            width={115}
            height={113}
          />
          <span>BUY CAR</span>
        </Link>
      </Box>
    </Box>
  );
}
