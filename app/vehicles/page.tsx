import React from "react";
import { Box } from "@mui/material";
import { Search, SearchFilter } from "@/components/modules";
import classes from "@/style/page/buycar/buycar.module.css";

type Props = {};

export default function Vehicles({}: Props) {
  return (
    <Box
      className={classes.container}
    >
      <Box className={classes.title_page}>
        <span className="fs-22px">Showroom</span>
      </Box>
      {/* <SearchFilter /> */}
      <Search/>
    </Box>
  );
}
