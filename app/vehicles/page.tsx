import React from "react";
import { Box, Modal } from "@mui/material";
import { Search } from "@/components/modules";
import classes from "@/style/page/buycar/buycar.module.css";
import Link from "next/link";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { featureFlag } from "@/utils/dateHelper";
import CampaignIcon from '@mui/icons-material/Campaign';
import Image from "next/image";

type Props = {};

export default function Vehicles({}: Props) {
  return (
    <Box className={classes.container}>
      {featureFlag("2023-11-11") ? (
        <Box className={classes.featureflag}>
          <Modal
            open={true}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className={classes.announcement}>
              <Box display={"flex"} gap={2}>
                <Image src={"/icons/announcement.png"} alt="announcement" width={50} height={50}></Image>
                <h2 id="parent-modal-title">ประกาศ</h2>
              </Box>
              <span id="message">
                เปิดให้บริการหลังวันที่ 10 ธันวาคม พ.ศ. 2566
                สำหรับผู้ที่สนใจขายรถ คลิกปุ่มด้านล่าง
              </span>
              <Box marginTop={4}>
                <Link href={"/salecar"}>
                  <ButtonPleumDesign
                    title={"ขายรถ"}
                    backgroundBtnColor={ColorSet.btnWhite}
                    backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                    textBtnColor={ColorSet.textBlack}
                  />
                </Link>
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : (
        <>
          <Box className={classes.title_page}>
            <span className="fs-22px">Showroom</span>
          </Box>
          <Search />
        </>
      )}
    </Box>
  );
}
