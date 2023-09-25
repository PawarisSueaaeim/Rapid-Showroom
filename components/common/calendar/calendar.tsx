import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {
    id: string;
    label?: string;
    defaultValue?: string;
    type: string;
};

export default function CalendarCustom({id, label, type, defaultValue}: Props) {
  return (
    <div>
        <TextField
        id={id}
        label={label ? label : ""}
        type={type}
        defaultValue={defaultValue ? defaultValue : "วัน เดือน ปี"}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        style={{
            width: "100%",
            backgroundColor: "#4679C7",
            borderRadius: "5px",
            border: "none",
            color: "white",
            fontSize: "16px",
        }}
      />
    </div>
  );
}
