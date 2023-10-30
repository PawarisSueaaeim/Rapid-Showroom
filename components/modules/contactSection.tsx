"use client";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/home/home.module.css";

type Props = {};

export default function ContactSection({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");
  
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={isMobileMode ? 380 : "100%"}
    >
      <Image
        src="/images/image-car-04.png"
        alt="image-car-04.png"
        width={400}
        height={207}
      />
      <Box display={"flex"} alignItems={"center"} gap={4}>
        <Link href="/about" className={classes.box_btn_homepage}>
          <Image
            src="/icons/icon-about.png"
            alt="icon-about"
            width={56}
            height={56}
          />
          <span className="fs-12px">About Us</span>
        </Link>
        <Link href="/contact" className={classes.box_btn_homepage}>
          <Image
            src="/icons/icon-contact.png"
            alt="icon-sellcar"
            width={56}
            height={56}
          />
          <span className="fs-12px">Contact Us</span>
        </Link>
      </Box>
    </Box>
  );
}
