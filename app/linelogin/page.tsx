"use client";
import React, { useEffect } from "react";
import liff from "@line/liff";
import { Box, TextField } from "@mui/material";
import Link from "next/link";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";

type Props = {};

export default function LineLogin({}: Props) {

  const lineLogin = () => {
    liff.init(
      { liffId: "2001288589-JPonqY8l" },
      () => {
        if (liff.isLoggedIn()) {
          const idToken = liff.getIDToken();

          liff
            .getProfile()
            .then((profile) => {
              //   authen({
              //     ...profile,
              //     idToken: idToken,
              //     email: liff.getDecodedIDToken().email,
              //     type: "LINE",
              //   });
              console.log(profile);
            })
            .catch((err) => console.error(err));
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  useEffect(() => {
    lineLogin();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Box display={"flex"} flexDirection={"column"} marginTop={2}>
        <span className="fs-14px">กรุณากรอกเบอร์โทรเพื่อ</span>
        <span className="fs-14px">รับการแจ้งเตือนผลการประเมินราคาผ่านไลน์</span>
        <TextField id="telephone-line" label="เบอร์โทร" variant="outlined" />
      </Box>
      <Box marginTop={4}>
        <Link href={"/login"}>
          <ButtonPleumDesign
            title={"ยืนยัน"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
          />
        </Link>
      </Box>
    </Box>
  );
}
