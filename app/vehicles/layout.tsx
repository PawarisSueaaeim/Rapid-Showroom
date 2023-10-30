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
      {children}
    </Box>
  );
}
