"use client"
import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/navigation'

import classes from "@/style/page/home.module.css";

type Props = {};

export default function Home({}: Props) {
  const router = useRouter()

  const backgroundImageStyle = {
    backgroundImage: 'url("../image/Homepage-01.avif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <Box>
      <Box
        style={backgroundImageStyle}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={55}
      >
        <Box className={classes.welcome}>
          <h1>Welcome to rapid showroom</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            harum ad doloremque a, porro veritatis sequi temporibus ratione
            minima optio quos ipsam possimus, perspiciatis impedit est.
            Perspiciatis placeat vel tempore?
          </span>
        </Box>
        <Box display={"flex"} gap={8}>
          <Button onClick={() => router.push('/about')}>About Us</Button>
          <Button onClick={() => router.push('/contact')}>Contact Us</Button>
        </Box>
      </Box>
    </Box>
  );
}
