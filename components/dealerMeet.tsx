"use client";
//import outside components
import React, { useState } from "react";
import { Box, Grid, TextField, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
// import inside components
import { CalendarCustom } from "./common/calendar";
import { ButtonCapsule } from "./common/button";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {};

export default function DealerMeet({}: Props) {
  const [isVerified, setIsVerified] = useState(false);

  const siteKey: string | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA || "";

  const handleCaptchaVerify = (response: string | null) => {
    if (response) {
      setIsVerified(true);
      console.log("reCAPTCHA verified:", response);
    } else {
      setIsVerified(false);
      console.error("reCAPTCHA verification failed");
    }
  };

  return (
    <Box borderTop={1} borderBottom={1} paddingY={2}>
      <Typography variant="h6" style={{ color: "#0E2C77" }}>
        นัดดีลเลอร์
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CalendarCustom id={"date-dealer-meet"} type={"date"} />
        </Grid>
        <Grid item xs={6}>
          <CalendarCustom id={"time-dealer-meet"} type={"time"} />
        </Grid>
      </Grid>
      <Box display={"flex"} marginTop={2}>
        <InfoIcon />
        <Typography style={{ color: "#0E2C77" }} fontSize={"16px"}>
          กรุณากรอกข้อมูลให้ครบถ้วน
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <TextField id="name-to-dealer" label="ชื่อ" variant="standard" />
        <TextField id="tel-to-dealer" label="เบอร์โรศัพท์" variant="standard" />
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
          />
        </Box>
      </Box>
    </Box>
  );
}
