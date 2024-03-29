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
  filteredStartYears,
} from "@/utils/filter";
import { ButtonPleumDesign } from "../common/button";
import { ColorSet } from "@/constants";
import Link from "next/link";
import { CardItemPleumDesign, CardItemRent } from "../common/card";
import { DataVehicle } from "../types/car";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;
const getVehicleV2 = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

const initialMockUpDataVehicle: DataVehicle[] = [
  {
    vehicle_id: "1",
    brand: "Toyota",
    model: "Camry",
    submodel: "",
    listing_price: 15000,
    mileage: 5535,
    year: "2017",
    main_image: "/images/mockUp/ToyotaCamryBlack.png",
  },
  {
    vehicle_id: "2",
    brand: "Toyota",
    model: "Camry",
    submodel: "",
    listing_price: 15000,
    mileage: 12000,
    year: "2017",
    main_image: "/images/mockUp/ToyotaCamryRed.png",
  },
  {
    vehicle_id: "3",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    listing_price: 20000,
    mileage: 100000,
    year: "2019",
    main_image: "/images/mockUp/HondaAccord.jpeg",
  },
  {
    vehicle_id: "4",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    listing_price: 20000,
    mileage: 8000,
    year: "2019",
    main_image: "/images/mockUp/HondaAccordBlack.jpeg",
  },
  {
    vehicle_id: "5",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    listing_price: 20000,
    mileage: 9500,
    year: "2017",
    main_image: "/images/mockUp/HondaAccordGrey.jpeg",
  },
  {
    vehicle_id: "6",
    brand: "Toyota",
    model: "Alphard",
    submodel: "",
    listing_price: 25000,
    mileage: 2000,
    year: "2023",
    main_image: "/images/mockUp/ToyotaAlphardGray.png",
  },
  {
    vehicle_id: "7",
    brand: "Toyota",
    model: "Alphard",
    submodel: "",
    listing_price: 25000,
    mileage: 1000,
    year: "2023",
    main_image: "/images/mockUp/ToyotaAlphardWhite.png",
  },
];

export default function Search({ }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterData = searchParams.get("filter_data");
  const minPriceParams = searchParams.get("min_price");
  const maxPriceParams = searchParams.get("max_price");

  const [allData, setAllData] = useState([]);
  const [dataVehicle, setDataVehicle] = useState(initialMockUpDataVehicle);

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
        per_page: "12",
        search: "",
        orderby: "vehicle_id",
        sort: "desc",
        min_price: minPriceParams,
        max_price: maxPriceParams,
        filter_data: filterData && JSON.parse(filterData),
      })
      .then((response) => {
        // setDataVehicle(response.data.data);
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
    <Box width={"100vw"} margin={4}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={2}
              width={"100%"}
            >
              <ButtonPleumDesign
                title={"ค้นหารถ"}
                width={"100%"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
                onClick={handlerSubmit}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={2}
              width={"100%"}
            >
              <ButtonPleumDesign
                title={"เลื่อนวันเช่ารถ"}
                width={"100%"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
                onClick={handlerSubmit}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={2}
              width={"100%"}
            >
              <ButtonPleumDesign
                title={"ยกเลิกวันเช่ารถ"}
                width={"100%"}
                backgroundBtnColor={ColorSet.btnWhite}
                backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                textBtnColor={ColorSet.textBlack}
                onClick={handlerSubmit}
              />
            </Box>
          </Grid>
        </Grid>
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
      ) : dataVehicle?.length > 0 ? (
        <>
          <Box
            margin={
              isMobileMode ? "0rem 0rem 3rem 0rem" : "0rem 2rem 4rem 2rem"
            }
          >
            <Grid
              container
              columnSpacing={isMobileMode ? 0 : 2}
              rowSpacing={isMobileMode ? 2.5 : 4}
            >
              {dataVehicle &&
                dataVehicle?.map((car: any, index: number) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      md={3}
                      lg={2}
                      key={`${car.vehicle_id}-${index}`}
                    >
                      <Link href={`/rent/${car.vehicle_id}`}>
                        <CardItemRent
                          vehicle_id={car.vehicle_id}
                          brand={car.brand}
                          model={car.model}
                          year={car.year}
                          submodel={car.series}
                          price={car.listing_price}
                          mileage={car.mileage}
                          image={car.main_image}
                        />
                      </Link>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
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
        </>
      ) : (
        <>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"42vh"}
          >
            <span className="tc-30px fw-400">ไม่พบรายการขายรถ</span>
          </Box>
        </>
      )}
    </Box>
  );
}
