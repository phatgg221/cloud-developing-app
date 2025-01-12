'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/application_component/adminHeader';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [email, setEmail] = useState(''); // State for email input
  const [message, setMessage] = useState(''); // State for feedback message

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

  const handleSubscribe = async () => {
    try {
      const payload = {
        body: JSON.stringify({ email }), // Wrap email in a body key
      };
  
      console.log('Payload:', payload);
  
      const response = await fetch('https://0wuymlohdg.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the payload in required format
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Subscription successful!');
        setEmail('');
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing email:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
  
  

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
        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-md p-2 w-80 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="ml-4 px-5 py-2.5 bg-[#f8a61b] text-white font-bold rounded-md"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
          {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}
        </div>
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
