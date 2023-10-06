import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { CardItems } from "@/components/common/card";
import { Search } from "@/components/common/search";
import { Box } from "@mui/material";
import { Filter } from "@/components/common/filter";
import { ICar } from "@/components/types/car";

type Props = {};

export default async function Buycar({}: Props) {
  const getCar = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  const response = await axios.post(getCar, {
    page: 1,
    per_page: 20,
    orderby: "vehicle_id",
    search: "",
    sort: "desc",
  });
  const data = await response.data.data;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      paddingTop={10}
    >
      <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
        <span className="fs-22px">Showroom</span>
      </Box>

      <Filter />
      <Box
        style={{
          border: "1px solid #D9D9D9",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Search placeholder="กรอกคำค้นหา" data={data} />
      </Box>

      <Grid container>
        {data.map((car: ICar) => {
          return (
            <Grid item xs={6} md={3} lg={2} key={car.vehicle_id}>
              <CardItems
                vehicle_id={car.vehicle_id}
                brand={car.brand}
                model={car.model}
                submodel={car.submodel}
                price={car.listing_price}
                gear={car.gear_type}
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
