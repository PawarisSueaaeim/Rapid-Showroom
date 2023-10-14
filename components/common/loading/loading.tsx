import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={200}
    >
      <Image
        src="/icons/icon-loading.gif"
        alt="icon-loading"
        width={30}
        height={30}
      />
    </Box>
  );
}
