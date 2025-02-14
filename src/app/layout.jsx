"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Inria_Serif } from "next/font/google";
import Chatbox from "../components/Chatbox/Chatbox"
import { usePathname } from "next/navigation";
import ConditionalHeader from "../components/conditionalHeader";
const inter = Inria_Serif({ weight:'300' ,subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where the Chatbox should NOT appear
  const excludedPages = [ "/user-profile", "/register", "/login"];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 text-black`}>


        {!excludedPages.includes(pathname) && <Chatbox />}
        <ConditionalHeader>{children}</ConditionalHeader>

      </body>
    </html>
  );
}
