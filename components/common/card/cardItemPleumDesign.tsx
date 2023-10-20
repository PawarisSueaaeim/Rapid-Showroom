"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMediaQuery } from "@mui/material";
import { currency } from "@/utils/currency";

type Props = {
  vehicle_id: string;
  model: string;
  submodel: string;
  price: number;
  mileage: number;
  image: string;
};

export default function CardItem({
  vehicle_id,
  model,
  submodel,
  price,
  mileage,
  image,
}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor={"#fff"}
      style={{
        borderRadius: isMobileMode ? 0 : "15px",
        border: "none",
        padding: "10px 4px 10px 4px",
      }}
    >
      <Image
        src={image ? image : "/images/image-mockup-car.png"}
        width={190}
        height={120}
        alt={image}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        paddingLeft={3}
      >
        <span className="fs-18px text-upper">
          <strong>{model}</strong>
        </span>
        <span className="fs-12px text-upper">{submodel}</span>
        <span className="fs-12px">เลขไมล์: {currency(mileage)} Km</span>
        <span className="fs-18px tc-blue">
          <strong>{currency(price)} บาท</strong>
        </span>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        width={"100%"}
        marginRight={3}
        style={{
          color: "#000",
          fontSize: "12px",
        }}
      >
        <Link href={`/buycar/${vehicle_id}`}>
          <span>ดูเพิ่มเติม</span>
        </Link>
      </Box>
    </Box>
  );
}
