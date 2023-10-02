import { Box, TextField } from "@mui/material";
import * as React from "react";
import classes from '@/style/components/common/calendar.module.css'

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
        className={classes.hidden_icons}
        InputProps={{
          style: {
            backgroundColor: "#4679C7",
          },
          inputProps: {
            style: {
              color: "#fff",
              border: "none",
            },
          },
        }}
        sx={{
          '& fieldset': {
            border: 'none',
          },
          width: "100%",
        }}
      />
    </Box>
  );
}
