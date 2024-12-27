'use client';

import { useState, useEffect } from 'react';

export default function UserProfile() {
  const userId = '123'; // Replace with dynamic user ID if available
  const apiBaseUrl = 'https://<api-gateway-url>'; // Replace with your API Gateway base URL

  const [user, setUser] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle editing state and save changes
  const toggleEdit = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to update user data');
        const updatedData = await response.json();
        setUser(updatedData);
        alert('User information updated successfully!');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">User Profile</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border ${
                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border ${
                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          <button
            onClick={toggleEdit}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
}
