"use client";
import React, { useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {};

const Navbar = ({}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");
  const currentURL = usePathname();

  return (
    <Box
      className={classes.container}
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
              <Image src="/icons/icon-rapid-auto.png" alt="icon-rapid-auto" width={190} height={65}/>
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
                  <Link href="/vehicles">ซื้อรถ</Link>
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
                <li>
                  <Link href="/login">เข้าสู่ระบบ</Link>
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
          <Link href="/vehicles" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100 action">ซื้อรถ</span>
          </Link>
          <Link href="/salecar" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100 action">ขายรถ</span>
          </Link>
          <Link href="/contact" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100 action">ติดต่อเรา</span>
          </Link>
          <Link href="/about" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100 action">เกี่ยวกับเรา</span>
          </Link>
          <Link href="/login" onClick={() => setShowMenu(!showMenu)}>
            <span className="tc-black fs-20px fw-100 action">{currentURL === '/sellinfo' ? "ออกจากระบบ" : "เข้าสู่ระบบ"}</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
