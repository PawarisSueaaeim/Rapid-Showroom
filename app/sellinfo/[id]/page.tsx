/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonPleumDesign } from "@/components/common/button";
import { ColorSet } from "@/constants";
import { Alert, Box } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

export default function CardAcceptById({ params }: Props) {
  const getDataAcceptPrice =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/accept-price";
  const cancelSellCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/guests/accept-price/cancel";

  const [dataVehicle, setDataVehicle] = useState<any>({});

  const [disableAccept, setDisableAccept] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [cancelMessage, setCancelMessage] = useState<string>("");
  const [clientMessage, setClientMessage] = useState<string>("");
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);

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
            backgroundBtnColor={ColorSet.btnGray}
            backgroundBtnHoverColor={ColorSet.btnGrayHover}
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
        padding: "0 2rem 0rem 2rem",
      }}
    >
      {isSoldOut ? clientMessage : (
        <>
          <Image
            src={dataVehicle.image}
            alt={`${dataVehicle.brand}`}
            width={300}
            height={200}
          />
          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <span className="fw-400 fs-20px">
              {dataVehicle.brand} {dataVehicle.model}
            </span>
            <span className="fs-18px">{dataVehicle.sub_model}</span>
            <span className="fs-18px">
              {dataVehicle.license_plate} {dataVehicle.province}
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
          {/* <Box marginTop={4}>
            <Alert severity="warning">{cancelMessage}</Alert>
          </Box> */}
        </>
      )}
    </Box>
  );
}
