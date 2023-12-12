/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, CircularProgress, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "@/style/page/accept/accept.module.css";
import { CardAccept } from "@/components/common/card";
import axios from "axios";
import { ColorSet } from "@/constants";

type Props = {};

export default function Accept({}: Props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSellCarList =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/vehicles";

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        getSellCarList,
        {
          page: 1,
          per_page: 10,
          orderby: "vehicle_id",
          sort: "desc",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('userId')}`,
          },
        }
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box className={classes.container}>
      <span className="fs-20px fw-400 m-6">รายการขาย</span>
      <hr />
      <Grid container spacing={2} rowSpacing={8}>
        {data.map((list: any, index: any) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Link href={`/sellinfo/${list.uuid}`}>
                <CardAccept
                  brand={list.brand}
                  model={list.model}
                  subModel={list.series}
                  licensePlate={list.license_plate}
                  minPrice={list.min_buy_price}
                  maxPrice={list.max_buy_price}
                  province={list.province}
                  image={list.image}
                  color={list.color}
                  year={list.year}
                  mileage={list.mileage}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={ColorSet.bgWhite}
            style={{
              position: "fixed",
              opacity: 0.9,
              zIndex: 10,
              height: "100vh",
              width: "100vw",
              top: "0",
              left: "0",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
