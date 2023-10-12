import { Box, Grid } from "@mui/material";
import React from "react";
import { SelectCustom } from "../form";

type Props = {};

const brandData = [
  {
    label: "ยี่ห้อ",
    value: "all",
  },
  {
    label: "Honda",
    value: "honda",
  },
  {
    label: "Toyota",
    value: "toyota",
  },
  {
    label: "BMW",
    value: "bmw",
  },
];

const modelData = [
  {
    label: "รุ่น",
    value: "all",
  },
  {
    label: "",
    value: "honda",
  },
  {
    label: "Toyota",
    value: "toyota",
  },
  {
    label: "BMW",
    value: "bmw",
  },
];

const subModelData = [
  {
    label: "ยี่ห้อ",
    value: "all",
  },
  {
    label: "Honda",
    value: "honda",
  },
  {
    label: "Toyota",
    value: "toyota",
  },
  {
    label: "BMW",
    value: "bmw",
  },
];

const minPriceData = [
  {
    label: "ยี่ห้อ",
    value: "all",
  },
  {
    label: "Honda",
    value: "honda",
  },
  {
    label: "Toyota",
    value: "toyota",
  },
  {
    label: "BMW",
    value: "bmw",
  },
];

const maxPriceData = [
  {
    label: "ยี่ห้อ",
    value: "all",
  },
  {
    label: "Honda",
    value: "honda",
  },
  {
    label: "Toyota",
    value: "toyota",
  },
  {
    label: "BMW",
    value: "bmw",
  },
];

export default function Filter({}: Props) {
  return (
    <Box>
      <Box paddingX={1} paddingBottom={3}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <SelectCustom id={"brand"} data={brandData} />
          </Grid>
          <Grid item xs={6} md={4}>
            <SelectCustom id={"model"} data={modelData} />
          </Grid>
          <Grid item xs={6} md={4}>
            <SelectCustom id={"sub-model"} data={subModelData} />
          </Grid>
          <Grid item xs={6} md={4}>
            <SelectCustom id={"min-for-sale"} data={minPriceData} />
          </Grid>
          <Grid item xs={6} md={4}>
            <SelectCustom id={"max-for-sale"} data={maxPriceData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
