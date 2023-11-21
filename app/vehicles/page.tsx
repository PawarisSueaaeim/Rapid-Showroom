import React from "react";
import { Box, Modal } from "@mui/material";
import { Search } from "@/components/modules";
import classes from "@/style/page/buycar/buycar.module.css";
import { BasicModal } from "@/components/common/modal";
import Link from "next/link";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";

type Props = {};

export default function Vehicles({}: Props) {
  return (
    <Box className={classes.container}>
      {true ? (
        <Box className={classes.featureflag}>
          <Modal
            open={true}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className={classes.announcement}>
              <h2 id="parent-modal-title">ประกาศ</h2>
              <h5 id="message">
                เปิดให้บริการหลังวันที่ 10 ธันวาคม พ.ศ. 2566
                สำหรับผู้ที่สนใจขายรถ คลิกปุ่มด้านล่าง
              </h5>
              <Link href={"/salecar"}>
                <ButtonPleumDesign
                  title={"ขายรถ"}
                  backgroundBtnColor={ColorSet.btnWhite}
                  backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                  textBtnColor={ColorSet.textBlack}
                />
              </Link>
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
