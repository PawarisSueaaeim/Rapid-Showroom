import React from "react";
import { Box } from "@mui/material";
import { SearchFilter } from "@/components/modules";

type Props = {};

export default async function Buycar({}: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      paddingTop={10}
    >
      <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
        <span className="fs-22px">Showroom</span>
      </Box>
      <SearchFilter/>
    </Box>
  );
}
