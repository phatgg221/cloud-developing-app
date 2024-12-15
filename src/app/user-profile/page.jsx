'use client';

import { useState } from 'react';

export default function UserProfile() {
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });

  const [isEditing, setIsEditing] = useState(false);

  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle editing state
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log('User data updated:', user);
    }
  };

  // Validate and submit password change
  const submitPasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    // Clear error and log (you can send this to the backend)
    setPasswordError('');
    console.log('Password changed successfully:', { currentPassword, newPassword });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

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

        <hr className="my-6" />

        <h2 className="text-xl font-bold text-gray-700 mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <button
            onClick={submitPasswordChange}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
