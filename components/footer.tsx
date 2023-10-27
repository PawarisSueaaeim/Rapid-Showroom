"use client";
import React from "react";
import classes from "@/style/components/footer.module.css";
import Image from "next/image";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { usePathname } from "next/navigation";

type Props = {};

const Footer = ({}: Props) => {
  const currentURL = usePathname();
  const isMobileMode = useMediaQuery("(max-width:600px)");

  const backgroundFooterImage = {
    backgroundImage: 'url("../images/image-footer-01.png")',
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
      <Box style={{
        opacity: 0.8,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
      }}>
      <Grid container paddingTop={2} paddingX={1} paddingBottom={4}>
        <Grid item xs={12} md={6}>
          {/* <Typography variant="h4" color={"#000"}>
            Rapid Auto
          </Typography> */}
          <Image src="/icons/icon-rapid-auto.png" alt="icon-rapid-auto" width={225} height={75}/>
          <Box marginX={2}>
          <strong className="fw-400">บริษัท แรพพิด มอเตอร์ จำกัด</strong>
          <span className={classes.footer_location}>
             6/10 อาคารพิพัฒนสิน ชั้น 9
          </span>
          <span className={classes.footer_location}>
            ซอยพัฒนสิน แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120
          </span>
          </Box>
          
        </Grid>
      </Grid>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <span className={classes.footer_copyright}>
            © 2022 RAPID GROUP CO., LTD
          </span>
        </Box>
      </Box>
      </Box>
      
    </Box>
  );
};

export default Footer;
