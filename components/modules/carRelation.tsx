"use client";
import { Box, Grid } from "@mui/material";
import React from "react";
import { ICar } from "../types/car";
import { CardItems } from "../common/card";
import { useSearchParams } from "next/navigation";

type Props = {
  data: Array<ICar>;
};

export default function CarRelation({ data }: Props) {
  const searchParams = useSearchParams();
  const model = searchParams.get("model");
  const submodel = searchParams.get("submodel");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={15}
      paddingBottom={4}
    >
      <Box display={"flex"} marginBottom={3} gap={1}>
        <span>ใกล้เคียงกับ</span>
        <span className="tc-blue">
          {model}
        </span>
      </Box>
      {data === undefined ? (
        <span className="tc-red fs-32px fw-500">Sold out</span>
      ) : (
        <Grid container>
          {data.map((car: ICar) => {
            return (
              <Grid item xs={6} md={3} lg={2} key={car.vehicle_id}>
                <CardItems
                  vehicle_id={`${car.vehicle_id}`}
                  model={car.model}
                  submodel={car.submodel}
                  price={car.listing_price}
                  mileage={car.mileage}
                  image={car.main_image}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
