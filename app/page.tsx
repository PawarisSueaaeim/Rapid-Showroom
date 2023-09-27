import React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import classes from "@/style/page/home.module.css";

type Props = {};

export default function Home({}: Props) {
  const backgroundImageHome = {
    backgroundImage: 'url("../image/bg01.png")',
    backgroundSize: "cover",
  };

  return (
    <Box className={classes.container} style={backgroundImageHome}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingX={"10%"}
          paddingY={"12%"}
        >
          <h1>Welcome to rapid showroom</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            harum ad doloremque a, porro veritatis sequi temporibus ratione
            minima optio quos ipsam possimus, perspiciatis impedit est.
            Perspiciatis placeat vel tempore?
          </span>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={6}
          marginTop={24}
        >
          <Link href="/about">
            <Button>About Us</Button>
          </Link>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingX={"10%"}
          paddingY={"12%"}
        >
          <h1>Welcome to rapid showroom</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            harum ad doloremque a, porro veritatis sequi temporibus ratione
            minima optio quos ipsam possimus, perspiciatis impedit est.
            Perspiciatis placeat vel tempore?
          </span>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingX={"10%"}
          paddingY={"12%"}
        >
          <h1>Welcome to rapid showroom</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            harum ad doloremque a, porro veritatis sequi temporibus ratione
            minima optio quos ipsam possimus, perspiciatis impedit est.
            Perspiciatis placeat vel tempore?
          </span>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingX={"10%"}
          paddingY={"12%"}
        >
          <h1>Welcome to rapid showroom</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            harum ad doloremque a, porro veritatis sequi temporibus ratione
            minima optio quos ipsam possimus, perspiciatis impedit est.
            Perspiciatis placeat vel tempore?
          </span>
        </Box>
      </Box>
  );
}
