"use client";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, TextField } from "@mui/material";
import { ButtonCapsule } from "../common/button";
import { DateSelection, InputCustom, TimeSelection } from "../common/form";
import { isThaiText, isPhoneNumber, isEmail } from "@/utils/regex";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "@/style/components/module/dealerMeet.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { useDispatch } from "react-redux";
import { BasicModal } from "../common/modal";
import { ColorSet } from "@/constants";

type Props = {
  modelId: number;
  vehicleId: number;
  listingVparkId: number;
  brand: string;
  model: string;
  submodel: string;
  price: string;
  image?: string;
  plateId?: string;
};

export default function DealerMeet({
  listingVparkId,
  brand,
  model,
  price,
  image,
  plateId,
}: Props) {
  const booking = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/booking";

  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const refferal = searchParams.get("ref") || null;
  const soldType = searchParams.get("soldtype") || null;

  const [verifyName, setVerifyName] = useState<boolean>(false);
  const [verifyTelephone, setVerifyTelephone] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [valuesDeposit, setValuesDeppsit] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [checkedBot, setCheckedBot] = useState<boolean>(false);
  const [openModalRejectMsg, setOpenModalRejectMsg] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckDeposit, setIsCheckDeposit] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);

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
      // checkedBot &&
      date &&
      isEmail(email) &&
      time &&
      verifyName &&
      verifyTelephone &&
      ((isCheckDeposit == true && parseInt(valuesDeposit) >= 5000) || isCheckDeposit == false) &&
      dateError == null &&
      timeError == null
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [
    // checkedBot,
    date,
    email,
    name,
    telephone,
    time,
    verifyName,
    verifyTelephone,
    isCheckDeposit,
    valuesDeposit,
    dateError,
    timeError
  ]);

  console.log("dateError",dateError)
  console.log("timeError",timeError)

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

  const handleNameChange = (event: any) => {
    const textInput = event.target.value;
    setName(textInput);
    if (isThaiText(textInput)) {
      setVerifyName(true);
    }
  };

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setValuesDeppsit(inputValue);
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

  const handleSubmit = () => {
    setIsLoading(true);
    setIsVerified(false);
    axios
      .put(booking, {
        listing_vpark_id: listingVparkId,
        brand: brand,
        model: model,
        booking_date: date + " " + time,
        name: name,
        email: email,
        phone_no: telephone,
        branch_id: 1,
        referral: sessionStorage.getItem("ref"),
        soldType: sessionStorage.getItem("soldType"),
      })
      .then((response) => {
        if (response.data.status == "OK") {
          router.push(
            `/deposit?status=${response.data.status}&guest_id=${response.data.data.guest_id}&member=${response.data.data.is_member}&email=${email}&name=${name}&showroom_appointment_id=${response.data.data.showroom_appointment_id}&vpark_id=${listingVparkId}&img=${image}&brand=${brand}&model=${model}&dateDeposit=${date}&timeDeposit=${time}&plateId=${plateId}&price=${price}&valuesDeposit=${valuesDeposit}`
          );
        } else {
          setMessage(response.data.client_message);
          setOpenModalRejectMsg(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box className={classes.container}>
      <span className="fs-18px tc-blue">นัดดูรถ</span>
      <Stack direction="row" spacing={2}>
          <TextField
            label="Deposit (ขั้นต่ำ 5,000 บาท)"
            value={valuesDeposit}
            onChange={handleChange}
            disabled={!isCheckDeposit}
            name="numberformat"
            id="formatted-numberformat-input"
            variant="standard"
          />
        </Stack>
      <Box display={"flex"} alignItems={"center"}>
        <input
          type="checkbox"
          id="checkbox-plateId-first-number"
          value="Bike"
          onClick={() => {
            setIsCheckDeposit(!isCheckDeposit);
          }}
        />
        <span className="fs-8px">ต้องการมัดจำรถ</span>
      </Box>
      <Box className={classes.calendar}>
        <DateSelection
          label="เลือกวันที่นัดดีลเลอร์"
          onError={(value) => setDateError(value)}
          onDateChange={handleDateChange}
          maxDate={(isCheckDeposit == true && parseInt(valuesDeposit) >= 5000) ? dayjs().add(24, 'hour') : null}
        />
        <TimeSelection
          label="เลือกเวลานัดดีลเลอร์"
          onTimeChange={handleTimeChange}
          onError={(value) => setTimeError(value)}
          date={date}
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
        {/* <Box className={classes.recaptcha}>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerify} />
        </Box> */}
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
            onClick={handleSubmit}
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
      {openModalRejectMsg && (
        <BasicModal
          title="เกิดข้อผิดพลาด"
          message={message}
          onOpen={openModalRejectMsg}
          onClose={() => setOpenModalRejectMsg(false)}
        />
      )}
    </Box>
  );
}
