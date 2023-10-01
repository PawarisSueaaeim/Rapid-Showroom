import * as React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { currency } from "@/utils/hooks/currency";

type Props = {
  name: string;
  url: string;
};

export default async function CardItem({ name, url }: Props) {
  const response = await axios.get(url);
  const data = await response.data;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ border: "1px solid #D9D9D9" }}
    >
      <Image
        src={data?.sprites?.other?.home?.front_default}
        width={120}
        height={120}
        alt={name}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        paddingLeft={3}
      >
        <span className="fs-18px tc-blue text-upper">
          <strong>{data.name}</strong>
        </span>
        <span className="fs-12px fw-100 tc-blue text-upper">{data.name}</span>
        <span className="fs-12px">เลขไมล์: {currency(data.weight, 0)} Km</span>
        <span className="fs-18px tc-blue">
          <strong>{currency(data.base_experience, 0)} ฿</strong>
        </span>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        width={"100%"}
        marginRight={3}
        style={{
          color: "#000",
          fontSize: "12px",
        }}
      >
        <RemoveRedEyeIcon style={{ fontSize: "10px" }} />
        <Link href={`/buycar/${data.id}`}>
          <span>View car</span>
        </Link>
      </Box>
    </Box>
  );
}
