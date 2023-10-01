import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from '@/style/components/common/search.module.css';

type Props = {
  placeholder: string;
  data: [];
};

export default function Search({ placeholder, data }: Props) {
  return (
    <Box width={"100%"}>
      <Box display={"flex"} justifyContent={"center"}>
        <input type="text" placeholder={placeholder} className={classes.input}/>
        <button style={{ backgroundColor: "#4679C7" }} className={classes.button}>
          <SearchIcon />
        </button>
      </Box>
    </Box>
  );
}
