'use client'
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import classes from '@/style/components/common/form.module.css';

type Props = {
    id: string,
    type?: string,
    data: {}[],
    value?: string | number,
    onOptionChange?: (event: any) => void
};

export default function SelectionCustom({id,data,type,value,onOptionChange} : Props) {
  const selectedOption = value;

  const handleSelected = (event: any) => {
    const newOption = event.target.value;
    //@ts-ignore
    onOptionChange(newOption);
  };


  return (
    <Box id={id} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <select value={selectedOption} onChange={handleSelected} className={type === "unborder" ? classes.select_custom : classes.select_blue}>
          {data.map((item:any, index:number) => {
            return (
              <option key={index} value={item.value}>{item.label}</option>
            )
          })}
        </select>
    </Box>
  );
}