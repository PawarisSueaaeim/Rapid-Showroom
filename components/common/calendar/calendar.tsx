import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar.module.css";

type Props = {
  id: string;
  type: string;
  value: string;
  onChange: (newValue: string) => void;
  style: "custom" | "outline";
  disablePastDate?: "today" | "yesterday";
};

export default function Calendar({ id, type, value, onChange, style, disablePastDate }: Props) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() + 1);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedYesterday = yesterday.toISOString().split("T")[0];

  return (
    <Box>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          style === "outline"
            ? classes.calendar_outline
            : classes.calendar_custom
        }
        min={disablePastDate === "yesterday" ? formattedToday : formattedYesterday}
      />
    </Box>
  );
}
