"use client";
import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import classes from "@/style/page/login/login.module.css";
import { InputEmail, InputPassword } from "@/components/common/form";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

export default function Login({}: Props) {
  const router = useRouter();
  const searchParans = useSearchParams();
  const isValid = searchParans.get("status");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const renderSubmit = () => {
    console.log(email);
    console.log(password);
    if (email === "test@example.com" && password === "1234") {
      router.push("/accept");
    } else {
      router.push("?status=inValid");
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <span className="fs-24px fw-400 tc-black">Sign in</span>
        <span className="fs-20px">เพื่อดูผลการประเมินราคา</span>
      </Box>
      <Box className={classes.login_form}>
        <InputEmail onChange={emailHandler} />
        <InputPassword onChange={passwordHandler} />
      </Box>
      <ButtonPleumDesign
        title="เข้าสู่ระบบ"
        onClick={renderSubmit}
        textBtnColor={ColorSet.textBlack}
        backgroundBtnColor={ColorSet.btnGray}
        backgroundBtnHoverColor={ColorSet.btnGrayHover}
      />
      {isValid === "inValid" ? (
        <Alert severity="warning">
          รหัสผ่านไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง
        </Alert>
      ) : null}
    </Box>
  );
}
