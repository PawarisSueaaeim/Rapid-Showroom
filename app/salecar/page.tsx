/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DateSelection,
  InputCustom,
  TimeSelection,
} from "@/components/common/form";
import { ButtonCapsule } from "@/components/common/button";
import {
  isEmail,
  isMileage,
  isPhoneNumber,
  isPlateId01,
  isPlateId02,
  isPlateId03,
} from "@/utils/regex";
import { UpLoadImages } from "@/components/common/uploadFile";
import axios from "axios";
import classes from "@/style/page/salecar.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
  filteredDescription,
  filteredModel,
  filteredYear,
} from "@/utils/filter";
import { Dayjs } from "dayjs";
import moment from "moment";
import { ColorSet } from "@/constants";

type Props = {};

const baseURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL;

export default function Salecar({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refferal = searchParams.get("ref") || null;
  const [dataBrand, setDataBrand] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [dataSubmodel, setDataSubmodel] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataYears, setDataYears] = useState<string[]>([]);

  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [isfullyData, setIsfullyData] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleDetailId, setVehicleDetailId] = useState(0);
  const [year, setYear] = useState("");
  const [colorId, setColorId] = useState(0);
  const [dateSellCar, setDateSellCar] = useState("");
  const [timeSellCar, setTimeSellCar] = useState("");
  const [mileage, setMileage] = useState("");
  const [plateId01, setPlateId01] = useState("");
  const [plateId02, setPlateId02] = useState("");
  const [plateId03, setPlateId03] = useState("");
  const [checkboxPlateId, setCheckBoxlateId] = useState(false);
  const [provinceId, setProvinceId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const [dataFilter, setDataFilter] = useState([]);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (refferal !== null) {
      sessionStorage.setItem("ref", refferal);
    }
  }, [refferal]);

  useEffect(() => {
    handlerValidate();
  }, [
    brand,
    model,
    vehicleDetailId,
    year,
    colorId,
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
    renderGetDataFilter();
    renderGetColor();
    renderGetProvince();
  }, []);

  const renderGetBrands = () => {
    axios
      .post(baseURL + "/vehicles/get/vehicle_detail")
      .then((response) => {
        setDataBrand(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderGetDataFilter = () => {
    axios
      .post(baseURL + "/vehicles/get/vehicle_detail")
      .then((response) => {
        setDataFilter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderGetModels = (brand: string) => {
    setBrand(brand);
    setDataModel(filteredModel(dataFilter, brand));
  };

  const renderSetYearsRadBook = (model: string) => {
    setDataYears(filteredYear(dataFilter, brand, model));
  };

  const renderGetSubmodels = (years: number) => {
    setDataSubmodel(filteredDescription(dataFilter, brand, model, years));
  };

  const renderGetColor = () => {
    axios.get(baseURL + "/vehicles/colors").then((response) => {
      setDataColor(response.data.data);
    });
  };

  const renderGetProvince = () => {
    axios.get(baseURL + "/select/province").then((response) => {
      setDataProvince(response.data.data);
    });
  };

  const handlerValidate = () => {
    if (
      brand === "" ||
      model === "" ||
      vehicleDetailId === 0 ||
      year === "" ||
      colorId === 0 ||
      dateSellCar === "" ||
      timeSellCar === "" ||
      mileage === "" ||
      plateId02 === "" ||
      plateId03 === "" ||
      provinceId === 0 ||
      nickname === "" ||
      telephone === "" ||
      !isEmail(email) ||
      uploadedImageData.length != 5
    ) {
      setIsCanSubmit(false);
      setIsfullyData(false);
    } else {
      setIsfullyData(true);
      setIsCanSubmit(true);
    }
  };

  const handleImageUpload = (imageDataArray: string[]) => {
    setUploadedImageData([...imageDataArray]);
  };

  const handlerDateSellCar = (date: Dayjs | null) => {
    //@ts-ignore
    const formatDate = moment(date.$d).format("YYYY-MM-DD");
    setDateSellCar(formatDate);
  };
  const handlerTimeSellCar = (time: Dayjs | null) => {
    //@ts-ignore
    const formatTime = moment(time.$d).format("HH:mm:ss");
    setTimeSellCar(formatTime);
  };

  const handlerBrandOnChange = (event: any) => {
    setModel("");
    renderGetModels(event.target.value);
  };

  const handlerModelOnChange = (event: any) => {
    setModel(event.target.value);
    renderSetYearsRadBook(event.target.value);
  };
  const handlerSubmodelOnChange = (event: any) => {
    setVehicleDetailId(event.target.value);
  };
  const handlerYearOnChange = (event: any) => {
    setYear(event.target.value);
    renderGetSubmodels(event.target.value);
  };
  const handlerColorOnChange = (event: any) => {
    setColorId(event.target.value);
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
    if (isPlateId01(inputText)) {
      setPlateId01(inputText);
    } else if (inputText == "") {
      setPlateId01(inputText);
    }
  };
  const handlerPlateIdOnChange02 = (event: any) => {
    const inputText = event.target.value;
    if (isPlateId02(inputText)) {
      setPlateId02(inputText);
    } else if (inputText == "") {
      setPlateId02(inputText);
    }
  };
  const handlerPlateIdOnChange03 = (event: any) => {
    const inputText = event.target.value;
    if (isPlateId03(inputText)) {
      setPlateId03(inputText);
    } else if (inputText == "") {
      setPlateId03(inputText);
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
    if (isPhoneNumber(inputText) || inputText == "") {
      setTelephone(event.target.value);
    }
  };
  const handlerEmailOnChange = (event: any) => {
    setEmail(event.target.value);
  };

  const renderSubmit = () => {
    setIsLoading(true);
    setIsCanSubmit(false);
    axios
      .put(baseURL + "/guests/seller", {
        name: nickname,
        email: email,
        book_date: dateSellCar,
        book_time: timeSellCar,
        telephone_number: telephone,
        vehicle_detail_id: vehicleDetailId,
        license_plate: plateId01 + plateId02 + plateId03,
        year: year,
        mileage: mileage,
        color_id: colorId,
        province_id: provinceId,
        branch_id: 1,
        images: uploadedImageData,
        referral: sessionStorage.getItem("ref"),
      })
      .then((response) => {
        router.push(
          `/success?status=${response.data.status}&email=${email}&name=${nickname}&is_member=${response.data.data.is_member}`
        );
      })
      .catch((error) => {
        console.log(error);
        setIsCanSubmit(true);
      })
      .finally(() => {
        setIsLoading(false);
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
      <UpLoadImages onUpload={handleImageUpload} />
      <span className="fs-18px">ข้อมูลรถ</span>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <select
            onChange={handlerBrandOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>ยี่ห้อ</option>
            {dataBrand.map((item: any, index: number) => {
              return (
                <option key={index + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="tc-red fs-8px">
            {brand !== "" ? "" : "**กรุณาเลือกยี่ห้อ"}
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
                <option key={index + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="tc-red fs-8px">
            {model !== "" ? "" : "**กรุณาเลือกรุ่น"}
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
        <Grid item xs={12}>
          <select
            onChange={handlerSubmodelOnChange}
            className={classes.selection_custom}
          >
            <option value={0}>รายละเอียด</option>
            {dataSubmodel.map((item: any, index: number) => {
              return (
                <option key={index} value={item.vehicle_detail_id}>
                  {item.Description}
                </option>
              );
            })}
          </select>
          <span className="tc-red fs-8px">
            {vehicleDetailId !== 0 ? "" : "**กรุณาเลือกรุ่นย่อย"}
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
          <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <InputCustom
                id="plateId"
                type="text"
                value={!checkboxPlateId ? plateId01 : "-"}
                disabled={checkboxPlateId}
                placeholder={!checkboxPlateId ? "1-9" : "-"}
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
                type="number"
                value={plateId03}
                placeholder="9999"
                onChange={handlerPlateIdOnChange03}
                padding={"0px 6px"}
              />
            </Box>

            <Box display={"flex"} alignItems={"center"} gap={1}>
              <input
                type="checkbox"
                id="checkbox-plateId-first-number"
                value="Bike"
                onClick={() => setCheckBoxlateId(!checkboxPlateId)}
              />
              <span className="fs-8px">ไม่มีเลขหน้า</span>
            </Box>
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
        <Grid item xs={6} marginTop={2}>
          <DateSelection
            label={"เลือกวันที่ขายรถ"}
            onDateChange={handlerDateSellCar}
            disablePast={true}
          />
          <span className="tc-red fs-8px">
            {dateSellCar !== "" ? "" : "**กรุณาเลือกวันที่ต้องการขายรถ"}
          </span>
        </Grid>
        <Grid item xs={6} marginTop={2}>
          <TimeSelection
            label={"เลือกเวลาขายรถ"}
            onTimeChange={handlerTimeSellCar}
            date={dateSellCar}
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
            value={telephone}
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
        <ButtonCapsule
          title={!isfullyData ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "ขายรถ"}
          color="#000"
          fontWeight={400}
          boxShadow={true}
          bgColor="#FFFFFF"
          height={42}
          disabled={!isCanSubmit}
          onClick={renderSubmit}
        />
      </Box>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={ColorSet.bgWhite}
            style={{
              position: "fixed",
              opacity: 0.9,
              zIndex: 10,
              height: "100vh",
              width: "100vw",
              top: "0",
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
