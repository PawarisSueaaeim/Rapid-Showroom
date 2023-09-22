"use client";
import React, { Fragment, useEffect, useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setShowMenu(isMobileMode);
  }, [isMobileMode]);

  return (
    <Box className={classes.container}>
      <Box className={classes.logo}>
        <Link href="/">
          <Image
            src="/image/rapid-logo.png"
            alt="logo"
            width={150}
            height={50}
          />
        </Link>
      </Box>
      <Box className={classes.menu}>
        {showMenu ? (
          <Box marginX={6}>
            <MenuIcon onClick={() => setShowMenu(!showMenu)} />
          </Box>
        ) : (
          <Fragment>
            {isMobileMode && (
              <CloseIcon onClick={() => setShowMenu(!showMenu)} />
            )}
            <ul>
              <li>
                <Link href="/">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/buycar">ซื้อรถ</Link>
              </li>
              <li>
                <Link href="/salecar">ขายรถ</Link>
              </li>
            </ul>
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
