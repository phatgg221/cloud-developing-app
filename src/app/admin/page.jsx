'use client';

import React from 'react';
import AdminHeader from '@/components/application_component/adminHeader';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';

export default function Page() {
  // const router = useRouter();
  

  const handleNavigation = (path) => {
    // router.push(path);
    window.location.href=path;
  };

  return (
    <div>
      <AdminHeader />
      <div className="text-center mt-12  p-6">
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => handleNavigation('/admin/manage-table')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Table
        </Button>
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => handleNavigation('/admin/manage-menu')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Menu
        </Button>
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => handleNavigation('/admin/manage-users')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Users
        </Button>
      </div>
    </div>
  );
}
