import React, { useState } from "react";
import icon from '../assets/icon.png'
import { IoLocationSharp } from "react-icons/io5";
import logo from '../assets/logo2.png'
import {
  Search,
  User,
  Hash,
  FileText,
  Printer,
} from "lucide-react";
import { googleserv } from "../adminpanel/googleserver/Googleserv.js";
import toast from "react-hot-toast";

const Result = () => {
  const [searchType, setSearchType] = useState("enrollment");
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
      setError(err.message || "Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      // console.error("Print failed:", error);
      toast.success("Printing failed. Please use browser print (Ctrl+P)");
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setResult(null);
    setError("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 py-8 px-4 print:py-0 print:px-0 print:bg-white">
      <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
          <div
            className="absolute inset-0 z-0 footer"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
                radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px, 20px 20px, 20px 20px",
              backgroundPosition: "0 0, 0 0, 0 0",
            }}
          />
    
          {/* Content */}
    
          <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl footer">Student Result </h1>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 footer">
            
            {/* Top Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
               {/* college name */}
              <div>
               
                <div className="flex justify-center mb-3">
                  <img src={icon} alt="College icon" className="w-30 h-25 " />
                </div>
                <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
                <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
                <p className="text-lg font-semibold">MANAGEMENT </p>
              </div>
    
              {/* address */}
              <div>
                <div className="flex justify-center mb-3">
                  {/* <span className="text-6xl">📍</span> */}
                 <IoLocationSharp className=" text-red-600 text-7xl"/>  
                </div>
                <h3 className="font-bold text-2xl">Address:</h3>
                <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
                <p className="text-lg font-semibold">Utter Pradesh</p>
                <p className="text-lg font-semibold">Pin code : 231216 </p>
              </div>
    
              {/* Contect  */}
              <div>
                <div className="flex justify-center mb-3">
                  <span className="text-7xl">📞</span>
                </div>
                <h3 className="font-bold text-2xl">Contact us:</h3>
               
                  <p className="text-blue-600 font-medium text-xl fl ">
                      
                   bharattechnicalcollege@gmail.com
                    </p>
                
                <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
              </div>

              

            </div>
            </div>
        {/* Header */}
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student print their result 
          </h1>
          <p className="text-gray-600">
            Print student results using Enrollment Number or Serial Number
          </p>
        </div>

        {/* Search Card */}
        <div className=" bg-gradient-to-br from-rose-200 to-indigo-200  rounded-xl shadow-lg p-6 mb-6 print:hidden">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Toggle */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setSearchType("enrollment")}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  searchType === "enrollment"
                    ? "bg-blue-600 text-white"
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-rose-700 hover:bg-gray-200"
                }`}
              >
                <Hash className="w-4 h-4 mr-2" />
                Serial No
              </button>
            </div>

            {/* Search Input */}
            <div className="flex space-x-4">
              <div className="flex-1 relative ">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === "enrollment"
                      ? "Enter Enrollment Number..."
                      : "Enter Serial Number..."
                  }
                  className="w-full pl-10 pr-4 py-3 border border-red-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center"
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
              className="mt-4 px-4 py-2 text-rose-400 hover:text-white hover:bg-rose-300 transition-colors cursor-pointer border-2 bg-neutral-200 rounded-full font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Certificate Display - Optimized for Single Page Print */}
        {result && (
          <div className="bg-white border-4 border-yellow-600 print:border-4 print:border-yellow-600 shadow-2xl print:shadow-none print:min-h-[27.9cm]">
            {/* Certificate Header - Compact */}
            <div className="border-b-4 border-yellow-600 print:border-b-4 print:border-yellow-600 p-6 print:p-4 text-center print:bg-white">
              {/* Compact Decorative elements */}
              <div className="flex justify-between items-center mb-3 print:mb-2">
                <div className="w-12 h-12 border-4 border-yellow-600 rounded-full print:w-10 print:h-10 print:border-2 print:border-yellow-600"></div>
                <div className="w-12 h-12 border-4 border-yellow-600 rounded-full print:w-10 print:h-10 print:border-2 print:border-yellow-600"></div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2 print:text-xl print:text-black font-serif">
                BHARAT TECHNICAL COLLEGE
              </h1>
              <p className="text-base font-semibold text-gray-800 mb-1 print:text-sm print:text-black">
                Of Fire Engineering & Management
              </p>
              <p className="text-xs text-gray-700 mb-1 print:text-[10px]">
                An Autonomous Body, Under Govt.Act Established Under Act 1882
              </p>
              <p className="text-xs font-semibold text-gray-800 mb-1 print:text-[10px]">
                Registration No. SON/01794/2025-2026 • ISO Certified
              </p>
              <p className="text-xs text-gray-700 print:text-[10px]">
                Pusanli, Robertsganj Sonbhadra, Uttar Pradesh, India - 231216
              </p>
              <p className="text-xs text-blue-700 font-medium mt-1 print:text-[10px]">
                www.bharatechnicalcollege.com | bharatechnicalcollege@gmail.com
              </p>
            </div>

            {/* Certificate Title - Compact */}
            <div className="border-b-2 border-yellow-500 print:border-b-2 print:border-yellow-500 p-4 print:p-3 text-center print:bg-white">
              <h2 className="text-xl font-bold uppercase text-gray-900 print:text-lg print:text-black tracking-wide font-serif">
                CERTIFICATE OF TRAINING
              </h2>
            </div>

            {/* Main Certificate Content - Compact */}
            <div className="p-6 print:p-4 bg-white">
              {/* Student Photo and Name Section - Compact */}
              <div className="flex items-start justify-between mb-6 print:mb-4">
                {/* Student Photo - Optimized */}
                <div className="w-32 h-40 print:w-28 print:h-36 border-3 border-yellow-600 print:border-2 print:border-yellow-600 overflow-hidden bg-white print:shadow-none">
                  {(result["Photo Url"] || result.photoUrl) ? (
                    <img
                      src={result["Photo Url"] || result.photoUrl}
                      alt="Student"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 print:text-gray-600 ">
                    <User className="w-12 h-12 mb-1 print:w-10 print:h-10 text-yellow-600" />
                    <span className="text-xs print:text-[10px] text-center font-medium">Student Photo</span>
                  </div>
                </div>

                {/* Student Name Section - Optimized */}
                <div className="flex-1 text-center mx-6 print:mx-4">
                  <p className="text-lg mb-6 print:text-base print:mb-4 text-gray-700 italic">
                    This is to Certify that
                  </p>
                  
                  <div className="mb-6 print:mb-4">
                    <h3 className="text-2xl font-bold uppercase mb-3 print:text-xl print:text-black tracking-wide font-serif border-b-2 border-yellow-500 pb-2">
                      {result["Student Name"] || result.studentName}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 print:text-base print:text-black">
                      S/O: {result["Father Name"] || result.fatherName}
                    </p>
                  </div>

                  <p className="text-lg mb-6 print:text-base print:mb-4 text-gray-700 italic">
                    has successfully completed the course
                  </p>

                  {/* Course Name - Optimized */}
                  <div className="mt-4">
                    <h4 className="text-xl font-bold uppercase print:text-lg print:text-black tracking-wide bg-yellow-100 print:bg-yellow-50 py-3 px-6 rounded-lg border-2 border-yellow-500 font-serif">
                      {result["Course Name"] || result.courseName}
                    </h4>
                  </div>
                </div>

                {/* College Seal - Optimized */}
                <div className="w-38 h-40 print:w-28 print:h-36 border-1 border-yellow-600 print:border-2 print:border-yellow-600 bg-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-fit h-20 print:w-16 print:h-16  mx-auto mb-2 print:mb-1 print:border print:border-yellow-600 flex items-center justify-center">
                      {/* <span className="text-xs print:text-[10px] font-bold text-yellow-600">COLLEGE SEAL</span> */}
                      <img src={logo} alt="college image" className="w-full h-full "/>
                    </div>
                    {/* <p className="text-xs print:text-[10px] text-gray-600 font-medium">Official Seal</p> */}
                  </div>
                </div>
              </div>

              {/* Academic Details - Optimized */}
              <div className="bg-gray-50 print:bg-gray-100 p-4 print:p-3 rounded-lg border-2 border-yellow-500 mb-6 print:mb-4">
                <h3 className="text-lg font-bold text-center mb-3 print:text-base print:text-black border-b-2 border-yellow-500 pb-2 font-serif">
                  ACADEMIC DETAILS
                </h3>
                
                <div className="grid grid-cols-2 gap-3 print:gap-2 text-sm print:text-xs">
                  {[
                    { label: "Serial Number", value: result["Serial No"] || result.serialNo },
                    { label: "Enrollment Number", value: result["Enrollment No"] || result.enrollmentNo },
                    { label: "Total Marks", value: result["Total Marks"] || result.totalMarks },
                    { label: "Obtained Marks", value: result["Obtained Marks"] || result.obtainedMarks },
                    { label: "Percentage", value: `${result.Percentage || result.percentage}%` },
                    { label: "Grade", value: result.Grade || result.grade },
                    { label: "Academic Session", value: result.Session || result.session },
                    { label: "Course", value: result["Course Name"] || result.courseName },
                    { label: "College Branch", value: "Bharat Technical College Robertsganj" },
                    { label: "Certificate Issue Date", value: formatDate(result["Issue Date"] || result.issueDate) },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 print:py-1 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">{item.label}:</span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures Section - Optimized */}
              <div className="flex justify-between items-end mt-8 print:mt-6">
                <div className="text-center">
                  <div className="mb-2 print:mb-1 font-semibold text-gray-800 print:text-sm">Controller of Examination</div>
                  <div className="mb-4 print:mb-3 text-gray-600 print:text-xs">Signature</div>
                  <div className="border-t-2 border-gray-800 print:border-black pt-1 w-40 mx-auto"></div>
                </div>

                <div className="text-center">
                  <div className="mb-2 print:mb-1 font-semibold text-gray-800 print:text-sm">Authorized Signatory</div>
                  <div className="mb-4 print:mb-3 text-gray-600 print:text-xs">Director Signature</div>
                  <div className="border-t-2 border-gray-800 print:border-black pt-1 w-40 mx-auto"></div>
                  <div className="mt-2 font-bold text-gray-900 print:text-sm">Rk Mishra</div>
                  <div className="text-sm text-gray-700 print:text-xs">Director</div>
                </div>
              </div>

              {/* Certificate Footer - Optimized */}
              <div className="text-center mt-6 print:mt-4 pt-4 border-t-2 border-yellow-500">
                <p className="text-sm text-gray-600 print:text-xs italic">
                  This certificate is issued under the authority of Bharat Technical College and is verifiable through official college records
                </p>
                <p className="text-xs text-gray-500 mt-2 print:text-[10px]">
                  Certificate Generated on: {new Date().toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Print Button */}
        {result && (
          <div className="flex justify-center mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <Printer className="w-6 h-6 mr-3" />
              Print Certificate
            </button>
          </div>
        )}
      </div>

      {/* Global Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0.8cm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:bg-yellow-50 {
            background: #fffbeb !important;
          }
          .print\\:bg-gray-100 {
            background: #f3f4f6 !important;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};


export default Result
