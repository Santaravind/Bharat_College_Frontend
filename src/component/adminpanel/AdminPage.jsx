
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminEmail, setAdminPassword,clearAdmin } from "../reduxstore/adminSlice";
import SendNotification from "./SendNotification";
import ResultDeclared from "./ResultDeclared";
import toast from "react-hot-toast";
import AdminResult from "./AdminResult";
import Certificate from "./Certificate";
function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const ADMIN_EMAIL = "bharattechnicalcollege@gmail.com";
  const ADMIN_PASSWORD = "B||??34$@//";
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submit clicked - Email:", email, "Password:", password);
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // console.log("Credentials matched - dispatching actions");
      dispatch(setAdminEmail(email));
      dispatch(setAdminPassword(password));
      toast.success("Admin authentication successful!");
    } else {
      toast.error("Access Denied: Invalid email or password.");
      setEmail("");
      setPassword("");
    }
  };

     const handleLogout = (e) => {
    e.preventDefault(); 
    dispatch(clearAdmin()); //  clear the Redux state
    toast.success("Logged out successfully!");
     setEmail("");
      setPassword("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "sendNotification":
        return <SendNotification />;
      case "resultDeclared":
        return <ResultDeclared />;
        case "AdminResult":
          return <AdminResult/>
           case "Cetificate":
          return <Certificate/>
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Select an admin tool from the buttons above
          </div>
        );
    }
  };

  // Debug authentication condition
  const isAuthenticated = admin.isAuthenticated && admin.email === ADMIN_EMAIL;
  // console.log("Is authenticated:", isAuthenticated);
  // console.log("Admin isAuthenticated:", admin.isAuthenticated);
  // console.log("Admin email:", admin.email);

  // If authenticated with the specific email and password, show admin tools
  if (isAuthenticated) {
    console.log("Rendering authenticated view");
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Admin Portal
            </h1>
            <p className="text-xl text-gray-600">
              Manage Notifications and Student results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Admin Login Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-green-500"
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
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Admin Access
                  </h2>
                  <p className="text-green-500 font-medium bg-green-50 px-3 py-1 rounded-full text-sm inline-block">
                    Access Granted - Welcome Admin
                  </p>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
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
                        {/* admin.email */}
                        Authenticated as: Admin                        
                      </span>

                    </div>
                    
                  </div>
                  
                </div>
                 <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-0.5 mt-2"onClick={handleLogout} > Logout </button>
              </div>
            </div>

            {/* Admin Tools Section */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Admin Tools
                  </h3>
                  
                  {/* Action Buttons */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => handleComponentClick("sendNotification")}
                      className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
                        activeComponent === "sendNotification"
                          ? "bg-blue-50 border-blue-500 text-blue-700 transform -translate-y-1 shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-25 hover:shadow-sm"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Send Notification
                    </button>

                    <button
                      onClick={() => handleComponentClick("resultDeclared")}
                      className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
                        activeComponent === "resultDeclared"
                          ? "bg-green-50 border-green-500 text-green-700 transform -translate-y-1 shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-25 hover:shadow-sm"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 mr-3"
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
                      Declare Results
                    </button>
                  </div> */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  {/* Send Notification Button */}
  <button
    onClick={() => handleComponentClick("sendNotification")}
    className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
      activeComponent === "sendNotification"
        ? "bg-blue-50 border-blue-500 text-blue-700 transform -translate-y-1 shadow-md"
        : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-25 hover:shadow-sm"
    }`}
  >
    <svg
      className="w-6 h-6 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
    Send Notification
  </button>

  {/* Declare Result Button */}
  <button
    onClick={() => handleComponentClick("resultDeclared")}
    className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
      activeComponent === "resultDeclared"
        ? "bg-green-50 border-green-500 text-green-700 transform -translate-y-1 shadow-md"
        : "bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-25 hover:shadow-sm"
    }`}
  >
    <svg
      className="w-6 h-6 mr-3"
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
    Declare Results
  </button>

  {/* AdminResult Button (NEW BUTTON) */}
  <button
    onClick={() => handleComponentClick("AdminResult")}
    className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
      activeComponent === "AdminResult"
        ? "bg-purple-50 border-purple-500 text-purple-700 transform -translate-y-1 shadow-md"
        : "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-25 hover:shadow-sm"
    }`}
  >
    <svg
      className="w-6 h-6 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    Admin Result
  </button>

   <button
    onClick={() => handleComponentClick("Cetificate")}
    className={`flex items-center justify-center p-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
      activeComponent === "Cetificate"
        ? "bg-purple-50 border-rose-500 text-green-700 transform -translate-y-1 shadow-md"
        : "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-25 hover:shadow-sm"
    }`}
  >
    <svg
      className="w-6 h-6 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
   Certificate
  </button>
</div>


                  {/* Active Component Display */}
                  <div className="mt-6">
                    {renderActiveComponent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // console.log("Rendering login view");
  // Show email and password input form if not authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Admin Portal
          </h1>
          <p className="text-xl text-gray-600">
            Manage Notifications and Student results
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

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your admin password"
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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

              {/* Debug info - remove in production */}
              {/* <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Debug:</strong> State - {JSON.stringify(admin)}
                </p>
              </div> */}
            </div>
          </div>

          {/* Admin Tools Section - Hidden until authenticated */}
          <div className="lg:col-span-2">
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
                  Please enter your admin email address and password to access the admin tools and dashboard.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> This area contains sensitive administrative functions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;