"use client";
import React, { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { CalendarCustom } from "../common/calendar";
import { ButtonCapsule } from "../common/button";
import ReCAPTCHA from "react-google-recaptcha";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

type Props = {};

export default function DealerMeet({}: Props) {
  const [isVerified, setIsVerified] = useState(false);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleDateChange = (newValue: string) => {
    setDate(newValue);
  };
  const handleTimeChange = (newValue: string) => {
    setTime(newValue);
  };

  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || "";

  const handleCaptchaVerify = (response: string | null) => {
    if (response) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
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
        <Grid item xs={6}>
          <CalendarCustom
            id={"date"}
            type={"date"}
            value={date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CalendarCustom
            id={"date"}
            type={"time"}
            value={time}
            onChange={handleTimeChange}
          />
        </Grid>
      </Grid>
      <Box display={"flex"} marginTop={2}>
        <span className="fs-14px tc-blue"><InfoIcon/></span>
        <span className="fs-16px tc-blue">กรุณากรอกข้อมูลให้ครบถ้วน</span>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <TextField id="name-to-dealer" label="ชื่อ" variant="standard"/>
        <TextField id="tel-to-dealer" label="เบอร์โทรศัพท์" variant="standard" />
        <TextField id="email-to-dealer" label="อีเมล์" variant="standard" />
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
          />
        </Box>
      </Box>
    </Box>
  );
}
