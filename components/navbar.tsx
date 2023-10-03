"use client";
// import from inside
import React, { Fragment, useEffect, useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import from outside
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

type Props = {};

const Navbar = ({}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");
  const currentURL = usePathname();

  useEffect(() => {
  }, [isMobileMode]);

  return (
    <Box
      className={classes.container}
      // Check ว่าอยู่ path ไหนถ้าอยู่หน้า home ไม่ต้องมีสี bg
      style={
        currentURL === "/"
          ? {}
          : {
              backgroundColor: "#1A417B",
            }
      }
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingTop={isMobileMode ? 3 : 0}
        paddingBottom={1}
        width={"100%"}
      >
        <Box className={classes.logo}>
          <Link href="/">
            <Box
              display={"flex"}
              sx={{ fontStyle: "oblique", fontWeight: 500 }}
              gap={1}
            >
              <Typography variant="h5" color={"#fff"}>
                RAPID
              </Typography>
              <Typography variant="h5" color={!isMobileMode && currentURL !== '/' ? "#6FB6F8" : "#000"}>
                AUTO
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.menu}>
          {isMobileMode ? (
            <Box marginX={2}>
              <Image
                src="/icons/icon-show-menu.svg"
                alt="icon-show-menu"
                width={20}
                height={20}
                onClick={() => setShowMenu(!showMenu)}
              />
            </Box>
          ) : (
            <Box>
              <ul>
                <li>
                  <Link href="/buycar">Buy Car</Link>
                </li>
                <li>
                  <Link href="/salecar">Sell Car</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        display={showMenu ? "flex" : "none"}
        flexDirection={"column"}
        height={"100vh"}
        width={"200px"}
        zIndex={10}
        right={0}
        padding={2}
        style={{
          backgroundColor: "#1A417B",
          color: "#fff",
          position: "absolute",
        }}
      >
        <CloseIcon onClick={() => setShowMenu(!showMenu)} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={2}
          alignItems={"center"}
        >
          <Link href="/buycar" onClick={() => setShowMenu(!showMenu)}>
            <span className={classes.navigation_car}>Buy Car</span>
          </Link>
          <Link href="/salecar" onClick={() => setShowMenu(!showMenu)}>
            <span className={classes.navigation_car}>Sell Car</span>
          </Link>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={2}
          alignItems={"center"}
        >
          <Link href="/about" onClick={() => setShowMenu(!showMenu)}>
            <span className={classes.navigation_us}>About Us</span>
          </Link>
          <Link href="/contact" onClick={() => setShowMenu(!showMenu)}>
            <span className={classes.navigation_us}>Contact Us</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
