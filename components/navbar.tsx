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
    setShowMenu(isMobileMode);
  }, [isMobileMode]);

  return (
    <Box
      className={classes.container}
      style={currentURL === "/" ? {} : { backgroundColor: "#1A417B" }}
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
            <Typography variant="h5" color={"#000"}>
              AUTO
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className={classes.menu}>
        {showMenu ? (
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
