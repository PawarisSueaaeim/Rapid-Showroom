"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

type Props = {};

export default function Info({}: Props) {
  let dataInfo;
  if (typeof window !== "undefined" && window.localStorage) {
    const json = localStorage.getItem("info") || "";
    dataInfo = JSON.parse(json);
  } else {
    console.error("localStorage is not available");
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: ColorSet.bgGray,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        style={{
          boxShadow: "1px 2px 3px 1.5px rgba(0,0,0,0.5)",
          borderRadius: "10px",
          backgroundColor: ColorSet.bgWhite,
          width: "100%",
          height: "60%",
          padding: "3rem",
          margin: "1rem",
        }}
      >
        {dataInfo && (
          <Box display={"flex"} flexDirection={"column"}>
            <Avatar
              alt={dataInfo.name}
              src={dataInfo.avatar ? dataInfo.avatar : "/broken-image.jpg"}
              sx={{ width: 100, height: 100 }}
            />
            <br/>
            <span>ชื่อ: {dataInfo.name}</span>
            <span>เบอร์โทร: {dataInfo.phone_no}</span>
            <span>อีเมล: {dataInfo.email}</span>
            <span>เลขบัญชี: {dataInfo.bank_account_number}</span>
            <span>ที่อยู่: {dataInfo.address}</span>
            <Box display={"flex"} gap={1} marginTop={20}>
            <Link href={"/sellinfo"}>
              <ButtonPleumDesign
                title={"จัดการขายรถ"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
            <Link href={"/buyinfo"}>
              <ButtonPleumDesign
                title={"จัดการซื้อรถ"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
              />
            </Link>
            </Box>
            
          </Box>
          
        )}
      </Box>
    </Box>
  );
}
