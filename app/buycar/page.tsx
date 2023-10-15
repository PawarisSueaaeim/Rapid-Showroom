import React from "react";
import { Box } from "@mui/material";
import { SearchFilter } from "@/components/modules";
import axios from "axios";

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
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingTop={10}
    >
      <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
        <span className="fs-22px">Showroom</span>
      </Box>
      {data === undefined || data.lenght < 0 ? (
        <Box height={"36vh"}>
          <span className="tc-red fs-32px fw-500">Sold Out</span>
        </Box>
      ) : (
        <SearchFilter />
      )}
    </Box>
  );
}
