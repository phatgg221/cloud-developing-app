"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./application_component/Header";
import Footer from "./application_component/Footer";
const ConditionalHeader = ({ children }) => {
  const pathname = usePathname();
  const noHeaderPages = ["/admin", "/admin/manage-users","/admin/manage-menu","admin/manage-table"];

  const paddingTopClass = pathname && noHeaderPages.includes(pathname) ? "" : "pt-[70px]";

  return (
    <>
      {pathname && !noHeaderPages.includes(pathname) && <Header />}
      <div className={paddingTopClass}>
        {children}
      </div>
      {pathname && !noHeaderPages.includes(pathname) && <Footer />}
    </>
  );
};

export default ConditionalHeader;