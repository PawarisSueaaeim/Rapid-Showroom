'use client'
import React from 'react';
import Box from '@mui/material/Box';
import classes from '@/style/components/common/form/form.module.css';

type Props = {
    id: string,
    type?: string,
    data: {}[],
    value?: string | number,
    onChange?: (event: any) => void
};

export default function SelectionCustom({id,data,type,value,onChange} : Props) {
  const selectedOption = value;

  return (
    <Box id={id} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <select value={selectedOption} onChange={onChange} className={type === "unborder" ? classes.select_custom : classes.select_blue}>
          {data.map((item:any, index:number) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
    </Box>
  );
}