'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/application_component/adminHeader';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userInfo = await response.json();
          setData(userInfo.userInfo);

          if (!userInfo.userInfo?.isAdmin) {
            router.push('/'); // Redirect non-admins immediately
          }
        } else {
          setData(null);
          router.push('/'); // Redirect if user data cannot be fetched
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push('/'); // Redirect on fetch failure
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchUserInfo();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while user data is being fetched
  }

  if (!data || !data.isAdmin) {
    return null; // Block rendering for non-admins
  }

  return (
    <div>
      <AdminHeader />
      <div className="text-center mt-12 p-6">
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => router.push('/admin/manage-table')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Table
        </Button>
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => router.push('/admin/manage-menu')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Menu
        </Button>
        <Button
          className="relative overflow-hidden text-white bg-none border border-[#f8a61b] font-extrabold rounded-md text-xl px-5 py-2.5 mx-2 transition-all duration-700 hover:text-[#f8a61b]"
          onClick={() => router.push('/admin/manage-ordering-food')}
        >
          <span className="absolute inset-0 h-0 bg-[#f8a61b] transition-all duration-700 rounded-t-full z-[-1] hover:h-full"></span>
          Manage Ordering food
        </Button>
      </div>
    </div>
  );
}
