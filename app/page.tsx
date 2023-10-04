import React, { Fragment } from "react";
import { Box, Grid } from "@mui/material";
import classes from "@/style/page/home.module.css";
import {
  Carousel,
  Certified,
  WhyRapid,
  SalecarWithRapid,
  ContactSection,
  ShowcarSection,
} from "@/components/modules";
import Image from "next/image";

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
      <Box className={classes.container} style={backgroundImageHome}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={2}
          marginTop={18}
        >
          <strong className={classes.primary_text}>
            เราคือศูนย์ซื้อขายรถยนต์มือสองแบบดิจิทัล
          </strong>
          <span className="fs-12px">
            ทีจะมอบประสบการณ์การซื้อขายรถยนต์แบบ O2O (online to offline)
            เต็มรูปแบบแห่งแรกในประเทศไทย
          </span>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Carousel />
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
      <ShowcarSection />
    </Fragment>
  );
}
