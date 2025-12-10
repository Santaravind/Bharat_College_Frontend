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





import React, { useState } from "react";
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
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Shield
} from "lucide-react";
import { googleserv } from "../adminpanel/googleserver/Googleserv.js";
import toast from "react-hot-toast";
import { IoLocationSharp } from "react-icons/io5";
import logo from '../assets/logo2.png'


// Number to words converter
const convertToWords = (number) => {
  const units = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
  const numStr = Math.round(number).toString();
  return numStr.split('').map(digit => units[parseInt(digit)]).join(' ');
};

// Date formatter
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

const Result = () => {
  const [searchType, setSearchType] = useState("enrollment");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

  // this is working 
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

    // 🔥 Correct API calls (only what you asked for)
    if (searchType === "enrollment") {
      response = await googleserv.getResultByEnrollment(searchValue.trim());
    } else {
      response = await googleserv.getResultBySerial(searchValue.trim());
    }

    // 🔥 API returns success or failure?
    if (!response || !response.success || !response.data) {
      setError("No record found for the provided details");
      setLoading(false);
      return;
    }

    const data = response.data;
    const allSubjects = [];

    // subjects
    if (data.subjects && Array.isArray(data.subjects)) {
      data.subjects.forEach((subject, index) => {
        allSubjects.push({
          name: subject.name || `Subject ${index + 1}`,
          maxMarks: subject.maxMarks || 100,
          minMarks: 40,
          obtainedMarks: subject.obtainedMarks || subject.marks || 0,
          type: "theory"
        });
      });
    }

    // practicals
    if (data.practicals && Array.isArray(data.practicals)) {
      data.practicals.forEach((practical, index) => {
        allSubjects.push({
          name: practical.name || `Practical ${index + 1}`,
          maxMarks: practical.maxMarks || 100,
          minMarks: 40,
          obtainedMarks: practical.obtainedMarks || practical.marks || 0,
          type: "practical"
        });
      });
    }

    const subjectsWithWords = allSubjects.map((subject) => ({
      ...subject,
      inWords: convertToWords(subject.obtainedMarks)
    }));

    const totalMarks = allSubjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
    const obtainedMarks = allSubjects.reduce((sum, sub) => sum + sub.obtainedMarks, 0);

    let percentage = data.Percentage || data.percentage;
    if (!percentage && totalMarks > 0) {
      percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
    }

    let grade = data.Grade || data.grade || "";
    if (!grade) {
      const p = parseFloat(percentage);
      if (p >= 75) grade = "Distinction";
      else if (p >= 60) grade = "First Division";
      else if (p >= 50) grade = "Second Division";
      else grade = "Pass";
    }

    // Final mapped data
    const enhancedData = {
      studentName: data["Student Name"] || data.studentName || "",
      fatherName: data["Father Name"] || data.fatherName || "",
      dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth),
      photoUrl: data["Photo Url"] || data.photoUrl || "",
      enrollmentNo: data["Enrollment No"] || data.enrollmentNo || "",
      serialNo: data["Serial No"] || data.serialNo || "",
      courseName: data["Course Name"] || data.courseName || "",
      session: data.Session || data.session || "",
      percentage,
      grade,
      subjects: subjectsWithWords,
      totalMarks,
      obtainedMarks,
      totalInWords: convertToWords(obtainedMarks),
      institutionName: "BHARAT TECHNICAL COLLEGE",
      institutionAddress: "Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216",
      // centreCode: "UP/504",
      certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
      courseDuration: "ONE YEAR"
    };

    setResult(enhancedData);
  } catch (err) {
    console.error("Search error:", err);
    setError("Failed to fetch data. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handlePrint = () => {
    setIsPrinting(true);

    const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

    if (!printWindow) {
      alert("Please allow popups to print the marksheet");
      setIsPrinting(false);
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Marksheet - ${result?.studentName || 'Student'}</title>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
          size: A4;
          margin: 10mm;
        }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Crimson Text', 'Times New Roman', serif;
            background: white;
            color: #1a1a2e;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .certificate-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 15px;
            background: linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%);
            border: 4px double #b8860b;
            position: relative;
          }
          
          .certificate-container::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border: 2px solid #d4af37;
            pointer-events: none;
          }
          
          .header {
            text-align: center;
            padding-bottom: 15px;
            margin-bottom: 15px;
            border-bottom: 3px double #1a1a2e;
          }
          
          .header-top {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-bottom: 10px;
          }
          
          .emblem {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            border: 2px solid #b8860b;
          }
          
          .emblem-left {
            background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
            color: #d4af37;
          }
          
          .emblem-right {
            background: linear-gradient(135deg, #d4af37, #b8860b);
            color: #1a1a2e;
          }
          
          .header-text {
            flex: 1;
          }
          
          .govt-text {
            font-size: 10px;
            color: #666;
            letter-spacing: 2px;
            margin-bottom: 5px;
          }
          
          .college-name {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            color: #1a1a2e;
            margin-bottom: 3px;
          }
          
          .college-subtitle {
            font-family: 'Playfair Display', serif;
            font-size: 16px;
            color: #1a1a2e;
            margin-bottom: 5px;
          }
          
          .reg-info {
            font-size: 10px;
            color: #666;
          }
          
          .board-title {
            background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
            color: #d4af37;
            padding: 8px 25px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            margin-top: 10px;
          }
          
          .statement-title {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            font-weight: 700;
            color: #1a1a2e;
            margin-top: 10px;
            letter-spacing: 3px;
          }
          
          .student-section {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .student-info {
            flex: 1;
          }
          
          .info-row {
            display: flex;
            margin-bottom: 8px;
            align-items: flex-start;
          }
          
          .info-label {
            font-weight: 600;
            width: 180px;
            min-width: 180px;
            font-size: 11px;
            color: #1a1a2e;
          }
          
          .info-value {
            flex: 1;
            border-bottom: 1px solid #1a1a2e;
            padding-bottom: 2px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
          }
          
          .photo-container {
            width: 120px;
            height: 150px;
            border: 3px solid #1a1a2e;
            padding: 3px;
            background: white;
          }
          
          .photo-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .photo-placeholder {
            width: 100%;
            height: 100%;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #666;
            text-align: center;
          }
          
          .marks-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 10px;
          }
          
          .marks-table th,
          .marks-table td {
            border: 1px solid #1a1a2e;
            padding: 6px 8px;
            text-align: center;
          }
          
          .marks-table th {
            background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
            color: #d4af37;
            font-weight: 600;
            font-size: 9px;
          }
          
          .marks-table .subject-cell {
            text-align: left;
            font-weight: 500;
          }
          
          .marks-table .total-row {
            background: linear-gradient(135deg, #f8f4e8, #fffef5);
            font-weight: 700;
          }
          
          .marks-table .total-row td {
            font-size: 11px;
          }
          
          .footer-section {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            font-size: 10px;
          }
          
          .footer-left, .footer-right {
            max-width: 45%;
          }
          
          .grade-scale {
            margin-top: 5px;
          }
          
          .grade-scale div {
            margin: 2px 0;
          }
          
          .result-box {
            text-align: center;
            margin: 20px 0;
            padding: 12px;
            background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
            color: #d4af37;
          }
          
          .result-text {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 2px;
          }
          
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            padding-top: 20px;
          }
          
          .signature-box {
            text-align: center;
            width: 200px;
          }
          
          .signature-line {
            border-top: 1px solid #1a1a2e;
            margin-bottom: 5px;
          }
          
          .signature-label {
            font-size: 10px;
            font-weight: 600;
          }
          
          .print-footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px dashed #ccc;
            font-size: 9px;
            color: #888;
          }
          
          @media print {
            body { background: white !important; }
            .certificate-container { 
              border: 4px double #b8860b !important;
              box-shadow: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <!-- Header -->
          <div class="header">
            <div class="header-top">
              <div class="emblem emblem-left"><img 
              src="${logo}"
               alt="College Logo"
               style="width:90px;height:90px;object-fit:contain;margin-bottom:6px;"
               />
                  </div>
              <div class="header-text">
                <div class="govt-text">AN AUTONOMOUS BODY UNDER GOVT. ACT • ESTABLISHED UNDER ACT 1882</div>
                <div class="college-name">BHARAT TECHNICAL COLLEGE</div>
                <div class="college-subtitle">Of Fire Engineering & Safety Management</div>
                <div class="reg-info">Reg. No. SON/01794/2025-2026 • ISO Certified</div>
                <div class="reg-info">Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216</div>
              </div>
              <div class="emblem emblem-right">ISO</div>
            </div>
            <div class="board-title">CENTRAL BOARD OF EXAMINATIONS</div>
            <div class="statement-title">STATEMENT OF MARKS</div>
          </div>
          
          <!-- Student Section -->
          <div class="student-section">
            <div class="student-info">
              <div class="info-row">
                <div class="info-label">NAME OF CANDIDATE</div>
                <div class="info-value">${result?.studentName || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">FATHER'S NAME</div>
                <div class="info-value">${result?.fatherName || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">COURSE NAME</div>
                <div class="info-value">${result?.courseName || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">COURSE DURATION</div>
                <div class="info-value">${result?.courseDuration || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">ENROLLMENT NO</div>
                <div class="info-value">${result?.enrollmentNo || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">SERIAL NO</div>
                <div class="info-value">${result?.serialNo || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">SESSION</div>
                <div class="info-value">${result?.session || ''}</div>
              </div>
              <div class="info-row">
                <div class="info-label">INSTITUTION</div>
                <div class="info-value">${result?.institutionName || ''}</div>
              </div>
            </div>
            <div class="photo-container">
              ${result?.photoUrl ?
                `<img src="${result.photoUrl}" alt="Student Photo" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>'" />`
                : '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
              }
            </div>
          </div>
          
          <!-- Marks Table -->
          <table class="marks-table">
            <thead>
              <tr>
                <th rowspan="2" style="width: 40px;">S.NO</th>
                <th rowspan="2">SUBJECTS</th>
                <th colspan="2">MARKS</th>
                <th colspan="2">MARKS AWARDED</th>
              </tr>
              <tr>
                <th>MAX</th>
                <th>MIN</th>
                <th>OBTAINED</th>
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
                  <td style="font-size: 9px;">${subject.inWords}</td>
                </tr>
              `).join('') || ''}
              <tr class="total-row">
                <td colspan="2"><strong>GRAND TOTAL</strong></td>
                <td><strong>${result?.totalMarks || 0}</strong></td>
                <td><strong>${result?.subjects ? result.subjects.length * 40 : 0}</strong></td>
                <td><strong>${result?.obtainedMarks || 0}</strong></td>
                <td><strong>${result?.totalInWords || ''}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <!-- Footer Info -->
          <div class="footer-section">
            <div class="footer-left">
              <div><strong>Date of Birth:</strong> ${result?.dateOfBirth || ''}</div>
              <div><strong>Centre Code:</strong> ${result?.centreCode || ''}</div>
              <div><strong>Issue Date:</strong> ${result?.certificateDate || ''}</div>
            </div>
            <div class="footer-right">
              <div><strong>GRADING SCALE:</strong></div>
              <div class="grade-scale">
                <div>Distinction: 75% and above</div>
                <div>First Division: 60% to 74%</div>
                <div>Second Division: 50% to 59%</div>
              </div>
            </div>
          </div>
          
          <!-- Result Box -->
          <div class="result-box">
            <div class="result-text">
              RESULT: ${result?.grade?.toUpperCase() || 'N/A'} — ${result?.percentage || '0'}%
            </div>
          </div>
          
          <!-- Signature Section -->
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Examination Controller</div>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Director</div>
            </div>
          </div>
          
          <!-- Print Footer -->
          <div class="print-footer">
            This is a computer-generated document. Printed on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
            window.onafterprint = function() { setTimeout(function() { window.close(); }, 500); };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => setIsPrinting(false), 3000);
  };

  const clearSearch = () => {
    setSearchValue("");
    setResult(null);
    setError("");
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem 1rem'
    }}>
      {/* College Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        padding: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #1e40af, #3730a3)',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)'
            }}>
              {/* <GraduationCap style={{ width: '40px', height: '40px', color: 'white' }} /> */}
              <img 
              src={logo}
               alt="College Logo"
               style={{ width: '80px', height: '80px' }}
               />
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
                BHARAT TECHNICAL COLLEGE
              </h1>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#475569' }}>
                Of Fire Engineering & Safety Management
              </p>
            </div>
          </div>
          <p style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            An Autonomous Body, Under Govt. Act · Established Under Act 1882
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
              <MapPin style={{ width: '16px', height: '16px', color: '#ef4444' }} />
              <span>Robertsganj, Sonbhadra, UP - 231216</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af' }}>
              <Phone style={{ width: '16px', height: '16px' }} />
              <span>+91-8840157051</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af' }}>
              <Mail style={{ width: '16px', height: '16px' }} />
              <span>bharattechnicalcollege@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Search Section */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid #bfdbfe'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Search style={{ width: '24px', height: '24px', marginRight: '0.75rem', color: '#2563eb' }} />
              Search Student Marksheet
            </h2>
            <p style={{ color: '#64748b' }}>Enter enrollment or serial number to view marksheet</p>
          </div>

          <form onSubmit={handleSearch}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setSearchType("enrollment")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  border: searchType === "enrollment" ? 'none' : '1px solid #d1d5db',
                  background: searchType === "enrollment" ? 'linear-gradient(135deg, #2563eb, #4338ca)' : 'white',
                  color: searchType === "enrollment" ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                <FileText style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                Enrollment No
              </button>
              <button
                type="button"
                onClick={() => setSearchType("serial")}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  border: searchType === "serial" ? 'none' : '1px solid #d1d5db',
                  background: searchType === "serial" ? 'linear-gradient(135deg, #2563eb, #4338ca)' : 'white',
                  color: searchType === "serial" ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                <Hash style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                Serial No
              </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Search style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === "enrollment" ? "Enter Enrollment Number (e.g., ADM0XXXXX8720)" : "Enter Serial Number (e.g., BT0XXXXXXX61905)"}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: '2px solid #93c5fd',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading || !searchValue.trim()}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1rem 1.5rem',
                  background: loading || !searchValue.trim() ? '#9ca3af' : 'linear-gradient(135deg, #2563eb, #4338ca)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading || !searchValue.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.75rem'
                    }} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search style={{ width: '20px', height: '20px', marginRight: '0.75rem' }} />
                    Search Marksheet
                  </>
                )}
              </button>

              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  style={{
                    padding: '1rem 1.5rem',
                    border: '2px solid #d1d5db',
                    background: 'white',
                    color: '#374151',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div style={{
                marginTop: '1rem',
                background: '#fef2f2',
                borderLeft: '4px solid #ef4444',
                padding: '1rem',
                borderRadius: '8px',
                color: '#b91c1c'
              }}>
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Certificate Display */}
        {result && (
          <>
            <div style={{
              background: 'linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%)',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              border: '4px double #b8860b',
              marginBottom: '2rem'
            }}>
              {/* Certificate Header */}
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 2rem',
                borderBottom: '3px double #1a1a2e',
                background: 'linear-gradient(135deg, #fffef5, #fefcf3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '0.75rem' }}>
                  <div style={{
                   
                   
                    background: 'linear-gradient(135deg, #1a1a2e, #2d2d5a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #b8860b'
                  }}>
                    {/* <GraduationCap style={{ width: '32px', height: '32px', color: '#d4af37' }} /> */}
                    <img src={logo} name="College log" style={{  width: '80px', height: '80px' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#666', letterSpacing: '2px', marginBottom: '4px' }}>
                      AN AUTONOMOUS BODY UNDER GOVT. ACT • ESTABLISHED UNDER ACT 1882
                    </p>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '2px' }}>
                      BHARAT TECHNICAL COLLEGE
                    </h1>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem', color: '#1a1a2e' }}>
                      Of Fire Engineering & Safety Management
                    </h2>
                    <p style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                      Reg. No. SON/01794/2025-2026 • ISO Certified
                    </p>
                  </div>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #d4af37, #b8860b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #b8860b'
                  }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: '700', color: '#1a1a2e' }}>ISO</span>
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #2d2d5a)',
                  color: '#d4af37',
                  padding: '0.5rem 2rem',
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  marginTop: '0.75rem'
                }}>
                  CENTRAL BOARD OF EXAMINATIONS
                </div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', marginTop: '0.75rem', letterSpacing: '3px' }}>
                  STATEMENT OF MARKS
                </h3>
              </div>

              <div style={{ padding: '2rem' }}>
                {/* Student Info */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <User style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Student Name</div>
                          <div style={{ fontSize: '1.125rem', fontWeight: '700', textTransform: 'uppercase' }}>{result.studentName}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <User style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Father's Name</div>
                          <div style={{ fontSize: '1rem', fontWeight: '600' }}>{result.fatherName}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <Calendar style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Date of Birth</div>
                          <div style={{ fontSize: '1rem', fontWeight: '600' }}>{result.dateOfBirth}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <Hash style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Enrollment No</div>
                          <div style={{ fontSize: '1rem', fontWeight: '700' }}>{result.enrollmentNo}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <Hash style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Serial No</div>
                          <div style={{ fontSize: '1rem', fontWeight: '700' }}>{result.serialNo}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <GraduationCap style={{ width: '20px', height: '20px', color: '#2563eb', marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Course</div>
                          <div style={{ fontSize: '1rem', fontWeight: '600' }}>{result.courseName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo */}
                  <div style={{
                    width: '140px',
                    height: '170px',
                    border: '3px solid #1a1a2e',
                    padding: '4px',
                    background: 'white'
                  }}>
                    {result.photoUrl ? (
                      <img
                        src={result.photoUrl}
                        alt="Student"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#f1f5f9',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <User style={{ width: '48px', height: '48px', color: '#94a3b8' }} />
                        <span style={{ fontSize: '11px', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>Photo Not Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Marks Table */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.25rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1rem' }}>
                    <BookOpen style={{ width: '24px', height: '24px', marginRight: '0.75rem', color: '#2563eb' }} />
                    Subject Wise Marks
                  </h3>
                  <div style={{ overflowX: 'auto', border: '1px solid #1a1a2e', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d5a)' }}>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e', width: '50px' }}>S.NO</th>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e', textAlign: 'left' }}>SUBJECTS</th>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e', width: '80px' }}>MAX</th>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e', width: '80px' }}>MIN</th>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e', width: '100px' }}>OBTAINED</th>
                          <th style={{ padding: '12px', color: '#d4af37', fontWeight: '600', border: '1px solid #1a1a2e' }}>IN WORDS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.subjects.map((subject, index) => (
                          <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#fafaf8' }}>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #d1d5db', fontWeight: '500' }}>{index + 1}</td>
                            <td style={{ padding: '10px', border: '1px solid #d1d5db' }}>{subject.name}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #d1d5db' }}>{subject.maxMarks}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #d1d5db' }}>{subject.minMarks}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #d1d5db', fontWeight: '700', fontSize: '16px' }}>{subject.obtainedMarks}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #d1d5db', fontSize: '12px', textTransform: 'uppercase' }}>{subject.inWords}</td>
                          </tr>
                        ))}
                        <tr style={{ background: 'linear-gradient(135deg, #f8f4e8, #fffef5)', fontWeight: '700' }}>
                          <td colSpan="2" style={{ padding: '12px', border: '1px solid #1a1a2e' }}>GRAND TOTAL</td>
                          <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #1a1a2e' }}>{result.totalMarks}</td>
                          <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #1a1a2e' }}>{result.subjects.length * 40}</td>
                          <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #1a1a2e', fontSize: '18px' }}>{result.obtainedMarks}</td>
                          <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #1a1a2e', fontSize: '14px' }}>{result.totalInWords}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Result Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #93c5fd'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontWeight: '700', color: '#1e293b' }}>PERCENTAGE</h4>
                      <Award style={{ width: '24px', height: '24px', color: '#2563eb' }} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d4ed8' }}>{result.percentage}%</div>
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginTop: '0.5rem' }}>
                      <div style={{
                        width: `${Math.min(parseFloat(result.percentage), 100)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #2563eb, #4338ca)',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #86efac'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontWeight: '700', color: '#1e293b' }}>GRADE</h4>
                      <Award style={{ width: '24px', height: '24px', color: '#16a34a' }} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>{result.grade}</div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #d8b4fe'
                  }}>
                    <h4 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>INSTITUTION</h4>
                    <div style={{ fontSize: '13px', color: '#374151' }}>
                      <div style={{ fontWeight: '600' }}>{result.institutionName}</div>
                      <div style={{ marginTop: '4px' }}>Centre Code: {result.centreCode}</div>
                      <div>Session: {result.session}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                style={{
                  padding: '0.875rem 2rem',
                  background: isPrinting ? '#9ca3af' : 'linear-gradient(135deg, #2563eb, #4338ca)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isPrinting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
                }}
              >
                {isPrinting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem'
                    }} />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Printer style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                    Print Marksheet
                  </>
                )}
              </button>
              <button
                onClick={clearSearch}
                style={{
                  padding: '0.875rem 2rem',
                  background: 'linear-gradient(135deg, #4b5563, #374151)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 15px rgba(75, 85, 99, 0.4)'
                }}
              >
                <X style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                New Search
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search style={{ width: '40px', height: '40px', color: '#2563eb' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
              Search Student Marksheet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>
              Enter enrollment number or serial number to view the official marksheet
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              Demo: Try <strong>ADM0XXXXXX8720</strong> or <strong>BT01XXXXXXX5</strong>
            </p>
          </div>
        )}
      </div>

      <style>{`
/* ---------------------------------------
   📱 GLOBAL RESPONSIVE OPTIMIZATION
----------------------------------------*/

/* Reduce padding for mobile */
@media (max-width: 768px) {
  body, html {
    overflow-x: hidden !important;
  }

  /* MAIN PAGE WRAPPER */
  div[style*="minHeight: '100vh'"] {
    padding: 1rem !important;
  }

  /* COLLEGE HEADER CARD */
  div[style*="maxWidth: '1200px'"][style*="margin: '0 auto 2rem'"] {
    padding: 1rem !important;
  }

  /* LOGO SIZE */
  img[alt="College Logo"] {
    width: 60px !important;
    height: 60px !important;
  }

  /* COLLEGE TITLE */
  h1 {
    font-size: 1.35rem !important;
  }

  /* SUBTITLE */
  h2, h3 {
    font-size: 1.15rem !important;
  }
  p {
    font-size: 0.85rem !important;
  }

  /* CONTACT ROW MOBILE STACK */
  div[style*="flexWrap: 'wrap'"][style*="justifyContent: 'center'"] {
    gap: 0.75rem !important;
  }

  /* SEARCH BOX INPUT */
  input[type="text"] {
    font-size: 0.9rem !important;
    padding: 0.85rem 1rem 0.85rem 3rem !important;
  }

  /* SEARCH BUTTONS */
  button {
    font-size: 0.9rem !important;
    padding: 0.75rem 1.2rem !important;
  }

  /* CERTIFICATE WRAPPER */
  div[style*="border: '4px double"] {
    padding: 1rem !important;
    overflow-x: auto !important;
  }

  /* CERTIFICATE HEADER (logo + ISO) stack vertically */
  div[style*="display: 'flex'"][style*="justifyContent: 'center'"][style*="gap: '1.5rem'"] {
    flex-direction: column !important;
  }

  /* STUDENT INFO GRID */
  div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
    grid-template-columns: 1fr !important;
  }

  /* STUDENT PHOTO */
  div[style*="width: '140px'][style*='height: '170px'"] {
    width: 120px !important;
    height: 150px !important;
  }

  /* MARKS TABLE WRAPPER */
  div[style*="overflowX: 'auto'"] {
    width: 100% !important;
    overflow-x: auto !important;
  }

  /* MARKS TABLE */
  table {
    font-size: 12px !important;
    min-width: 650px !important;
  }

  th, td {
    padding: 8px !important;
  }

  /* RESULT SUMMARY CARDS */
  div[style*="gridTemplateColumns: 'repeat(auto-fit"] {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  /* PRINT BUTTONS */
  div[style*="justifyContent: 'center'"][style*="flex-wrap"] button {
    width: 100% !important;
  }

  /* EMPTY STATE */
  div[style*="textAlign: 'center'"][style*="padding: '3rem'"] {
    padding: 1.5rem !important;
  }

  /* QR CODE in preview */
  img[src*="chart.googleapis.com"] {
    width: 90px !important;
    height: 90px !important;
  }
}

/* ---------------------------------------
   📱 EXTRA SMALL DEVICES  (≤ 480px)
----------------------------------------*/

@media (max-width: 480px) {

  /* HEADER LOGO BOX */
  div[style*="padding: '1rem'"][style*='background: linear-gradient'] {
    padding: 0.5rem !important;
  }

  img[alt="College Logo"] {
    width: 50px !important;
    height: 50px !important;
  }

  /* Reduce padding in certificate */
  div[style*="padding: '2rem'"] {
    padding: 1rem !important;
  }

  /* Reduce big percentage text */
  div[style*="fontSize: '2.5rem'"] {
    font-size: 1.8rem !important;
  }

  /* Subject table rows shrink */
  td, th {
    font-size: 10px !important;
  }

  /* Big headers shrink */
  h1 {
    font-size: 1.2rem !important;
  }
  h3 {
    font-size: 1.1rem !important;
  }

  /* Entire card centers tighter */
  div[style*="borderRadius: '16px'"] {
    padding: 1rem !important;
  }
}
`}</style>

    </div>
  );
};

export default Result;

