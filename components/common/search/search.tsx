"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "@/style/components/common/search.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import {useDebounce} from "use-debounce";

type Props = {
  placeholder: string;
  data: [];
};

export default function Search({ placeholder, data }: Props) {
  const router = useRouter()
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [query] = useDebounce(wordEntered, 500);

  const handlerFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const filteredData = data.filter((item: any) => {
      return item.model.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord) {
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelected = (value: string) => {
    setWordEntered(value)
    setFilteredData([]);
  };

  useEffect(() => {
    if(!query){
      router.push('/buycar');
    }else{
      router.push(`/buycar?search=${query}`)
    }
    
  },[query, router])

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
          {filteredData.length === 0 ? (
            <SearchIcon
              onClick={() => {
                handleSelected;
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => {
                setFilteredData([]);
              }}
            />
          )}
        </button>
      </Box>
      {filteredData.length != 0 && (
        <Box className={classes.dataResult}>
          {filteredData.map((value: any, index: number) => {
            return (
              <Box
                key={index}
                className={classes.dataItem}
                onClick={() => {
                  handleSelected(value.model);
                }}
              >
                {value.model}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
