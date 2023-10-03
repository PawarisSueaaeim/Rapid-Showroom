"use client";
import { Box, IconButton, TextField } from "@mui/material";
import * as React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type Props = {
  id: string;
  label?: string;
  defaultValue?: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
};

export default function CalendarCustom({
  id,
  label,
  type,
  defaultValue,
  value,
  onChange,
}: Props) {
  return (
    <Box>
        <TextField
          id={id}
          label={label ? label : ""}
          type={type}
          value={value}
          defaultValue={defaultValue ? defaultValue : ""}
          onChange={(e) => onChange(e.target.value)}
          size="small"
          InputProps={{
            style: {
              backgroundColor: "#4679C7",
            },
            inputProps: {
              style: {
                color: "#fff",
                border: "none",
                fontSize: "12px",
                fontWeight: "300",
              },
            },
            // endAdornment: (
            //   <IconButton className="white-icon">
            //     {type === "date" ? <CalendarMonthIcon /> : <ScheduleIcon />}
            //   </IconButton>
            // ),
          }}
          sx={{
            "& fieldset": {
              border: "none",
            },
            width: "100%",
          }}
        />
    </Box>
  );
}
