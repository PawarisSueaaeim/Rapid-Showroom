/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CarRelation } from "@/components/modules/carRelation";
import { Box, CircularProgress, Pagination } from "@mui/material";
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
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(getVehicleRelations, {
        page: page,
        per_page: 12,
        orderby: "vehicle_id",
        search: "",
        sort: "desc",
        brand: brand,
        model: model,
      })
      .then((response) => {
        setData(response.data.data);
        setPageTotal(response.data.total_pages)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const renderPage = (event: any, pageValue: number) => {
    setPage(pageValue);
  };

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
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={2}
      >
        <Pagination
          count={pageTotal}
          page={page}
          shape="rounded"
          onChange={(event, pageValue) => renderPage(event, pageValue)}
        />
      </Box>
    </Box>
  );
}
