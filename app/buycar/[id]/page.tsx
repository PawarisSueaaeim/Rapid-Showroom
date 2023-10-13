import React from "react";
import Image from "next/image";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import { Box } from "@mui/material";
import Link from "next/link";
import DealerMeet from "@/components/modules/dealerMeet";
import { currency } from "@/utils/currency";
import axios from "axios";
import { Carousel } from "@/components/common/carousel";

type Props = {
  params: { id: string };
};

export default async function Detail({ params }: Props) {
  const getCar = process.env.NEXT_PUBLIC_SHOWROOM_API_URL+'/showrooms/vehicles';

  const response = await axios.get(`${getCar}/${params.id}`)
  const data = await response.data.data;
  console.log(data.gallery)

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={10}
    >
      <Box padding={4}>
        <Carousel images={data.gallery}/>
      </Box>
      <span className="text-upper fs-24px tc-blue"><strong>{data.model}</strong></span>
      <span className="text-upper fs-12px tc-blue tw-100">{data.submodel}</span>
      <Box marginTop={2} display={"flex"} gap={2}>
        <Link href="/buycar">
          <ButtonCapsule
            title={"ดูรถเพิ่ม"}
            color={"#fff"}
            bgColor={"#4679C7"}
            fontSize={12}
            height={22}
            marginX={22}
          />
        </Link>
        <Link href={`/nearmodel/${data.vehicle_id}`}>
          <ButtonCapsule
            title={"ดูรถใกล้เคียง"}
            color={"#fff"}
            bgColor={"#4679C7"}
            fontSize={12}
            height={22}
            marginX={12}
          />
        </Link>
      </Box>
      <Box display={"flex"} alignItems={"center"} marginTop={2}>
        <span className="fs-18px"><strong className="fs-32px tc-blue">{currency(data.listing_price, 0)}</strong> บาท</span>
      </Box>
      <span className="fs-14px">เลขไมล์: {currency(data.mileage,0)} Km</span>
      <Box width={"100%"}>
        <DealerMeet />
      </Box>
    </Box>
  );
}
