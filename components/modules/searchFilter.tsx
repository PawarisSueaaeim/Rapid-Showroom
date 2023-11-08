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

type Props = {};

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

  const getFilter = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + '/vehicles/get/vehicle_detail';


  const [dataVehicle, setDataVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagetotal, setPagetotal] = useState(0);
  const [page, setPage] = useState(1);
  const [dataBrandsSelect, setDataBrandsSelect] = useState([]);
  const [dataModelsSelect, setDataModelsSelect] = useState([]);
  const [dataSubmodelsSelect, setDataSubmodelsSelect] = useState([]);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    getAllVehicle();
    getFilterVehicle();
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
      .post(getAll, {
        page: page,
        per_page: 10,
        orderby: "vehicle_id",
        search: "",
        sort: "desc",
        brand_id: searchBrand,
        model_id: searchModel,
        submodel_id: searchSubmodel,
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
    axios.post(getFilter).then((response) => {
      setDataBrandsSelect(response.data.brands);
    }).catch((error) => {
      console.log(error);
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
              {dataBrandsSelect.map((item: any,index: number) => {
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
