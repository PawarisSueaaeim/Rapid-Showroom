import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import EmailIcon from '@mui/icons-material/Email';

type Props = {
  onChange: (value: any) => void;
};

export default function InputEmail({ onChange }: Props) {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        type={"text"}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            {/* <IconButton>
              <EmailIcon />
            </IconButton> */}
          </InputAdornment>
        }
        label="Email"
      />
    </FormControl>
  );
}
