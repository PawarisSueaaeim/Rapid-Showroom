/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { Box, Grid, TableBody, Typography } from "@mui/material";
import classes from "@/style/page/home.module.css";
import {
  Certified,
  WhyRapid,
  SalecarWithRapid,
  ContactSection,
  ShowcarSection,
} from "@/components/modules";
import { AutoCarousel } from "@/components/common/carousel";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";

const images = [
  {
    id: 0,
    alt: "image-car-01",
    src: "/images/image-car-01.png",
  },
  {
    id: 1,
    alt: "image-car-02",
    src: "/images/image-car-02.png",
  },
  {
    id: 2,
    alt: "image-car-03",
    src: "/images/image-car-03.png",
  },
  {
    id: 3,
    alt: "image-car-04",
    src: "/images/image-car-04.png",
  },
];

type Props = {};

export default function Home({}: Props) {
  return (
    <Fragment>
      <Box className={classes.bgImage01}>
        <Box className={classes.container_column}>
          <Box className={classes.title_1_page}>
            <span className="tc-blue fs-24px">
              เราคือศูนย์ซื้อขายรถยนต์มือสอง
            </span>
            <span className="tc-blue fs-24px">แบบดิจิทัล</span>
          </Box>
          <Box className={classes.subtitile_1_page}>
            <span className="tc-white fs-20px">
              ที่จะมอบประสบการณ์การซื้อขายรถยนต์
            </span>
            <span className="tc-white fs-20px">
              แบบ O2O (Online to Offline) เต็มรูปแบบแห่งแรกในประเทศไทย
            </span>
          </Box>

          <Box className={classes.btn_1_page}>
            <ButtonPleumDesign
              title={"ซื้อรถ"}
              bgColor={ColorSet.btnWhite}
              bgHoverColor={ColorSet.btnWhiteHover}
              textcolor={ColorSet.textBlack}
            />
            <ButtonPleumDesign
              title={"ขายรถ"}
              bgColor={ColorSet.btnGray}
              bgHoverColor={ColorSet.btnGrayHover}
              textcolor={ColorSet.textBlack}
            />
          </Box>
        </Box>
      </Box>
      <Box className={classes.bgImage02}>
        <Box className={classes.backdropWhite}>
          <Box className={classes.title_2_page}>
            <span className="fs-24px fw-500">Rapid Certified car</span>
            <span className="fs-20px">
              รัปประกันคุณภาพ ด้วยการตรวจเช็คสภาพกว่า 50 จุดจากผู้ชำนาญการ
            </span>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className={classes.why_rapid}>
                  <span className="fs-24px fw-500">ทำไมต้อง Rapid Auto</span>
                  <Typography className={classes.why_rapid_list}>
                    <span className="fs-16px">รถสวย</span>
                    <span className="fs-16px">ไม่ย้อมแมว</span>
                    <span className="fs-16px">เรามั่นใจในคุณภาพ</span>
                    <span className="fs-16px">การการันตีคืนเงิน</span>
                    <span className="fs-16px">รับประกับ 1 ปี</span>
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bgImage03}>
        <Box className={classes.backdropGray}></Box>
      </Box>
    </Fragment>
  );
}
