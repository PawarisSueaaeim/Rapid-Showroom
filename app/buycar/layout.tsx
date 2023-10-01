"use client";
import { Box, useMediaQuery } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BuycarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobileMode = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      paddingX={isMobileMode ? 0 : 8}
      paddingY={4}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <Box marginTop={10} marginBottom={2}>
          <span className="fs-24px">Showroom</span>
        </Box>
      </Box>
      {children}
    </Box>
  );
}
