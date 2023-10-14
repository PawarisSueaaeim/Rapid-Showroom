import React from "react";
import Link from "next/link";
import axios from "axios";
import { Box } from "@mui/material";
import classes from "@/style/page/buycar/buycar_id.module.css";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import DealerMeet from "@/components/modules/dealerMeet";
import { currency } from "@/utils/currency";
import { Carousel } from "@/components/common/carousel";

type Props = {
  params: { id: string };
};

export default async function Detail({ params }: Props) {
  const getCar =
    process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles";

  const response = await axios.get(`${getCar}/${params.id}`);
  const data = await response.data.data;

  return (
    <Box className={classes.container}>
      <Box className={classes.carousel}>
        <Carousel images={data.gallery} />
      </Box>
      <span className="text-upper fs-24px tc-blue">
        <strong>{data.model}</strong>
      </span>
      <span className="text-upper fs-12px tc-blue tw-100">{data.submodel}</span>
      <Box className={classes.btn_container}>
        <Link href="/buycar">
          <ButtonCapsule
            title={"ดูรถเพิ่ม"}
            color={"#fff"}
            bgColor={"#4679C7"}
            fontSize={12}
            height={30}
          />
        </Link>
        <Link href={`/nearmodel/${data.vehicle_id}`}>
          <ButtonCapsule
            title={"ดูรถใกล้เคียง"}
            color={"#fff"}
            bgColor={"#4679C7"}
            fontSize={12}
            height={30}
          />
        </Link>
      </Box>
      <span className="fs-18px">
        <strong className="fs-32px tc-blue">
          {currency(data.listing_price, 0)}
        </strong>{" "}
        บาท
      </span>
      <span className="fs-14px">เลขไมล์: {currency(data.mileage, 0)} Km</span>
      <Box className={classes.dealer_meet}>
        <DealerMeet />
      </Box>
    </Box>
  );
}
