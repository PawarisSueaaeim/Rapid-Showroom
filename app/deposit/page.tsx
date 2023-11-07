"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { useSelector } from "react-redux";
import { IVehicleDetail } from "@/components/types/car";

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

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [values, setValues] = React.useState("5000");


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (parseInt(inputValue) < 5000) {
      setValues("5000");
    } else {
      setValues(inputValue);
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
      <Image
        src={dataVehicle.image}
        alt="vehicle-image"
        width={300}
        height={200}
      />
      <Box display={"flex"} flexDirection={"column"}>
        <span className="fs-20px fw-400">
          {/* {dataVehicle.model} {dataVehicle.model} {dataVehicle.submodel} */}
          {depositData.brand}
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
            onClick={() => setIsCheck(!isCheck)}
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
        />
      </Box>
    </Box>
  );
}
