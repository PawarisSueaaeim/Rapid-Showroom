import React, { useEffect, useState } from "react";
import classes from "@/style/components/navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box className={classes.container}>
      <div className={classes.logo}>
        <Image src="/rapid-logo.png" alt="logo" width={100} height={40}/>
      </div>
      <div className={classes.menu}>
        <ul>
          <li>
            <a href="/">หน้าแรก</a>
          </li>
          <li>
            <a href="/buycar">ซื้อรถ</a>
          </li>
          <li>
            <a href="/salecar">ขายรถ</a>
          </li>
        </ul>
      </div>
    </Box>
  );
};

export default Navbar;
