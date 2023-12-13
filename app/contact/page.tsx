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
      style={{ overflowX: "hidden", height: "720px" }}
    >
      <Link
        href="https://maps.app.goo.gl/4LrbtrPuUX9ZaJUw6"
        target="_blank"
      >
        <Box
          display={"flex"}
          style={{
            backgroundColor: "#FFF",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.25)",
            width: isMobileMode ? "90vw" : "70vw",
            height: "500px",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={7} style={{ position: "relative" }}>
              <Image
                src="/images/map.png"
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
                  358 ถนน นราธิวาสราชนครินทร์ ช่องนนทรี
                </span>
                <span className="tc-black fs-16px">
                  เขตยานนาวา กรุงเทพมหานคร 10120
                </span>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  );
}
