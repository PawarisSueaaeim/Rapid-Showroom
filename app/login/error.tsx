"use client";
import { Box } from "@mui/material";
import React from "react";

export default function Error({ error, reset }: any) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <strong>Page Not Found 404</strong>
    </Box>
  );
}
