"use client";
import React from "react";
import classes from "@/style/components/footer.module.css";
import { Box, Grid } from "@mui/material";
import { usePathname } from "next/navigation";
import { genversion } from "@/utils/genversion";

type Props = {};

const Footer = ({}: Props) => {
  const currentURL = usePathname();

  const backgroundFooterImage = {
    backgroundImage: 'url("../images/image-footer-01.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  };

  const isContactPath = () => {
    if (currentURL === "/login" || currentURL === "/buyinfo" || currentURL === "/sellinfo" || currentURL === "/info") {
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
          {/* <Image src="/icons/icon-rapid-auto.png" alt="icon-rapid-auto" width={225} height={75}/> */}
          <Box marginX={2}>
          <strong className="fw-400">บริษัท แรพพิด มอเตอร์ จำกัด</strong>
          <span className={classes.footer_location}>
            358 ถนน นราธิวาสราชนครินทร์
          </span>
          <span className={classes.footer_location}>
            ช่องนนทรี เขตยานนาวา กรุงเทพมหานคร 10120
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
            © 2022 RAPID GROUP CO., LTD | v1.0.0
          </span>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Footer;
