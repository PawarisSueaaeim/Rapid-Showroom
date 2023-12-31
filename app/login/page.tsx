/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Alert, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "@/style/page/login/login.module.css";
import { InputEmail, InputPassword } from "@/components/common/form";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { IsLoading } from "@/components/common/loading";

type Props = {};

export default function Login({}: Props) {
  const login = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/login";
  const logout = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/logout";

  const router = useRouter();
  const searchParans = useSearchParams();
  const registerSuccess = searchParans.get("status");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [alertPassword, setAlertPassword] = useState<boolean>(false);
  const [disableLoginBtn, setDisableLoginBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (email != "" && password != "") {
      setDisableLoginBtn(false);
    } else {
      setDisableLoginBtn(true);
    }
  }, [email, password]);

  useEffect(() => {
    sessionStorage.clear();
    axios
      .post(logout)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  }, []);

  const renderSubmit = () => {
    setIsLoading(true);
    setDisableLoginBtn(true);
    axios
      .post(login, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.status == "OK") {
          router.push("/info");
          sessionStorage.setItem("info", JSON.stringify(response.data.user));
          sessionStorage.setItem("userId", response.data.access_token);
        } else {
          setAlertPassword(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error login api", error);
      })
  };

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <Box className={classes.content}>
            <span className="fs-24px fw-400 tc-black">Sign in</span>
            <span className="fs-20px">เพื่อดูผลการประเมินราคา</span>
          </Box>
          <Box className={classes.login_form}>
            <InputEmail onChange={emailHandler} />
            <InputPassword onChange={passwordHandler} label="password" />
          </Box>
          <ButtonPleumDesign
            title="เข้าสู่ระบบ"
            onClick={renderSubmit}
            textBtnColor={ColorSet.textBlack}
            backgroundBtnColor={ColorSet.btnGray}
            backgroundBtnHoverColor={ColorSet.btnGrayHover}
            disabled={disableLoginBtn}
          />
        </>
      )}
      {alertPassword ? (
        <Alert severity="warning">
          รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
        </Alert>
      ) : null}
      {registerSuccess === "OK" ? (
        <Alert severity="success">สมัครสมาชิกสำเร็จ!</Alert>
      ) : null}
    </Box>
  );
}
