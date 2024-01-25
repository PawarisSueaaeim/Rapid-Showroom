"use client";
import { ButtonCapsule, ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box, Divider, Grid, Modal, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { daymontyearFormat } from "@/utils/dateHelper";
import Link from "next/link";
import classes from "@/style/page/booksuccess/booksuccess.module.css";
import { currency } from "@/utils/currency";

type Props = {};

export default function rentsuccess({}: Props) {
  const bookingData = useSelector((state: any) => state.deposit);
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const year = searchParams.get("year");
  const plateId = searchParams.get("plateId");
  const price = searchParams.get("price");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const longTime = searchParams.get("longTime");
  const locationPick = searchParams.get("locationPick");
  const locationReturn = searchParams.get("locationReturn");
  const ref = searchParams.get("ref");
  //   const deposit = searchParams.get("deposit");
  //   const deposit_status = searchParams.get("deposit_status");

  const [openQRcodeLine, setOpenQRcodeLine] = useState(false);

  const captureScreenshot = async () => {
    const targetElement = document.getElementById("data-car-booking");
    //@ts-ignore
    const canvas = await html2canvas(targetElement);

    const screenshotURL = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = screenshotURL;
    a.download = "screenshot.png";
    a.click();
  };

  const formatted_time = time ? time.substring(0, 5) : "";

  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Image
        src="/icons/icon-success.png"
        alt="icon-success"
        width={70}
        height={70}
      />
      <span className="fs-32px tc-darkBlue m-2">ส่งข้อมูลสำเร็จ</span>
      <span className="fs-16px">กรุณาไปตามเวลานัดหมาย</span>
      <Box id="data-car-booking" marginTop={4} width={"100%"}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-end" },
              }}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <span className="fs-20px fw-400">
                  {brand} {model} {year}
                </span>
                <span className="fs-18px">
                  <strong>เลขอ้างอิง: </strong>
                  {ref}
                </span>
                <span className="fs-16px">
                  <strong>ทะเบียน: </strong>
                  {plateId}
                </span>
                <span className="fs-16px">
                  <strong>ราคา: </strong>
                  {currency(price, 0)} บาท
                </span>
                {/* <span className="fs-16px">
                    <strong>มัดจำ: </strong>
                    {deposit ? deposit : "0"} บาท{" "}
                    <strong className="tc-green">
                      {deposit_status === "paid" ? "จ่ายแล้ว" : ""}
                    </strong>
                  </span> */}
                <span>
                  <strong>สถานที่รับรถ: </strong>
                  {locationPick}
                </span>
                <span className="fw-400">
                  <strong>เวลานัดรับรถ</strong>
                </span>
                <span>
                  <strong>วันที่: </strong>
                  {daymontyearFormat(date)}
                </span>
                <span>
                  <strong>เวลา: </strong>
                  {formatted_time} น.
                </span>
                <span>
                  <strong>ระยะเวลาเช่ารถ: </strong>
                  {longTime} เดือน
                </span>
                <span>
                  <strong>สถานที่คืนรถ: </strong>
                  {locationReturn}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <span className="fs-20">
                  <strong>เอกสารที่ต้องเตรียม</strong>
                </span>
                <span>1. สำเนาบัตรประชาชน 1 ฉบับ</span>
                <span>2. สำเนาใบขับขี่ 1 ฉบับ</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={2}>
        <ButtonPleumDesign
          title={"บันทึกรูป"}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
          onClick={captureScreenshot}
        />
      </Box>
      {/* {member === "true" ? null : (
        <>
          <Box width={"100%"} marginTop={2}>
            <Divider>Register</Divider>
          </Box>
          <Box marginTop={2}>
            <Box marginTop={2} width={200}>
              <Link href={`/createpassword?email=${email}&name=${name}`}>
                <ButtonCapsule
                  title={"Sign Up"}
                  fontWeight={400}
                  bgColor={"#1A417B"}
                  color={"#fff"}
                />
              </Link>
            </Box>
            <Box marginTop={2} width={200}>
              <Link href="/login">
                <ButtonCapsule
                  title={"Sign In"}
                  fontWeight={400}
                  bgColor={"#1A417B"}
                  color={"#fff"}
                />
              </Link>
            </Box>
            <Box marginTop={2} width={200}>
              <Link href="/">
                <ButtonCapsule
                  title={"Skip"}
                  fontWeight={400}
                  bgColor={"#1A417B"}
                  color={"#fff"}
                />
              </Link>
            </Box>
            <Box marginTop={2} width={200}>
              <ButtonCapsule
                title={"LINE"}
                fontWeight={500}
                bgColor={"#00B900"}
                color={"#fff"}
                onClick={() => {
                  setOpenQRcodeLine(true);
                }}
              />
            </Box>
          </Box>
        </>
      )}
      <Modal
        open={openQRcodeLine}
        onClose={() => {
          setOpenQRcodeLine(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.announcement}>
          <Box display={"flex"} gap={2}>
            <h2 id="parent-modal-title">LINE Rapid Auto</h2>
          </Box>
          <Box marginTop={4}>
            <Image
              src={"/images/qrcode-rapid.png"}
              alt="line-qrcode"
              width={250}
              height={250}
            />
          </Box>
        </Box>
      </Modal> */}
    </Box>
  );
}
