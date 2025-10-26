import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAdminEmail } from "../reduxstore/adminSlice";

const SendNotification = () => {

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    link: '',
    type: '',
    date: ''
  });
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
   const adminEmail = useSelector((state) => state.admin.email);
   
  // Replace with your actual Google Apps Script URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWQsUR1ZWm13IbOQEr8RAZpTohi_fYgOooQoNnbYQb6VVQeL9KoijsBK6W_ve6tRoUhA/exec';

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save data to Google Sheets
   const handleSaveData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Client-side check for better UX
  if (adminEmail !== "aravindsant323@gmail.com") {
    setMessage('Error: Unauthorized access');
    setLoading(false);
    return;
  }
     
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
       redirect: "follow",
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'add',
          adminEmail: adminEmail,
          ...formData
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Data saved successfully!');
        setFormData({
          id: '',
          title: '',
          link: '',
          type: '',
          date: ''
        });
      } else {
        setMessage('Error saving data: ' + result.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sent Notifications</h1>
          
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') || message.includes('not found') 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1  ">
          {/* Save Data Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Set Notification</h2>
            <form onSubmit={handleSaveData} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID *
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter unique ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? 'Saving...' : 'Save Data'}
              </button>
            </form>
          </div>

          
         
        </div>

       
      </div>
    </div>
  );
};


export default SendNotification
