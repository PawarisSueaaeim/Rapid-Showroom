import React from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { CardItems } from "../common/card";
import { ButtonCapsule } from "../common/button";
import Link from "next/link";
import Image from "next/image";

type Props = {};

export default async function ShowcarSection({}: Props) {
  const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0";

  const response = await axios.get(baseURL);
  const data = await response.data.results;

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Grid container>
        {data.map((car: any, index: number) => {
          return (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardItems
                id={`${car.name + index}`}
                name={car.name}
                url={car.url}
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
          background: "linear-gradient(#fff, #4679C7)" 
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
        <Image src='/images/image-car-05.png' alt="image-car-05" width={250} height={100}/>
      </Box>
    </Box>
  );
}
