// components/ResultVerification.jsx
import React, { useState } from "react";
import {
  Search,
  User,
  BookOpen,
  Calendar,
  Award,
  Hash,
  FileText,
} from "lucide-react";
import { googleserv } from "../adminpanel/googleserver/Googleserv.js";

const Verification = () => {
  const [searchType, setSearchType] = useState("enrollment"); // 'enrollment' or 'serial'
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      setError("Please enter a search value");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // console.log(`🔍 Searching by ${searchType}: ${searchValue}`);

      let response;
      if (searchType === "enrollment") {
        response = await googleserv.getResultByEnrollment(searchValue.trim());
      } else {
        response = await googleserv.getResultBySerial(searchValue.trim());
      }

      if (response.success) {
        setResult(response.data);
        setError("");
      } else {
        setError("No record found");
      }
    } catch (err) {
      // console.error("Search error:", err);
      setError(err.message || "Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Result Verification
          </h1>
          <p className="text-gray-600">
            Verify student results using Enrollment Number or Serial Number
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Toggle */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setSearchType("enrollment")}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  searchType === "enrollment"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Enrollment No
              </button>
              <button
                type="button"
                onClick={() => setSearchType("serial")}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  searchType === "serial"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Hash className="w-4 h-4 mr-2" />
                Serial No
              </button>
            </div>

            {/* Search Input */}
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === "enrollment"
                      ? "Enter Enrollment Number..."
                      : "Enter Serial Number..."
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </form>

          {/* Clear Button */}
          {result && (
            <button
              onClick={clearSearch}
              className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Result
              </h2>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Student Information
                </h3>

                <InfoRow
                  icon={<User className="w-4 h-4" />}
                  label="Student Name"
                  value={result["Student Name"] || result.studentName}
                />
                <InfoRow
                  icon={<User className="w-4 h-4" />}
                  label="Father's Name"
                  value={result["Father Name"] || result.fatherName}
                />
                <InfoRow
                  icon={<FileText className="w-4 h-4" />}
                  label="Enrollment No"
                  value={result["Enrollment No"] || result.enrollmentNo}
                />
                <InfoRow
                  icon={<Hash className="w-4 h-4" />}
                  label="Serial No"
                  value={result["Serial No"] || result.serialNo}
                />
                <InfoRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={
                    result["Date of Birth"]
                      ? result["Date of Birth"].split("T")[0]
                      : result.dateOfBirth
                      ? result.dateOfBirth.split("T")[0]
                      : ""
                  }
                />
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Academic Information
                </h3>

                <InfoRow
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Course Name"
                  value={result["Course Name"] || result.courseName}
                />
                <InfoRow
                  icon={<Award className="w-4 h-4" />}
                  label="Session"
                  value={result.Session || result.session}
                />
                <InfoRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Issue Date"
                  value={
                    result["Issue Date"]
                      ? result["Issue Date"].split("T")[0]
                      : result.issueDate
                      ? result.issueDate.split("T")[0]
                      : ""
                  }
                />
                {/* Marks and Grade */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">
                      Total Marks
                    </div>
                    <div className="text-xl font-bold text-blue-800">
                      {result["Total Marks"] || result.totalMarks}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">
                      Obtained Marks
                    </div>
                    <div className="text-xl font-bold text-green-800">
                      {result["Obtained Marks"] || result.obtainedMarks}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-purple-600 font-medium">
                      Percentage
                    </div>
                    <div className="text-xl font-bold text-purple-800">
                      {result.Percentage || result.percentage}%
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-sm text-orange-600 font-medium">
                      Grade
                    </div>
                    <div className="text-xl font-bold text-orange-800">
                      {result.Grade || result.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Display */}
            {(result["Photo Url"] || result.photoUrl) && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Student Photo
                </h3>
                <div className="flex justify-center">
                  <img
                    src={result["Photo Url"] || result.photoUrl}
                    alt="Student"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Info Row Component
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100">
    <div className="flex items-center space-x-3 text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-800 font-semibold">{value || "N/A"}</span>
  </div>
);

export default Verification;
