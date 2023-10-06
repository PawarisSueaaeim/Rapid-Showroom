"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "@/style/components/common/search.module.css";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  placeholder: string;
  data: [];
};

export default function Search({ placeholder, data }: Props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handlerFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const filteredData = data.filter((item: any) => {
      return item.model.toLowerCase().includes(searchWord.toLowerCase());
    });

    if(searchWord){
        setFilteredData(filteredData);
    }else {
        setFilteredData([]);
    }
  };

  return (
    <Box width={"100%"}>
      <Box display={"flex"} justifyContent={"center"}>
        <input
          type="text"
          value={wordEntered}
          placeholder={placeholder}
          className={classes.input}
          onChange={handlerFilter}
        />
        <button
          style={{ backgroundColor: "#4679C7" }}
          className={classes.button}
        >
          {filteredData.length === 0 ? <SearchIcon /> : <CloseIcon onClick={() => {setFilteredData([])}}/>}
        </button>
      </Box>
      {filteredData.length != 0 && (
        <Box className={classes.dataResult}>
          {filteredData.map((value: any, index: number) => {
            return (
              <Box key={index} className={classes.dataItem}>
                {value.model}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
