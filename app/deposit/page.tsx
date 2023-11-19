/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, CircularProgress } from "@mui/material";
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
} from "@/utils/dateHelper";
import { isMileage } from "@/utils/regex";
import { CountDowntime } from "@/components/common/countDown";
import Link from "next/link";
import { DateSelection, TimeSelection } from "@/components/common/form";
import { Dayjs } from "dayjs";

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
  const showroom_appointment_id = searchParams.get("showroom_appointment_id");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [values, setValues] = useState<string>("");
  const [openQRcode, setOpenQRcode] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openChangDate, setOpenChangeDate] = useState<boolean>(false);
  const [dataPamentStatus, setDataPamentStatus] = useState<any>({});
  const [vdepositId, setVdepositId] = useState<string>("");

  const [disableNext, setDisableNext] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: any;

    if (openQRcode) {
      intervalId = setInterval(() => {
        axios
          .post(getPaymentStatus, {
            vdeposit_id: vdepositId,
          })
          .then((response) => {
            console.log(response.data.data.deposit_payin_status);

            if (response.data.data.deposit_payin_status === "paid") {
              setOpenQRcode(false);
              setOpenSuccess(true);
              router.push(
                `/booksuccess?brand=${brand}&model=${model}&plateId=${plate_id}&price=${price}&date=${depositDate}&time=${depositTime}&deposit=${values}&member=${member}&email=${email}&name=${name}`
              );
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

  useEffect(() => {
    if (!isCheck) {
      setValues("0");
    }
  }, [isCheck]);

  useEffect(() => {
    if (isCheck == true && parseInt(values) < 5000) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [values, isCheck]);

  const handleOpenQRcode = () => setOpenQRcode(true);
  const handleCloseQRcode = () => setOpenQRcode(false);
  const handleOpenChangeDate = () => setOpenChangeDate(true);
  const handleCloseChangeDate = () => setOpenChangeDate(false);
  const handleCloseSuccess = () => setOpenSuccess(false);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setValues(inputValue);
  };

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
    if (isCheck) {
      if (
        isDiff24Hour(
          formattedDateTime(new Date()),
          formattedDateTime(depositDate + " " + depositTime)
        )
      ) {
        axios
          .put(isDeposit, {
            amount: values,
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
          }).finally(() => {
            setIsLoading(false);
          });
      } else {
        handleOpenChangeDate();
      }
    } else {
      router.push(
        `/booksuccess?brand=${brand}&model=${model}&plateId=${plate_id}&price=${price}&date=${depositDate}&time=${depositTime}&member=${member}&email=${email}&name=${name}`
      );
    }
  };

  const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            // onChange({
            //   target: {
            //     name: props.name,
            //     value: values.value,
            //   },
            // });
            // handleChange(values)
          }}
          thousandSeparator
          valueIsNumericString
          suffix=" บาท"
        />
      );
    }
  );

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
        <span>ทะเบียน: {plate_id}</span>
        <span>
          ราคา: <strong>{price}</strong> บาท
        </span>
        <span>เวลานัดหมาย</span>
        <span>วันที่ {daymontyearFormat(depositDate)}</span>
        <span>เวลา {depositTime}</span>
      </Box>
      <Box marginTop={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Deposit (ขั้นต่ำ 5,000 บาท)"
            value={values}
            onChange={handleChange}
            disabled={!isCheck}
            name="numberformat"
            id="formatted-numberformat-input"
            // InputProps={{
            //   inputComponent: NumericFormatCustom as any,
            // }}
            variant="standard"
          />
        </Stack>
        <Box display={"flex"} alignItems={"center"}>
          <input
            type="checkbox"
            id="checkbox-plateId-first-number"
            value="Bike"
            onClick={() => {
              setIsCheck(!isCheck);
            }}
          />
          <span className="fs-8px">ต้องการมัดจำรถ</span>
        </Box>
      </Box>
      <Box marginTop={4}>
        <ButtonPleumDesign
          title={"Next"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
          onClick={handleOnClickNext}
          disabled={disableNext}
        />
      </Box>

      <Modal
        open={openChangDate}
        onClose={handleCloseChangeDate}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box style={{}}>
          <h2 id="parent-modal-title">แจ้งเตือน</h2>
          <p id="parent-modal-description">
            การมัดจำต้องนัดดูรถภายในเวลา 24 ชั่วโมงเท่านั้น
          </p>
          <DateSelection
            label="เลือกวันที่นัดดีลเลอร์"
            onDateChange={handleDateChange}
          />
          <TimeSelection
            label="เลือกเวลานัดดีลเลอร์"
            onTimeChange={handleTimeChange}
            date={date}
          />
        </Box>
      </Modal>

      <Modal
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box style={{}}>
          <h2 id="parent-modal-title">แจ้งเตือน</h2>
          <p id="parent-modal-description">
            การมัดจำต้องนัดดูรถภายในเวลา 24 ชั่วโมงเท่านั้น
          </p>
          <DateSelection
            label="เลือกวันที่นัดดีลเลอร์"
            onDateChange={handleDateChange}
          />
          <TimeSelection
            label="เลือกเวลานัดดีลเลอร์"
            onTimeChange={handleTimeChange}
            date={date}
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
