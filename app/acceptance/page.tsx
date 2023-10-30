
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import classes from "@/style/page/accept/accept.module.css";
import { CardAccept } from "@/components/common/card";

type Props = {};

export default function Accept({}: Props) {
  const carList = [
    {
      vehicle_id: "1",
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
      uuid: '571ca5d6-d68b-44e1-81e8-d6360972e0fc',
    },
    {
      vehicle_id: "2",
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
      uuid: '571ca5d6-d68b-44e1-81e8-d6360972e0fc',
    },
    {
      vehicle_id: "3",
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
      uuid: '571ca5d6-d68b-44e1-81e8-d6360972e0fc',
    },
    {
      vehicle_id: "4",
      brand: "BMW",
      model: "series 3",
      submodel: "sedan",
      plateId: "ตด8888",
      province: "สุโขทัย",
      uuid: '571ca5d6-d68b-44e1-81e8-d6360972e0fc',
    },
  ];
  return (
    <Box className={classes.container}>
      <span className="fs-20px fw-400 m-6">รายการขาย</span>
      <hr />
      <Grid container spacing={2}>
        {carList.map((list, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link href={`/acceptance/${list.uuid}`}>
                <CardAccept />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
