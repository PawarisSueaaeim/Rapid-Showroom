import React from 'react'
import axios from 'axios'
import { Box, Typography } from '@mui/material';

type Props = {}

export default async function Buycar({}: Props) {
  const getAllPokemon = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(`${getAllPokemon}`)
  const data = await response.data.results;

  return (
    <Box className="container">
      <Box display={"flex"} justifyContent={"center"}>
        <Typography marginTop={8}>Showroom</Typography>
      </Box>
      <ul>
        {data.map((poke: any,index: number) => {
          return (
            <li key={index}>
              {poke.name}
            </li>
          )
        })}
      </ul>
    </Box>
  )
}