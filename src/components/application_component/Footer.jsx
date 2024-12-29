'use client';
import React from 'react';

const Footer = () => {
  const cafeInfo = {
    name: 'Cafenia',
    address: '123 Main Street, Springfield',
    phone: '123-456-7890',
    email: 'contact@goldenspooncafe.com',
    hours: {
      mondayToFriday: '8:00 AM - 10:00 PM',
      saturday: '9:00 AM - 11:00 PM',
      sunday: '9:00 AM - 8:00 PM',
    },
  };

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl mb-6 text-[#d4af37]">{cafeInfo.name}</h2>
        <p className="text-lg mb-2">{cafeInfo.address}</p>
        <p className="text-lg mb-2">Phone: {cafeInfo.phone}</p>
        <p className="text-lg mb-2">Email: {cafeInfo.email}</p>
        <div className="mt-4">
          <h3 className="text-2xl mb-4 text-[#d4af37]">Opening Hours</h3>
          <ul className="text-lg">
            <li>Monday - Friday: {cafeInfo.hours.mondayToFriday}</li>
            <li>Saturday: {cafeInfo.hours.saturday}</li>
            <li>Sunday: {cafeInfo.hours.sunday}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
