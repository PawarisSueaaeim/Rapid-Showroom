"use client";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  filteredModel,
  filteredModelMulti,
  filteredYearArray,
} from "@/utils/filter";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Search({}: Props) {
  process.env.NEXT_PUBLIC_SHOWROOM_API_URL_V2 + "/vehicles/get/vehicle_detail";
  const router = useRouter();

  const [allData, setAllData] = useState([]);

  const [brandsData, setBrandsData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [startYearsData, setStartYearsData] = useState([]);

  const [brandSelected, setBrandSelected] = useState("");
  const [modelSelected, setModelSelected] = useState([]);

  const init = () => {
    axios
      .post(baseURL + "/vehicles/get/vehicle_detail")
      .then((response) => {
        setAllData(response.data);
        setBrandsData(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handlerBrandsOnChange = (brand: any) => {
    setBrandSelected(brand);
    setModelData(filteredModel(allData, brand));
  };

  const handlerModelOnChange = (model: any) => {
    setModelSelected(model);
    console.log(filteredYearArray(allData, brandSelected, model));
  };

  return (
    <Box width={"100vw"}>
      <Box display={"flex"} flexDirection={"column"} marginX={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              id="brand-selector"
              options={brandsData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerBrandsOnChange(newValues)}
              renderInput={(params) => (
                <TextField {...params} label="ยี่ห้อ" placeholder="ยี่ห้อ" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              id="brand-selector"
              options={modelData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerModelOnChange(newValues)}
              renderInput={(params) => (
                <TextField {...params} label="รุ่น" placeholder="รุ่น" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size="small"
              id="brand-selector"
              options={modelData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerModelOnChange(newValues)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ปีเริ่มต้น"
                  placeholder="ปีเริ่มต้น"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size="small"
              id="brand-selector"
              options={modelData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerModelOnChange(newValues)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ปีสิ้นสุด"
                  placeholder="ปีสิ้นสุด"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
