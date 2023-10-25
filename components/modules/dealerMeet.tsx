"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Calendar } from "../common/calendar";
import { ButtonCapsule } from "../common/button";
import { Date, InputCustom, Time } from "../common/form";
import { isThaiText, isPhoneNumber, isEmail } from "@/utils/regex";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "@/style/components/module/dealerMeet.module.css";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  modelId: string;
  vehicleId: string;
  listingVparkId: string;
};

export default function DealerMeet({
  modelId,
  listingVparkId,
}: Props) {
  const booking = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/booking";

  const router = useRouter();

  const [verifyName, setVerifyName] = useState<boolean>(false);
  const [verifyTelephone, setVerifyTelephone] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [checkedBot, setCheckedBot] = useState<boolean>(false);

  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || "";

  useEffect(() => {
    if (
      date &&
      time !== "" &&
      verifyName &&
      verifyTelephone &&
      verifyEmail
    ) {
      setIsVerified(true);
    }
  }, [
    checkedBot,
    date,
    email,
    name,
    telephone,
    time,
    verifyEmail,
    verifyName,
    verifyTelephone,
  ]);

  const handleDateChange = (newValue: string) => {
    setDate(newValue);
  };
  const handleTimeChange = (newValue: string) => {
    setTime(newValue);
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
  const handleEmailChange = (event: any) => {
    const textInput = event.target.value;
    setEmail(textInput);
    if (isEmail(textInput)) {
      setVerifyEmail(true);
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
    axios
      .put(booking, {
        listing_vpark_id: listingVparkId,
        model_id: modelId,
        booking_date: date + " " + time,
        name: name,
        email: email,
        phone_no: telephone,
        branch_id: 1,
        referral: 'ty3eWtbmcXyYSJvYRlu0DGS1MWjctPbt29VZbvP9kBLnPdKdsB',
      })
      .then((response) => {
        router.push(`?status=${response.data.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={classes.container}>
      <span className="fs-18px tc-blue">นัดดีลเลอร์</span>
      <Box className={classes.calendar}>
        <Calendar
          id={"date"}
          type={"date"}
          value={date}
          onChange={handleDateChange}
          style="custom"
          disablePastDate={"yesterday"}
        />
        <Calendar
          id={"date"}
          type={"time"}
          value={time}
          onChange={handleTimeChange}
          style="custom"
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
        {/* <InputCustom
          id="email-to-dealer"
          type="text"
          placeholder="อีเมล"
          value={email}
          onChange={handleEmailChange}
        /> */}
        {/* <Box className={classes.recaptcha}>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerify} />
        </Box> */}
        <Box className={classes.btn_submit}>
          <Link href="/looksuccess">
            <ButtonCapsule
              disabled={!isVerified}
              title={"นัดดีลเลอร์"}
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
