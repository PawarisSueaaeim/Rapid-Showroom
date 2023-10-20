/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { Box, Grid } from "@mui/material";
import classes from "@/style/page/home.module.css";
import {
  ShowcarSectionHome,
} from "@/components/modules";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Home({}: Props) {
  return (
    <Box>
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
            <Link href={"/buycar"}>
              <ButtonPleumDesign
                title={"ซื้อรถ"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
            <Link href={"/salecar"}>
              <ButtonPleumDesign
                title={"ขายรถ"}
                backgroundBtnColor={ColorSet.btnGray}
                backgroundBtnHoverColor={ColorSet.btnGrayHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bgImage02}>
        <Box className={classes.backdropWhite}>
          <Box className={classes.title_2_page}>
            <span className="fs-24px fw-500">Rapid Certified car</span>
            <span className="fs-16px">
              รัปประกันคุณภาพ ด้วยการตรวจเช็คสภาพกว่า 50 จุดจากผู้ชำนาญการ
            </span>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box className={classes.why_rapid}>
                  <span className="fs-22px">ทำไมต้อง Rapid Auto</span>
                  <Box className={classes.why_rapid_list}>
                    <span className="fs-16px">รถสวย</span>
                    <span className="fs-16px">ไม่ย้อมแมว</span>
                    <span className="fs-16px">เรามั่นใจในคุณภาพ</span>
                    <span className="fs-16px">การการันตีคืนเงิน</span>
                    <span className="fs-16px">รับประกับ 1 ปี</span>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className={classes.sell_with_rapid}>
                  <span className="fs-22px">ขายรถกับ Rapid Auto</span>
                  <span className="fs-16px">
                    เปิดประสบการณ์การขายรถรูปแบบใหม่ที่เดียวในโลก
                    เพียงแค่ปลายนิ้วสัมผัส
                  </span>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-moneydow.png"
                      alt="icon-moneydow"
                      width={50}
                      height={50}
                    />
                    <span className="fs-14px">การรันตีราคาเหมาะสม</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-givemoney.png"
                      alt="icon-givemoney"
                      width={50}
                      height={50}
                    />
                    <span className="fs-14px">รับเงินทันที่หลังเซ็นสัญญา</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-checkhand.png"
                      alt="icon-checkhand"
                      width={50}
                      height={50}
                    />
                    <span className="fs-14px">รับซื้อจบใน 45 นาที</span>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.btn_2_page}>
            <Link href={"/buycar"}>
              <ButtonPleumDesign
                title={"ซื้อรถ"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
            <Link href={"/salecar"}>
              <ButtonPleumDesign
                title={"ขายรถ"}
                backgroundBtnColor={ColorSet.btnGray}
                backgroundBtnHoverColor={ColorSet.btnGrayHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bgImage03}>
        <Box className={classes.backdropGray}>
          <ShowcarSectionHome />
          <Box className={classes.btn_3_page}>
            <Link href={"./buycar"}>
              <ButtonPleumDesign
                title={"ดูรถยอดนิยมเพิ่มเติม"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
