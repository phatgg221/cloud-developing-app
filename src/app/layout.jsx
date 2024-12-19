"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/application_component/Header";
import { Inria_Serif } from "next/font/google";
import Footer from "@/components/application_component/Footer";
import Chatbox from "@/components/Chatbox/Chatbox"; // Import the Chatbox component
import { usePathname } from "next/navigation";

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
  const excludedPages = ["/admin", "/user-profile", "/register", "/login"];

  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-slate-100 text-black`}>
        <Header></Header>
          {children}

        <Footer ></Footer>
        {/* Render Chatbox conditionally */}
        {!excludedPages.includes(pathname) && <Chatbox />}
      </body>
    </html>
  );
}
