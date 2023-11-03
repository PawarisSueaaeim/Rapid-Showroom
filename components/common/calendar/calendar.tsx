import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar/calendar.module.css";
import moment from "moment";

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
}: Props) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() + 1);

  const formattedToday = moment(today).format("DD/MM/YYYY");
  const formattedYesterday = moment(yesterday).format("DD/MM/YYYY");

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
          disablePastDate === "yesterday" ? formattedToday : formattedYesterday
        }
      />
    </Box>
  );
}
