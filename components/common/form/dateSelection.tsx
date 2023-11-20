import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  onDateChange: (date: Dayjs | null) => void;
  label: string;
  maxDate?: any;
  onError?: (error: any) => void;
};

export default function ResponsiveDatePickers({
  onDateChange,
  label,
  maxDate,
  onError,
}: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(""));

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          label={label}
          views={["year", "month", "day"]}
          value={value}
          onError={onError}
          disablePast={true}
          maxDate={maxDate}
          format="DD/MM/YYYY"
          onChange={(newValue) => {
            handleDateChange(newValue);
          }}
          //@ts-ignore
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
