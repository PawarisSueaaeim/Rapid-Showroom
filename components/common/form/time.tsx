import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers";

type Props = {
  date?: string;
  onTimeChange: (date: Dayjs | null) => void;
  label: string;
};

export default function TimeValidationTimePicker({onTimeChange, date, label }: Props) {
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
        <DesktopTimePicker
          //@ts-ignore
          renderInput={(params) => <TextField {...params} />}
          disableMaskedInput={false}
          value={value}
          label={label}
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
