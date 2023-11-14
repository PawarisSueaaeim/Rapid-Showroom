/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box } from "@mui/material";
import classes from "@/style/components/common/card/cardAccept.module.css";
import Image from "next/image";
import { currency } from "@/utils/currency";

type Props = {
  brand: string,
  model: string,
  subModel: string,
  licensePlate: string,
  province: string,
  minPrice: number,
  maxPrice: number,
  image: string,
};

export default function CardAccept({brand, model, subModel, licensePlate, province, minPrice, maxPrice, image}: Props) {
  return (
    <Box className={classes.container}>
      <Box className={classes.image_container}>
        <img
          src={image}
          alt="image-mockup"
          width={"100%"}
        />
      </Box>
      <Box className={classes.data_model}>
        <span className="fs-20px tc-black fw-400">{brand} {model} {subModel}</span>
        <span className="fs-14px tc-black">ทะเบียน: {licensePlate} {province}</span>
        <br/>
        <span className="fs-16px fw-400 tc-black">ราคาที่ได้รับ</span>
        <span className="fs-16px tc-black">Min: <strong>{minPrice ? currency(minPrice,0) : "กำลังประเมินราคา"}</strong> บาท</span>
        <span className="fs-16px tc-black">Max: <strong>{maxPrice ? currency(maxPrice,0) : "กำลังประเมินราคา"}</strong> บาท</span>
      </Box>
    </Box>
  );
}
