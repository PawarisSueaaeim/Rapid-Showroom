import React from "react";
import { Box } from "@mui/material";
import classes from "@/style/components/common/card/cardAccept.module.css";
import Image from "next/image";
import { min } from "moment";

type Props = {
  brand: string,
  model: string,
  subModel: string,
  licensePlate: string,
  province: string,
  minPrice: number,
  maxPrice: number,
};

export default function CardAccept({brand, model, subModel, licensePlate, province, minPrice, maxPrice}: Props) {
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
        <span className="fs-20px tc-black fw-400">{brand} {model} {subModel}</span>
        <span className="fs-14px tc-black">ทะเบียน: {licensePlate} {province}</span>
        <br/>
        <span className="fs-16px fw-400 tc-black">ราคาที่ได้รับ</span>
        <span className="fs-16px tc-black">Min: <strong>{minPrice ? minPrice : "กำลังประเมินราคา..."}</strong> บาท</span>
        <span className="fs-16px tc-black">Max: <strong>{maxPrice ? maxPrice : "กำลังประเมินราคา..."}</strong> บาท</span>
      </Box>
    </Box>
  );
}
