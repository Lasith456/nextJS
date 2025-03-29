"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          withCredentials: true,
        });
        const data = response.data;
        if (data.success) {
          setName(data.user.fullName);
          setEmail(data.user.email);
          setProfileImage(data.user.profileImageUrl);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        alert('Failed to fetch user profile');
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('email', email);
    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axios.put('http://localhost:3001/api/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile: ' + error.response.data.message);
    }
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  return (
    <Sidebar>
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <form onSubmit={handleUpdate} className="mt-8">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="shadow-sm bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="shadow-sm bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            {profileImage && (
              <img 
  src={
    profileImage instanceof File 
      ? URL.createObjectURL(profileImage) 
      : `http://localhost:3001${profileImage}`
  } 
  alt="Profile" 
  className="mt-4 h-20 w-20 rounded-full"
/>            )}
          </div>
          <button type="submit" className="py-3 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none focus:ring-2 rounded-md text-white font-medium">
            Update Profile
          </button>
        </form>
      </div>
    </Sidebar>
  );
}