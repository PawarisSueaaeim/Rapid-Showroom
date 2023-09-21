"use client"
import { Alert, AlertTitle } from "@mui/material";
import React from "react";

type Props = {};

export default function Error({ error, reset }: any) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Error car list pages: — <strong>{error.message}</strong>
    </Alert>
  );
}
