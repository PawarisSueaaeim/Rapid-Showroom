/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import classes from "@/style/page/accept/accept.module.css";
import { CardAccept } from "@/components/common/card";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function Accept({}: Props) {
  const [data, setData] = useState([]);

  const getSellCarList =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/vehicles";

  useEffect(() => {
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
            Authorization: `Bearer ${localStorage.getItem('userId')}`,
          },
        }
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box className={classes.container}>
      <span className="fs-20px fw-400 m-6">รายการขาย</span>
      <hr />
      <Grid container spacing={2}>
        {data.map((list: any, index: any) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link href={`/sellinfo/${list.uuid}`}>
                <CardAccept
                  brand={list.brand}
                  model={list.model}
                  subModel={list.sub_model}
                  licensePlate={list.license_plate}
                  minPrice={list.min_buy_price}
                  maxPrice={list.max_buy_price}
                  province={list.province}
                  image={list.image}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
