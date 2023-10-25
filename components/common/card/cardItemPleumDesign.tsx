"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMediaQuery } from "@mui/material";
import { currency } from "@/utils/currency";

type Props = {
  vehicle_id: string;
  brand?: string;
  model: string;
  submodel: string;
  price: number;
  mileage: number;
  year?: string;
  image: string;
};

export default function CardItem({
  vehicle_id,
  brand,
  model,
  submodel,
  price,
  mileage,
  year,
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
        // src={image ? image : "/images/image-mockup-car.png"}
        // src={"/images/image-car-01.png"}
        src={image}
        width={160}
        height={100}
        alt={image}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        paddingLeft={3}
      >
        <span className="fs-18px text-upper">
          {/* <strong>{brand} {model}</strong> */}
          <strong>{brand} {model}</strong>
        </span>
        {/* <span className="fs-12px">ปี: {year}</span> */}
        <span className="fs-12px">Year: <span className="fw-400">{year}</span></span>
        {/* <span className="fs-12px text-upper">{submodel}</span> */}
        <span className="fs-12px">Submodel: <span className="fw-400">{submodel}</span></span>
        <span className="fs-12px">mileage: <span className="fw-400">{mileage} km</span></span>
        {/* <span className="fs-12px">เลขไมล์: {currency(mileage, 0)} Km</span> */}
        <span className="fs-16px tc-blue">
          {/* <strong>{currency(price, 0)} บาท</strong> */}
          <strong>Price: {price} Baht</strong>
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
