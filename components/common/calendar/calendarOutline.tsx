import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar.module.css";

type Props = {
  id: string;
  label?: string;
  defaultValue?: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
};

export default function CalendarOutline({
  id,
  label,
  type,
  defaultValue,
  value,
  onChange,
}: Props) {
  return (
    <Box>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classes.calendar_outline}
      />
    </Box>
  );
}
