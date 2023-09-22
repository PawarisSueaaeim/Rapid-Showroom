import React from "react";
import axios from "axios";
import CardItem from "@/components/carditem";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import classes from "@/style/page/buycar/buycar.module.css";

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
    <div>
      <div className={classes.grid_card}>
        {data.map((poke: IPokemon, index: number) => {
          return <CardItem name={poke.name} url={poke.url} key={index} />;
        })}
      </div>
    </div>
  );
}
