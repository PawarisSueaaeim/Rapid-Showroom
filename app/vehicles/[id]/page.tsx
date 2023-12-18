/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import classes from "@/style/page/buycar/buycar_id.module.css";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import DealerMeet from "@/components/modules/dealerMeet";
import { currency } from "@/utils/currency";
import { Carousel } from "@/components/common/carousel";

type Props = {
  params: { id: string };
};

export default function Detail({ params }: Props) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  useEffect(() => {
    axios
      .get(`${getCar}/${params.id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Box className={classes.page_not_found}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data === undefined ? (
            <Box className={classes.container}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                marginX={4}
              >
                <span className="text-upper fs-24px tc-red">
                  <strong>
                    Sold Out
                  </strong>
                </span>
              </Box>

              <Box className={classes.btn_container}>
                <Link href="/vehicles">
                  <ButtonCapsule
                    title={"ดูรถเพิ่ม"}
                    color={"#fff"}
                    fontWeight={400}
                    bgColor={"#4679C7"}
                    fontSize={12}
                    height={30}
                  />
                </Link>
              </Box>
            </Box>
          ) : (
            <Box className={classes.container}>
              <Box className={classes.carousel}>
                <Carousel images={data && data.gallery} />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                marginX={4}
              >
                <span className="text-upper fs-24px tc-blue">
                  <strong>
                    {data.brand} {data.model}
                  </strong>
                </span>
                <span className="text-upper fs-12px tc-blue tw-100">
                  {data.series} {data.year}
                </span>
                <span className="ts-12px fw-100">
                  {data.vehicle_description} สี{data.color} {data.engine_size}{" "}
                  cc.
                </span>
              </Box>

              <Box className={classes.btn_container}>
                <Link href="/vehicles">
                  <ButtonCapsule
                    title={"ดูรถเพิ่ม"}
                    color={"#fff"}
                    fontWeight={400}
                    bgColor={"#4679C7"}
                    fontSize={12}
                    height={30}
                  />
                </Link>
                <Link
                  href={`/nearmodel?brand=${data.brand}&model=${data.model}`}
                >
                  <ButtonCapsule
                    title={"ดูรถใกล้เคียง"}
                    color={"#fff"}
                    fontWeight={400}
                    bgColor={"#4679C7"}
                    fontSize={12}
                    height={30}
                  />
                </Link>
              </Box>
              <span className="fs-18px">
                <strong className="fs-32px tc-blue">
                  {currency(data.listing_price, 0)}
                </strong>{" "}
                บาท
              </span>
              <span className="fs-14px">
                <strong>เลขไมล์: </strong>
                {currency(data.mileage, 0)} Km
              </span>
              <span className="fs-14px">
                <strong>ทะเบียน: </strong>
                {data.license_plate} {data.province}
              </span>
              <span className="fs-14px fw-100">{data.description}</span>
              <Box className={classes.dealer_meet}>
                <DealerMeet
                  modelId={data.model_id}
                  vehicleId={data.vehicle_id}
                  listingVparkId={data.listing_vpark_id}
                  brand={data.brand}
                  model={data.model}
                  submodel={data.submodel}
                  price={data.listing_price_label}
                  image={data.gallery[0].url_path}
                  plateId={data.license_plate + " " + data.province}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}
