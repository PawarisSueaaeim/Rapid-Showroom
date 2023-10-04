import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar.module.css";

type Props = {
  id: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
  style: "custom" | "outline";
};

export default function Calendar({
  id,
  type,
  value,
  onChange,
  style,
}: Props) {
  return (
    <Box>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={style === "outline" ? classes.calendar_outline : classes.calendar_custom}
      />
    </Box>
  );
}
