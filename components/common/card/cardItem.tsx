import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { currency } from "@/utils/currency";

type Props = {
  vehicle_id: string;
  model: string;
  submodel: string;
  price: number;
  mileage: number;
  image: string;
};

export default function CardItem({
  vehicle_id,
  model,
  submodel,
  price,
  mileage,
  image,
}: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ border: "1px solid #D9D9D9" }}
    >
      <Link href={`/buycar/${vehicle_id}`}>
        <Image
          src={image ? image : "/images/image-mockup-car.png"}
          width={190}
          height={120}
          alt={image}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          paddingLeft={3}
        >
          <span className="fs-18px tc-blue text-upper">
            <strong>{model}</strong>
          </span>
          <span className="fs-12px fw-100 tc-blue text-upper">{submodel}</span>
          <span className="fs-12px">เลขไมล์: {currency(mileage)} Km</span>
          <span className="fs-18px tc-blue">
            <strong>{currency(price)} ฿</strong>
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
          <Link href={`/buycar/${vehicle_id}`}>
            <span>View car</span>
          </Link>
        </Box>
      </Link>
    </Box>
  );
}
