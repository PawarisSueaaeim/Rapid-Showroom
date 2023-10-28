import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type Props = {
  date?: Dayjs | null;
};

export default function TimeValidationTimePicker({ date }: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  //@ts-ignore
  const currentDate = moment(dayjs().$d).format("YYYY-MM-DD");
  //@ts-ignore
  const dateProps = moment(date.$d).format("YYYY-MM-DD");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          //@ts-ignore
          renderInput={(params) => <TextField {...params} />}
          value={value}
          label="เลือกเวลานัดดีลเลอร์"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minTime={dateProps === currentDate ? dayjs().add(1, "hours") : null}
        />
      </Stack>
    </LocalizationProvider>
  );
}
