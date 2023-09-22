import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "@/style/components/card.module.css";
import Image from "next/image";
import { Box, Card } from "@mui/material";

type Props = {
  name: string;
  url: string;
};

export default async function CardItem({ name, url }: Props) {
  const response = await axios.get(url);
  const data = await response.data;

  return (
    <Card className={classes.container}>
      <Box className={classes.image}>
        <Image
          src={data?.sprites?.other?.home?.front_default}
          width={150}
          height={150}
          alt={`${name}`}
        />
      </Box>
      <div className={classes.model_container}>
        <span className={classes.model_name}>{data.name}</span>
        <span className={classes.submodel_name}>{data.name}</span>
      </div>
      <div className={classes.content}>
        <span>เลขไมล์: {data.weight}</span>
        <span>เกียร์: {data.height}</span>
        <span>ดีลเลอร์ โทร: {data.weight}</span>
      </div>
      <div className={classes.price}>
        <h3>{data.base_experience}</h3>
        <span>บาท</span>
      </div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ borderRadius: 28, width: "100%" }}
        href={`/buycar/${data.id}`}
      >
        จองรถ
      </Button>
      <Button
        style={{ marginTop: 16 }}
        size="small"
        endIcon={<ArrowForwardIosIcon />}
      >
        ดูรายละเอียด
      </Button>
    </Card>
  );
}
