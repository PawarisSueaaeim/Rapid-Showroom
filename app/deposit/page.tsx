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

type Props = {};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const dataVehicle = {
  image: "/images/car-blue.png",
  brand: "BMW",
  model: "Series 3",
  submodel: "E30",
  price: "10,000,000",
  plateId: "1ทส0001",
  date: "2023-11-23",
  time: "14:59:59",
};

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix=" ฿"
      />
    );
  }
);

export default function Deposit({}: Props) {
  const depositData = useSelector((state: any) => state.deposit);
  const isDeposit =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/deposit";
  const getPaymentStatus =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/deposit/payment-status";

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [values, setValues] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [dataPamentStatus, setDataPamentStatus] = React.useState<any>({});
  const [vdepositId, setVdepositId] = React.useState("");

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (parseInt(inputValue) < 5000) {
      setValues("5000");
    } else {
      setValues(inputValue);
    }
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
    axios
      .put(isDeposit, {
        amount: values,
        listing_vpark_id: 59,
        guest_id: 123,
      })
      .then((response) => {
        handleGetPaymentStatus(response.data.data.vdeposit_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Image
        src={dataVehicle.image}
        alt="vehicle-image"
        width={300}
        height={200}
      />
      <Box display={"flex"} flexDirection={"column"}>
        <span className="fs-20px fw-400">
          {dataVehicle.model} {dataVehicle.model} {dataVehicle.submodel}
          {/* {depositData.brand} */}
        </span>
        <span>
          ทะเบียน: <strong>{dataVehicle.plateId}</strong>
        </span>
        <span>
          ราคา: <strong>{dataVehicle.price}</strong>
        </span>
        <span>เวลานัดหมาย</span>
        <span>วันที่ {dataVehicle.date}</span>
        <span>เวลา {dataVehicle.time}</span>
      </Box>
      <Box>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Deposit"
            value={values}
            onChange={handleChange}
            disabled={!isCheck}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
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
              if (isCheck) {
                setValues("");
              }
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
              <span>ราคามัดจำ: {dataPamentStatus.amount_label} บาท</span>
              <span>กรุณาจ่ายภายในเวลา: {dataPamentStatus.qr_expired_at}</span>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
