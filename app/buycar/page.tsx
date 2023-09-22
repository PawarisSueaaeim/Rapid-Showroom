import React from "react";
import axios from "axios";
import CardItem from "@/components/carditem";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';

interface IPokemon {
  name: string;
  url: string;
}

type Props = {};

export default async function Buycar({}: Props) {
  const getAllPokemon = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(`${getAllPokemon}`);
  const data = await response.data.results;

  return (
    <Box className="container" sx={{ flexGrow: 1 }} padding={8}>
      <Grid container spacing={{ xs: 1, md: 3 }}>
        {data.map((poke: IPokemon, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={`${poke.name}-${index}`}>
              <CardItem name={poke.name} url={poke.url}/>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
