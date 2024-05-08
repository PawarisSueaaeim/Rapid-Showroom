/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Grid } from "@mui/material";
import classes from "./home.module.css";
import { ShowcarSectionHome } from "@/components/modules/homePage";
import Image from "next/image";
import ButtonGroup from "@/components/modules/homePage/buttonGroup";

type Props = {};

export default function Home({}: Props) {
  return (
    <Box className={classes.home_container}>
      <Box className={classes.bg_image_01}>
        <Box className={classes.container_column}>
          <Box className={classes.title_1_page}>
            <span className="fs-24px">Thailand first Digital</span>
            <span className="fs-24px"> Pre-owned car center</span>
          </Box>
          <Box className={classes.subtitile_1_page}>
            <span className="tc-white fs-20px">
              ประสบการณ์ดีดี ซื้อขายรถที่นี่ ประทับใจแน่นอน
            </span>
            <span className="tc-white fs-20px">ผ่าน Platform Rapid Auto</span>
          </Box>
          <Box className={classes.btn_group}>
            <ButtonGroup />
          </Box>
        </Box>
      </Box>
      <Box className={classes.bg_image_02}>
        <Box className={classes.bg_container_2}>
          <div className="fs-24px fw-500">Rapid Certified Car</div>
          <span className="fs-16px">
            รับประกันคุณภาพ โดยผู้เชี่ยวชาญตรวจเช็คกว่า 50 รายการ
            ซื้อขายรถกับเรา ราคาดี ถูกใจ ไร้กังวล
          </span>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box className={classes.why_rapid}>
                <span className="fs-22px">ซื้อรถกับ Rapid Auto นัดพบจบเลย</span>
                <Box className={classes.why_rapid_list}>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-wing.png"
                      alt="icon-wing"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">สภาพนางฟ้า</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-thumbs-up.png"
                      alt="icon-thump-up"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">งานดี ไม่มีย้อมแมว</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-cash-flow.png"
                      alt="icon-cash-flow"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">จัด โอน จบแน่นอน</span>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.sell_with_rapid}>
                <span className="fs-22px">
                  ขายรถกับ Rapid Auto จบใน 45 นาที
                </span>
                <Box className={classes.why_rapid_list}>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-best-price.png"
                      alt="icon-best-price"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">ราคาโคตรดี</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-money.png"
                      alt="icon-money"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">รับเงินทันที</span>
                  </Box>
                  <Box className={classes.icon_with_text}>
                    <Image
                      src="/icons/icon-checkhand.png"
                      alt="icon-checkhand"
                      width={50}
                      height={50}
                    />
                    <span className="fs-16px">ที่นี่ที่เดียว</span>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.btn_container}>
          <Box className={classes.btn_group}>
            <ButtonGroup />
          </Box>
        </Box>
      </Box>
      <Box className={classes.bg_image_03}>
        <Box className={classes.backdropGray}>
          <ShowcarSectionHome />
        </Box>
      </Box>
    </Box>
  );
}
