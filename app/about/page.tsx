import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/aboutus.module.css";

type Props = {};

export default function About({}: Props) {
  const backgroundImageStyle = {
    backgroundImage: 'url("../../image/Homepage-02.avif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <Box
      style={backgroundImageStyle}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"column"}
      className={classes.container_about}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingX={"10%"}
        paddingY={"12%"}
      >
        <h1>About Us</h1>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore harum
          ad doloremque a, porro veritatis sequi temporibus ratione minima optio
          quos ipsam possimus, perspiciatis impedit est. Perspiciatis placeat
          vel tempore?
        </span>
      </Box>
      <Box display={"flex"} gap={6} marginBottom={8}>
        <Link href="/about">
          <Button>About Us</Button>
        </Link>
        <Link href="/contact">
          <Button>Contact Us</Button>
        </Link>
      </Box>
    </Box>
  );
}
