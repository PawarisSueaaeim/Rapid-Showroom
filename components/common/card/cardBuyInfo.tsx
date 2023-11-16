/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/card/cardAccept.module.css";
import { currency } from "@/utils/currency";
import { daymontyearFormat } from "@/utils/dateHelper";

type Props = {
  image: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  bookDate: string;
  location: string;
  depositAmount: string;
  status: string;
  onClick?: (event: Event) => void;
};

export default function CardBuyInfo({
  image,
  brand,
  model,
  year,
  color,
  bookDate,
  location,
  depositAmount,
  status,
  onClick,
}: Props) {
  const [date_part, time_part] = bookDate.split(" ");
  const formatted_time = time_part.substring(0, 5);
  return (
    <Box className={classes.container}>
      <Box className={classes.image_container}>
        <img src={image} alt="image-mockup" width={"100%"} />
      </Box>
      <Box className={classes.data_model}>
        <span className="fs-20px fw-400">
          {brand} {model}
        </span>
        <span className="fs-16px"><strong>ปี:</strong> {year}</span>
        <span className="fs-16px"><strong>สี:</strong> {color}</span>
        <span className="fs-16px"><strong>สถานที่:</strong> {location}</span>
        <span className="fs-16px"><strong>วันที่นัดหมาย:</strong> {daymontyearFormat(date_part)}</span>
        <span className="fs-16px"><strong>เวลานัดหมาย:</strong> {formatted_time} น.</span>
        <span className="fs-16px"><strong>มัดจำ:</strong> {currency(depositAmount,0)} บาท</span>
      </Box>
      <Box className={classes.status}>
        <span className="fs-20px fw-400">{status === "close" ? "รายการสำเร็จ" : "กำลังดำเนินการ"}</span>
      </Box>
    </Box>
  );
}
