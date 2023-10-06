"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import classes from "@/style/components/common/form.module.css";
import { SelectCustom, InputCustom } from "@/components/common/form";
import { Calendar } from "@/components/common/calendar";
import { ButtonCapsule } from "@/components/common/button";

type Props = {};

const gear = [
  {
    value: "all",
    label: "ประเภทเกียร์",
  },
  {
    value: "auto",
    label: "อัตโนมัติ",
  },
  {
    value: "manual",
    label: "ธรรมดา",
  },
  {
    value: "hybrid",
    label: "กึ่งอัตโนมัติ",
  },
];

const car_id = [
  {
    value: "all",
    label: "ทะเบียบ",
  },
  {
    value: "car_id_01",
    label: "car_id_01",
  },
  {
    value: "car_id_02",
    label: "car_id_02",
  },
  {
    value: "car_id_03",
    label: "car_id_03",
  },
];

export default function Salecar({}: Props) {
  const [dateSellCar, setDateSellCar] = useState("");
  const [timeSellCar, setTimeSellCar] = useState("");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  const handlerDateSellCar = (dateValue: string) => {
    setDateSellCar(dateValue);
  };
  const handlerTimeSellCar = (timeValue: string) => {
    setTimeSellCar(timeValue);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={13}
      paddingX={isMobileMode ? 2 : "20%"}
    >
      <span className="fs-24px">Sell Car</span>
      <Image
        src="/icons/icon-formcar.png"
        alt="icon-formcar"
        width={250}
        height={117}
      />
      <span className="fs-18px">ข้อมูลรถ</span>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <InputCustom id="brand" type="text" placeholder="ยี่ห้อ" />
        </Grid>
        <Grid item xs={6}>
          <InputCustom id="model" type="text" placeholder="รุ่น" />
        </Grid>
        <Grid item xs={6}>
          <InputCustom id="sub-model" type="text" placeholder="รุ่นย่อย" />
        </Grid>
        <Grid item xs={6}>
          <InputCustom id="years" type="text" placeholder="ปี" />
        </Grid>
        <Grid item xs={6}>
          <InputCustom id="color" type="text" placeholder="สี" />
        </Grid>
        <Grid item xs={6}>
          <SelectCustom
            id="gear"
            data={gear}
            type="unborder"
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom id="mi" type="text" placeholder="เลขไมล์" />
        </Grid>
        <Grid item xs={6}>
          <SelectCustom
            id="car_id"
            data={car_id}
            type="unborder"
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="provice"
            type="text"
            placeholder="จังหวัด (ทะเบียน)"
          />
        </Grid>
        <Grid item xs={6}>
          <Calendar
            id="date-sell-car"
            type="date"
            value={dateSellCar}
            onChange={handlerDateSellCar}
            style="outline"
          />
        </Grid>
        <Grid item xs={6}>
          <Calendar
            id="time-sell-car"
            type="time"
            value={timeSellCar}
            onChange={handlerTimeSellCar}
            style="outline"
          />
        </Grid>
        <Grid item xs={12}>
          <InputCustom id="nickname" type="text" placeholder="ชื่อเล่น" />
        </Grid>
        <Grid item xs={12}>
          <InputCustom id="telephone" type="text" placeholder="โทรศัพท์" />
        </Grid>
        <Grid item xs={12}>
          <InputCustom id="e-mail" type="text" placeholder="อีเมล" />
        </Grid>
      </Grid>
      <Box width={"100%"} margin={4}>
        <ButtonCapsule
          title="ขายรถ"
          color="#fff"
          bgColor="#4679C7"
          height={42}
        />
      </Box>
    </Box>
  );
}
