import { CardItems } from "@/components/common/card";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function NearModel({ params }: Props) {
  const getNearCarModel = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(`${getNearCarModel}`);
  const data = await response.data.results;

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} paddingTop={15}>
      <span>ใกล้เคียงกับ {params.id}</span>
      <Grid container>
      {data.map((car: any, index: number) => {
          return (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardItems id={`${car.name+index}`} name={car.name} url={car.url} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
