/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardItemPleumDesign } from "../common/card";
import classes from "@/style/components/module/showcarSectionHome.module.css";
import Link from "next/link";
import { ButtonPleumDesign } from "../common/button";
import { ColorSet } from "@/constants";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function ShowcarSectionHome({}: Props) {
  const searchParams = useSearchParams();
  const refferal = searchParams.get("ref") || null;
  const isMobileMode = useMediaQuery("(max-width:600px)");

  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    if (refferal !== null) {
      sessionStorage.setItem("ref", refferal);
    }
  }, [refferal]);

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
      <Grid container columnSpacing={isMobileMode ? 0 : 2} rowSpacing={isMobileMode ? 2.5 : 4}>
        {vehiclesData.map((vehicle: any, index: number) => {
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
                brand={vehicle.brand}
                model={vehicle.model}
                year={vehicle.year}
                submodel={vehicle.series}
                price={vehicle.listing_price}
                mileage={vehicle.mileage}
                image={vehicle.main_image}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className={classes.btn_3_page}>
        <Link href={"./vehicles"}>
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
