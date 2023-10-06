import React from "react";
import Image from "next/image";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import { Box } from "@mui/material";
import Link from "next/link";
import DealerMeet from "@/components/modules/dealerMeet";
import { currency } from "@/utils/currency";

type Props = {
  params: { id: string };
};

export default async function Detail({ params }: Props) {
  const getAllPokemon = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${getAllPokemon}/${params.id}`, {
    next: { revalidate: 10 },
  });
  const data = await response.json();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box marginTop={4}>
        <Image
          src={data?.sprites?.other?.home?.front_default}
          width={250}
          height={250}
          alt={`${data.name}`}
        />
      </Box>
      <span className="text-upper fs-24px tc-blue"><strong>{data.name}</strong></span>
      <span className="text-upper fs-12px tc-blue tw-100">{data.name}</span>
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
        <Link href={`/nearmodel/${data.id}`}>
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
        <span className="fs-18px"><strong className="fs-32px tc-blue">{currency(data.base_experience, 0)}</strong> บาท</span>
      </Box>
      <span className="fs-14px">เลขไมล์: {currency(data.weight,0)} Km</span>
      <Box width={"100%"}>
        <DealerMeet />
      </Box>
    </Box>
  );
}
