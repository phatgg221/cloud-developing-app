'use client';

import React from 'react';
import AdminHeader from '@/components/application_component/adminHeader';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div>
      <AdminHeader />
      <div className="text-center mt-12 bg-[#fffefa] p-6">
        <Button className="relative overflow-hidden  text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]">
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Table
        </Button>
        <Button className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]">
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Menu
        </Button>
        <Button className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]">
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage users
        </Button>
        <Button className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]">
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Chat with Users
        </Button>
      </div>
    </div>
  );
}
