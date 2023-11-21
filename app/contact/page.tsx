"use client";
import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Contact({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      style={{ overflowX: "hidden", height: "100vh" }}
    >
      <Link
        href="https://www.google.co.th/maps/place/%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%9E%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%AA%E0%B8%B4%E0%B8%99/@13.7107134,100.5344402,17.46z/data=!4m6!3m5!1s0x30e29f49e5e3c065:0x803106dc55e5c7d4!8m2!3d13.7107581!4d100.5361314!16s%2Fg%2F1q5bs0lr4?hl=th&entry=ttu"
        target="_blank"
      >
        <Box
          display={"flex"}
          style={{
            backgroundColor: "#FFF",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.25)",
            width: isMobileMode ? "90vw" : "70vw",
            height: isMobileMode ? "70vh" : "70vh",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={7} style={{ position: "relative" }}>
              <Image
                src="/images/map.jpg"
                layout="fill"
                objectFit="cover"
                alt="map"
                style={{
                  borderRadius: isMobileMode
                    ? "15px 15px 0 0"
                    : "15px 0 0 15px",
                }}
              />
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"} style={{
                position: "absolute",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.25)",
                borderRadius: "5px",
                right: "5%",
                bottom: "5%",
              }}>
                <Image src="/icons/map.png" alt="map" width={50} height={50} />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                marginTop={4}
                marginLeft={4}
              >
                <span className="tc-black fw-400 fs-16px">
                  บริษัท แรพพิด มอเตอร์ จำกัด
                </span>
                <span className="tc-black fs-16px">
                  อาคารพิพัฒนสิน ชั้น 9 ซอยพัฒนสิน
                </span>
                <span className="tc-black fs-16px">
                  แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120
                </span>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  );
}
