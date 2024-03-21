"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useSearchParams } from "next/navigation";
import { CardItemPleumDesign } from "../../common/card";

type Props = {
  data: Array<any>;
};

export default function CarRelation({ data }: Props) {
  const searchParams = useSearchParams();
  const model = searchParams.get("model");
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={15}
      paddingBottom={4}
      paddingX={isMobileMode ? 0 : 8}
    >
      <Box display={"flex"} marginBottom={3} gap={1}>
        <span>ใกล้เคียงกับ</span>
        <span className="tc-blue">
          {model}
        </span>
      </Box>
      {data === undefined ? (
        <Box height={"80vh"}>
        <span className="tc-red fs-32px fw-500">Sold out</span>
        </Box>
      ) : (
        <Grid container spacing={isMobileMode ? 0 : 2}>
          {data.map((car: any) => {
            return (
              <Grid item xs={6} md={3} lg={2} key={car.vehicle_id}>
                <CardItemPleumDesign
                  vehicle_id={car.vehicle_id}
                  brand={car.brand}
                  model={car.model}
                  year={car.year}
                  submodel={car.submodel}
                  price={car.listing_price}
                  mileage={car.mileage}
                  image={car.image}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
