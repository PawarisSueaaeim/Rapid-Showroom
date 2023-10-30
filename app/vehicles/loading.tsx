import { Box, CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height="100vh">
      <CircularProgress />
    </Box>
  );
}
