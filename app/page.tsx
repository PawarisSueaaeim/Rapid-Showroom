import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import classes from "@/style/page/home.module.css";
import Carousel from "@/components/modules/corousel";
import Image from "next/image";

type Props = {};

export default function Home({}: Props) {
  const backgroundImageHome = {
    backgroundImage: 'url("../images/bg01.png")',
    backgroundSize: "cover",
  };

  return (
    <Box className={classes.container} style={backgroundImageHome}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        padding={2}
        marginTop={18}
      >
        <strong className={classes.primary_text}>
          เราคือศูนย์ซื้อขายรถยนต์มือสองแบบดิจิทัล
        </strong>
        <span className="fs-12px">
          ทีจะมอบประสบการณ์การซื้อขายรถยนต์แบบ O2O (online to offline)
          เต็มรูปแบบแห่งแรกในประเทศไทย
        </span>
      </Box>
      <Carousel />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        marginTop={4}
      >
        <Typography fontSize={30} fontWeight={700} color={"#000"}>
          Rapid Certified car
        </Typography>
        <span>รับประกันคุณภาพ</span>
        <span>ด้วยการตรวจเช็คสภาพกว่า….จุดจากผู้ชำนาญการ</span>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          gap={3}
          marginRight={20}
        >
          <Image
            src="/images/image-car-02.png"
            alt="image-car-02"
            width={351}
            height={260}
            className={classes.image_car_02}
          />
          <Link href="/buycar" className={classes.box_btn_homepage}>
            <Image
              src="/icons/icon-buycar.png"
              alt="icon-buycar"
              width={115}
              height={113}
            />
            <span>BUY CAR</span>
          </Link>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        marginTop={2}
      >
        <span className="fs-20px">ทำไมต้อง Rapid Auto</span>
        <Box display={"flex"} alignItems={"center"} gap={6} paddingTop={3}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-reward.png"
              alt="icon-reward"
              width={91}
              height={91}
            />
            <span className="fs-12px">เรามั่นใจในคุณภาพ</span>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-carclean.png"
              alt="icon-reward"
              width={91}
              height={91}
            />
            <span className="fs-12px">รถสวย</span>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-carcheck.png"
              alt="icon-reward"
              width={91}
              height={91}
            />
            <span className="fs-12px">ไม่ย้อมแมว</span>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={8} marginTop={4}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-check.png"
              alt="icon-check"
              width={91}
              height={91}
            />
            <span className="fs-12px">รับประกัน...ปี</span>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-givemoney.png"
              alt="icon-givemoney"
              width={91}
              height={91}
            />
            <span className="fs-12px">การันตีคืนเงิน</span>
          </Box>
        </Box>
        <Box
          position={"relative"}
          overflow={"hidden"}
          width={440}
          marginTop={4}
          left={-25}
        >
          <Image
            src="/images/image-car-03.png"
            alt="image-car-03"
            width={455}
            height={160}
          />
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} margin={3}>
        <span className="fs-24px">
          ขายรถกับ<span className="fw-400"> Rapid Auto</span>
        </span>
        <span className="fs-16px m-2">
          เปิดประสบการณ์การขายรถรูปแบบใหม่ที่เดียวในโลก
        </span>
        <span className="fs-16px">เพียงแค่ปลายนิ้วสัมผัส</span>
        <Box display={"flex"} justifyContent={"center"} marginTop={3} gap={10}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-moneydow.png"
              alt="icon-moneydow"
              width={70}
              height={70}
            />
            <span className="fs-12px">การันตีราคาเหมาะสม</span>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src="/icons/icon-checkhand.png"
              alt="icon-checkhand"
              width={70}
              height={70}
            />
            <span className="fs-12px">รับซื้อจบใน 45 นาที</span>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={4}
          marginBottom={2}
        >
          <Image
            src="/icons/icon-holdmoney.png"
            alt="icon-holdmoney"
            width={70}
            height={70}
          />
          <span className="fs-12px">รับเงินทันที หลังเซ็นสัญญา</span>
        </Box>
        <Link href="/salecar" className={classes.box_btn_homepage}>
          <Image
            src="/icons/icon-sellcar.png"
            alt="icon-sellcar"
            width={122}
            height={120}
          />
          <span>SELL CAR</span>
        </Link>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={380}
      >
        <Image
          src="/images/image-car-04.png"
          alt="image-car-04.png"
          width={400}
          height={207}
        />
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Link href="/about" className={classes.box_btn_homepage}>
            <Image
              src="/icons/icon-about.png"
              alt="icon-about"
              width={56}
              height={56}
            />
            <span className="fs-12px">About Us</span>
          </Link>
          <Link href="/contact" className={classes.box_btn_homepage}>
            <Image
              src="/icons/icon-contact.png"
              alt="icon-sellcar"
              width={56}
              height={56}
            />
            <span className="fs-12px">Contact Us</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
