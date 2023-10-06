/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { Box, Grid } from "@mui/material";
import classes from "@/style/page/home.module.css";
import {
  Certified,
  WhyRapid,
  SalecarWithRapid,
  ContactSection,
  ShowcarSection,
  Carousel,
} from "@/components/modules";

type Props = {};

export default function Home({}: Props) {
  const backgroundImageHome = {
    backgroundImage: 'url("../images/bg-desktop-main.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Fragment>
      <img
        src="/images/strip-top.png"
        alt="strip-top"
        style={{
          position: "absolute",
          width: "100%",
          height: "150px",
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      />

      <Box
        style={{
          ...backgroundImageHome,
          paddingBottom: "1.5rem",
        }}
      >
        <Box
          style={{
            position: "relative",
            zIndex: 9,
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            padding={2}
            paddingTop={18}
          >
            <strong className={classes.primary_text}>
              เราคือศูนย์ซื้อขายรถยนต์มือสองแบบดิจิทัล
            </strong>
            <span className="fs-12px">
              ทีจะมอบประสบการณ์การซื้อขายรถยนต์แบบ O2O (online to offline)
              เต็มรูปแบบแห่งแรกในประเทศไทย
            </span>
            <Carousel/>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Certified />
            </Grid>
            <Grid item xs={12} md={6}>
              <WhyRapid />
            </Grid>
          </Grid>
          <SalecarWithRapid />
          <ContactSection />
        </Box>
      </Box>
      <ShowcarSection />
      <img
        src="/images/strip-mid.png"
        alt="strip-top"
        style={{
          position: "absolute",
          width: "100%",
          height: "452px",
          zIndex: 1,
          top: "65%",
          left: 0,
        }}
      />
      <img
        src="/images/strip-bottom.png"
        alt="strip-top"
        style={{
          position: "absolute",
          width: "100%",
          height: "636px",
          zIndex: 1,
          top: "148%",
          left: 0,
        }}
      />
    </Fragment>
  );
}
