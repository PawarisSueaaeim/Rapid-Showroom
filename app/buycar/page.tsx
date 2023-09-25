import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import classes from "@/style/page/buycar/buycar.module.css";
import { CardItems } from "@/components/common/card";

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div className={classes.custom_selection}>
            <select>
            <option value="0">ยี่ห้อ</option>
              <option value="1">Honda</option>
              <option value="2">BMW</option>
              <option value="3">Mercedes</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className={classes.custom_selection}>
            <select>
            <option value="0">รุ่น</option>
              <option value="1">Honda</option>
              <option value="2">BMW</option>
              <option value="3">Mercedes</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className={classes.custom_selection}>
            <select>
            <option value="0">รุ่นย่อย</option>
              <option value="1">Honda</option>
              <option value="2">BMW</option>
              <option value="3">Mercedes</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className={classes.custom_selection}>
            <select>
            <option value="0">ราคา min</option>
              <option value="1">0</option>
              <option value="2">100,000</option>
              <option value="3">1,000,000</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className={classes.custom_selection}>
            <select>
            <option value="0">ราคา max</option>
              <option value="1">99,999</option>
              <option value="2">999,999</option>
              <option value="3">10,000,000</option>
            </select>
          </div>
        </Grid>
      </Grid>

      <div className={classes.grid_card}>
        {data.map((poke: IPokemon, index: number) => {
          return <CardItems name={poke.name} url={poke.url} key={index} />;
        })}
      </div>
    </div>
  );
}
