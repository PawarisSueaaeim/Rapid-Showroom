/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardItemPleumDesign } from "../common/card";
import { ICar } from "../types/car";
import classes from "@/style/components/module/showcarSectionHome.module.css";
import Link from "next/link";
import { ButtonPleumDesign } from "../common/button";
import { ColorSet } from "@/constants";

type Props = {};

export default function ShowcarSectionHome({}: Props) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    axios
      .post(getCar, {
        page: 1,
        per_page: 6,
        orderby: "vehicle_id",
        search: "",
        sort: "desc",
      })
      .then((response) => {
        setVehiclesData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box className={classes.container}>
      <Grid container spacing={isMobileMode ? 0 : 2}>
        {vehiclesData.map((vehicle: ICar, index: number) => {
          return (
            <Grid
              item
              xs={6}
              md={3}
              lg={2}
              key={`${vehicle.vehicle_id}-${index}`}
            >
              <CardItemPleumDesign
                vehicle_id={vehicle.vehicle_id}
                model={vehicle.model}
                submodel={vehicle.submodel}
                price={vehicle.listing_price}
                mileage={vehicle.mileage}
                image={vehicle.main_image}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className={classes.btn_3_page}>
        <Link href={"./buycar"}>
          <ButtonPleumDesign
            title={"ดูรถยอดนิยมเพิ่มเติม"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
          />
        </Link>
      </Box>
    </Box>
  );
}