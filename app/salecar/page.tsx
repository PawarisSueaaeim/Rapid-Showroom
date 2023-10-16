"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SelectCustom, InputCustom } from "@/components/common/form";
import { Calendar } from "@/components/common/calendar";
import { ButtonCapsule } from "@/components/common/button";
import { isPlateId, isThaiText } from "@/utils/regex";

type Props = {};

const provinceData = [
  {
    value: "all",
    label: "ทะเบียน (จังหวัด)",
  },
  {
    value: "1",
    label: "กทม.",
  },
  {
    value: "2",
    label: "เชียงใหม่",
  },
  {
    value: "3",
    label: "สุโขทัย",
  },
];

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

export default function Salecar({}: Props) {
  const [validate, SetValidate] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [submodel, setSubmodel] = useState("");
  const [years, setYears] = useState("");
  const [color, setColor] = useState("");
  const [gearType, setGearType] = useState("");
  const [dateSellCar, setDateSellCar] = useState("");
  const [timeSellCar, setTimeSellCar] = useState("");
  const [mileage, setMileage] = useState(0);
  const [plateId, setPlateId] = useState("");
  const [province, setProvince] = useState("");
  const [nickname, setNickname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (
      (brand &&
        model &&
        submodel &&
        years &&
        color &&
        gearType &&
        dateSellCar &&
        timeSellCar &&
        plateId &&
        province &&
        nickname &&
        telephone &&
        email) !== ""
    ) {
      SetValidate(true);
    } else {
      SetValidate(false);
    }
  }, [
    brand,
    color,
    dateSellCar,
    email,
    gearType,
    model,
    nickname,
    plateId,
    province,
    submodel,
    telephone,
    timeSellCar,
    years,
  ]);

  const handlerDateSellCar = (dateValue: string) => {
    setDateSellCar(dateValue);
  };
  const handlerTimeSellCar = (timeValue: string) => {
    setTimeSellCar(timeValue);
  };

  const handlerBrandOnChange = (event: any) => {
    setBrand(event.target.value);
  };
  const handlerModelOnChange = (event: any) => {
    setModel(event.target.value);
  };
  const handlerSubmodelOnChange = (event: any) => {
    setSubmodel(event.target.value);
  };
  const handlerYearOnChange = (event: any) => {
    setYears(event.target.value);
  };
  const handlerColorOnChange = (event: any) => {
    setColor(event.target.value);
  };
  const handlerGearTypeOnChange = (event: any) => {
    setGearType(event.target.value);
  };
  const handlerMileageOnChange = (event: any) => {
    setMileage(event.target.value);
  };
  const handlerPlateIdOnChange = (event: any) => {
    const input = event.target.value;
    if (isPlateId(input)) {
      setPlateId(input);
    }
  };
  const handlerProvinceOnChange = (event: any) => {
    setProvince(event.target.value);
  };
  const handlerNicknameOnChange = (event: any) => {
    setNickname(event.target.value);
  };
  const handlerTelephoneOnChange = (event: any) => {
    setTelephone(event.target.value);
  };
  const handlerEmailOnChange = (event: any) => {
    setEmail(event.target.value);
  };

  const renderSubmit = () => {
    console.log(brand);
    console.log(model);
    console.log(submodel);
    console.log(years);
    console.log(color);
    console.log(gearType);
    console.log(mileage);
    console.log(dateSellCar);
    console.log(timeSellCar);
    console.log(province);
    console.log(plateId);
    console.log(nickname);
    console.log(telephone);
    console.log(email);
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
          <InputCustom
            id="brand"
            type="text"
            placeholder="ยี่ห้อ"
            onChange={handlerBrandOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="model"
            type="text"
            placeholder="รุ่น"
            onChange={handlerModelOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="sub-model"
            type="text"
            placeholder="รุ่นย่อย"
            onChange={handlerSubmodelOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="years"
            type="text"
            placeholder="ปี"
            onChange={handlerYearOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="color"
            type="text"
            placeholder="สี"
            onChange={handlerColorOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectCustom
            id="gear"
            data={gear}
            type="unborder"
            onChange={handlerGearTypeOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="mileage"
            type="text"
            placeholder="เลขไมล์"
            onChange={handlerMileageOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="plateId"
            type="text"
            placeholder="ทะเบียน"
            onChange={handlerPlateIdOnChange}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectCustom
            id="provinces"
            data={provinceData}
            type="unborder"
            onChange={handlerProvinceOnChange}
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
          <InputCustom
            id="nickname"
            type="text"
            placeholder="ชื่อเล่น"
            onChange={handlerNicknameOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputCustom
            id="telephone"
            type="text"
            placeholder="โทรศัพท์"
            onChange={handlerTelephoneOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputCustom
            id="e-mail"
            type="text"
            placeholder="อีเมล"
            onChange={handlerEmailOnChange}
          />
        </Grid>
      </Grid>
      <Box width={"100%"} margin={4}>
        <ButtonCapsule
          title="ขายรถ"
          color="#fff"
          bgColor="#4679C7"
          height={42}
          disabled={!validate}
          onClick={renderSubmit}
        />
      </Box>
    </Box>
  );
}
