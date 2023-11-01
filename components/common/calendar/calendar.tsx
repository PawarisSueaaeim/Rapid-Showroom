import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar.module.css";

type Props = {
  id: string;
  type: "date" | "time";
  value: string;
  onChange: (newValue: string) => void;
  style: "custom" | "outline";
  disablePastDate?: "today" | "yesterday";
  selectedDate?: string;
};

export default function Calendar({
  id,
  type,
  value,
  onChange,
  style,
  disablePastDate,
  selectedDate,
}: Props) {
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
        min={
          // type === "date"
          //   ? disablePastDate === "yesterday"
          //     ? formattedToday
          //     : formattedYesterday
          //   : selectedDate === formattedToday
          //   ? today.toISOString()
          //   : undefined
          type === 'time' ? "01-11-2023T09:00" : "00:00"
        }
      />
    </Box>
  );
}
