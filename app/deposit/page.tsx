/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box } from "@mui/material";
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
import { countDownTime, daymontyearFormat } from "@/utils/dateHelper";
import { isMileage } from "@/utils/regex";
import { CountDowntime } from "@/components/common/countDown";

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

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [values, setValues] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [dataPamentStatus, setDataPamentStatus] = React.useState<any>({});
  const [vdepositId, setVdepositId] = React.useState("");

  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    let intervalId: any;

    if (open) {
      intervalId = setInterval(() => {
        axios
          .post(getPaymentStatus, {
            vdeposit_id: vdepositId,
          })
          .then((response) => {
            console.log(response.data.data.deposit_payin_status);

            if (response.data.data.deposit_payin_status === "paid") {
              setOpen(false);
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
  }, [open]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setValues(inputValue);
  };

  const handleGetPaymentStatus = (vdeposit_id: number) => {
    axios
      .post(getPaymentStatus, {
        vdeposit_id: vdeposit_id,
      })
      .then((response) => {
        setDataPamentStatus(response.data.data);
        setVdepositId(vdeposit_id.toString());
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnClickNext = () => {
    setDisableNext(true);
    if (isCheck) {
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
        })
        .finally(() => {
          setDisableNext(false);
        });
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
      <img
        src={imageUrl ? imageUrl : ""}
        alt="vehicle-image"
        width={"300px"}
      />
      <Box display={"flex"} flexDirection={"column"}>
        <span className="fs-20px fw-400">
          {/* {depositData.brand} {depositData.model} {depositData.submodel} */}
          {brand !== "undefind" ? brand : ""}{" "}
          {model !== "undefind" ? model : ""}
        </span>
        <span>
          {/* ทะเบียน: <strong>{depositData.plate_id}</strong> */}
          ทะเบียน: {plate_id}
        </span>
        <span>
          {/* ราคา: <strong>{depositData.price}</strong> บาท */}
          ราคา: <strong>{price}</strong> บาท
        </span>
        <span>เวลานัดหมาย</span>
        {/* <span>วันที่ {daymontyearFormat(depositData.date)}</span> */}
        <span>วันที่ {daymontyearFormat(depositDate)}</span>
        {/* <span>เวลา {depositData.time}</span> */}
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
        open={open}
        onClose={handleClose}
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
                displayCountdown={open}
                setDisplayCountdown={(newBoolean: any) => setOpen(newBoolean)}
                dateAndTime={dataPamentStatus.qr_expired_at}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
