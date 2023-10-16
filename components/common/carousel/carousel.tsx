/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import classes from "@/style/components/module/carousel.module.css";
import SwipeableViews from "react-swipeable-views";

type Props = {
  images: Array<{
    sv_img_id: number;
    name: string;
    url_path: string;
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
        {images.map((item, index) => (
          <img
            key={index}
            className={classes.img_slider}
            alt={item.url_path}
            src={item.url_path}
          />
        ))}
      </SwipeableViews>

      <span className={classes.indicators}>
        {images.map((_,index) => {
          return (
            <button
              key={index}
              onClick={() => setImageId(index)}
              className={
                imageId === index
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
