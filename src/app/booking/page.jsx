'use client';

import { useState } from 'react';

export default function BookingTable() {
  // State for booking form
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    people: '',
  });

  const [confirmation, setConfirmation] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock confirmation
    setConfirmation(`Table booked for ${formData.people} people on ${formData.date} at ${formData.time}.`);
    
    // Clear form after submission
    setFormData({ date: '', time: '', people: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Book a Table
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Number of People</label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              required
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 transition"
          >
            Book Now
          </button>
        </form>
        
        {confirmation && (
          <div className="mt-6 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <p>{confirmation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
