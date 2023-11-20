"use client";
import { CarRelation } from "@/components/modules";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;
const getVehicleRelations = baseURL + "/showrooms/vehicles/relation";

export default function NearModel({}: Props) {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(getVehicleRelations, {
        page: 1,
        per_page: 10,
        orderby: "vehicle_id",
        search: "",
        sort: "desc",
        brand: brand,
        model: model,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <CarRelation data={data} />
        </>
      )}
    </Box>
  );
}
