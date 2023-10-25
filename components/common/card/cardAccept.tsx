import React from "react";
import { ButtonPleumDesign } from "../button";
import { ColorSet } from "@/constants";
import { Box } from "@mui/material";
import classes from "@/style/components/common/card/cardAccept.module.css";
import Image from "next/image";

type Props = {};

export default function CardAccept({}: Props) {
  return (
    <Box className={classes.container}>
      <Box className={classes.image_container}>
        <Image
          src="/images/image-car-01.png"
          alt="image-mockup"
          width={300}
          height={200}
        />
      </Box>
      <Box className={classes.data_model}>
        <span className="fs-20px tc-black fw-400">BMW series 3 sedan</span>
        <span className="fs-14px tc-black">ทะเบียน: สส8888 กรุงเทพฯ</span>

        <span className="fs-16px fw-400 tc-black">ราคาที่ได้รับ</span>
        <span className="fs-16px fw-400 tc-black">min: 800,000 บาท</span>
        <span className="fs-16px fw-400 tc-black">max: 1,000,000 บาท</span>
      </Box>
      <Box className={classes.btn_container}>
        <ButtonPleumDesign
          title={"ยอมรับ"}
          width={100}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
        <ButtonPleumDesign
          title={"ไม่ยอมรับ"}
          width={100}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
        />
        <ButtonPleumDesign
          title={"ยกเลิก"}
          width={100}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
      </Box>
    </Box>
  );
}
