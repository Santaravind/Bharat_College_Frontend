// import React, { useState } from "react";
// import icon from '../assets/icon.png'
// import { IoLocationSharp } from "react-icons/io5";
// import logo from '../assets/logo2.png'
// import {
//   Search,
//   User,
//   Hash,
//   FileText,
//   Printer,
// } from "lucide-react";
// import { googleserv } from "../adminpanel/googleserver/Googleserv.js";
// import toast from "react-hot-toast";

// this is fully working code and but not cliet satisfied 
// const Result = () => {
//   const [searchType, setSearchType] = useState("enrollment");
//   const [searchValue, setSearchValue] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!searchValue.trim()) {
//       setError("Please enter a search value");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       let response;
//       if (searchType === "enrollment") {
//         response = await googleserv.getResultByEnrollment(searchValue.trim());
//       } else {
//         response = await googleserv.getResultBySerial(searchValue.trim());
//       }

//       if (response.success) {
//         setResult(response.data);
//         setError("");
//       } else {
//         setError("No record found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to search. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => {
//     try {
//       window.print();
//     } catch (error) {
//       // console.error("Print failed:", error);
//       toast.success("Printing failed. Please use browser print (Ctrl+P)");
//     }
//   };

//   const clearSearch = () => {
//     setSearchValue("");
//     setResult(null);
//     setError("");
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       }).toUpperCase();
//     } catch {
//       return dateString;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 py-8 px-4 print:py-0 print:px-0 print:bg-white">
//       <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
//           <div
//             className="absolute inset-0 z-0 footer"
//             style={{
//               backgroundImage: `
//                 linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
//                 linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
//                 radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
//               `,
//               backgroundSize: "20px 20px, 20px 20px, 20px 20px",
//               backgroundPosition: "0 0, 0 0, 0 0",
//             }}
//           />
    
//           {/* Content */}
    
//           <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl footer">Student Result </h1>
//           <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 footer">
            
//             {/* Top Info Section */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
//                {/* college name */}
//               <div>
               
//                 <div className="flex justify-center mb-3">
//                   <img src={icon} alt="College icon" className="w-30 h-25 " />
//                 </div>
//                 <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
//                 <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
//                 <p className="text-lg font-semibold">MANAGEMENT </p>
//               </div>
    
//               {/* address */}
//               <div>
//                 <div className="flex justify-center mb-3">
//                   {/* <span className="text-6xl">📍</span> */}
//                  <IoLocationSharp className=" text-red-600 text-7xl"/>  
//                 </div>
//                 <h3 className="font-bold text-2xl">Address:</h3>
//                 <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
//                 <p className="text-lg font-semibold">Utter Pradesh</p>
//                 <p className="text-lg font-semibold">Pin code : 231216 </p>
//               </div>
    
//               {/* Contect  */}
//               <div>
//                 <div className="flex justify-center mb-3">
//                   <span className="text-7xl">📞</span>
//                 </div>
//                 <h3 className="font-bold text-2xl">Contact us:</h3>
               
//                   <p className="text-blue-600 font-medium text-xl fl ">
                      
//                    bharattechnicalcollege@gmail.com
//                     </p>
                
//                 <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
//               </div>

              

//             </div>
//             </div>
//         {/* Header */}
//         <div className="text-center mb-8 print:hidden">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Student print their result 
//           </h1>
//           <p className="text-gray-600">
//             Print student results using Enrollment Number or Serial Number
//           </p>
//         </div>

//         {/* Search Card */}
//         <div className=" bg-gradient-to-br from-rose-200 to-indigo-200  rounded-xl shadow-lg p-6 mb-6 print:hidden">
//           <form onSubmit={handleSearch} className="space-y-4">
//             {/* Search Type Toggle */}
//             <div className="flex space-x-4 mb-4">
//               <button
//                 type="button"
//                 onClick={() => setSearchType("enrollment")}
//                 className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
//                   searchType === "enrollment"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 <FileText className="w-4 h-4 mr-2" />
//                 Enrollment No
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSearchType("serial")}
//                 className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
//                   searchType === "serial"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-rose-700 hover:bg-gray-200"
//                 }`}
//               >
//                 <Hash className="w-4 h-4 mr-2" />
//                 Serial No
//               </button>
//             </div>

//             {/* Search Input */}
//             <div className="flex space-x-4">
//               <div className="flex-1 relative ">
//                 <input
//                   type="text"
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   placeholder={
//                     searchType === "enrollment"
//                       ? "Enter Enrollment Number..."
//                       : "Enter Serial Number..."
//                   }
//                   className="w-full pl-10 pr-4 py-3 border border-red-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search className="w-4 h-4 mr-2" />
//                     Search
//                   </>
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//                 {error}
//               </div>
//             )}
//           </form>

//           {/* Clear Button */}
//           {result && (
//             <button
//               onClick={clearSearch}
//               className="mt-4 px-4 py-2 text-rose-400 hover:text-white hover:bg-rose-300 transition-colors cursor-pointer border-2 bg-neutral-200 rounded-full font-semibold"
//             >
//               Clear Search
//             </button>
//           )}
//         </div>

//         {/* Certificate Display - Optimized for Single Page Print */}
//         {result && (
//           <div className="bg-white border-4 border-yellow-600 print:border-4 print:border-yellow-600 shadow-2xl print:shadow-none print:min-h-[27.9cm]">
//             {/* Certificate Header - Compact */}
//             <div className="border-b-4 border-yellow-600 print:border-b-4 print:border-yellow-600 p-6 print:p-4 text-center print:bg-white">
//               {/* Compact Decorative elements */}
//               <div className="flex justify-between items-center mb-3 print:mb-2">
//                 <div className="w-12 h-12 border-4 border-yellow-600 rounded-full print:w-10 print:h-10 print:border-2 print:border-yellow-600"></div>
//                 <div className="w-12 h-12 border-4 border-yellow-600 rounded-full print:w-10 print:h-10 print:border-2 print:border-yellow-600"></div>
//               </div>
              
//               <h1 className="text-2xl font-bold text-gray-900 mb-2 print:text-xl print:text-black font-serif">
//                 BHARAT TECHNICAL COLLEGE
//               </h1>
//               <p className="text-base font-semibold text-gray-800 mb-1 print:text-sm print:text-black">
//                 Of Fire Engineering & Management
//               </p>
//               <p className="text-xs text-gray-700 mb-1 print:text-[10px]">
//                 An Autonomous Body, Under Govt.Act Established Under Act 1882
//               </p>
//               <p className="text-xs font-semibold text-gray-800 mb-1 print:text-[10px]">
//                 Registration No. SON/01794/2025-2026 • ISO Certified
//               </p>
//               <p className="text-xs text-gray-700 print:text-[10px]">
//                 Pusanli, Robertsganj Sonbhadra, Uttar Pradesh, India - 231216
//               </p>
//               <p className="text-xs text-blue-700 font-medium mt-1 print:text-[10px]">
//                 www.bharatechnicalcollege.com | bharatechnicalcollege@gmail.com
//               </p>
//             </div>

//             {/* Certificate Title - Compact */}
//             <div className="border-b-2 border-yellow-500 print:border-b-2 print:border-yellow-500 p-4 print:p-3 text-center print:bg-white">
//               <h2 className="text-xl font-bold uppercase text-gray-900 print:text-lg print:text-black tracking-wide font-serif">
//                 CERTIFICATE OF TRAINING
//               </h2>
//             </div>

//             {/* Main Certificate Content - Compact */}
//             <div className="p-6 print:p-4 bg-white">
//               {/* Student Photo and Name Section - Compact */}
//               <div className="flex items-start justify-between mb-6 print:mb-4">
//                 {/* Student Photo - Optimized */}
//                 <div className="w-32 h-40 print:w-28 print:h-36 border-3 border-yellow-600 print:border-2 print:border-yellow-600 overflow-hidden bg-white print:shadow-none">
//                   {(result["Photo Url"] || result.photoUrl) ? (
//                     <img
//                       src={result["Photo Url"] || result.photoUrl}
//                       alt="Student"
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'flex';
//                       }}
//                     />
//                   ) : null}
//                   <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 print:text-gray-600 ">
//                     <User className="w-12 h-12 mb-1 print:w-10 print:h-10 text-yellow-600" />
//                     <span className="text-xs print:text-[10px] text-center font-medium">Student Photo</span>
//                   </div>
//                 </div>

//                 {/* Student Name Section - Optimized */}
//                 <div className="flex-1 text-center mx-6 print:mx-4">
//                   <p className="text-lg mb-6 print:text-base print:mb-4 text-gray-700 italic">
//                     This is to Certify that
//                   </p>
                  
//                   <div className="mb-6 print:mb-4">
//                     <h3 className="text-2xl font-bold uppercase mb-3 print:text-xl print:text-black tracking-wide font-serif border-b-2 border-yellow-500 pb-2">
//                       {result["Student Name"] || result.studentName}
//                     </h3>
//                     <p className="text-lg font-semibold text-gray-800 print:text-base print:text-black">
//                       S/O: {result["Father Name"] || result.fatherName}
//                     </p>
//                   </div>

//                   <p className="text-lg mb-6 print:text-base print:mb-4 text-gray-700 italic">
//                     has successfully completed the course
//                   </p>

//                   {/* Course Name - Optimized */}
//                   <div className="mt-4">
//                     <h4 className="text-xl font-bold uppercase print:text-lg print:text-black tracking-wide bg-yellow-100 print:bg-yellow-50 py-3 px-6 rounded-lg border-2 border-yellow-500 font-serif">
//                       {result["Course Name"] || result.courseName}
//                     </h4>
//                   </div>
//                 </div>

//                 {/* College Seal - Optimized */}
//                 <div className="w-38 h-40 print:w-28 print:h-36 border-1 border-yellow-600 print:border-2 print:border-yellow-600 bg-white flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="w-fit h-20 print:w-16 print:h-16  mx-auto mb-2 print:mb-1 print:border print:border-yellow-600 flex items-center justify-center">
//                       {/* <span className="text-xs print:text-[10px] font-bold text-yellow-600">COLLEGE SEAL</span> */}
//                       <img src={logo} alt="college image" className="w-full h-full "/>
//                     </div>
//                     {/* <p className="text-xs print:text-[10px] text-gray-600 font-medium">Official Seal</p> */}
//                   </div>
//                 </div>
//               </div>

//               {/* Academic Details - Optimized */}
//               <div className="bg-gray-50 print:bg-gray-100 p-4 print:p-3 rounded-lg border-2 border-yellow-500 mb-6 print:mb-4">
//                 <h3 className="text-lg font-bold text-center mb-3 print:text-base print:text-black border-b-2 border-yellow-500 pb-2 font-serif">
//                   ACADEMIC DETAILS
//                 </h3>
                
//                 <div className="grid grid-cols-2 gap-3 print:gap-2 text-sm print:text-xs">
//                   {[
//                     { label: "Serial Number", value: result["Serial No"] || result.serialNo },
//                     { label: "Enrollment Number", value: result["Enrollment No"] || result.enrollmentNo },
//                     { label: "Total Marks", value: result["Total Marks"] || result.totalMarks },
//                     { label: "Obtained Marks", value: result["Obtained Marks"] || result.obtainedMarks },
//                     { label: "Percentage", value: `${result.Percentage || result.percentage}%` },
//                     { label: "Grade", value: result.Grade || result.grade },
//                     { label: "Academic Session", value: result.Session || result.session },
//                     { label: "Course", value: result["Course Name"] || result.courseName },
//                     { label: "College Branch", value: "Bharat Technical College Robertsganj" },
//                     { label: "Certificate Issue Date", value: formatDate(result["Issue Date"] || result.issueDate) },
//                   ].map((item, index) => (
//                     <div key={index} className="flex justify-between items-center py-2 print:py-1 border-b border-gray-200">
//                       <span className="font-semibold text-gray-700">{item.label}:</span>
//                       <span className="font-bold text-gray-900">{item.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Signatures Section - Optimized */}
//               <div className="flex justify-between items-end mt-8 print:mt-6">
//                 <div className="text-center">
//                   <div className="mb-2 print:mb-1 font-semibold text-gray-800 print:text-sm">Controller of Examination</div>
//                   <div className="mb-4 print:mb-3 text-gray-600 print:text-xs">Signature</div>
//                   <div className="border-t-2 border-gray-800 print:border-black pt-1 w-40 mx-auto"></div>
//                 </div>

//                 <div className="text-center">
//                   <div className="mb-2 print:mb-1 font-semibold text-gray-800 print:text-sm">Authorized Signatory</div>
//                   <div className="mb-4 print:mb-3 text-gray-600 print:text-xs">Director Signature</div>
//                   <div className="border-t-2 border-gray-800 print:border-black pt-1 w-40 mx-auto"></div>
//                   <div className="mt-2 font-bold text-gray-900 print:text-sm">Rk Mishra</div>
//                   <div className="text-sm text-gray-700 print:text-xs">Director</div>
//                 </div>
//               </div>

//               {/* Certificate Footer - Optimized */}
//               <div className="text-center mt-6 print:mt-4 pt-4 border-t-2 border-yellow-500">
//                 <p className="text-sm text-gray-600 print:text-xs italic">
//                   This certificate is issued under the authority of Bharat Technical College and is verifiable through official college records
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2 print:text-[10px]">
//                   Certificate Generated on: {new Date().toLocaleDateString('en-IN', { 
//                     day: '2-digit', 
//                     month: 'long', 
//                     year: 'numeric' 
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Print Button */}
//         {result && (
//           <div className="flex justify-center mt-8 print:hidden">
//             <button
//               onClick={handlePrint}
//               className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center text-lg font-semibold shadow-lg hover:shadow-xl"
//             >
//               <Printer className="w-6 h-6 mr-3" />
//               Print Certificate
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Global Print Styles */}
//       <style jsx global>{`
//         @media print {
//           @page {
//             size: A4 portrait;
//             margin: 0.8cm;
//           }
//           body {
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//             background: white !important;
//           }
//           .print\\:bg-white {
//             background: white !important;
//           }
//           .print\\:bg-yellow-50 {
//             background: #fffbeb !important;
//           }
//           .print\\:bg-gray-100 {
//             background: #f3f4f6 !important;
//           }
//           * {
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Result



import React, { useState, useRef } from "react";
import {
  Search,
  FileText,
  Hash,
  Printer,
  Download,
  User,
  X,
  GraduationCap,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";
import { googleserv } from "../adminpanel/googleserver/Googleserv.js";
import toast from "react-hot-toast";
import { IoLocationSharp } from "react-icons/io5";

const Result = () => {
  //this good as client requirement 
  const [searchType, setSearchType] = useState("enrollment");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  
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

      if (response.success && response.data) {
        const data = response.data;
        
        // Process all subjects and practicals from server data
        const allSubjects = [];
        
        // Add subjects from server
        if (data.subjects && Array.isArray(data.subjects)) {
          data.subjects.forEach((subject, index) => {
            allSubjects.push({
              name: subject.name || `Subject ${index + 1}`,
              maxMarks: subject.maxMarks || 100,
              minMarks: 40,
              obtainedMarks: subject.obtainedMarks || subject.marks || 0,
              type: 'theory'
            });
          });
        }
        
        // Add practicals from server
        if (data.practicals && Array.isArray(data.practicals)) {
          data.practicals.forEach((practical, index) => {
            allSubjects.push({
              name: practical.name || `Practical ${index + 1}`,
              maxMarks: practical.maxMarks || 100,
              minMarks: 40,
              obtainedMarks: practical.obtainedMarks || practical.marks || 0,
              type: 'practical'
            });
          });
        }
        
        // Convert marks to words for each subject
        const subjectsWithWords = allSubjects.map(subject => ({
          ...subject,
          inWords: convertToWords(subject.obtainedMarks)
        }));
        
        // Calculate total marks
        const totalMarks = allSubjects.reduce((sum, subject) => sum + subject.maxMarks, 0);
        const obtainedMarks = allSubjects.reduce((sum, subject) => sum + subject.obtainedMarks, 0);
        
        // Calculate percentage if not provided
        let percentage = data.Percentage || data.percentage;
        if (!percentage && totalMarks > 0) {
          percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
        }
        
        // Determine grade
        let grade = data.Grade || data.grade || "";
        if (!grade && percentage) {
          const perc = parseFloat(percentage);
          if (perc >= 75) grade = "Distinction";
          else if (perc >= 60) grade = "First Division";
          else if (perc >= 50) grade = "Second Division";
          else grade = "Fail";
        }

        const enhancedData = {
          // Student personal info
          studentName: data["Student Name"] || data.studentName || "",
          fatherName: data["Father Name"] || data.fatherName || "",
          dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth),
          photoUrl: data["Photo Url"] || data.photoUrl || "",
          
          // Academic info
          enrollmentNo: data["Enrollment No"] || data.enrollmentNo || "",
          serialNo: data["Serial No"] || data.serialNo || "",
          registerNumber: data["Serial No"] || data["Enrollment No"] || "N/A",
          courseName: data["Course Name"] || data.courseName || "",
          session: data.Session || data.session || "",
          percentage: percentage,
          grade: grade,
          
          // Marks data
          subjects: subjectsWithWords,
          totalMarks: totalMarks,
          obtainedMarks: obtainedMarks,
          totalInWords: convertToWords(obtainedMarks),
          
          // Institution info
          institutionName: "BHARAT TECHNICAL COLLEGE  Of Fire Engineering & Safety Management",
          institutionAddress: "PUSAOLI, ROBERTSGANJ, SONEBHADRA, UTTAR PRADESH - 231216",
          centreCode: "UP/504",
          certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
          courseDuration: "ONE YEAR"
        };
        
        setResult(enhancedData);
        setError("");
        toast.success("Result found successfully!");
      } else {
        setError("No record found for the provided details");
        toast.error("No record found");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch data. Please check your connection and try again.");
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert marks to words (digit by digit)
  const convertToWords = (number) => {
    const units = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const numStr = Math.round(number).toString();
    return numStr.split('').map(digit => units[parseInt(digit)]).join(' ');
  };

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
    
    if (!printWindow) {
      toast.error("Please allow popups to print the marksheet");
      setIsPrinting(false);
      return;
    }
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Marksheet - ${result?.studentName || 'Student'}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          
          body {
            font-family: 'Times New Roman', Times, serif;
            margin: 0;
            padding: 0;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color: black;
          }
          
          .print-container {
            width: 100%;
            max-width: 210mm;
            margin: 0 auto;
            padding: 10px;
            border: 2px solid #000;
            box-sizing: border-box;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          
          .header .nsdm {
            font-weight: bold;
            font-size: 14px;
          }
          
          .header .title {
            font-weight: bold;
            font-size: 18px;
            margin: 5px 0;
          }
          
          .header .subtitle {
            font-size: 12px;
            margin: 3px 0;
          }
          
          .student-photo {
            float: right;
            margin-left: 20px;
            margin-bottom: 20px;
            border: 1px solid #000;
            padding: 2px;
          }
          
          .student-photo img {
            width: 120px;
            height: 150px;
            object-fit: cover;
            display: block;
          }
          
          .student-details {
            margin-bottom: 20px;
          }
          
          .detail-row {
            display: flex;
            margin-bottom: 8px;
            align-items: flex-start;
          }
          
          .detail-label {
            font-weight: bold;
            width: 220px;
            min-width: 220px;
          }
          
          .detail-value {
            flex: 1;
            border-bottom: 1px solid #000;
            padding-bottom: 2px;
            text-transform: uppercase;
            font-weight: bold;
          }
          
          .marks-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 11px;
          }
          
          .marks-table th,
          .marks-table td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
            vertical-align: middle;
          }
          
          .marks-table th {
            font-weight: bold;
            background-color: #f0f0f0;
          }
          
          .marks-table .subject-cell {
            text-align: left;
            width: 40%;
          }
          
          .footer-info {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
          }
          
          .result-declaration {
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
            font-size: 14px;
          }
          
          .signature {
            text-align: center;
            margin-top: 40px;
          }
          
          .signature-line {
            width: 250px;
            border-top: 1px solid #000;
            margin: 5px auto;
          }
          
          .print-date {
            text-align: center;
            font-size: 10px;
            color: #666;
            margin-top: 20px;
          }
          
          .photo-placeholder {
            width: 120px;
            height: 150px;
            border: 1px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 10px;
          }
          
          @media print {
            body {
              background: white !important;
            }
            
            .print-container {
              border: 2px solid #000;
            }
            
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <!-- NSDM Header -->
          <div class="header">
           
            <div class="title"> BHARAT TECHNICAL COLLEGE <br/> Of Fire Engineering & Safety Management</div>
            <div class="subtitle">An Autonomous Body, Under Govt.Act Established Under Act 1882</div>
           
            <div class="subtitle" style="font-weight: bold;">National Development Organization, Promoted by Govt Of India</div>
             <div class="subtitle">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</div>
            <div class="title" style="margin-top: 10px;">CENTRAL BOARD OF EXAMINATIONS</div>
            <div class="title" style="font-size: 20px; margin-top: 5px;">STATEMENT OF MARKS</div>
          </div>
          
          <!-- Student Photo -->
          <div class="student-photo">
            ${result?.photoUrl ? 
              `<img src="${result.photoUrl}" alt="Student Photo" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO<br/>NOT<br/>AVAILABLE</div>';" />` 
              : '<div class="photo-placeholder">PHOTO<br/>NOT<br/>AVAILABLE</div>'
            }
          </div>
          
          <!-- Student Details -->
          <div class="student-details">
            <div class="detail-row">
              <div class="detail-label">NAME OF THE CANDIDATE</div>
              <div class="detail-value">${result?.studentName || ''}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">COURSE WITH DURATION</div>
              <div class="detail-value">${result?.courseName || ''}</div>
              <div style="margin-left: 10px;">${result?.courseDuration || ''}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">REGISTER NUMBER</div>
              <div class="detail-value">${result?.registerNumber || ''}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">DATE</div>
              <div class="detail-value">${result?.certificateDate || ''}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">INSTITUTION NAME AND ADDRESS</div>
              <div>
                <div class="detail-value">${result?.institutionName || ''}</div>
                <div style="margin-top: 5px;">${result?.institutionAddress || ''}</div>
              </div>
            </div>
          </div>
          
          <!-- Marks Table -->
          <table class="marks-table">
            <thead>
              <tr>
                <th rowspan="2">S.NO</th>
                <th rowspan="2">SUBJECTS</th>
                <th colspan="2">MARKS</th>
                <th colspan="2">MARKS AWARDED</th>
              </tr>
              <tr>
                <th>MAXIMUM</th>
                <th>MINIMUM</th>
                <th>IN FIGURES</th>
                <th>IN WORDS</th>
              </tr>
            </thead>
            <tbody>
              ${result?.subjects?.map((subject, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td class="subject-cell">${subject.name}</td>
                  <td>${subject.maxMarks}</td>
                  <td>${subject.minMarks}</td>
                  <td><strong>${subject.obtainedMarks}</strong></td>
                  <td>${subject.inWords}</td>
                </tr>
              `).join('') || '<tr><td colspan="6" style="text-align: center;">No subject data available</td></tr>'}
              
              <!-- Total Row -->
              <tr style="font-weight: bold;">
                <td colspan="2">TOTAL</td>
                <td>${result?.totalMarks || 0}</td>
                <td>${result?.subjects ? result.subjects.length * 40 : 0}</td>
                <td>${result?.obtainedMarks || 0}</td>
                <td>${result?.totalInWords || ''}</td>
              </tr>
            </tbody>
          </table>
          
          <!-- Footer Information -->
          <div class="footer-info">
            <div>
              <div><strong>D.O.B:</strong> ${result?.dateOfBirth || ''}</div>
              <div style="margin-top: 5px;"><strong>CENTRE CODE:</strong> ${result?.centreCode || ''}</div>
            </div>
            <div>
              <div><strong>GRADE</strong></div>
              <div>Distinction : 75 % and above</div>
              <div>First Division : 60 % to 74 %</div>
              <div>Second Division : 50 % to 59 %</div>
            </div>
          </div>
          
          <!-- Result Declaration -->
          <div class="result-declaration">
            RESULT: ${result?.grade?.toUpperCase() || 'N/A'} (${result?.percentage || '0'}%)
          </div>
          
          <!-- Signature -->
          <div class="signature">
            <div style="font-weight: bold; margin-bottom: 40px;">Controller Of Examinations</div>
            <div>Signature</div>
            <div class="signature-line"></div>
          </div>
          
          <!-- Print Date -->
          <div class="print-date">
            Printed on: ${new Date().toLocaleDateString('en-IN')}
          </div>
        </div>
        
        <script>
          // Auto-print when window loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
            
            // Close window after print
            window.onafterprint = function() {
              setTimeout(function() {
                window.close();
              }, 500);
            };
            
            // Fallback close
            setTimeout(function() {
              if (!document.hidden) {
                window.print();
              }
            }, 2000);
          };
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Reset printing state
    setTimeout(() => {
      setIsPrinting(false);
    }, 3000);
  };

  // const handleBrowserPrint = () => {
  //   // Direct browser print
  //   window.print();
  // };

  const downloadPDF = () => {
    toast.success("PDF download feature will be available soon!");
  };

  const clearSearch = () => {
    setSearchValue("");
    setResult(null);
    setError("");
    toast.success("Search cleared");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      {/* College Header */}
      <div className="max-w-6xl mx-auto mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                BHARAT TECHNICAL COLLEGE
              </h1>
              <p className="text-xl font-semibold text-gray-700 mb-1">
                Of Fire Engineering & Safety Management
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            An Autonomous Body, Under Govt.Act Established Under Act 1882
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-red-600 text-xl" />
              <span className="text-gray-700">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-medium">📞 +91-8840157051</span>
              <span className="text-blue-600 font-medium">✉ bharattechnicalcollege@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 mb-8 border border-blue-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <Search className="w-6 h-6 mr-3 text-blue-600" />
              Search Student Marksheet
            </h2>
            <p className="text-gray-600">Enter enrollment or serial number to view marksheet</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSearchType("enrollment")}
                className={`flex items-center px-5 py-3 rounded-xl transition-all ${
                  searchType === "enrollment"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Enrollment No
              </button>
              <button
                type="button"
                onClick={() => setSearchType("serial")}
                className={`flex items-center px-5 py-3 rounded-xl transition-all ${
                  searchType === "serial"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <Hash className="w-5 h-5 mr-2" />
                Serial No
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === "enrollment"
                    ? "Enter Enrollment Number (e.g., ADM076211178720)"
                    : "Enter Serial Number (e.g., BT01A15161905)"
                }
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !searchValue.trim()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center font-semibold shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-3" />
                    Search Marksheet
                  </>
                )}
              </button>
              
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Marksheet Display */}
        {result && (
          <>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-800 mb-8">
              {/* Header */}
              {/* HEADER BLOCK */}
<div className="text-center py-6 px-8 border-b-4 border-black print:border-b-4 bg-white">

  {/* College Name & Details */}
  <div className="mb-4">
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide print:text-2xl font-serif">
      BHARAT TECHNICAL COLLEGE
    </h1>

    <p className="text-lg font-semibold text-gray-800 print:text-base font-serif">
      OF FIRE ENGINEERING & MANAGEMENT
    </p>

    <p className="text-xs text-gray-700 print:text-[15px] font-medium">
      An Autonomous Body, Under Govt. Act · Established Under Act 1882
    </p>

    <p className="text-xs font-semibold text-gray-800 print:text-[15px] ">
      Registration No. SON/01794/2025-2026 • ISO Certified
    </p>

    <p className="text-xs text-gray-700 print:text-[15px]">
      Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216
    </p>

    <p className="text-xs text-blue-700 font-semibold mt-1 print:text-[11px]">
      www.bharatechnicalcollege.com • bharattechnicalcollege@gmail.com
    </p>
  </div>

  {/* Examination Board Title */}
  <div className="mt-6">
    <div className="text-xl font-bold text-gray-900 print:text-lg tracking-wide font-serif">
      CENTRAL BOARD OF EXAMINATIONS
    </div>

    <div className="text-3xl font-extrabold uppercase mt-2 text-gray-900 print:text-2xl font-serif tracking-widest">
      STATEMENT OF MARKS
    </div>
  </div>
</div>


              <div className="p-8">
                {/* Student Info and Photo */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-4">
                          <User className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Student Name</div>
                            <div className="text-xl font-bold uppercase">{result.studentName}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <User className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Father's Name</div>
                            <div className="text-lg font-semibold">{result.fatherName}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Date of Birth</div>
                            <div className="text-lg font-semibold">{result.dateOfBirth}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-4">
                          <Hash className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Enrollment No</div>
                            <div className="text-lg font-bold">{result.enrollmentNo}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Hash className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Serial No</div>
                            <div className="text-lg font-bold">{result.serialNo}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <GraduationCap className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-600">Course</div>
                            <div className="text-lg font-semibold">{result.courseName}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Student Photo */}
                  <div className="ml-8 border-4 border-gray-800 p-2 rounded-lg">
                    {result.photoUrl ? (
                      <img
                        src={result.photoUrl}
                        alt="Student"
                        className="w-40 h-48 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-40 h-48 bg-gray-100 flex flex-col items-center justify-center rounded">
                              <User class="w-16 h-16 text-gray-400 mb-2" />
                              <div class="text-gray-500 text-sm text-center">Photo<br/>Not Available</div>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-40 h-48 bg-gray-100 flex flex-col items-center justify-center rounded">
                        <User className="w-16 h-16 text-gray-400 mb-2" />
                        <div className="text-gray-500 text-sm text-center">Photo<br/>Not Available</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Marks Table */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800">Subject Wise Marks</h3>
                  </div>
                  
                  <div className="overflow-x-auto border border-gray-300 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">
                            S.NO
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">
                            SUBJECTS
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">
                            MAX MARKS
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">
                            MIN MARKS
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">
                            OBTAINED MARKS
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                            IN WORDS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-300">
                        {result.subjects && result.subjects.length > 0 ? (
                          result.subjects.map((subject, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-3 text-center border-r border-gray-300 font-medium">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 border-r border-gray-300">
                                {subject.name}
                              </td>
                              <td className="px-4 py-3 text-center border-r border-gray-300">
                                {subject.maxMarks}
                              </td>
                              <td className="px-4 py-3 text-center border-r border-gray-300">
                                {subject.minMarks}
                              </td>
                              <td className="px-4 py-3 text-center border-r border-gray-300 font-bold text-lg">
                                {subject.obtainedMarks}
                              </td>
                              <td className="px-4 py-3 text-center uppercase text-sm">
                                {subject.inWords}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                              No subject data available
                            </td>
                          </tr>
                        )}
                        
                        {/* Total Row */}
                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 font-bold">
                          <td colSpan="2" className="px-4 py-3 border-r border-gray-300">
                            TOTAL MARKS
                          </td>
                          <td className="px-4 py-3 text-center border-r border-gray-300">
                            {result.totalMarks}
                          </td>
                          <td className="px-4 py-3 text-center border-r border-gray-300">
                            {result.subjects ? result.subjects.length * 40 : 0}
                          </td>
                          <td className="px-4 py-3 text-center border-r border-gray-300 text-xl">
                            {result.obtainedMarks}
                          </td>
                          <td className="px-4 py-3 text-center uppercase text-lg">
                            {result.totalInWords}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Result Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-800">PERFORMANCE</h4>
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {result.percentage}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(parseFloat(result.percentage), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">GRADE</h4>
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-4xl font-bold text-green-700 mb-2">
                      {result.grade}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.percentage >= 75 ? 'Distinction' :
                       result.percentage >= 60 ? 'First Division' :
                       result.percentage >= 50 ? 'Second Division' : 'Pass'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-gray-800 mb-4">INSTITUTION DETAILS</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="font-semibold">Institution:</div>
                        <div>{result.institutionName}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Centre Code:</div>
                        <div>{result.centreCode}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Session:</div>
                        <div>{result.session}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl"
              >
                {isPrinting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Preparing Print...
                  </>
                ) : (
                  <>
                    <Printer className="w-5 h-5 mr-2" />
                    Print Marksheet
                  </>
                )}
              </button>
              
              {/* <button
                onClick={handleBrowserPrint}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl"
              >
                <Printer className="w-5 h-5 mr-2" />
                Direct Print (Ctrl+P)
              </button> */}
              
              <button
                onClick={downloadPDF}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-700 text-white rounded-xl hover:from-purple-700 hover:to-pink-800 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={clearSearch}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5 mr-2" />
                New Search
              </button>
            </div>
          </>
        )}

        {/* Info when no search */}
        {!result && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Search Student Marksheet</h3>
            <p className="text-gray-600 mb-6">
              Enter enrollment number or serial number to view and print the official marksheet
            </p>
            <div className="text-sm text-gray-500">
              All data is fetched directly from the server. No dummy data is used.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;