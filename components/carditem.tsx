import * as React from "react";
import axios from "axios";
import classes from "@/style/components/card.module.css";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoIosArrowForward } from "react-icons/Io";

type Props = {
  name: string;
  url: string;
};

export default async function CardItem({ name, url }: Props) {
  const response = await axios.get(url);
  const data = await response.data;

  return (
    <Box className={classes.container}>
      <div className={classes.image}>
        <Image
          src={data?.sprites?.other?.home?.front_default}
          width={150}
          height={150}
          alt={name}
        />
      </div>
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
      <Link href={`/buycar/${data.id}`}>
        <button className={classes.button_booking_car}>จองรถ</button>
      </Link>
      <Link href={`/detail/${data.id}`}>
        <div className={classes.button_detail}>
          <p>ดูรายละเอียด</p>
          <IoIosArrowForward size={20}/>
        </div>
      </Link>
    </Box>
  );
}
