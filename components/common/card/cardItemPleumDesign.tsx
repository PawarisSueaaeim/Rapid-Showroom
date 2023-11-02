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
        position: "relative",
        padding: isMobileMode ? "10px 2px" : "10px 8px",
        boxShadow: isMobileMode ? "none" : "0px 1px 5px 0.25px #777",
      }}
    >
        <Box
          position={"relative"}
          style={{
            width: "100%",
            height: 100,
          }}
        >
          <Image
            src={image ? image : "/images/image-mockup-car.png"}
            layout="fill"
            objectFit="cover"
            alt={`${brand}-${model}-${submodel}-${vehicle_id}`}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
        >
          <span className="fs-18px text-upper">
            <strong>
              {brand} {model}
            </strong>
          </span>
          <span className="fs-12px">
            Year: <span className="fw-400">{year}</span>
          </span>
          <span className="fs-12px">
            Submodel: <span className="fw-400">{submodel}</span>
          </span>
          <span className="fs-12px">
            mileage: <span className="fw-400">{currency(mileage, 0)} km</span>
          </span>
          <span className="fs-16px tc-blue">
            <strong>Price: {currency(price, 0)} Baht</strong>
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
          <Link href={`/vehicles/${vehicle_id}`}>
            <span>ดูเพิ่มเติม</span>
          </Link>
        </Box>
    </Box>
  );
}
