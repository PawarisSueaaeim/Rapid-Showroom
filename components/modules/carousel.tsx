"use client";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "@/style/components/module/corousel.module.css";

type Props = {};

export default function Carousel({}: Props) {
  const [slide, setSlide] = useState("1");
  const isMobileMode = useMediaQuery("(max-width:600px)");

  const images = [
    {
      id: "1",
      alt: "image-car-01",
      src: "/images/image-car-01.png",
    },
    {
      id: "2",
      alt: "image-car-02",
      src: "/images/image-car-02.png",
    },
    {
      id: "3",
      alt: "image-car-03",
      src: "/images/image-car-03.png",
    },
    {
      id: "4",
      alt: "image-car-04",
      src: "/images/image-car-04.png",
    },
  ];

  useEffect(() => {
    // ตั้งเวลาในการเปลี่ยนรูปทุก 10 วินาที
    const timer = setInterval(() => {
      // หาค่า id ของรูปถัดไป
      const nextSlideId = slide === "4" ? "1" : String(parseInt(slide, 10) + 1);
      setSlide(nextSlideId);
    }, 5000); // 1000 = 1s

    // เริ่มนับใหม่เมื่อ component ถูก unmount
    return () => {
      clearInterval(timer);
    };
  }, [slide]);

  return (
    <Box className={classes.carousel}>
      <Box width={isMobileMode ? "100%" : "50%"} margin={2}>
        {images.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.src}
              alt={image.alt}
              width={390}
              height={300}
              className={
                slide === image.id ? classes.slide : classes.slide_hidden
              }
            />
          );
        })}
      </Box>
      <span className={classes.indicators}>
        {images.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => setSlide(item.id)}
              className={
                slide === item.id ? classes.indicator_active : classes.indicator
              }
            />
          );
        })}
      </span>
    </Box>
  );
}
