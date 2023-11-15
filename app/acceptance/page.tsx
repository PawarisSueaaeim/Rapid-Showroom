/* eslint-disable @next/next/no-img-element */
"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { daymontyearFormat } from "@/utils/dateHelper";
import html2canvas from "html2canvas";
import { Box, useMediaQuery } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { IoIosArrowDropright } from "react-icons/io";
import React from "react";

type Props = {};

export default function Acceptance({}: Props) {
  const searchParams = useSearchParams();
  const image = searchParams.get("img");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const submodel = searchParams.get("submodel");
  const plate_id = searchParams.get("plateId");
  const province = searchParams.get("province");
  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const map = searchParams.get("map");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  const captureScreenshot = () => {
    const targetElement = document.getElementById("data-car-selling");

    // @ts-ignore
    html2canvas(targetElement).then((canvas) => {
      const screenshotURL = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = screenshotURL;
      a.download = "screenshot.png";
      a.click();
    });
  };

  return (
    <Box
      id="data-car-selling"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={image ? image : ""} alt={"image-sell-car"} width={"100%"} />
        <Box
          display="flex"
          flexDirection={"column"}
          width={isMobileMode ? "100%" : "90%"}
        >
          <span className="fw-400 fs-20px">
            {brand} {model}
          </span>
          <span className="fs-18px">{submodel}</span>
          <span className="fs-18px">
            {plate_id} {province}
          </span>
          <span className="fs-18px">ราคาที่ได้รับ</span>
          <span className="fs-20px fw-400">Min: {minPrice} บาท</span>
          <span className="fs-20px fw-400">Max: {maxPrice} บาท</span>
          <br />
          <span className="fw-400 fs-20px">รายละเอียดการนัดหมาย</span>
          <span>
            <strong>สถานที่:</strong> {location}
          </span>
          <span>
            <strong>วัน:</strong> {daymontyearFormat(date)}
          </span>
          <span>
            <strong>เวลา:</strong> {time}
          </span>
          <span>
            <strong>แผนที่:</strong>{" "}
            <a className="tc-darkblue" href={map ? map : ""}>
              Google Maps
              <IoIosArrowDropright/>
            </a>
          </span>
        </Box>
      </Box>
      <br />
      <ButtonPleumDesign
        title={"บันทึกรูป"}
        backgroundBtnColor={ColorSet.btnGray}
        backgroundBtnHoverColor={ColorSet.btnGrayHover}
        textBtnColor={ColorSet.textBlack}
        onClick={captureScreenshot}
      />
    </Box>
  );
}
