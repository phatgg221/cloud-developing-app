'use client'
import React, { useState } from 'react';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Inquiry submitted successfully!");
        alert("Inquiry submitted successfully!");
        window.location.reload();
      } else {
        console.error("Failed to submit inquiry.");
        alert("Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Error occurred while submitting inquiry:", error);
    }
  };

  return (
    <footer className="bg-black text-white py-8 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-6 text-[#d4af37]">Come have a seat</h2>
        <form className="bg-black rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center text-[#d4af37]">
            <div className="flex flex-row gap-24 mb-4">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-64 p-2 bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="date">Date and time</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-64 p-2 bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="guests">Number of guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-64 p-2 bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 mb-4">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-64 p-2 bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-64 p-2 bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-2" htmlFor="note">Note</label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-gray-600 text-white focus:border-gray-400 focus:outline-none resize-none"
                rows={4}
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="w-24 h-12 border border-white text-white cursor-pointer text-2xl">
            Book
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;