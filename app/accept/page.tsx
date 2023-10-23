import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/accept/accept.module.css";
import { CardAccept } from "@/components/common/card";

type Props = {};

export default function Accept({}: Props) {
  const carList = [
    {
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
    },
    {
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
    },
    {
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
    },
    {
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
    },
  ];
  return (
    <Box className={classes.container}>
      <span className="fs-20px fw-400 m-6">รายการขาย</span>
      <hr/>
      <Grid container spacing={2}>
        {carList.map((list, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardAccept />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
