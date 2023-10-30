/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "@/style/components/common/form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { NewSearch } from "../common/search";
import { CardItemPleumDesign } from "../common/card";
import { ICar } from "../types/car";

type Props = {};

const minPriceData = [
  {
    label: "100,000",
    value: 100000,
  },
  {
    label: "1,000,000",
    value: 1000000,
  },
  {
    label: "10,000,000",
    value: 10000000,
  },
];

const maxPriceData = [
  {
    label: "999,999",
    value: 999999,
  },
  {
    label: "9,999,999",
    value: 9999999,
  },
  {
    label: "99,999,999",
    value: 99999999,
  },
];

export default function SearchFilter({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchBrand = searchParams.get("brand_id");
  const searchModel = searchParams.get("model_id");
  const searchSubmodel = searchParams.get("submodel_id");
  const searchMinPrice = searchParams.get("min_price");
  const searchMaxPrice = searchParams.get("max_price");

  const getAll =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + `/showrooms/vehicles`;
  const getBrand =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + `/vehicles/brands`;
  const getModel =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + `/vehicles/models`;
  const getSubmodel =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + `/vehicles/submodels`;

  const [dataVehicle, setDataVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagetotal, setPagetotal] = useState(0);
  const [page, setPage] = useState(1);
  const [dataBrandsSelect, setDataBrandsSelect] = useState([]);
  const [dataModelsSelect, setDataModelsSelect] = useState([]);
  const [dataSubmodelsSelect, setDataSubmodelsSelect] = useState([]);

  useEffect(() => {
    getAllVehicle();
    getBrandVehicle();
    getModelVehicle();
    getSubmodelVehicle();
  }, [
    page,
    searchBrand,
    searchModel,
    searchSubmodel,
    searchMinPrice,
    searchMaxPrice,
  ]);

  const getAllVehicle = () => {
    setIsLoading(true);
    setDataVehicle([]);

    axios
      .post(
        getAll,
        {
          page: page,
          per_page: 10,
          orderby: "vehicle_id",
          search: "",
          sort: "desc",
        },
        {
          params: {
            brand_id: searchBrand,
            model_id: searchModel,
            submodel_id: searchSubmodel,
            min_price: searchMinPrice,
            max_price: searchMaxPrice,
          },
        }
      )
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

  const getBrandVehicle = () => {
    axios
      .get(getBrand)
      .then((response) => {
        setDataBrandsSelect(response.data.data);
      })
      .catch((error) => {
        console.log("Error get brand vehicle api", error);
      });
  };

  const getModelVehicle = () => {
    if (searchModel !== null) {
      axios
        .get(getModel + `?brand_id=${searchBrand}`)
        .then((response) => {
          setDataModelsSelect(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getSubmodelVehicle = () => {
    if (searchSubmodel !== null) {
      axios
        .get(getSubmodel + `?model_id=${searchModel}`)
        .then((response) => {
          setDataSubmodelsSelect(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectedBrandHandler = (event: any) => {
    router.push(`?brand_id=${event.target.value}`);
    setDataModelsSelect([]);
    axios
      .get(getModel + `?brand_id=${event.target.value}`)
      .then((response) => {
        setDataModelsSelect(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedModelHandler = (event: any) => {
    router.push(`?brand_id=${searchBrand}&model_id=${event.target.value}`);
    axios
      .get(getSubmodel + `?model_id=${event.target.value}`)
      .then((response) => {
        setDataSubmodelsSelect(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedSubmodelHandler = (event: any) => {
    router.push(
      `?brand_id=${searchBrand}&model_id=${searchModel}&submodel_id=${event.target.value}`
    );
  };
  const selectedMinPriceDataHandler = (event: any) => {
    router.push(
      `?brand_id=${searchBrand}&model_id=${searchModel}&submodel_id=${searchSubmodel}&min_price=${event.target.value}`
    );
  };
  const selectedMaxPriceDataHandler = (event: any) => {
    router.push(
      `?brand_id=${searchBrand}&model_id=${searchModel}&submodel_id=${searchSubmodel}&min_price=${searchMinPrice}&max_price=${event.target.value}`
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
              {dataBrandsSelect.map((item: any) => {
                return (
                  <option key={item.brand_id} value={item.brand_id}>
                    {item.name}
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
              {dataModelsSelect.map((item: any) => {
                return (
                  <option key={item.model_id} value={item.model_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              onChange={selectedSubmodelHandler}
              value={searchSubmodel || ""}
              className={classes.select_blue}
            >
              <option value="">รุ่นย่อย</option>
              {dataSubmodelsSelect.map((item: any) => {
                return (
                  <option key={item.sub_model_id} value={item.sub_model_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              onChange={selectedMinPriceDataHandler}
              value={searchMinPrice || ""}
              className={classes.select_blue}
            >
              <option value="">ราคาเริ่มต้น</option>
              {minPriceData.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              onChange={selectedMaxPriceDataHandler}
              value={searchMaxPrice || ""}
              className={classes.select_blue}
            >
              <option value="99999999">ราคาสูงสุด</option>
              {maxPriceData.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
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
        <Grid container>
          {dataVehicle.map((car: ICar, index: number) => {
            return (
              <Grid item xs={6} md={4} lg={3} key={`${car.vehicle_id}-${index}`}>
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
              </Grid>
            );
          })}
        </Grid>
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
