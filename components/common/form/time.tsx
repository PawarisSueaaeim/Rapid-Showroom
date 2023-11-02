import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type Props = {
  date?: string;
  onTimeChange: (date: Dayjs | null) => void;
};

export default function TimeValidationTimePicker({onTimeChange, date }: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  //@ts-ignore
  const currentDate = moment(dayjs().$d).format("YYYY-MM-DD");
  //@ts-ignore
  const dateProps = moment(date).format("YYYY-MM-DD");

  const handleTimeChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onTimeChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          //@ts-ignore
          renderInput={(params) => <TextField {...params} />}
          value={value}
          label="เลือกเวลานัดดีลเลอร์"
          onChange={(newValue) => {
           handleTimeChange(newValue);
          }}
          minTime={dateProps === currentDate ? dayjs().add(1, "hours") : null}
          ampm={false}
        />
      </Stack>
    </LocalizationProvider>
  );
}
