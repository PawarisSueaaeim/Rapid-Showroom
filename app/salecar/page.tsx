/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { InputCustom } from "@/components/common/form";
import { Calendar } from "@/components/common/calendar";
import { ButtonCapsule } from "@/components/common/button";
import { isPlateId } from "@/utils/regex";
import { UpLoadImages } from "@/components/common/uploadFile";
import axios from "axios";
import classes from "@/style/page/salecar.module.css";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Salecar({}: Props) {
  const [dataBrand, setDataBrand] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [dataSubmodel, setDataSubmodel] = useState([]);
  const [dataGearType, setDataGearType] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);

  const [validate, SetValidate] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState<string[]>([]);
  const [brandId, setBrandId] = useState(0);
  const [modelId, setModelId] = useState(0);
  const [submodelId, setSubmodelId] = useState(0);
  const [year, setYear] = useState("");
  const [colorId, setColorId] = useState(0);
  const [gearType, setGearType] = useState("");
  const [dateSellCar, setDateSellCar] = useState("");
  const [timeSellCar, setTimeSellCar] = useState("");
  const [mileage, setMileage] = useState(0);
  const [plateId, setPlateId] = useState(0);
  const [province, setProvince] = useState(0);
  const [nickname, setNickname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    renderGetBrands();
    // renderGetGearType();
    renderGetColor();
    renderGetProvince();
    if (
      (brandId &&
        modelId &&
        submodelId &&
        year &&
        colorId &&
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
    brandId,
    colorId,
    dateSellCar,
    email,
    gearType,
    modelId,
    nickname,
    plateId,
    province,
    submodelId,
    telephone,
    timeSellCar,
    year,
  ]);

  const renderGetBrands = () => {
    axios.get(baseURL + "/vehicles/brands").then((response) => {
      setDataBrand(response.data.data);
    });
    renderGetModels();
  };

  const renderGetModels = () => {
    axios
      .get(baseURL + `/vehicles/models?brand_id=${brandId}`)
      .then((response) => {
        setDataModel(response.data.data);
      });
      renderGetSubmodels();
  };

  const renderGetSubmodels = () => {
    if(modelId) {
      axios
      .get(baseURL + `/vehicles/submodels?model_id=${modelId}`)
      .then((response) => {
        setDataSubmodel(response.data.data);
      });
    }
  };

  const renderGetGearType = () => {
    axios.get(baseURL + "/vehicles/gear-type").then((response) => {
      setDataGearType(response.data.data);
    });
  };

  const renderGetColor = () => {
    axios.get(baseURL + "/vehicles/colors").then((response) => {
      setDataColor(response.data.data);
    });
  };

  const renderGetProvince = () => {
    axios.get(baseURL + '/select/province').then((response) => {
      setDataProvince(response.data.data)
    })
  };
  console.log(dataProvince)

  const handleImageUpload = (imageDataArray: string[]) => {
    setUploadedImageData([...imageDataArray]);
  };

  const handlerDateSellCar = (dateValue: string) => {
    setDateSellCar(dateValue);
  };
  const handlerTimeSellCar = (timeValue: string) => {
    setTimeSellCar(timeValue);
  };

  const handlerBrandOnChange = (event: any) => {
    setBrandId(event.target.value);
  };

  const handlerModelOnChange = (event: any) => {
    setModelId(event.target.value);
  };
  const handlerSubmodelOnChange = (event: any) => {
    setSubmodelId(event.target.value);
  };
  const handlerYearOnChange = (event: any) => {
    setYear(event.target.value);
  };
  const handlerColorOnChange = (event: any) => {
    setColorId(event.target.value);
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
    console.log(brandId);
    console.log(modelId);
    console.log(submodelId);
    console.log(year);
    console.log(colorId);
    console.log(gearType);
    console.log(mileage);
    console.log(dateSellCar);
    console.log(timeSellCar);
    console.log(province);
    console.log(plateId);
    console.log(nickname);
    console.log(telephone);
    console.log(email);
    console.log(uploadedImageData);
    axios.put(baseURL + "/guests/seller", {
      name: nickname,
      email: email,
      book_date: dateSellCar,
      book_time: timeSellCar,
      telephone_number: telephone,
      brand_id: brandId,
      model_id: modelId,
      sub_model_id: submodelId,
      license_plate: plateId,
      year: year,
      mileage: mileage,
      color_id: colorId,
      gear_type: gearType,
      province_id: province,
      branch_id: 1,
      image: uploadedImageData,
    });
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
      <Box display={uploadedImageData.length > 0 ? "none" : "block"}>
        <Image
          src="/icons/icon-formcar.png"
          alt="icon-formcar"
          width={250}
          height={117}
        />
      </Box>
      <UpLoadImages onUpload={handleImageUpload} />
      <span className="fs-18px">ข้อมูลรถ</span>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <select
            onChange={handlerBrandOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>ยี่ห้อ</option>
            {dataBrand.map((item: any, index: number) => {
              return (
                <option key={index} value={item.brand_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={6}>
          <select
            onChange={handlerModelOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>รุ่น</option>
            {dataModel.map((item: any, index: number) => {
              return (
                <option key={index} value={item.model_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={6}>
          <select
            onChange={handlerSubmodelOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>รุ่นย่อย</option>
            {dataSubmodel.map((item: any, index: number) => {
              return (
                <option key={index} value={item.sub_model_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
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
          <select
            onChange={handlerColorOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>สี</option>
            {dataColor.map((item: any, index: number) => {
              return (
                <option key={index} value={item.color_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={6}>
          <select
            onChange={handlerGearTypeOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>เกียร์</option>
            {dataGearType.map((item: any, index: number) => {
              return (
                <option key={index} value={item.gear_type}>
                  {item.name}
                </option>
              );
            })}
          </select>
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
          <select
            onChange={handlerProvinceOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>จังหวัด (ทะเบียน)</option>
            {dataProvince.map((item: any, index: number) => {
              return (
                <option key={index} value={item.province_id}>
                  {item.province_thai}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={6}>
          <Calendar
            id="date-sell-car"
            type="date"
            value={dateSellCar}
            onChange={handlerDateSellCar}
            style="outline"
            disablePastDate="yesterday"
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
