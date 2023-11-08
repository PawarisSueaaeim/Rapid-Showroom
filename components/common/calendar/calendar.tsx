import { Box } from "@mui/material";
import React from "react";
import classes from "@/style/components/common/calendar/calendar.module.css";
import moment from "moment";
import { daymontyearFormat } from "@/utils/dateHelper";

type Props = {
  id: string;
  type: "date" | "time";
  value: string;
  onChange: (newValue: string) => void;
  style: "custom" | "outline";
  disablePastDate?: boolean;
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

  const formattedToday = today.toISOString().split("T")[0];

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
        min={disablePastDate ? formattedToday : ""}
      />
    </Box>
  );
}
