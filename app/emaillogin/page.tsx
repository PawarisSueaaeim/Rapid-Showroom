/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { ColorSet } from "@/constants";
import { passwordValidation } from "@/utils/regex";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function EmailLogin({}: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsValid, setPasswordIsvalid] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const validation = () => {
    if (passwordValidation(password)) {
      setPasswordIsvalid(true);
    } else {
      setPasswordIsvalid(false);
    }
  };
  const confirmValidation = () => {
    if (confirmPassword === password && password !== ''){
      setIsMatch(true);
    }else{
      setIsMatch(false);
    }
  }

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event: any) => {
    setConfirmPassword(event.target.value)
  };

  useEffect(() => {
    validation();
    confirmValidation();
  }, [password, confirmPassword]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <span className="fs-32px fw-400">Create Password</span>
      <hr/>
      <InputPassword
        error={!passwordIsValid}
        onChange={passwordHandler}
        placeholder={"Example@1234"}
      />
      {!passwordIsValid && (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          <ul className="tc-red fs-10px">
            <li>* มี 6 ตัวอักษรขึ้นไป</li>
            <li>* มีอักขระพิเศษอย่างน้อย 1 ตัวอักษร</li>
            <li>* มีตัวเลขอย่างน้อย 1 ตัว</li>
          </ul>
        </Box>
      )}

      <Box display={"flex"} flexDirection={"column"} marginTop={2} >
        <InputPassword
          onChange={confirmPasswordHandler}
          placeholder={"Confirm password"}
        />
        {!isMatch && (
          <span className="fs-10px tc-red">**รหัสผ่านไม่ตรงกัน</span>
        )}
      </Box>

      <Box marginTop={4}>
        <span className="tc-red fw-200 fs-10px"></span>
        <Link href={"/login"}>
          <ButtonPleumDesign
            title={"Submit"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
            disabled={!isMatch}
          />
        </Link>
      </Box>
    </Box>
  );
}
