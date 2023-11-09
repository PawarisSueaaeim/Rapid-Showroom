"use client";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Search({}: Props) {
  process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/vehicles/get/vehicle_detail";
  const router = useRouter();

  const [brandsData, setBrandsData] = useState([]);

  const init = () => {
    axios
      .post(baseURL + "/vehicles/get/vehicle_detail")
      .then((response) => {
        setBrandsData(response.data.brands)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handlerBrandsOnChange = (newValues: any) => {
    setBrandsData(newValues)
  };

  console.log(brandsData);

  return (
    <Box width={"100vw"}>
      <Box display={"flex"} flexDirection={"column"} marginX={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              id="brand-selector"
            //   value={}
              options={brandsData}
              filterSelectedOptions
              onChange={(_, newValues) =>
                handlerBrandsOnChange(newValues)
              }
              renderInput={(params) => (
                <TextField {...params} label="ยี่ห้อ" placeholder="ยี่ห้อ" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
