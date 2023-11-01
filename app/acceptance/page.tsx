import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/accept/accept.module.css";
import { CardAccept } from "@/components/common/card";
import axios from "axios";

type Props = {};

const token = "409|pPuqk7GAbbGDOOCc7vrVJ9d3KSYjBHfaBeCgcA3f4813816b";

export default async function Accept({}: Props) {
  const getSellCarList =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/vehicles";

  const respoonse = await axios.post(
    getSellCarList,
    {
      page: 1,
      per_page: 10,
      orderby: "vehicle_id",
      sort: "desc",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await respoonse.data.data;
  
  return (
    <Box className={classes.container}>
      <span className="fs-20px fw-400 m-6">รายการขาย</span>
      <hr />
      <Grid container spacing={2}>
        {data.map((list: any, index: any) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link href={`/acceptance/${list.uuid}`}>
                <CardAccept
                  brand={list.brand}
                  model={list.model}
                  subModel={list.sub_model}
                  licensePlate={list.license_plate}
                  minPrice={list.min_buy_price}
                  maxPrice={list.max_buy_price}
                  province={list.province}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
