"use client";
import React, { useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

type Props = {};

const Navbar = ({}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");
  const currentURL = usePathname();

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
        alignItems={"center"}
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
              <Typography
                variant="h5"
                color={currentURL !== "/" ? "#fff" : "#000"}
              >
                RAPID
              </Typography>
              <Typography
                variant="h5"
                color={!isMobileMode && currentURL !== "/" ? "#6FB6F8" : "#000"}
              >
                AUTO
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box className={classes.menu}>
          {isMobileMode ? (
            <Box marginX={2}>
              <Image
                src="/icons/icon-show-menu-02.png"
                alt="icon-show-menu"
                width={20}
                height={20}
                onClick={() => setShowMenu(!showMenu)}
              />
            </Box>
          ) : (
            <Box>
              <ul className="fw-100 fs-18px">
                <li>
                  <Link href="/buycar">ซื้อรถ</Link>
                </li>
                <li>
                  <Link href="/salecar">ขายรถ</Link>
                </li>
                <li>
                  <Link href="/contact">ติดต่อเรา</Link>
                </li>
                <li>
                  <Link href="/about">เกี่ยวกับเรา</Link>
                </li>
              </ul>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100vh"}
        width={"200px"}
        zIndex={10}
        right={showMenu ? "0" : "-100%"}
        padding={2}
        style={{
          backgroundColor: "#D9D9D9",
          color: "#000",
          position: "fixed",
          transition: "0.3s",
        }}
      >
        <CloseIcon onClick={() => setShowMenu(!showMenu)} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={2}
          alignItems={"center"}
          gap={3}
        >
          <Link href="/buycar" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100">ซื้อรถ</span>
          </Link>
          <Link href="/salecar" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100">ขายรถ</span>
          </Link>
          <Link href="/contact" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100">ติดต่อเรา</span>
          </Link>
          <Link href="/about" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100">เกี่ยวกับเรา</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
