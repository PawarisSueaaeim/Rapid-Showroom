/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import classes from "@/style/components/module/carousel.module.css";
import SwipeableViews from "react-swipeable-views";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/material";

type Props = {
  onClickRemove?: any;
  removeImage?: boolean;
  images?: Array<{
    sv_img_id?: number;
    url_path: string;
  }>;
};

export default function Carousel({
  onClickRemove,
  removeImage,
  images,
}: Props) {
  const [imageId, setImageId] = useState(0);
  
  const handleStepChange = (step: number) => {
    setImageId(step);
  };

  const renderRemoveImage = () => {
    onClickRemove(imageId);
    setImageId(0);
  };
  return (
    <Box
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
          justifyContent: "center",
        }}
      >

        {images && images.map((item, index) => (
          <img
            key={index}
            className={classes.img_slider}
            alt={item.url_path}
            src={item.url_path}
          />
        ))}
      </SwipeableViews>

      <span className={classes.indicators}>
        {images && images.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => setImageId(index)}
              className={
                imageId === index ? classes.indicator_active : classes.indicator
              }
            />
          );
        })}
      </span>
      {removeImage && (
        <Box
          style={{
            position: "absolute",
            zIndex: "10",
            top: 15,
            right: 15,
          }}
        >
          <DeleteForeverIcon
            onClick={() => {
              renderRemoveImage();
            }}
          />
        </Box>
      )}
    </Box>
  );
}
