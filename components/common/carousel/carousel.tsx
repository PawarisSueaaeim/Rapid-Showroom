/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import classes from "@/style/components/module/carousel.module.css";
import SwipeableViews from "react-swipeable-views";

type Props = {
  images: Array<{
    sv_img_id: number;
    name: string;
    path: string;
  }>;
};

export default function Carousel({ images }: Props) {
  const [imageId, setImageId] = useState(0);

  const handleStepChange = (step: number) => {
    setImageId(step);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <SwipeableViews
        enableMouseEvents
        onChangeIndex={handleStepChange}
        index={imageId}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((item) => (
          <img
            key={item.sv_img_id}
            className={classes.img_slider}
            alt={item.path}
            src={item.path}
          />
        ))}
      </SwipeableViews>

      <span className={classes.indicators}>
        {images.map((item) => {
          return (
            <button
              key={item.sv_img_id-1}
              onClick={() => setImageId(item.sv_img_id-1)}
              className={
                imageId === item.sv_img_id-1
                  ? classes.indicator_active
                  : classes.indicator
              }
            />
          );
        })}
      </span>
    </div>
  );
}
