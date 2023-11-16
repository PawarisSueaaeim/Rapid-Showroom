"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { CardBuyInfo } from "@/components/common/card";
import { ColorSet } from "@/constants";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL_V2;

const mockToken = "558|DG59x54c321843URBdmlnuT2B8SFGrY22rZfZvP68bfa80ed";

export default function BuyInfo({}: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [dataBuyInfoList, setDataBuyInfoList] = useState([]);

  const getAllHistoryBuyVehicle = () => {
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
            // Authorization: `Bearer ${localStorage.getItem("userId")}`,
            Authorization: `Bearer ${mockToken}`,
          },
        }
      )
      .then((response) => {
        setDataBuyInfoList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActiveHistoryBuyVehicle = () => {
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
            // Authorization: `Bearer ${localStorage.getItem("userId")}`,
            Authorization: `Bearer ${mockToken}`,
          },
        }
      )
      .then((response) => {
        setDataBuyInfoList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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

  const renderOnClickCard = () => {
    console.log("clicked");
  };

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
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
