import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminEmail } from "../reduxstore/adminSlice";
import SendNotification from "./SendNotification";
import ResultDeclared from "./ResultDeclared";

function AdminPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(setAdminEmail(email));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Admin Portal
          </h1>
          <p className="text-xl text-gray-600">
            Manage notifications and student results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Login Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Admin Access
                </h2>
                <p className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full text-sm inline-block">
                  Restricted Access - Students Not Allowed
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your admin email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      required
                    />
                    <svg
                      className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Verify & Continue
                </button>
              </form>

              {admin.isAuthenticated && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-green-700 font-medium">
                      Authenticated as: {admin.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Admin Tools Section */}
          <div className="lg:col-span-2">
            {admin.isAuthenticated ? (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Admin Tools
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <SendNotification />
                    <ResultDeclared />
                  </div>
                </div>

                
               
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-24 h-24 text-gray-300 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">
                    Authentication Required
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Please enter your admin email address to access the admin tools and dashboard.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-700 text-sm">
                      <strong>Note:</strong> This area contains sensitive administrative functions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;