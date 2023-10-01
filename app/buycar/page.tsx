import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { CardItems } from "@/components/common/card";
import { Search } from "@/components/common/search";
import { Box } from "@mui/material";
import { Filter } from "@/components/common/filter";

type IPokemon = {
  name: string;
  url: string;
};

type Props = {};

export default async function Buycar({}: Props) {
  const getAllPokemon = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(`${getAllPokemon}`);
  const data = await response.data.results;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      paddingTop={10}
    >
      <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
        <span className="fs-22px">Showroom</span>
      </Box>

      <Filter />
      <Box
        style={{
          border: "1px solid #D9D9D9",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Search placeholder="กรอกคำค้นหา" data={data} />
      </Box>

      <Grid container>
        {data.map((poke: IPokemon, index: number) => {
          return (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardItems name={poke.name} url={poke.url} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
