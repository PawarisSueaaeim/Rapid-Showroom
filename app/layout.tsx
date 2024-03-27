import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "./global-redux/provider";
import GoogleAnalytics from './GoogleAnalytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/icons/apple-icon.png",
    apple: "/icons/apple-icon.png"
  },
  title: "Rapid Showroom",
  description: "ซื้อขายรถมื้อสอง สะดวกรวดเร็วทันใจ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics/>
      <Providers>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
