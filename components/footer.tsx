"use client";
// import from in side
import React, { Fragment } from "react";
import classes from "@/style/components/footer.module.css";
import Image from "next/image";
// import from out side
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { usePathname } from "next/navigation";

type Props = {};

const Footer = ({}: Props) => {
  const currentURL = usePathname();
  const isMobileMode = useMediaQuery("(max-width:600px)");

  const backgroundFooterImage = {
    backgroundImage: 'url("../images/bg-footer.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  };

  const isContactPath = () => {
    if (currentURL === "/contact") {
      return true;
    } else {
      return false;
    }
  };

  return isContactPath() ? null : (
    <Box style={backgroundFooterImage}>
      <Grid container paddingTop={6} paddingX={4} paddingBottom={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color={"#fff"}>
            Rapid Auto
          </Typography>
          <span className={classes.footer_location}>
            <strong>บจก.แรพพิด มอเตอร์</strong> 6/10 อาคารพิพัฒนสิน ชั้น 9
          </span>
          <span className={classes.footer_location}>
            ซอยพัฒนสิน แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120
          </span>
          <Box display={"flex"} flexDirection={"column"} marginTop={1}>
            <span className={classes.footer_location}>
              <PhoneIcon />
              091 921 1919
            </span>
            <span className={classes.footer_location}>
              <EmailIcon />
              example@gmail.com
            </span>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={"flex"} flexDirection={"column"} marginTop={4}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={isMobileMode ? "50%" : "30%"}
            >
              <span className={classes.footer_contact}>Term of Service</span>
              <Image
                src="../icons/icon-arrow-right.svg"
                alt="icon-arrow-right.svg"
                width={14}
                height={14}
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={isMobileMode ? "50%" : "30%"}
            >
              <span className={classes.footer_contact}>Privacy Policy</span>
              <Image
                src="/icons/icon-arrow-right.svg"
                alt="icon-arrow-right.svg"
                width={14}
                height={14}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={2}>
          <Image
            src="/icons/facebook.png"
            alt="icon-facebook"
            width={24}
            height={24}
          />
          <Image
            src="/icons/instagram.png"
            alt="icon-instagram"
            width={24}
            height={24}
          />
          <Image
            src="/icons/telegram.png"
            alt="icon-telegram"
            width={24}
            height={24}
          />
          <Image
            src="/icons/ticktok.png"
            alt="icon-ticktok"
            width={24}
            height={24}
          />
        </Box>
        <Box>
          <span className={classes.footer_copyright}>
            © 2022 RAPID GROUP CO., LTD
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
