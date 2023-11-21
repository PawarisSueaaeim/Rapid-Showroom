/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { currency } from "@/utils/currency";
import { daymontyearFormat, timeHourFormat } from "@/utils/dateHelper";
import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

export default function CardAcceptById({ params }: Props) {
  const getDataAcceptPrice =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/accept-price";
  const cancelSellCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/accept-price/cancel";

  const router = useRouter();

  const [dataVehicle, setDataVehicle] = useState<any>({});
  const [disableAccept, setDisableAccept] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [cancelMessage, setCancelMessage] = useState<string>("");
  const [clientMessage, setClientMessage] = useState<string>("");
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);

  const isMobileMode = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    getDataAcceptPriceResponse();
  }, []);

  const getDataAcceptPriceResponse = () => {
    axios
      .post(getDataAcceptPrice, {
        uuid: `${params.id}`,
      })
      .then((response) => {
        if (response.data.status == "FAIL") {
          setIsSoldOut(true);
          setClientMessage(response.data.client_message);
        }
        setDataVehicle(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptPriceHandler = () => {
    setDisableAccept(true);
    axios
      .patch(getDataAcceptPrice, {
        accept_price: 1,
        uuid: params.id,
      })
      .then(() => {
        getDataAcceptPriceResponse();
        router.push(
          `/acceptance?map=${dataVehicle.map_location}&img=${dataVehicle.image}&brand=${dataVehicle.brand}&model=${dataVehicle.model}&submodel=${dataVehicle.sub_model}&plateId=${dataVehicle.license_plate}&province=${dataVehicle.province}&date=${dataVehicle.book_date}&time=${dataVehicle.book_time}&minPrice=${dataVehicle.min_buy_price_label}&maxPrice=${dataVehicle.max_buy_price_label}&location=${dataVehicle.name}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notAcceptPriceHandler = () => {
    setDisableAccept(true);
    axios
      .patch(getDataAcceptPrice, {
        accept_price: -1,
        uuid: params.id,
      })
      .then(() => {
        getDataAcceptPriceResponse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelSellCarHandler = () => {
    setCancel(true);
    axios
      .patch(cancelSellCar, {
        uuid: params.id,
      })
      .then((response) => {
        setCancelMessage(response.data.client_message);
        getDataAcceptPriceResponse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderSectionButton = () => {
    if (dataVehicle.is_client_accept_price == 0) {
      return (
        <Fragment>
          <ButtonPleumDesign
            title={"ยอมรับราคา"}
            onClick={() => acceptPriceHandler()}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
            disabled={
              dataVehicle.min_buy_price_label === "0" ? true : disableAccept
            }
          />
          <ButtonPleumDesign
            title={"ไม่ยอมรับราคา"}
            onClick={() => notAcceptPriceHandler()}
            backgroundBtnColor={ColorSet.btnWhite}
            backgroundBtnHoverColor={ColorSet.btnWhiteHover}
            textBtnColor={ColorSet.textBlack}
            disabled={
              dataVehicle.min_buy_price_label === "0" ? true : disableAccept
            }
          />
        </Fragment>
      );
    } else if (
      dataVehicle.status == "open" &&
      dataVehicle.is_client_accept_price == 1
    ) {
      return (
        <Fragment>
          <ButtonPleumDesign
            title={"ยกเลิก"}
            onClick={() => cancelSellCarHandler()}
            backgroundBtnColor={ColorSet.btnGray}
            backgroundBtnHoverColor={ColorSet.btnGrayHover}
            textBtnColor={ColorSet.textBlack}
            disabled={cancel}
          />
        </Fragment>
      );
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      style={{
        height: "100vh",
      }}
    >
      {isSoldOut ? (
        clientMessage
      ) : (
        <>
          <span className="fs-20px">
            <strong>รหัสอ้างอิง: </strong>
            {dataVehicle.bid_appointment_reference_key}
          </span>
          <Box width={isMobileMode ? "100%" : "400px"}>
            <img
              src={dataVehicle.image}
              alt={`${dataVehicle.brand}`}
              width={"100%"}
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            width={isMobileMode ? "90%" : "70%"}
          >
            <span className="fw-400 fs-20px">
              {dataVehicle.brand} {dataVehicle.model} {dataVehicle.series}
            </span>
            <span className="fs-18px">
              <strong>ปี: </strong>
              {dataVehicle.model_to_year}
            </span>
            <span className="fs-18px">
              <strong>สี: </strong>
              {dataVehicle.color}
              <strong> ขนาดเครื่องยนต์: </strong>
              {dataVehicle.engine_size} cc.
            </span>
            <span className="fs-18px">
              <strong>เลขไมล์: </strong>
              {currency(dataVehicle.mileage, 0)} กิโลเมตร
            </span>
            <span className="fs-18px">
              <strong>ทะเบียน: </strong>
              {dataVehicle.license_plate} {dataVehicle.province}
            </span>
            <span className="fs-18px">
              <strong>สถานที่: </strong>
              {dataVehicle.name}
            </span>
            <span className="fs-18px">
              <strong>วันที่ขาย: </strong>
              {daymontyearFormat(dataVehicle.book_date)}
            </span>
            <span className="fs-18px">
              <strong>เวลาขาย: </strong>
              {timeHourFormat(dataVehicle.book_time)}
            </span>
            <span className="fs-18px">ราคาที่ได้รับ</span>
            <span className="fs-20px fw-400">
              Min: {dataVehicle.min_buy_price_label} บาท
            </span>
            <span className="fs-20px fw-400">
              Max: {dataVehicle.max_buy_price_label} บาท
            </span>
          </Box>
          <Box display={"flex"} gap={1} marginTop={2}>
            {renderSectionButton()}
          </Box>
        </>
      )}
    </Box>
  );
}
