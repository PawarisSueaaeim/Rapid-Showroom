import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type Props = {
    id: string,
    label?: string,
    defaultValue?: string,
    data: {}[],
};

export default function SelectionCustom({id,label,defaultValue,data} : Props) {
    console.log(data)
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id={id}
          select
          label={label}
          defaultValue={defaultValue}
          variant="standard"
        >
          {data.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Box>
  );
}