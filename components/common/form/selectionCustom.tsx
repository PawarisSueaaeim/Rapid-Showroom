import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '@/style/components/common/form.module.css';

type Props = {
    id: string,
    label?: string,
    defaultValue?: string,
    type?: string,
    data: {}[],
};

export default function SelectionCustom({id,label,defaultValue,data,type} : Props) {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <select className={type === "unborder" ? classes.select_custom : ""}>
          {data.map((item:any, index:number) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
    </Box>
  );
}