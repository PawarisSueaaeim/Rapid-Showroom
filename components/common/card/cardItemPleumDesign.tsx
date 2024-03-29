/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Link from "next/link";
import { Box, useMediaQuery } from "@mui/material";
import { currency } from "@/utils/currency";
import { ButtonPleumDesign } from "../button";
import { ColorSet } from "@/constants";

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
      justifyContent={"space-between"}
      bgcolor={"#fff"}
      style={{
        borderRadius: isMobileMode ? 0 : "15px",
        position: "relative",
        padding: "10px 8px",
        boxShadow: isMobileMode ? "none" : "0px 1px 5px 0.25px #D9D9D9",
        border: isMobileMode ? "0.1px solid #D9D9D9" : "",
        height: "100%",
      }}
    >
      <Box
        style={{
          width: "100%",
        }}
      >
        <img
          src={image ? image : "/images/no_image.jpg"}
          width={"100%"}
          alt={`${brand}-${model}-${submodel}-${vehicle_id}`}
        />
      </Box>

      <Box width={"100%"}>
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
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
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          marginRight={3}
          style={{
            color: "#000",
            fontSize: "12px",
            marginTop: "10px",
          }}
        >
          <Link href={`/vehicles/${vehicle_id}`}>
            <ButtonPleumDesign
              title={"ดูเพิ่มเติม"}
              backgroundBtnColor={ColorSet.btnWhite}
              backgroundBtnHoverColor={ColorSet.btnWhiteHover}
              textBtnColor={ColorSet.textBlack}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
