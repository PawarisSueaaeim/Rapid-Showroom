"use client";
import { CardBuyInfo } from "@/components/common/card";
import { ColorSet } from "@/constants";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL_V2;

const mockToken = "558|DG59x54c321843URBdmlnuT2B8SFGrY22rZfZvP68bfa80ed";

export default function BuyInfo({}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [dataBuyInfoList, setDataBuyInfoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllHistoryBuyVehicle = () => {
    setIsLoading(true);
    axios
      .post(
        baseURL + "/member/buy_info",
        {
          page: 1,
          per_page: 10,
          orderby: "showroom_appointment_id",
          sort: "desc",
          filter_data: {},
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
          },
        }
      )
      .then((response) => {
        setDataBuyInfoList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getActiveHistoryBuyVehicle = () => {
    setIsLoading(true);
    axios
      .post(
        baseURL + "/member/buy_info/active",
        {
          page: 1,
          per_page: 10,
          orderby: "showroom_appointment_id",
          sort: "desc",
          filter_data: {},
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
          },
        }
      )
      .then((response) => {
        setDataBuyInfoList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setDataBuyInfoList([]);
    if (isChecked) {
      getActiveHistoryBuyVehicle();
    } else {
      getAllHistoryBuyVehicle();
    }
  }, [isChecked]);

  return (
    <Box display={"flex"} flexDirection={"column"} padding={2} height={"100vh"}>
      <Box display={"flex"} justifyContent={"space-between"} marginTop={10}>
        <span className="fs-20px fw-400 m-6">รายการซื้อ</span>
        <FormControlLabel
          control={<Checkbox />}
          onChange={() => setIsChecked(!isChecked)}
          label="ซ่อนรายการที่สำเร็จ"
        />
      </Box>
      <br />
      <Grid container spacing={2}>
        {dataBuyInfoList.map((list: any, index: number) => {
          return (
            <Grid item key={`${list.vsale_id}-${index}`} xs={12} sm={6} md={4}>
              <CardBuyInfo
                image={list.showroom_images_url[0].path}
                brand={list.brand}
                model={list.model}
                year={list.year}
                color={list.color}
                bookDate={list.booking_date}
                location={list.branch_name}
                depositAmount={list.deposit_payin_amount}
                status={list.showroom_appointment_status}
                soldPrice={list.sold_price}
              />
            </Grid>
          );
        })}
      </Grid>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              position: "fixed",
              backgroundColor: ColorSet.bgWhite,
              opacity: 0.9,
              zIndex: 10,
              height: "100vh",
              width: "100vw",
              top: "0",
              left: "0",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
