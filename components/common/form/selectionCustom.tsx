import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '@/style/components/common/form.module.css';

type Props = {
    id: string,
    type?: string,
    data: {}[],
};

export default function SelectionCustom({id,data,type} : Props) {
  return (
    <Box id={id} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <select className={type === "unborder" ? classes.select_custom : classes.select_blue}>
          {data.map((item:any, index:number) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
    </Box>
  );
}