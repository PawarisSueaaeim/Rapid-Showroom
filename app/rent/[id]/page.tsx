/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import classes from "@/style/page/buycar/buycar_id.module.css";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import DealerMeet from "@/components/modules/meetSection/dealerMeet";
import { currency } from "@/utils/currency";
import { Carousel } from "@/components/common/carousel";
import { RentMeet } from "@/components/modules/meetSection";
import { DataVehicle, IVehicleDetail } from "@/components/types/car";

type Props = {
  params: { id: string };
};

const initialMockUpData: any = {
  brand: "",
  model: "",
  model_id: 0,
  submodel: "",
  sub_model_id: 0,
  series: "",
  license_plate: "",
  color: "",
  gear_type: "",
  listing_price: 0,
  mileages: 0,
  year: "",
  brand_id: 0,
  province: "",
  listing_price_label: "",
  mileages_label: "",
  main_image: "",
  vehicle_description: "",
  engine_size: 0,
  description: "",
  gallery: [
    {
      url_path: "",
    }
  ]
};

const initialMockUpDataVehicle: any[] = [
  {
    vehicle_id: "1",
    brand: "Toyota",
    model: "Camry",
    submodel: "",
    color: "ดำ",
    license_plate: "กก9999",
    province: "สุโขทัย",
    listing_price: 15000,
    mileage: 5535,
    vehicle_description: "Sedan 4dr G SA 6sp Front Wheel Drive 2.0i",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,000",
    year: "2017",
    reference_id: "123456789",
    gallery: [
      {
        url_path: "/images/mockUp/ToyotaCamryBlack.png",
      }
    ]
  },
  {
    vehicle_id: "2",
    brand: "Toyota",
    model: "Camry",
    submodel: "",
    color: "แดง",
    license_plate: "สส7777",
    province: "สุโขทัย",
    listing_price: 15000,
    mileage: 12000,
    vehicle_description: "Sedan 4dr G SA 6sp Front Wheel Drive 2.0i",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,000",
    year: "2017",
    reference_id: "abcdefg",
    gallery: [
      {
        url_path: "/images/mockUp/ToyotaCamryRed.png",
      }
    ]
  },
  {
    vehicle_id: "3",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    color: "ขาว",
    license_plate: "ทท5555",
    province: "สุโขทัย",
    listing_price: 20000,
    mileage: 100000,
    vehicle_description: "MY2016 Sedan 4dr E i-VTEC SA 5sp Front Wheel Drive 2.0i",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,000",
    year: "2019",
    reference_id: "12345abc",
    gallery: [
      {
        url_path: "/images/mockUp/HondaAccord.jpeg",
      }
    ]
  },
  {
    vehicle_id: "4",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    color: "ดำ",
    license_plate: "ดด3333",
    province: "สุโขทัย",
    listing_price: 20000,
    mileage: 8000,
    vehicle_description: "MY2016 Sedan 4dr E i-VTEC SA 5sp Front Wheel Drive 2.0i",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,000",
    year: "2019",
    reference_id: "abc12345",
    gallery: [
      {
        url_path: "/images/mockUp/HondaAccordBlack.jpeg",
      }
    ]
  },
  {
    vehicle_id: "5",
    brand: "Honda",
    model: "Accord",
    submodel: "",
    color: "เทา",
    license_plate: "รร1111",
    province: "สุโขทัย",
    listing_price: 20000,
    mileage: 9500,
    vehicle_description: "MY2016 Sedan 4dr E i-VTEC SA 5sp Front Wheel Drive 2.0i",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,000",
    year: "2017",
    reference_id: "12ab34cd",
    gallery: [
      {
        url_path: "/images/mockUp/HondaAccordGrey.jpeg",
      }
    ]
  },
  {
    vehicle_id: "6",
    brand: "Toyota",
    model: "Alphard",
    submodel: "Hybrid",
    color: "บรอนซ์ทอง",
    license_plate: "อพ1111",
    province: "สุโขทัย",
    listing_price: 25000,
    mileage: 2000,
    vehicle_description: "Van 4dr HV 7st E-CVT 4 Wheel Drive 2.5i (CBU, Hybrid)",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,500",
    year: "2017",
    reference_id: "12alphard01",
    gallery: [
      {
        url_path: "/images/mockUp/ToyotaAlphardGray.png",
      },
      {
        url_path: "/images/mockUp/ToyotaAlphardInsideBlack.jpg",
      }
    ]
  },
  {
    vehicle_id: "7",
    brand: "Toyota",
    model: "Alphard",
    submodel: "Hybrid",
    color: "ขาว",
    license_plate: "อพ2222",
    province: "สุโขทัย",
    listing_price: 25000,
    mileage: 1000,
    vehicle_description: "Van 4dr HV 7st E-CVT 4 Wheel Drive 2.5i (CBU, Hybrid)",
    description: "สภาพเหมือนใหม่",
    engine_size: "2,500",
    year: "2023",
    reference_id: "12alphard02",
    gallery: [
      {
        url_path: "/images/mockUp/ToyotaAlphardWhite.png",
      },
      {
        url_path: "/images/mockUp/ToyotaAlphardInsideBase.jpg",
      }
    ]
  },
];

export default function DetailRent({ params }: Props) {
  const [data, setData] = useState<any>(initialMockUpData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  useEffect(() => {
    axios
      .get(`${getCar}/${params.id}`)
      .then((response) => {
        // setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const selectedData: any = initialMockUpDataVehicle.filter(data => data.vehicle_id == params.id);

    setData(selectedData[0])
  }, [params.id])

  return (
    <>
      {isLoading ? (
        <Box className={classes.page_not_found}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data === undefined ? (
            <Box className={classes.container_sold_out}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                marginX={4}
              >
                <span className="text-upper fs-24px tc-red">
                  <strong>
                    Not Available (being rented)
                  </strong>
                </span>
              </Box>

              <Box className={classes.btn_container}>
                <Link href="/rent">
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
                <Link href="/rent">
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
                  href={`/nearmodelrent?brand=${data.brand}&model=${data.model}`}
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
                บาท/เดือน
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
                <RentMeet
                  modelId={data.model_id}
                  vehicleId={data.vehicle_id}
                  listingVparkId={data.listing_vpark_id}
                  brand={data.brand}
                  model={data.model}
                  year={data.year}
                  submodel={data.submodel}
                  price={data.listing_price}
                  image={data.gallery[0].url_path}
                  plateId={data.license_plate + " " + data.province}
                  reference_id={data.reference_id}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}
