import React from "react";
import classes from "@/style/page/contactus.module.css";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Contact({}: Props) {
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} style={{ overflowX: "hidden"}}>
      <Link
        href="https://www.google.co.th/maps/place/%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%9E%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%AA%E0%B8%B4%E0%B8%99/@13.7107134,100.5344402,17.46z/data=!4m6!3m5!1s0x30e29f49e5e3c065:0x803106dc55e5c7d4!8m2!3d13.7107581!4d100.5361314!16s%2Fg%2F1q5bs0lr4?hl=th&entry=ttu"
        target="_blank"
      >
        <Image
          src="/images/map.png"
          alt="map"
          width={500}
          height={400}
          className={classes.contact_map}
        />
        <Box style={{
          position: "absolute",
          padding: "0.5rem",
          borderRadius: "5px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
          right: 20,
          top: 310,
        }}>
          <Image src="/icons/map.png" alt="map" width={50} height={50}/>
        </Box>
      </Link>

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
        <Image
          src="/icons/instagram.png"
          alt="instagram"
          width={41}
          height={41}
        />
        <Image
          src="/icons/telegram.png"
          alt="telegram"
          width={41}
          height={41}
        />
        <Image
          src="/icons/facebook.png"
          alt="facebook"
          width={41}
          height={41}
        />
        <Image src="/icons/ticktok.png" alt="ticktok" width={41} height={41} />
      </Box>
    </Box>
  );
}
