/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "@/style/components/common/form/form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { NewSearch } from "../common/search";
import { CardItemPleumDesign } from "../common/card";
import { ICar } from "../types/car";
import Link from "next/link";
import {
  filteredDescription,
  filteredDetails,
  filteredModel,
  filteredYear,
} from "@/utils/filter";

type Props = {};

export default function SearchFilter({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchBrand = searchParams.get("brand");
  const searchModel = searchParams.get("model");
  const searchYear = searchParams.get("year");
  const searchDetailId = searchParams.get("detail_id");
  const searchMinPrice = searchParams.get("min_price");
  const searchMaxPrice = searchParams.get("max_price");

  const getAll =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + `/showrooms/vehicles`;

  const getFilter =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/vehicles/get/vehicle_detail";

  const [dataVehicle, setDataVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagetotal, setPagetotal] = useState(0);
  const [page, setPage] = useState(1);
  const [dataBrandsSelect, setDataBrandsSelect] = useState([]);
  const [dataModelsSelect, setDataModelsSelect] = useState([]);
  const [dataYears, setDataYears] = useState([]);
  const [dataDetailSelect, setDataDetailSelect] = useState([]);
  const [listDetailId, setListDetailId] = useState<any[]>([]);

  const [filterData, setFilterData] = useState([]);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    getFilterVehicle();
  }, []);

  useEffect(() => {
    getVehicle();
  }, [page,listDetailId]);

  
  useEffect(() => {
    const ids = dataDetailSelect.map((detail:any) => detail.vehicle_detail_id);
    setListDetailId(ids)
  },[dataDetailSelect])
    
  const getVehicle = () => {
    setIsLoading(true);
    setDataVehicle([]);
    axios
      .post(getAll, {
        page: page,
        per_page: 10,
        orderby: "vehicle_id",
        search: "",
        sort: "desc",
        vehicle_detail_id: listDetailId,
        min_price: searchMinPrice,
        max_price: searchMaxPrice,
      })
      .then((response) => {
        setPagetotal(response.data.total_pages);
        setDataVehicle(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error get all vehicle api", error);
        setIsLoading(false);
      });
  };

  const getFilterVehicle = () => {
    axios
      .post(getFilter)
      .then((response) => {
        setDataBrandsSelect(response.data.brands);
        setFilterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedBrandHandler = (event: any) => {
    router.push(`?brand=${event.target.value}`);
    setDataModelsSelect(filteredModel(filterData, event.target.value));
    setDataDetailSelect(filteredDetails(filterData, event.target.value));
  };

  const selectedModelHandler = (event: any) => {
    router.push(`?brand=${searchBrand}&model=${event.target.value}`);
    setDataYears(filteredYear(filterData, searchBrand, event.target.value));
    setDataDetailSelect(
      filteredDetails(filterData, searchBrand, event.target.value)
    );
  };

  const selectedYearHandler = (event: any) => {
    router.push(
      `?brand=${searchBrand}&model=${searchModel}&year=${event.target.value}`
    );
    setDataDetailSelect(
      filteredDetails(filterData, searchBrand, searchModel, event.target.value)
    );
  };

  const selectedDetailHandler = (event: any) => {
    router.push(
      `?brand=${searchBrand}&model=${searchModel}&year=${searchYear}&detail_id=${event.target.value}`
    );
  };
  const selectedMinPriceDataHandler = (event: any) => {
    router.push(
      `?brand=${searchBrand}&model=${searchModel}&year=${searchYear}&detail_id=${searchDetailId}&min_price=${event.target.value}`
    );
  };
  const selectedMaxPriceDataHandler = (event: any) => {
    router.push(
      `?brand=${searchBrand}&model=${searchModel}&year=${searchYear}&detail_id=${searchDetailId}&min_price=${searchMinPrice}&max_price=${event.target.value}`
    );
  };

  const renderPage = (event: any, pageValue: number) => {
    setPage(pageValue);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <select
              onChange={selectedBrandHandler}
              value={searchBrand || ""}
              className={classes.select_blue}
            >
              <option value="">ยี่ห้อ</option>
              {dataBrandsSelect.map((item: any, index: number) => {
                return (
                  <option key={`${item}-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              onChange={selectedModelHandler}
              value={searchModel || ""}
              className={classes.select_blue}
            >
              <option value="">รุ่น</option>
              {dataModelsSelect.map((item: any, index: number) => {
                return (
                  <option key={item + index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              onChange={selectedYearHandler}
              value={searchYear || ""}
              className={classes.select_blue}
            >
              <option value="">ปี</option>
              {dataYears.map((item: any, index: number) => {
                return (
                  <option key={item + index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={12}>
            <select
              onChange={selectedDetailHandler}
              value={searchDetailId || ""}
              className={classes.select_blue}
            >
              <option value="">รายละเอียด</option>
              {dataDetailSelect.map((item: any) => {
                return (
                  <option
                    key={item.vehicle_detail_id}
                    value={item.vehicle_detail_id}
                  >
                    {item.Description}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <input
              type="text"
              value={searchMinPrice || ""}
              onChange={selectedMinPriceDataHandler}
              className={classes.input_custom_outline}
              placeholder="ราคาต่ำสุด"
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type="text"
              value={searchMaxPrice || ""}
              onChange={selectedMaxPriceDataHandler}
              className={classes.input_custom_outline}
              placeholder="ราคาสูงสุด"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          borderTop: "1px solid #D9D9D9",
          borderBottom: "1px solid #D9D9D9",
          paddingRight: "1rem",
          paddingLeft: "1rem",
        }}
      >
        <NewSearch data={dataVehicle} placeholder="กรอกคำค้นหา" />
      </Box>

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
        <Box marginTop={isMobileMode ? 0 : 2}>
          <Grid container spacing={2}>
            {dataVehicle &&
              dataVehicle.map((car: ICar, index: number) => {
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
