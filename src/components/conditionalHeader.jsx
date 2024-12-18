"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/headers/header";

const ConditionalHeader = ({ children }) => {
  const pathname = usePathname();
  const noHeaderPages = ["/function","/morningServe","/aboutUs","/nightServe","/","/contact"];

  const paddingTopClass = pathname && noHeaderPages.includes(pathname) ? "" : "pt-[70px]";

  return (
    <>
      {pathname && !noHeaderPages.includes(pathname) && <Header />}
      <div className={paddingTopClass}>
        {children}
      </div>
    </>
  );
};

export default ConditionalHeader;