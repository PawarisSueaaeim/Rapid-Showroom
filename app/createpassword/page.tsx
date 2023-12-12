/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { InputPassword } from "@/components/common/form";
import { IsLoading } from "@/components/common/loading";
import { ColorSet } from "@/constants";
import { passwordValidation } from "@/utils/regex";
import { Box } from "@mui/material";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CreatePassword({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  const register =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/register";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsValid, setPasswordIsvalid] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (passwordValidation(password)) {
      setPasswordIsvalid(true);
    } else {
      setPasswordIsvalid(false);
    }
  };
  const confirmValidation = () => {
    if (confirmPassword === password && password !== "") {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  };

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    validation();
    confirmValidation();
  }, [password, confirmPassword]);

  const renderOnSubmit = () => {
    setIsLoading(true);
    axios
      .post(register, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.status == "success") {
          router.push(`/login?status=${response.data.status}`);
        }else{
          router.push(`/registerFail`);
        }
      })
      .catch((error) => {
        console.log(error);
        router.push(`/registerFail`);
      })
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      {isLoading ? (
        <>
          <IsLoading />
        </>
      ) : (
        <>
          <span className="fs-32px fw-400">Create Password</span>
          <hr />
          <InputPassword
            error={!passwordIsValid}
            onChange={passwordHandler}
            placeholder={"Example1234#"}
            label="Example1234#"
          />
          {!passwordIsValid && (
            <Box display={"flex"} flexDirection={"column"}>
              <ul className="tc-red fs-10px">
                <li>* มี 6 ตัวอักษรขึ้นไป</li>
                <li>* มีอักขระพิเศษอย่างน้อย 1 ตัวอักษร</li>
                <li>* มีตัวเลขอย่างน้อย 1 ตัว</li>
              </ul>
            </Box>
          )}

          <Box display={"flex"} flexDirection={"column"} marginTop={2}>
            <InputPassword
              onChange={confirmPasswordHandler}
              placeholder={"Confirm password"}
              label={"Confirm password"}
            />
            {!isMatch && (
              <span className="fs-10px tc-red">**รหัสผ่านไม่ตรงกัน</span>
            )}
          </Box>

          <Box marginTop={4}>
            <ButtonPleumDesign
              title={"Submit"}
              backgroundBtnColor={ColorSet.btnWhite}
              backgroundBtnHoverColor={ColorSet.btnWhiteHover}
              textBtnColor={ColorSet.textBlack}
              disabled={!isMatch}
              onClick={renderOnSubmit}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
