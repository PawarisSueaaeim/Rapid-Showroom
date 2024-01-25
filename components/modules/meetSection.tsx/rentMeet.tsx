"use client";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { ButtonCapsule, ButtonPleumDesign } from "../../common/button";
import { DateSelection, InputCustom, TimeSelection } from "../../common/form";
import { isPhoneNumber, isEmail } from "@/utils/regex";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "@/style/components/module/dealerMeet.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { BasicModal } from "../../common/modal";
import { ColorSet } from "@/constants";
import { daymontyearFormat, timeHourFormat } from "@/utils/dateHelper";
import { currency } from "@/utils/currency";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

type Props = {
  modelId: number;
  vehicleId: number;
  listingVparkId: number;
  brand: string;
  model: string;
  year?: string;
  submodel: string;
  price: string;
  image?: string;
  plateId?: string;
  reference_id: string;
};

export default function RentMeet({
  listingVparkId,
  brand,
  model,
  year,
  price,
  image,
  plateId,
  reference_id,
}: Props) {
  const booking = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/booking";

  const router = useRouter();
  const searchParams = useSearchParams();
  const refferal = searchParams.get("ref") || null;
  const soldType = searchParams.get("soldtype") || null;

  const [verifyName] = useState<boolean>(false);
  const [verifyTelephone, setVerifyTelephone] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [longTime, setLongTime] = useState<string>("");
  const [dateReturn, setDateReturn] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [locationPickCar, setLocationPickCar] = useState<string>("");
  const [locationReturnCar, setLocationReturnCar] = useState<string>("");
  const [checkedBot, setCheckedBot] = useState<boolean>(false);
  const [openModalRejectMsg, setOpenModalRejectMsg] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || "";

  useEffect(() => {
    if (refferal !== null && soldType !== null) {
      sessionStorage.setItem("ref", refferal);
      sessionStorage.setItem("soldType", soldType);
    }
  }, [refferal, soldType]);

  useEffect(() => {
    if (
      checkedBot &&
      date &&
      isEmail(email) &&
      time &&
      name != "" &&
      verifyTelephone &&
      telephone != "" &&
      dateError == null &&
      timeError == null &&
      longTime != "" &&
      locationPickCar != "" &&
      locationReturnCar != ""
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [
    checkedBot,
    date,
    email,
    name,
    telephone,
    time,
    verifyName,
    verifyTelephone,
    dateError,
    timeError,
    longTime,
  ]);

  console.log(longTime);

  const handleDateChange = (date: Dayjs | null) => {
    //@ts-ignore
    const formatDate = moment(date.$d).format("YYYY-MM-DD");
    setDate(formatDate);
  };
  const handleTimeChange = (time: Dayjs | null) => {
    //@ts-ignore
    const formatTime = moment(time.$d).format("HH:mm:ss");
    setTime(formatTime);
  };
  const handleDateReturn = (date: Dayjs | null) => {
    //@ts-ignore
    const formatDate = moment(date.$d).format("YYYY-MM-DD");
    setDateReturn(formatDate);
  };

  const handleNameChange = (event: any) => {
    const textInput = event.target.value;
    setName(textInput);
  };

  const handleTelephoneChange = (event: any) => {
    const textInput = event.target.value;
    if (isPhoneNumber(textInput)) {
      setVerifyTelephone(true);
      setTelephone(textInput);
    }
  };
  const handlerEmailOnChange = (event: any) => {
    const textInput = event.target.value;
    setEmail(textInput);
  };

  const handleCaptchaVerify = (response: string | null) => {
    if (response) {
      setCheckedBot(true);
    } else {
      setCheckedBot(false);
    }
  };

//   const handleSubmit = () => {
//     setOpenConfirm(false);
//     setIsLoading(true);
//     setIsVerified(false);
//     axios
//       .put(booking, {
//         listing_vpark_id: listingVparkId,
//         brand: brand,
//         model: model,
//         booking_date: date + " " + time,
//         name: name,
//         email: email,
//         phone_no: telephone,
//         branch_id: 1,
//         referral: sessionStorage.getItem("ref"),
//         sold_type: soldType ? parseInt(soldType) : null,
//         client_request_url: window.location.href,
//       })
//       .then((response) => {
//         if (response.data.status == "OK") {
//           router.push(
//             `/deposit?status=${response.data.status}&guest_id=${response.data.data.guest_id}&member=${response.data.data.is_member}&email=${email}&name=${name}&showroom_appointment_id=${response.data.data.showroom_appointment_id}&vpark_id=${listingVparkId}&img=${image}&brand=${brand}&model=${model}&dateDeposit=${date}&timeDeposit=${time}&plateId=${plateId}&price=${price}&longTime=${longTime}&locationPick=${locationPickCar}&locationReturn=${locationReturnCar}`
//           );
//         } else {
//           setMessage(response.data.client_message);
//           setOpenModalRejectMsg(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//         setIsVerified(true);
//       });
//   };

  const handleSubmit = () => {
    router.push(`/rentsuccess?brand=${brand}&model=${model}&year=${year}&plateId=${plateId}&price=${price}&date=${date}&time=${time}&longTime=${longTime}&locationPick=${locationPickCar}&locationReturn=${locationReturnCar}&ref=${reference_id}`)
  };

  const mockData = ["1", "2", "3", "4", "5", "6"];

  return (
    <Box className={classes.container}>
      <span className="fs-18px tc-blue">นัดรับรถ</span>
      <Box className={classes.calendar}>
        <DateSelection
          label="เลือกวันที่รับรถ"
          onError={(value) => setDateError(value)}
          onDateChange={handleDateChange}
          disablePast={true}
          //   maxDate={dayjs().add(24, "hour")}
        />
        <TimeSelection
          label="เลือกเวลารับรถ"
          onTimeChange={handleTimeChange}
          onError={(value) => setTimeError(value)}
          date={date}
        />
      </Box>
      <Box marginTop={2}>
        <span className="fs-18px tc-blue">ระยะเวลาที่ต้องการเช่า</span>
      </Box>
      <Box className={classes.calendar}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={mockData}
          sx={{ width: 300 }}
          onChange={(time: any) => setLongTime(time.target.outerText)}
          renderInput={(params) => <TextField {...params} label="เดือน" />}
        />
      </Box>
      <Box className={classes.form_label}>
        <Image
          src="/icons/icon-info.png"
          alt="icon-info"
          width={20}
          height={20}
        />
        <span className="fs-16px tc-blue">กรุณากรอกข้อมูลให้ครบถ้วน</span>
      </Box>
      <Box className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputCustom
              id="name-to-dealer"
              type="text"
              placeholder="ชื่อ"
              value={name}
              onChange={handleNameChange}
            />
            <InputCustom
              id="tel-to-dealer"
              type="text"
              placeholder="โทรศัพท์"
              value={telephone}
              onChange={handleTelephoneChange}
            />
            <InputCustom
              id="tel-to-dealer"
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={handlerEmailOnChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <span className="fs-16px tc-blue">สถานที่รับรถ</span>
              <TextareaAutosize
                style={{ resize: "none", width: "100%" }}
                onChange={(e: any) => setLocationPickCar(e.target.value)}
              />
              <span className="fs-16px tc-blue">สถานที่คืนรถ</span>
              <TextareaAutosize
                style={{ resize: "none", width: "100%" }}
                onChange={(e: any) => setLocationReturnCar(e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>

        <Box className={classes.recaptcha}>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerify} />
        </Box>
        <Box className={classes.btn_submit}>
          <ButtonCapsule
            disabled={!isVerified}
            boxShadow={true}
            title={"ยืนยันนัดดูรถ"}
            bgColor={"#FFF"}
            color={"#000"}
            fontSize={16}
            fontWeight={400}
            height={40}
            onClick={() => setOpenConfirm(true)}
          />
        </Box>
      </Box>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={ColorSet.bgGray}
            style={{
              position: "fixed",
              opacity: 0.9,
              zIndex: 100,
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
      {openModalRejectMsg && (
        <BasicModal
          title="เกิดข้อผิดพลาด"
          message={`${message}: ขออภัยในความไม่สะดวกค่ะ`}
          onOpen={openModalRejectMsg}
          icon="error"
          onClose={() => setOpenModalRejectMsg(false)}
        />
      )}
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.announcement}>
          <Box display={"flex"} gap={2}>
            <h2 id="parent-modal-title">ตรวจสอบข้อมูล</h2>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <span className="fs-16px fw-400">
              {brand} {model}
            </span>
            <span className="fs-16px">
              <strong>ราคา:</strong> {price} บาท
            </span>
            <span className="fs-16px">
              <strong>ชื่อ:</strong> {name}
            </span>
            <span className="fs-16px">
              <strong>เบอร์โทร:</strong> {telephone}
            </span>
            <span className="fs-16px">
              <strong>อีเมล:</strong> {email}
            </span>
            <span className="fs-16px">
              <strong>สถานที่รับรถ:</strong> {locationPickCar}
            </span>
            <span className="fs-16px">
              <strong>เวลานัดหมาย</strong>
            </span>
            <span className="fs-16px">
              <strong>วันที่:</strong> {daymontyearFormat(date)}
            </span>
            <span className="fs-16px">
              <strong>เวลา:</strong> {timeHourFormat(time)}
            </span>
            <span className="fs-16px">
              <strong>ระยะเวลาที่ต้องการเช่า:</strong> {longTime} เดือน
            </span>
            <span className="fs-16px">
              <strong>สถานที่คืนรถ:</strong> {locationReturnCar}
            </span>
          </Box>

          <Box display={"flex"} marginTop={4} gap={2}>
            <ButtonPleumDesign
              title={"ปิด"}
              backgroundBtnColor={ColorSet.btnWhite}
              backgroundBtnHoverColor={ColorSet.btnWhiteHover}
              textBtnColor={ColorSet.textBlack}
              onClick={() => setOpenConfirm(false)}
            />
            <ButtonPleumDesign
              title={"ยืนยัน"}
              backgroundBtnColor={ColorSet.btnWhite}
              backgroundBtnHoverColor={ColorSet.btnWhiteHover}
              textBtnColor={ColorSet.textBlack}
              onClick={handleSubmit}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
