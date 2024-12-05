import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/application_component/Header";
import { Inria_Serif } from "next/font/google";

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

export const metadata = {
  title: "Phoever App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-slate-100 text-black`}>
        <Header></Header>
          {children}

        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
