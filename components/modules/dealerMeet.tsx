"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ButtonCapsule } from "../common/button";
import { Date, InputCustom, Time } from "../common/form";
import { isThaiText, isPhoneNumber } from "@/utils/regex";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "@/style/components/module/dealerMeet.module.css";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dayjs } from "dayjs";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  setBrand,
  setDateDeposit,
  setDeposit,
  setGuestId,
  setImage,
  setModel,
  setPlateId,
  setPrice,
  setSubmodel,
  setTimeDeposit,
  setVparkId,
} from "@/app/globalRedux/feature/dealerMeet/depositSlice";

type Props = {
  modelId: number;
  vehicleId: number;
  listingVparkId: number;
  brand: string;
  model: string;
  submodel: string;
  price: string;
  image: string;
  plateId: string;
};

export default function DealerMeet({
  modelId,
  vehicleId,
  listingVparkId,
  brand,
  model,
  submodel,
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
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState<string>("test@example.com");
  const [checkedBot, setCheckedBot] = useState<boolean>(false);

  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || "";

  useEffect(() => {
    if (checkedBot && date && time && verifyName && verifyTelephone) {
      setIsVerified(true);
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
  ]);

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
  const handleTelephoneChange = (event: any) => {
    const textInput = event.target.value;
    if (isPhoneNumber(textInput)) {
      setVerifyTelephone(true);
      setTelephone(textInput);
    }
  };

  const handleCaptchaVerify = (response: string | null) => {
    if (response) {
      setCheckedBot(true);
    } else {
      setCheckedBot(false);
    }
  };

  const handleSubmit = () => {
    setIsVerified(false);
    axios
      .put(booking, {
        listing_vpark_id: listingVparkId,
        model_id: modelId,
        booking_date: date + " " + time,
        name: name,
        email: email,
        phone_no: telephone,
        branch_id: 1,
        referral: refferal,
        soldType: soldType,
      })
      .then((response) => {
        router.push(
          `?status=${response.data.status}&guest_id=${response.data.data.guest_id}&vpark_id=${listingVparkId}`
        );
        dispatch(setBrand(brand))
        console.log(brand)
        dispatch(setModel(model))
        console.log(model)
        dispatch(setSubmodel(submodel))
        console.log(submodel)
        dispatch(setDateDeposit(date))
        console.log(date)
        dispatch(setTimeDeposit(time))
        console.log(time)
        dispatch(setImage(image))
        console.log(image)
        dispatch(setGuestId(response.data.data.guest_id))
        console.log(response.data.data.guest_id)
        dispatch(setVparkId(listingVparkId))
        console.log(listingVparkId)
        dispatch(setPrice(price))
        console.log(price)
        dispatch(setPlateId(plateId))
        console.log(plateId)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsVerified(true);
      });
  };

  return (
    <Box className={classes.container}>
      <span className="fs-18px tc-blue">นัดดูรถ</span>
      <Box className={classes.calendar}>
        <Date onDateChange={handleDateChange} />
        <Time onTimeChange={handleTimeChange} date={date} />
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
        <Box className={classes.recaptcha}>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerify} />
        </Box>
        <Box className={classes.btn_submit}>
          <Link href="/deposit">
            <ButtonCapsule
              disabled={!isVerified}
              title={"ยืนยันนัดดูรถ"}
              bgColor={"#4679C7"}
              color={"#fff"}
              fontSize={16}
              height={40}
              onClick={handleSubmit}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
