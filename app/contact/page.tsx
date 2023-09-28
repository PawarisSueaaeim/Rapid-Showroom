// import from inside
import React from "react";
import classes from "@/style/page/contactus.module.css";
// import from outside
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type Props = {};

export default function Contact({}: Props) {
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Image
        src="/images/map.png"
        alt="map"
        width={500}
        height={415}
        className={classes.contact_map}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bgcolor={"#fff"}
        color={"#000"}
        marginTop={5}
      >
        <Box display={"flex"}>
          <span className={classes.logo_text}>Rapid Auto</span>
          <span className={classes.location_text}>บจก.แรพพิด มอเตอร์</span>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <span className={classes.location_text}>
            อาคารพิพัฒนสิน ชั้น 9 ซอยพัฒนสิน
          </span>
          <span className={classes.location_text}>
            แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120
          </span>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} marginTop={6} gap={4}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-contact-call.png"
            alt="icon-contact-call"
            width={96}
            height={94}
          />
          <span className={classes.contact_text}>092 212 1233</span>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Image
            src="/icons/icon-contact-mail.png"
            alt="icon-contact-mail"
            width={96}
            height={94}
          />
          <span className={classes.contact_text}>example@gmail.com</span>
        </Box>
      </Box>
      <Box display={"flex"} gap={2} marginTop={9}>
          <Image src="/icons/instagram.png" alt="instagram" width={41} height={41}/>
          <Image src="/icons/telegram.png" alt="telegram" width={41} height={41}/>
          <Image src="/icons/facebook.png" alt="facebook" width={41} height={41}/>
          <Image src="/icons/ticktok.png" alt="ticktok" width={41} height={41}/>
        </Box>
    </Box>
  );
}
