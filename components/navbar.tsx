"use client"
import React, { useEffect, useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box className={classes.container}>
      <div className={classes.logo}>
        <Link href="/">
          <Image src="/image/rapid-logo.png" alt="logo" width={150} height={50} />
        </Link>
      </div>
      <div className={classes.menu}>
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
      </div>
    </Box>
  );
};

export default Navbar;
