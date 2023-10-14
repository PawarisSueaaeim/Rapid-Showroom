"use client"
import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function Error({ error, reset }: any) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Error detail car pages: — <strong>{error.message}</strong>
    </Alert>
  );
}
