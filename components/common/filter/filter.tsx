import { Box, Grid } from "@mui/material";
import React from "react";
import classes from "@/style/page/buycar/buycar.module.css";

type Props = {};

export default function Filter({}: Props) {
  return (
    <Box>
      <Box paddingX={1} paddingBottom={3}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div className={classes.custom_selection}>
              <select>
                <option value="0">ยี่ห้อ</option>
                <option value="1">Honda</option>
                <option value="2">BMW</option>
                <option value="3">Mercedes</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={classes.custom_selection}>
              <select>
                <option value="0">รุ่น</option>
                <option value="1">Honda</option>
                <option value="2">BMW</option>
                <option value="3">Mercedes</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={classes.custom_selection}>
              <select>
                <option value="0">รุ่นย่อย</option>
                <option value="1">Honda</option>
                <option value="2">BMW</option>
                <option value="3">Mercedes</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={classes.custom_selection}>
              <select>
                <option value="0">ราคา min</option>
                <option value="1">0</option>
                <option value="2">100,000</option>
                <option value="3">1,000,000</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={classes.custom_selection}>
              <select>
                <option value="0">ราคา max</option>
                <option value="1">99,999</option>
                <option value="2">999,999</option>
                <option value="3">10,000,000</option>
              </select>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
