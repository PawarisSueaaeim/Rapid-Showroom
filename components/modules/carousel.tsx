"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import classes from "@/style/components/module/carousel.module.css";
import { useMediaQuery } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    id: 0,
    alt: "image-car-01",
    src: "/images/image-car-01.png",
  },
  {
    id: 1,
    alt: "image-car-02",
    src: "/images/image-car-02.png",
  },
  {
    id: 2,
    alt: "image-car-03",
    src: "/images/image-car-03.png",
  },
  {
    id: 3,
    alt: "image-car-04",
    src: "/images/image-car-04.png",
  },
];

function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ maxWidth: isMobileMode ? 500 : 500, flexGrow: 1 }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.src}
                alt={step.alt}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <span className={classes.indicators}>
        {images.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => setActiveStep(item.id)}
              className={
                activeStep === item.id
                  ? classes.indicator_active
                  : classes.indicator
              }
            />
          );
        })}
      </span>
    </Box>
  );
}

export default Carousel;
