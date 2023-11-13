/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  filteredEndYears,
  filteredModel,
  filteredModelMulti,
  filteredStartYears,
} from "@/utils/filter";
import { ButtonPleumDesign } from "../common/button";
import { ColorSet } from "@/constants";
import { currency } from "@/utils/currency";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Search({}: Props) {
  const getVehicleV2 = process.env.NEXT_PUBLIC_SHOWROOM_API_URL_V2;

  const router = useRouter();
  const searchParams = useSearchParams();
  const filterData = searchParams.get("filter_data");
  const minPriceParams = searchParams.get("min_price");
  const maxPriceParams = searchParams.get("max_price");

  const [allData, setAllData] = useState([]);

  const [brandsData, setBrandsData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [startYearsData, setStartYearsData] = useState([]);
  const [endYearsData, setEndYearsData] = useState([]);

  const [brandSelected, setBrandSelected] = useState("");
  const [modelSelected, setModelSelected] = useState([]);
  const [startYearSelected, setStartYearSelected] = useState(0);
  const [endYearsSelected, setEndYearSelected] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    if (filterData) {
      axios
        .post(getVehicleV2 + "/showrooms/vehicles", {
          page: "1",
          per_page: "10",
          search: "",
          order_by: "vehicle_id",
          sort: "desc",
          min_price: minPriceParams,
          max_price: maxPriceParams,
          filter_data: filterData,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      init();
    }
  }, [filterData,minPriceParams,maxPriceParams]);

  const handlerBrandsOnChange = (brand: any) => {
    setBrandSelected(brand);
    setModelData(filteredModel(allData, brand));
  };

  const handlerModelOnChange = (model: any) => {
    setModelSelected(model);
    setStartYearsData(filteredStartYears(allData, brandSelected, model));
  };

  const handlerStartYearOnChange = (startYear: any) => {
    setStartYearSelected(startYear);
    setEndYearsData(
      filteredEndYears(allData, brandSelected, modelSelected, startYear)
    );
  };

  const handlerEndYearOnChange = (endYear: any) => {
    setEndYearSelected(endYear);
  };

  const handlerMinPriceOnChange = (event: any) => {
    setMinPrice(event.target.value);
  };

  const handlerMaxPriceOnChange = (event: any) => {
    setMaxPrice(event.target.value);
  };

  const handlerSubmit = () => {
    const submitData = [
      {
        brand: brandSelected,
        model: modelSelected,
        year: { start: startYearSelected, end: endYearsSelected },
      },
    ];
    router.push(
      `?filter_data=${encodeURIComponent(JSON.stringify(submitData))}&min_price=${minPrice}&max_price=${maxPrice}`
    );
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
              id="model-selector"
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
              id="start-year-selector"
              options={startYearsData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerStartYearOnChange(newValues)}
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
              id="end-year-selector"
              options={endYearsData}
              filterSelectedOptions
              onChange={(_, newValues) => handlerEndYearOnChange(newValues)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ปีสิ้นสุด"
                  placeholder="ปีสิ้นสุด"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              fullWidth
              label="ราคาต่ำสุด"
              onChange={handlerMinPriceOnChange}
              size="small"
              type="number"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              fullWidth
              label="ราคาสูงสุด"
              onChange={handlerMaxPriceOnChange}
              size="small"
              type="number"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <ButtonPleumDesign
            title={"ค้นหารถ"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
            onClick={handlerSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
}
