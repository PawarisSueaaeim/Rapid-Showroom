/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
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
import Link from "next/link";
import { CardItemPleumDesign } from "../common/card";

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
  const [dataVehicle, setDataVehicle] = useState([]);

  const [brandsData, setBrandsData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [startYearsData, setStartYearsData] = useState([]);
  const [endYearsData, setEndYearsData] = useState([]);

  const [brandSelected, setBrandSelected] = useState("");
  const [modelSelected, setModelSelected] = useState([]);
  const [startYearSelected, setStartYearSelected] = useState(null);
  const [endYearsSelected, setEndYearSelected] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [pagetotal, setPagetotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
      setIsLoading(true);
      axios
      .post(baseURL + "/vehicles/get/vehicle_detail")
      .then((response) => {
        setAllData(response.data);
        setBrandsData(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
        .post(getVehicleV2 + "/showrooms/vehicles", {
          page: page,
          per_page: "10",
          search: "",
          orderby: "vehicle_id",
          sort: "desc",
          min_price: minPriceParams,
          max_price: maxPriceParams,
          filter_data: filterData && JSON.parse(filterData)
        })
        .then((response) => {
          setDataVehicle(response.data.data);
          setPagetotal(response.data.total_pages);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [filterData, minPriceParams, maxPriceParams, page]);

  useEffect(() => {
    setStartYearSelected(null);
    setEndYearSelected(null);
  }, [brandSelected]);

  const handlerBrandsOnChange = (brand: any) => {
    setModelSelected([]);
    setStartYearSelected(null);
    setEndYearSelected(null);
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
        years: { start: startYearSelected, end: endYearsSelected },
      },
    ];
    router.push(
      `?filter_data=${encodeURIComponent(
        JSON.stringify(submitData)
      )}&min_price=${minPrice}&max_price=${maxPrice}`
    );
  };

  const renderPage = (event: any, pageValue: number) => {
    setPage(pageValue);
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
              value={brandSelected}
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
              value={modelSelected}
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
              value={startYearSelected}
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
              value={endYearsSelected}
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
      <br />
      {isLoading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"40vh"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box margin={isMobileMode ? 0 : "2rem"}>
          <Grid container spacing={2}>
            {dataVehicle &&
              dataVehicle.map((car: any, index: number) => {
                return (
                  <Grid
                    item
                    xs={6}
                    md={3}
                    lg={2}
                    key={`${car.vehicle_id}-${index}`}
                  >
                    <Link href={`/vehicles/${car.vehicle_id}`}>
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
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={2}
      >
        <Pagination
          count={pagetotal}
          page={page}
          shape="rounded"
          onChange={(event, pageValue) => renderPage(event, pageValue)}
        />
      </Box>
    </Box>
  );
}
