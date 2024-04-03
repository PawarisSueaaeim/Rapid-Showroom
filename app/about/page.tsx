"use client"
import Image from "next/image";
import React from "react";
import classes from "./aboutus.module.css";
import { Box, Typography, useMediaQuery } from "@mui/material";

type Props = {};

export default function About({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      paddingX={isMobileMode ? 0 : 30}
    >
      <Typography
        style={{
          fontSize: "24px",
          color: "#000",
          fontWeight: 400,
          marginTop: "100px",
        }}
      >
        About Us
      </Typography>
      <Box margin={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <span>
          As Rapid Capital has experience in providing loans to a group of used
          car business owners, we realize how important to expand the ecosystem
          of the used car business to cover from upstream to downstream.
        </span>
        <Image
          src="/images/about-parking-01.png"
          alt="about-parking-01"
          width={348}
          height={227}
          className={classes.image_parking_01}
        />
      </Box>
      <ul className={classes.list_about_detail}>
          <li>
            Prepare to be an infrastructure of EVs aftermarket to promote the
            prices of used EVs and, therefore, sustainably promote the use of
            EVs in Thailand.
          </li>
          <li>
            Use an in-house digital platform to sell and/or buy car(s) in the
            used car market.
          </li>
          <li>
            Plan to initiate over 50 automated used car centers, where used cars
            are parked and picked up when the sale takes place.
          </li>
          <li>
            Be the first company ever to introduce an online-to-offline (O2O)
            experience to the used car industry.
          </li>
        </ul>
        <Image
          src="/images/about-parking-02.png"
          alt="about-parking-02"
          width={430}
          height={378}
        />
    </Box>
  );
}
