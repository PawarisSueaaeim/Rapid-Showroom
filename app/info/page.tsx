"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Avatar, Box, TextField, useMediaQuery } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

type Props = {};

export default function Info({}: Props) {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditPhone, setIsEditPhone] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditBankNumber, setIsEditBankNumber] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [address, setAddress] = useState("");

  const isMobileMode = useMediaQuery("(max-width:950px)");

  let dataInfo: any;
  if (typeof window !== "undefined" && window.sessionStorage) {
    const json = sessionStorage.getItem("info") || "";
    dataInfo = JSON.parse(json);
  } else {
    console.error("sessionStorage is not available");
  }

  useEffect(() => {
    setName(dataInfo.name);
    setPhone(dataInfo.phone_no);
    setEmail(dataInfo.email);
    setBankNumber(dataInfo.bank_account_number);
    setAddress(dataInfo.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleBankNumberChange = (event: any) => {
    setBankNumber(event.target.value);
  };
  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const onSubmit = () => {
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(bankNumber);
    console.log(address);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: isMobileMode ? "840px" : "100vh",
        backgroundColor: ColorSet.bgGray,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        style={{
          boxShadow: "1px 2px 3px 1.5px rgba(0,0,0,0.5)",
          borderRadius: "10px",
          backgroundColor: ColorSet.bgWhite,
          width: "100%",
          height: "510px",
          padding: "3rem",
          margin: "7rem 1rem",
        }}
      >
        {dataInfo && (
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Avatar
              alt={dataInfo.name}
              src={dataInfo.avatar ? dataInfo.avatar : ""}
              sx={{ width: 100, height: 100 }}
            />
            <br />
            <Box display={"flex"} alignItems={"center"}>
              {isEditName ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={name}
                  label="ชื่อ"
                  onChange={handleNameChange}
                />
              ) : (
                <span>
                  <strong>ชื่อ: </strong>
                  {name}
                </span>
              )}
              {isEditName ? (
                <button
                  onClick={() => {
                    setIsEditName(false);
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  marginLeft={4}
                  onClick={() => setIsEditName(true)}
                >
                  <EditIcon />
                  แก้ไข
                </Box>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {isEditPhone ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={phone}
                  label="เบอร์โทร"
                  onChange={handlePhoneChange}
                />
              ) : (
                <span>
                  <strong>เบอร์โทร: </strong>
                  {phone}
                </span>
              )}
              {isEditPhone ? (
                <button
                  onClick={() => {
                    setIsEditPhone(false);
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  marginLeft={4}
                  onClick={() => setIsEditPhone(true)}
                >
                  <EditIcon />
                  แก้ไข
                </Box>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {isEditEmail ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={email}
                  label="อีเมล"
                  onChange={handleEmailChange}
                />
              ) : (
                <span>
                  <strong>อีเมล: </strong>
                  {email}
                </span>
              )}
              {isEditEmail ? (
                <button
                  onClick={() => {
                    setIsEditEmail(false);
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  marginLeft={4}
                  onClick={() => setIsEditEmail(true)}
                >
                  <EditIcon />
                  แก้ไข
                </Box>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {isEditBankNumber ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={bankNumber}
                  label="เลขบัญชี"
                  onChange={handleBankNumberChange}
                />
              ) : (
                <span>
                  <strong>เลขบัญชี: </strong>
                  {bankNumber}
                </span>
              )}
              {isEditBankNumber ? (
                <button
                  onClick={() => {
                    setIsEditBankNumber(false);
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  marginLeft={4}
                  onClick={() => setIsEditBankNumber(true)}
                >
                  <EditIcon />
                  แก้ไข
                </Box>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {isEditAddress ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={address}
                  label="ที่อยู่"
                  onChange={handleAddressChange}
                />
              ) : (
                <span>
                  <strong>ที่อยู่: </strong>
                  {address}{" "}
                </span>
              )}
              {isEditAddress ? (
                <button
                  onClick={() => {
                    setIsEditAddress(false);
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  marginLeft={4}
                  onClick={() => setIsEditAddress(true)}
                >
                  <EditIcon />
                  แก้ไข
                </Box>
              )}
            </Box>

            <Box display={"flex"} gap={2}>
              <Link href={"/sellinfo"}>
                <ButtonPleumDesign
                  title={"จัดการขายรถ"}
                  backgroundBtnColor={ColorSet.btnWhite}
                  backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                  textBtnColor={ColorSet.textBlack}
                />
              </Link>
              <Link href={"/buyinfo"}>
                <ButtonPleumDesign
                  title={"จัดการซื้อรถ"}
                  backgroundBtnColor={ColorSet.btnWhite}
                  backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                  textBtnColor={ColorSet.textBlack}
                />
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
