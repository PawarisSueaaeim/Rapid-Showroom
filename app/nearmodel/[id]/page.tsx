import { CardItems } from "@/components/common/card";
import { ICar } from "@/components/types/car";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function NearModel({ params }: Props) {
  const getCar = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles/relation";

  const response = await axios.post(getCar, {
    page: 1,
    per_page: 20,
    orderby: "vehicle_id",
    search: "",
    sort: "desc",
  });
  const data = await response.data.data;

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} paddingTop={15}>
      <span>ใกล้เคียงกับ {params.id}</span>
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
                image={car.image}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
