"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import moment from "moment";
import classes from "@/style/page/info/info.module.css";
import { isBankNumber, isPhoneNumber } from "@/utils/regex";
import { IsLoading } from "@/components/common/loading";
import { DateSelection } from "@/components/common/form";
import dayjs, { Dayjs } from "dayjs";

type Props = {};

const getBankDataURL = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/bank";
const getProfile =
  process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/profile";
const updateProfile =
  process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/members/profile";

export default function Info({}: Props) {
  const [bankData, setBankData] = useState<any>([]);
  const [profile, setProfile] = useState<any>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [isCanSubmit, setIsCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthmonth, setBirthmonth] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [bankId, setBankId] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [address, setAddress] = useState("");

  const isMobileMode = useMediaQuery("(max-width:950px)");

  useEffect(() => {
    axios
      .get(getBankDataURL)
      .then((response) => {
        setBankData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(getProfile, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setProfile(response.data.data);
        setName(data?.name);
        setGender(data?.gender);
        setBirthday(data?.birth_date);
        setBirthmonth(data?.birth_month);
        setBirthyear(data?.birth_year);
        setPhone(data?.tel);
        setEmail(data?.email);
        setBankNumber(data?.bank_account_number);
        setBank(data?.bank_id);
        setAddress(data?.address);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };
  const handleBirthdateChange = (event: any) => {
    const value = event.target.value;
    setBirthday(moment(value).format("DD"));
    setBirthmonth(moment(value).format("MM"));
    setBirthyear(moment(value).format("YYYY"));
  };
  const handlePhoneChange = (event: any) => {
    const textInput = event.target.value;
    if (isPhoneNumber(textInput)) {
      setPhone(textInput);
    }
  };
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleBankChange = (event: any) => {
    const value = event.target.value;
    setBank(value);

    const bankFiltered = bankData.filter(
      (bank: any) => bank.bank_name == value
    );
    bankFiltered.map((item: any) => {
      setBankId(item.bank_id);
    });
  };
  const handleBankNumberChange = (event: any) => {
    const textInput = event.target.value;
    if (isBankNumber(textInput)) {
      setBankNumber(textInput);
    }
  };
  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    if (
      name != "" &&
      gender != "" &&
      birthday != "" &&
      birthmonth != "" &&
      birthyear != "" &&
      email != "" &&
      address != "" &&
      phone != ""
    ) {
      setIsCanSubmit(true);
    } else {
      setIsCanSubmit(false);
    }
  }, [address, birthday, birthmonth, birthyear, email, gender, name, phone]);

  const onSubmit = () => {
    setIsLoading(true);
    axios
      .patch(
        updateProfile,
        {
          name: name,
          gender: gender,
          birth_date: birthday,
          birth_month: birthmonth,
          birth_year: birthyear,
          email: email,
          address: address,
          tel: phone,
          bank_id: bankId,
          bank_account_number: bankNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
          },
        }
      )
      .then((response) => {
        setProfile(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: isMobileMode ? "900px" : "100vh",
        backgroundColor: ColorSet.bgGray,
      }}
    >
      {isLoading ? (
        <>
          <IsLoading />
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          style={{
            boxShadow: "1px 2px 3px 1.5px rgba(0,0,0,0.5)",
            borderRadius: "24px",
            backgroundColor: ColorSet.bgWhite,
            width: "80%",
            padding: "2rem",
            marginTop: isMobileMode ? "3.5rem" : "",
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt={profile?.name}
                  src={profile?.avatar ? profile?.avatar : ""}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <Box width={150}>
                    {isEdit ? (
                      <Box display={"flex"} gap={2}>
                        <button
                          disabled={!isCanSubmit}
                          onClick={() => {
                            setIsEdit(false);
                            setIsCanSubmit(false);
                            onSubmit();
                          }}
                        >
                          บันทึก
                        </button>
                        <button
                          onClick={() => {
                            setIsEdit(false);
                          }}
                        >
                          ยกเลิก
                        </button>
                      </Box>
                    ) : (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        onClick={() => setIsEdit(true)}
                      >
                        <EditIcon />
                        แก้ไขข้อมูล
                      </Box>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <TextField
                        required={true}
                        error={name === "" ? true : false}
                        id="edit-name-profile"
                        variant="standard"
                        label="ชื่อ"
                        defaultValue={name}
                        onChange={handleNameChange}
                      />
                    ) : (
                      <span>
                        <strong>ชื่อ: </strong>
                        {name}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={gender.toUpperCase()}
                        name="radio-buttons-group"
                        onChange={handleGenderChange}
                      >
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    ) : (
                      <span>
                        <strong>เพศ: </strong>
                        {profile?.gender &&
                          (gender.toUpperCase() === "M"
                            ? "ชาย"
                            : gender.toLocaleUpperCase() === "F"
                            ? "หญิง"
                            : gender)}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <TextField
                        required={true}
                        error={birthday === "" ? true : false}
                        onChange={handleBirthdateChange}
                        type="date"
                      />
                    ) : (
                      <span>
                        <strong>วันเกิด: </strong>
                        {(birthday || birthmonth || birthyear) &&
                          `${birthday}/${birthmonth}/${birthyear}`}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <TextField
                        required={true}
                        error={phone === "" ? true : false}
                        id="edit-name-profile"
                        variant="standard"
                        label="เบอร์ติดต่อ"
                        value={phone}
                        defaultValue={phone}
                        onChange={handlePhoneChange}
                      />
                    ) : (
                      <span>
                        <strong>เบอร์ติดต่อ: </strong>
                        {phone}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <TextField
                        required={true}
                        error={email === "" ? true : false}
                        id="edit-name-profile"
                        variant="standard"
                        label="email"
                        defaultValue={email}
                        onChange={handleEmailChange}
                      />
                    ) : (
                      <span>
                        <strong>อีเมล: </strong>
                        {email}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <Box>
                        <select
                          onChange={handleBankChange}
                          className={classes.selection_custom}
                        >
                          <option value={0}>ธนาคาร</option>
                          {bankData.map((item: any, index: number) => {
                            return (
                              <option
                                key={index + item.bank_id}
                                value={item.bank_name}
                              >
                                {item.bank_name}
                              </option>
                            );
                          })}
                        </select>
                      </Box>
                    ) : (
                      <span>
                        <strong>ธนาคาร: </strong>
                        {bank}
                      </span>
                    )}
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
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
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    {isEdit ? (
                      <TextField
                        required={true}
                        error={address === "" ? true : false}
                        multiline
                        id="edit-name-profile"
                        variant="standard"
                        label="ที่อยู่"
                        defaultValue={address}
                        onChange={handleAddressChange}
                      />
                    ) : (
                      <span>
                        <strong>ที่อยู่: </strong>
                        {address}
                      </span>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <br />
            <Box display={"flex"} gap={2}>
              <Link href={"/sellinfo"}>
                <ButtonPleumDesign
                  title={"จัดการขายรถ"}
                  width={150}
                  backgroundBtnColor={ColorSet.btnWhite}
                  backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                  textBtnColor={ColorSet.textBlack}
                />
              </Link>
              <Link href={"/buyinfo"}>
                <ButtonPleumDesign
                  title={"จัดการซื้อรถ"}
                  width={150}
                  backgroundBtnColor={ColorSet.btnWhite}
                  backgroundBtnHoverColor={ColorSet.btnWhiteHover}
                  textBtnColor={ColorSet.textBlack}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
