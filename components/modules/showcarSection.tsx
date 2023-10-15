import React from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { CardItems } from "../common/card";
import { ButtonCapsule } from "../common/button";
import Link from "next/link";
import Image from "next/image";
import { ICar } from "@/components/types/car";

type Props = {};

export default async function ShowcarSection({}: Props) {
  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  const response = await axios.post(getCar, {
    page: 1,
    per_page: 6,
    orderby: "vehicle_id",
    search: "",
    sort: "desc",
  });
  const data = await response.data.data;

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      {data === undefined || data.lenght < 0 ? (
        <span className="fs-32px fw-500 tc-red">Sold out</span>
      ) : (
        <Box>
          <Grid container>
            {data.map((car: ICar) => {
              return (
                <Grid item xs={6} md={3} lg={2} key={car.vehicle_id}>
                  <CardItems
                    vehicle_id={`${car.vehicle_id}`}
                    model={car.model}
                    submodel={car.submodel}
                    price={car.listing_price}
                    mileage={car.mileage}
                    image={car.image}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              background: "linear-gradient(#fff, #4679C7)",
            }}
          >
            <span className="fs-22px tc-blue">รถคันอื่นๆที่อาจโดนใจคุณ</span>
            <Link href="/buycar">
              <ButtonCapsule
                title="ดูรถยนต์ยอดนิยมเพิ่มเติม"
                color="#fff"
                bgColor="#4679C7"
                height={32}
                icon="search"
                marginX={2}
              />
            </Link>
            <Image
              src="/images/image-car-05.png"
              alt="image-car-05"
              width={250}
              height={100}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
