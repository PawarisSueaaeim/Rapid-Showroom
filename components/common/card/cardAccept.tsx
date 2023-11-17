/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box } from "@mui/material";
import classes from "@/style/components/common/card/cardAccept.module.css";
import { currency } from "@/utils/currency";

type Props = {
  brand: string;
  model: string;
  subModel: string;
  licensePlate: string;
  province: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  mileage: string;
  color: string;
  year: string;
};

export default function CardAccept({
  brand,
  model,
  subModel,
  licensePlate,
  province,
  minPrice,
  maxPrice,
  image,
  mileage,
  color,
  year,
}: Props) {
  return (
    <Box className={classes.container}>
      <Box className={classes.image_container}>
        <img src={image} alt="image-mockup" width={"auto"} height={"200px"} />
      </Box>
      <Box className={classes.data_model}>
        <span className="fs-20px tc-black fw-400">
          {brand} {model} {subModel}
        </span>
        <span className="fs-16px">
          <strong>ปี: </strong>
          {year}
        </span>
        <span className="fs-16px">
          <strong>สี: </strong>
          {color}
        </span>
        <span className="fs-16px">
          <strong>เลขไมล์:</strong> {currency(mileage, 0)} กิโลเมตร
        </span>
        <span className="fs-16px">
          <strong>ทะเบียน:</strong> {licensePlate} {province}
        </span>
        <br />
        <span className="fs-16px fw-400">ราคาที่ได้รับ</span>
        <span className="fs-16px">
          {" "}
          <strong>Min: </strong>
          {minPrice ? <>{currency(maxPrice, 0)} บาท</> : "กำลังประเมินราคา"}
        </span>
        <span className="fs-16px">
          {" "}
          <strong>Max: </strong>
          {maxPrice ? <>{currency(maxPrice, 0)} บาท</> : "กำลังประเมินราคา"}
        </span>
      </Box>
    </Box>
  );
}
