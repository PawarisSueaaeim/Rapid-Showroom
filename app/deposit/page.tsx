/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { useSelector } from "react-redux";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import {
  daymontyearFormat,
  formattedDateTime,
  isDiff24Hour,
  timeHourFormat,
} from "@/utils/dateHelper";
import { isMileage } from "@/utils/regex";
import { CountDowntime } from "@/components/common/countDown";
import Link from "next/link";
import { DateSelection, TimeSelection } from "@/components/common/form";
import { Dayjs } from "dayjs";
import moment from "moment";
import { currency } from "@/utils/currency";

type Props = {};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function Deposit({}: Props) {
  const depositData = useSelector((state: any) => state.deposit);
  const isDeposit =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/deposit";
  const getPaymentStatus =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/deposit/payment-status";

  const router = useRouter();
  const searchParams = useSearchParams();
  const vparkId = searchParams.get("vpark_id");
  const guestId = searchParams.get("guest_id");
  const member = searchParams.get("member");
  const imageUrl = searchParams.get("img");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const plate_id = searchParams.get("plateId");
  const price = searchParams.get("price");
  const depositDate = searchParams.get("dateDeposit");
  const depositTime = searchParams.get("timeDeposit");
  const valuesDeposit = searchParams.get("valuesDeposit");
  const showroom_appointment_id = searchParams.get("showroom_appointment_id");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [openQRcode, setOpenQRcode] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [dataPamentStatus, setDataPamentStatus] = useState<any>({});
  const [vdepositId, setVdepositId] = useState<string>("");
  const [depositStatus, setDepositStatus] = useState<string>("");

  const [disableNext, setDisableNext] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    let intervalId: any;

    if (openQRcode) {
      intervalId = setInterval(() => {
        axios
          .post(getPaymentStatus, {
            vdeposit_id: vdepositId,
          })
          .then((response) => {
            if (response.data.data.deposit_payin_status == "paid") {
              setDepositStatus(response.data.data.deposit_payin_status);
              setOpenQRcode(false);
              setOpenSuccess(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openQRcode]);

  const handleOpenQRcode = () => setOpenQRcode(true);
  const handleCloseQRcode = () => {
    setOpenQRcode(false);
    setDisableNext(false);
  };

  const handleCloseSuccess = () => setOpenSuccess(false);

  const handleDateChange = (date: Dayjs | null) => {
    //@ts-ignore
    const formatDate = moment(date.$d).format("YYYY-MM-DD");
    setDate(formatDate);
  };

  const handleTimeChange = (time: Dayjs | null) => {
    //@ts-ignore
    const formatTime = moment(time.$d).format("HH:mm:ss");
    setTime(formatTime);
  };

  const handleGetPaymentStatus = (vdeposit_id: number) => {
    axios
      .post(getPaymentStatus, {
        vdeposit_id: vdeposit_id,
      })
      .then((response) => {
        setDataPamentStatus(response.data.data);
        setVdepositId(vdeposit_id.toString());
        handleOpenQRcode();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnClickNext = () => {
    setIsLoading(true);
    setDisableNext(true);
    if (valuesDeposit){
      if(parseInt(valuesDeposit) >= 5000) {
        axios
          .put(isDeposit, {
            amount: valuesDeposit,
            listing_vpark_id: vparkId,
            guest_id: guestId,
            showroom_appointment_id: showroom_appointment_id,
          })
          .then((response) => {
            handleGetPaymentStatus(response.data.data.vdeposit_id);
          })
          .catch((error) => {
            console.log(error);
            setDisableNext(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }else{
      router.push(
        `/booksuccess?brand=${brand}&model=${model}&plateId=${plate_id}&price=${price}&date=${depositDate}&time=${depositTime}&member=${member}&email=${email}&name=${name}`
      );
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <img src={imageUrl ? imageUrl : ""} alt="vehicle-image" width={"300px"} />
      <Box display={"flex"} flexDirection={"column"}>
        <span className="fs-20px fw-400">
          {brand !== "undefind" ? brand : ""}{" "}
          {model !== "undefind" ? model : ""}
        </span>
        <span>
          <strong>ทะเบียน:</strong> {plate_id}
        </span>
        <span>
          <strong>ราคา:</strong> {price} บาท
        </span>
        <span>
          <strong>ราคามัดจำ: </strong> {currency(valuesDeposit)} บาท
        </span>
        <span>
          <strong>เวลานัดหมาย</strong>
        </span>
        <span>
          <strong>วันที่: </strong>
          {daymontyearFormat(depositDate)}
        </span>
        <span>
          <strong>เวลา: </strong>
          {timeHourFormat(depositTime)}
        </span>
      </Box>
      <Box marginTop={4}>
        <ButtonPleumDesign
          title={"จ่ายมัดจำ"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
          onClick={handleOnClickNext}
          disabled={disableNext}
        />
      </Box>

      <Modal
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          bgcolor={"#fff"}
          margin={isMobileMode ? 0 : 4}
          padding={2}
          sx={{
            borderRadius: "10px",
          }}
        >
          <Image
            src={"/icons/icon-success.png"}
            alt="icon-success"
            width={50}
            height={50}
          />
          <h2 id="parent-modal-title">จ่ายเงินสำเร็จ</h2>
          <ButtonPleumDesign
            title={"Next"}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
            onClick={() => {
              router.push(
                `/booksuccess?brand=${brand}&model=${model}&plateId=${plate_id}&price=${price}&date=${depositDate}&time=${depositTime}&deposit_status=${depositStatus}&deposit=${valuesDeposit}&member=${member}&email=${email}&name=${name}`
              );
            }}
          />
        </Box>
      </Modal>

      <Modal
        open={openQRcode}
        onClose={handleCloseQRcode}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            QR Code
          </Typography>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            marginTop={2}
          >
            <Image
              src={dataPamentStatus.qr_code}
              alt="qr-code"
              width={200}
              height={200}
            />
            <Box display={"flex"} flexDirection={"column"} marginTop={2}>
              <span className="fs-12px">
                ราคามัดจำ: {dataPamentStatus.amount_label} บาท (ค่าธรรมเนียม{" "}
                {dataPamentStatus.payer_fee} บาท)
              </span>
              <CountDowntime
                displayCountdown={openQRcode}
                setDisplayCountdown={(newBoolean: any) =>
                  setOpenQRcode(newBoolean)
                }
                dateAndTime={dataPamentStatus.qr_expired_at}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      {isLoading ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={ColorSet.bgGray}
            style={{
              position: "fixed",
              opacity: 0.9,
              zIndex: 10,
              height: "100vh",
              width: "100vw",
              top: "0",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
