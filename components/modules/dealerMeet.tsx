"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, textFieldClasses } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Calendar } from "../common/calendar";
import { ButtonCapsule } from "../common/button";
import { InputCustom } from "../common/form";
import ReCAPTCHA from "react-google-recaptcha";
import { isThaiText, isPhoneNumber, isEmail } from "@/utils/inputFormat";

type Props = {};

export default function DealerMeet({}: Props) {
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
    if (date && time !== "" && verifyName && verifyTelephone && verifyEmail && checkedBot){
      setIsVerified(true);
    }
  },[checkedBot, date, email, name, telephone, time, verifyEmail, verifyName, verifyTelephone])

  const handleDateChange = (newValue: string) => {
    setDate(newValue);
  };
  const handleTimeChange = (newValue: string) => {
    setTime(newValue);
  };
  const handleNameChange = (event: any) => {
    const textInput = event.target.value;
    setName(textInput);
    if(isThaiText(textInput)){
      setVerifyName(true);
    }
  };
  const handleTelephoneChange = (event: any) => {
    const textInput = event.target.value;
    setTelephone(textInput);
    if(isPhoneNumber(textInput)){
      setVerifyTelephone(true);
    }
  };
  const handleEmailChange = (event: any) => {
    const textInput = event.target.value;
    setEmail(textInput);
    if(isEmail(textInput)){
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
    console.log(date)
    console.log(time)
    console.log(name)
    console.log(telephone)
    console.log(email)
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      style={{
        marginTop: "27px",
        padding: "23px",
        borderTop: "0.5px solid #8F9DA3",
      }}
    >
      <span className="fs-18px tc-blue">นัดดีลเลอร์</span>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <Calendar
            id={"date"}
            type={"date"}
            value={date}
            onChange={handleDateChange}
            style="custom"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Calendar
            id={"date"}
            type={"time"}
            value={time}
            onChange={handleTimeChange}
            style="custom"
          />
        </Grid>
      </Grid>
      <Box display={"flex"} marginTop={2}>
        <span className="fs-14px tc-blue">
          <InfoIcon />
        </span>
        <span className="fs-16px tc-blue">กรุณากรอกข้อมูลให้ครบถ้วน</span>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
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
          id="email-to-dealer"
          type="text"
          placeholder="อีเมล"
          value={email}
          onChange={handleEmailChange}
        />
        <Box marginY={2}>
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerify} />
        </Box>
        <Box marginY={2}>
          <ButtonCapsule
            disabled={!isVerified}
            title={"นัดดีลเลอร์"}
            bgColor={"#4679C7"}
            color={"#fff"}
            fontSize={16}
            height={40}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
}
