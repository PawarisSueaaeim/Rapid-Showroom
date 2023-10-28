import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  onDateChange: (date: Dayjs | null) => void;
};

export default function ResponsiveDatePickers({onDateChange}: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(""));

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          label="เลือกวันที่นัดดีลเลอร์"
          views={["year", "month", "day"]}
          value={value}
          disablePast={true}
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
