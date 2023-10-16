import React from "react";
import { Box } from "@mui/material";
import { SearchFilter } from "@/components/modules";
import axios from "axios";
import classes from "@/style/page/buycar/buycar.module.css";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default async function Buycar({}: Props) {
  const getAllCar = await axios.post(baseURL + "/showrooms/vehicles", {
    page: 1,
    per_page: 10,
    orderby: "vehicle_id",
    search: "",
    sort: "desc",
  });
  const data = await getAllCar.data.data;

  return (
    <Box
      className={classes.container}
    >
      <Box className={classes.title_page}>
        <span className="fs-22px">Showroom</span>
      </Box>
      <SearchFilter />
    </Box>
  );
}
