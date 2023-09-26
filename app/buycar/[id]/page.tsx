import React from "react";
import Image from "next/image";
import ButtonCapsule from "@/components/common/button/buttonCapsule";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import DealerMeet from "@/components/dealerMeet";

type Props = {
  params: { id: string };
};

export default async function Detail({ params }: Props) {
  const getAllPokemon = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${getAllPokemon}/${params.id}`, {
    next: { revalidate: 10 },
  });
  const data = await response.json();
  console.log(data);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginX={1}
    >
      <Box marginTop={4}>
        <Image
          src={data?.sprites?.other?.home?.front_default}
          width={250}
          height={250}
          alt={`${data.name}`}
        />
      </Box>
      <Typography variant="h2" style={{ color: "#0E2C77" }}>
        {data.name}
      </Typography>
      <Typography variant="h5" style={{ color: "#0E2C77" }}>
        {data.name}
      </Typography>
      <Box marginTop={2} display={"flex"} gap={2}>
        <Link href="/buycar">
          <ButtonCapsule
            title={"ดูรถเพิ่ม"}
            color={"#fff"}
            bgColor={"#4679C7"}
          />
        </Link>
        <Link href="/buycar">
          <ButtonCapsule
            title={"ดูรถใกล้เคียง"}
            color={"#fff"}
            bgColor={"#4679C7"}
          />
        </Link>
      </Box>
      <Box display={"flex"} alignItems={"center"} marginTop={2}>
        <Typography variant="h4" style={{ color: "#0E2C77" }}>
          {data.base_experience}
        </Typography>
        <Typography variant="h6" marginLeft={2}>
          บาท
        </Typography>
      </Box>
      <Typography>เลขไมล์: {data.weight} km</Typography>
      <Box marginY={1} width={"100%"}>
        <DealerMeet/>
      </Box>
    </Box>
  );
}
