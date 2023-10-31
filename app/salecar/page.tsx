/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { InputCustom } from "@/components/common/form";
import { Calendar } from "@/components/common/calendar";
import { ButtonCapsule } from "@/components/common/button";
import { isMileage, isPhoneNumber, isPlateId01, isPlateId02, isPlateId03 } from "@/utils/regex";
import { UpLoadImages } from "@/components/common/uploadFile";
import axios from "axios";
import classes from "@/style/page/salecar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Salecar({}: Props) {
  const router = useRouter();
  const [dataBrand, setDataBrand] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [dataSubmodel, setDataSubmodel] = useState([]);
  const [dataGearType, setDataGearType] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataYears, setDataYears] = useState<string[]>([]);

  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState<string[]>([]);
  const [brandId, setBrandId] = useState(0);
  const [modelId, setModelId] = useState(0);
  const [submodelId, setSubmodelId] = useState(0);
  const [year, setYear] = useState("");
  const [colorId, setColorId] = useState(0);
  const [gearType, setGearType] = useState("");
  const [dateSellCar, setDateSellCar] = useState("");
  const [timeSellCar, setTimeSellCar] = useState("");
  const [mileage, setMileage] = useState("");
  const [plateId01, setPlateId01] = useState("");
  const [plateId02, setPlateId02] = useState("");
  const [plateId03, setPlateId03] = useState("");
  const [provinceId, setProvinceId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    handlerValidate();
  }, [
    brandId,
    modelId,
    submodelId,
    year,
    colorId,
    gearType,
    dateSellCar,
    timeSellCar,
    mileage,
    plateId02,
    plateId03,
    provinceId,
    nickname,
    telephone,
    email,
    uploadedImageData,
  ]);

  useEffect(() => {
    renderGetBrands();
    renderGetYear();
    renderGetGearType();
    renderGetColor();
    renderGetProvince();
  }, []);

  const renderGetBrands = () => {
    axios.get(baseURL + "/vehicles/brands").then((response) => {
      setDataBrand(response.data.data);
    });
  };

  const renderGetModels = (brandId: number) => {
    axios
      .get(baseURL + `/vehicles/models?brand_id=${brandId}`)
      .then((response) => {
        setDataModel(response.data.data);
      });
  };

  const renderGetSubmodels = (modelId: number) => {
    axios
      .get(baseURL + `/vehicles/submodels?model_id=${modelId}`)
      .then((response) => {
        setDataSubmodel(response.data.data);
      });
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

  const renderGetYear = () => {
    const startYear = 1960;
    const endYears = new Date().getFullYear();

    for (let i = startYear; i <= endYears; i++) {
      dataYears.push(i.toString());
    }
  };

  const renderGetProvince = () => {
    axios.get(baseURL + "/select/province").then((response) => {
      setDataProvince(response.data.data);
    });
  };

  const handlerValidate = () => {
    if (
      brandId === 0 ||
      modelId === 0 ||
      submodelId === 0 ||
      year === "" ||
      colorId === 0 ||
      gearType === "" ||
      dateSellCar === "" ||
      timeSellCar === "" ||
      mileage === "" ||
      plateId02 === "" ||
      plateId03 === "" ||
      provinceId === 0 ||
      nickname === "" ||
      telephone === "" ||
      email === "" ||
      uploadedImageData.length <= 0
    ) {
      setIsCanSubmit(false);
    } else {
      setIsCanSubmit(true);
    }
  };

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
    renderGetModels(event.target.value);
  };

  const handlerModelOnChange = (event: any) => {
    setModelId(event.target.value);
    renderGetSubmodels(event.target.value);
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
    const inputText = event.target.value;
    if (isMileage(inputText)) {
      setMileage(event.target.value);
    } else if (inputText === 0 || inputText === "") {
      setMileage("");
    }
  };
  const handlerPlateIdOnChange01 = (event: any) => {
    const inputText = event.target.value;
    if (isPlateId01(inputText)){
      setPlateId01(inputText);
    }else if(inputText == ""){
      setPlateId01(inputText);
    }
  };
  const handlerPlateIdOnChange02 = (event: any) => {
    const inputText = event.target.value;
    if(isPlateId02(inputText)){
      setPlateId02(inputText)
    }else if(inputText == ""){
      setPlateId02(inputText)
    }
  };
  const handlerPlateIdOnChange03 = (event: any) => {
    const inputText = event.target.value;
    if(isPlateId03(inputText)){
      setPlateId03(inputText)
    }else if(inputText == ""){
      setPlateId03(inputText)
    }
  };
  const handlerProvinceOnChange = (event: any) => {
    setProvinceId(event.target.value);
  };
  const handlerNicknameOnChange = (event: any) => {
    setNickname(event.target.value);
  };
  const handlerTelephoneOnChange = (event: any) => {
    const inputText = event.target.value;
    if (isPhoneNumber(inputText)) {
      setTelephone(event.target.value);
    }
  };
  const handlerEmailOnChange = (event: any) => {
    setEmail(event.target.value);
  };

  const renderSubmit = () => {
    setIsCanSubmit(false);
    axios
      .put(baseURL + "/guests/seller", {
        name: nickname,
        email: email,
        book_date: dateSellCar,
        book_time: timeSellCar,
        telephone_number: telephone,
        brand_id: brandId,
        model_id: modelId,
        sub_model_id: submodelId,
        license_plate: plateId01 + plateId02 + plateId03,
        year: year,
        mileage: mileage,
        color_id: colorId,
        gear_type: gearType,
        province_id: provinceId,
        branch_id: 1,
        images: uploadedImageData,
      })
      .then((response) => {
        router.push(
          `?status=${response.data.status}&email=${email}&name=${nickname}`
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsCanSubmit(true);
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
      <Box
        display={uploadedImageData.length > 0 ? "none" : "flex"}
        flexDirection={"column"}
      >
        <Image
          src="/icons/icon-formcar.png"
          alt="icon-formcar"
          width={250}
          height={117}
        />
        <span className="tc-red fs-8px">
          {uploadedImageData.length > 0
            ? ""
            : "**กรุณาอัพโหลดรูปรถที่ต้องการขาย"}
        </span>
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
          <span className="tc-red fs-8px">
            {brandId !== 0 ? "" : "**กรุณาเลือกยี่ห้อ"}
          </span>
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
          <span className="tc-red fs-8px">
            {modelId !== 0 ? "" : "**กรุณาเลือกรุ่น"}
          </span>
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
          <span className="tc-red fs-8px">
            {submodelId !== 0 ? "" : "**กรุณาเลือกรุ่นย่อย"}
          </span>
        </Grid>
        <Grid item xs={6}>
          <select
            onChange={handlerYearOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>ปี</option>
            {dataYears.map((item: string, index: number) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="tc-red fs-8px">
            {year !== "" ? "" : "**กรุณาเลือกปีของรุ่นรถ"}
          </span>
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
          <span className="tc-red fs-8px">
            {colorId !== 0 ? "" : "**กรุณาเลือกสีรถ"}
          </span>
        </Grid>
        <Grid item xs={6}>
          <select
            onChange={handlerGearTypeOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>เกียร์</option>
            {dataGearType.map((item: any, index: number) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="tc-red fs-8px">
            {gearType !== "" ? "" : "**กรุณาเลือกประเภทเกียร์"}
          </span>
        </Grid>
        <Grid item xs={6}>
          <InputCustom
            id="mileage"
            type="number"
            placeholder="เลขไมล์"
            value={mileage}
            onChange={handlerMileageOnChange}
            alert={mileage ? null : "**กรุณากรอกเลขไมล์ของรถที่ถูกต้อง"}
          />
        </Grid>
        <Grid item xs={6}>
          <Box display={"flex"} >
            <InputCustom
              id="plateId"
              type="text"
              value={plateId01}
              placeholder="9"
              onChange={handlerPlateIdOnChange01}
              padding={"0px 15px"}
            />
            <InputCustom
              id="plateId"
              type="text"
              value={plateId02}
              placeholder="กก"
              onChange={handlerPlateIdOnChange02}
              padding={"0px 10px"}
            />
            <InputCustom
              id="plateId"
              type="text"
              value={plateId03}
              placeholder="9999"
              onChange={handlerPlateIdOnChange03}
              padding={"0px 6px"}
            />
          </Box>
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
          <span className="tc-red fs-8px">
            {provinceId !== 0 ? "" : "**กรุณาเลือกจังหวัด(ทะเบียน)"}
          </span>
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
          <span className="tc-red fs-8px">
            {dateSellCar !== "" ? "" : "**กรุณาเลือกวันที่ต้องการขายรถ"}
          </span>
        </Grid>
        <Grid item xs={6}>
          <Calendar
            id="time-sell-car"
            type="time"
            value={timeSellCar}
            onChange={handlerTimeSellCar}
            style="outline"
          />
          <span className="tc-red fs-8px">
            {timeSellCar !== "" ? "" : "**กรุณาเลือกเวลาที่ต้องการขายรถ"}
          </span>
        </Grid>
        <Grid item xs={12}>
          <InputCustom
            id="nickname"
            type="text"
            placeholder="ชื่อเล่น"
            onChange={handlerNicknameOnChange}
            alert={nickname !== "" ? null : "**กรุณากรอกชื่อเล่น"}
          />
        </Grid>
        <Grid item xs={12}>
          <InputCustom
            id="telephone"
            type="text"
            placeholder="โทรศัพท์"
            onChange={handlerTelephoneOnChange}
            alert={telephone !== "" ? null : "**กรุณากรอกเบอร์โทรศัทพ์"}
          />
        </Grid>
        <Grid item xs={12}>
          <InputCustom
            id="e-mail"
            type="text"
            placeholder="อีเมล"
            onChange={handlerEmailOnChange}
            alert={email !== "" ? null : "**กรุณากรอกเมล"}
          />
        </Grid>
      </Grid>
      <Box width={"100%"} margin={4}>
        <Link href="/success">
          <ButtonCapsule
            title="ขายรถ"
            color="#fff"
            bgColor="#4679C7"
            height={42}
            disabled={!isCanSubmit}
            onClick={renderSubmit}
          />
        </Link>
      </Box>
    </Box>
  );
}
