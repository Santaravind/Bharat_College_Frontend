
// this is core tampalte code that create certificate 

// import React, { useState } from "react";
// import {
//   Search,
//   FileText,
//   Hash,
//   Printer,
//   Download,
//   User,
//   X,
//   GraduationCap,
//   Calendar,
//   Award,
//   BookOpen,
//   MapPin,
//   Phone,
//   Mail,
//   Shield
// } from "lucide-react";
// import { googleserv } from "./googleserver/Googleserv.js";
// import toast from "react-hot-toast";
// import { IoLocationSharp } from "react-icons/io5";
// import logo from '../assets/logo2.png'
// import ISO from '../assets/ISO.png'
// import VRQR from '../assets/VRQR.png'
// import Result from '../assets/resultStamp.png'

// // Number to words converter
// const convertToWords = (number) => {
//   const units = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
//   const numStr = Math.round(number).toString();
//   return numStr.split('').map(digit => units[parseInt(digit)]).join(' ');
// };

// // Date formatter
// const formatDate = (dateString) => {
//   if (!dateString) return "";
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   } catch {
//     return dateString;
//   }
// };

// const Certificate = () => {
//   const [searchType, setSearchType] = useState("enrollment");
//   const [searchValue, setSearchValue] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isPrinting, setIsPrinting] = useState(false);

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

//       if (!response || !response.success || !response.data) {
//         setError("No record found for the provided details");
//         setLoading(false);
//         return;
//       }

//       const data = response.data;
      
//       // Calculate percentage from your data
//       let percentage = data.Percentage || data.percentage;
//       if (!percentage && data.TotalMarks > 0 && data.ObtainedMarks) {
//         percentage = ((data.ObtainedMarks / data.TotalMarks) * 100).toFixed(2);
//       }

//       let grade = data.Grade || data.grade || "";
//       if (!grade && percentage) {
//         const p = parseFloat(percentage);
//         if (p >= 75) grade = "A (Distinction)";
//         else if (p >= 60) grade = "A";
//         else if (p >= 50) grade = "B";
//         else grade = "C";
//       }

//       // Enhanced data for certificate
//       const enhancedData = {
//         studentName: data["Student Name"] || data.studentName || data["StudentName"] || "",
//         fatherName: data["Father Name"] || data.fatherName || data["FatherName"] || "",
//         dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth || data["DOB"]),
//         photoUrl: data["Photo Url"] || data.photoUrl || data["PhotoURL"] || "",
//         enrollmentNo: data["Enrollment No"] || data.enrollmentNo || data["EnrollmentNo"] || "",
//         serialNo: data["Serial No"] || data.serialNo || data["SerialNo"] || "",
//         courseName: data["Course Name"] || data.courseName || data["CourseName"] || "ADVANCED DIPLOMA IN COMPUTER APPLICATION",
//         session: data.Session || data.session || data["AcademicSession"] || "2025-26",
//         percentage: percentage || "0",
//         grade: grade,
//         totalMarks: data.TotalMarks || data["Total Marks"] || 600,
//         obtainedMarks: data.ObtainedMarks || data["Obtained Marks"] || 0,
//         totalInWords: convertToWords(data.ObtainedMarks || 0),
//         certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
//         courseDuration: data["Course Duration"] || data.courseDuration || "ONE YEAR",
//         // Additional fields for certificate design
//         fatherPrefix: "S/O:",
//         // Subject data if available
//         subjects: data.subjects || [],
//         practicals: data.practicals || []
//       };

//       setResult(enhancedData);
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => {
//     setIsPrinting(true);

//     const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

//     if (!printWindow) {
//       alert("Please allow popups to print the certificate");
//       setIsPrinting(false);
//       return;
//     }

//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Certificate - ${result?.studentName || 'Student'}</title>
//         <meta charset="UTF-8">
//         <style>
//           @page {
//             size: A4;
//             margin: 10mm;
//           }
          
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           body {
//             font-family: 'Times New Roman', serif;
//             background: white;
//             color: #000;
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }
          
//           .certificate-container {
//             width: 210mm;
//             min-height: 297mm;
//             margin: 0 auto;
//             padding: 20mm 15mm;
//             position: relative;
//             background: white;
//             border: 2px solid #000;
//           }
          
//           /* Certificate border design */
//           .border-decorations {
//             position: absolute;
//             top: 15mm;
//             left: 15mm;
//             right: 15mm;
//             bottom: 15mm;
//             border: 3px double #000;
//             pointer-events: none;
//           }
          
//           /* Header Section */
//           .header-section {
//             text-align: center;
//             margin-bottom: 20px;
//             position: relative;
//           }
          
//           .college-name {
//             font-size: 28px;
//             font-weight: bold;
//             color: #000;
//             margin-bottom: 5px;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//           }
          
//           .college-subtitle {
//             font-size: 18px;
//             font-weight: bold;
//             color: #000;
//             margin-bottom: 10px;
//             letter-spacing: 0.5px;
//           }
          
//           .govt-info {
//             font-size: 12px;
//             color: #000;
//             margin-bottom: 5px;
//             line-height: 1.4;
//           }
          
//           .address {
//             font-size: 12px;
//             color: #000;
//             margin-bottom: 15px;
//             font-weight: 500;
//           }
          
//           .website {
//             font-size: 12px;
//             color: #000;
//             margin-bottom: 5px;
//           }
          
//           /* Certificate Title */
//           .certificate-title {
//             text-align: center;
//             margin: 30px 0 40px 0;
//             border-top: 2px solid #000;
//             border-bottom: 2px solid #000;
//             padding: 15px 0;
//           }
          
//           .certificate-main-title {
//             font-size: 32px;
//             font-weight: bold;
//             text-transform: uppercase;
//             letter-spacing: 2px;
//             margin-bottom: 10px;
//           }
          
//           .certificate-subtitle {
//             font-size: 20px;
//             font-weight: bold;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//           }
          
//           /* Student Info Section */
//           .student-section {
//             margin: 40px 0;
//             padding: 0 20px;
//           }
          
//           .certificate-statement {
//             font-size: 18px;
//             text-align: center;
//             margin-bottom: 40px;
//             line-height: 1.8;
//           }
          
//           .student-name {
//             font-size: 28px;
//             font-weight: bold;
//             text-align: center;
//             margin: 20px 0 10px 0;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//           }
          
//           .father-name {
//             font-size: 18px;
//             text-align: center;
//             margin-bottom: 30px;
//             font-weight: 500;
//           }
          
//           .course-info {
//             font-size: 22px;
//             font-weight: bold;
//             text-align: center;
//             margin: 30px 0 40px 0;
//             text-transform: uppercase;
//           }
          
//           /* Marks Section */
//           .marks-section {
//             margin: 40px 0;
//             padding: 0 30px;
//           }
          
//           .marks-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 30px;
//             margin: 20px 0;
//           }
          
//           .marks-item {
//             text-align: center;
//           }
          
//           .marks-label {
//             font-size: 14px;
//             color: #000;
//             margin-bottom: 5px;
//           }
          
//           .marks-value {
//             font-size: 20px;
//             font-weight: bold;
//             padding: 5px;
//             border-bottom: 2px solid #000;
//           }
          
//           /* Result Summary */
//           .result-summary {
//             margin: 50px 0;
//             padding: 20px;
//             text-align: center;
//           }
          
//           .grade-section {
//             font-size: 20px;
//             font-weight: bold;
//             margin-bottom: 10px;
//           }
          
//           .percentage-section {
//             font-size: 24px;
//             font-weight: bold;
//             color: #000;
//             margin-bottom: 20px;
//           }
          
//           .session-info {
//             font-size: 16px;
//             font-weight: 500;
//             margin: 20px 0;
//           }
          
//           /* Footer Section */
//           .footer-section {
//             margin-top: 60px;
//             padding: 0 30px;
//           }
          
//           .signatures {
//             display: flex;
//             justify-content: space-between;
//             margin: 50px 0 30px 0;
//           }
          
//           .signature-box {
//             text-align: center;
//             width: 180px;
//           }
          
//           .signature-line {
//             border-top: 1px solid #000;
//             margin: 50px 0 10px 0;
//             padding-top: 10px;
//           }
          
//           .signature-label {
//             font-size: 14px;
//             font-weight: bold;
//             margin-top: 5px;
//           }
          
//           .date-section {
//             text-align: center;
//             margin-top: 40px;
//             font-size: 16px;
//             font-weight: 500;
//           }
          
//           .college-stamp {
//             text-align: center;
//             margin-top: 20px;
//           }
          
//           .college-stamp img {
//             max-width: 120px;
//             height: auto;
//           }
          
//           /* Logos */
//           .logos {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin: 20px 0;
//             padding: 0 20px;
//           }
          
//           .logo-left img,
//           .logo-right img {
//             max-width: 100px;
//             height: auto;
//           }
          
//           @media print {
//             body {
//               background: white !important;
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//             }
            
//             .certificate-container {
//               border: 2px solid #000 !important;
//               box-shadow: none !important;
//             }
            
//             .no-print {
//               display: none !important;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="certificate-container">
//           <div class="border-decorations"></div>
          
//           <!-- College Header -->
//           <div class="header-section">
//             <div class="logos">
//               <div class="logo-left">
//                 <img src="${logo}" alt="College Logo" style="width: 80px; height: 80px;" />
//               </div>
//               <div class="college-info">
//                 <div class="college-name">Bharat Technical College</div>
//                 <div class="college-subtitle">Of Fire Engineering & Management</div>
//                 <div class="govt-info">
//                   An Autonomous Body, Under Govt.Act Established Under Act 1882,<br>
//                   Registered Under Govt of U.P. & Ministry of MSME, Govt of India.<br>
//                   Registration No. SON/01794/2025-2026. It is also ISO Certified.
//                 </div>
//                 <div class="address">
//                   Pusault, Robertsganj, Sonbhadra, Uttar Pradesh, India, 231216
//                 </div>
//                 <div class="website">www.bharattechnicalcollege.com</div>
//                 <div class="website">bharattechnicalcollege@gmail.com</div>
//               </div>
//               <div class="logo-right">
//                 <img src="${ISO}" alt="ISO Certified" style="width: 70px; height: 70px;" />
//               </div>
//             </div>
//           </div>
          
//           <!-- Certificate Title -->
//           <div class="certificate-title">
//             <div class="certificate-main-title">Certificate of Training</div>
//             <div class="certificate-subtitle">This is to Certify that</div>
//           </div>
          
//           <!-- Student Information -->
//           <div class="student-section">
//             <div class="certificate-statement">
//               This is to Certify that
//             </div>
            
//             <div class="student-name">
//               ${result?.studentName || ''}
//             </div>
            
//             <div class="father-name">
//               ${result?.fatherPrefix || 'S/O:'} ${result?.fatherName || ''}
//             </div>
            
//             <div class="certificate-statement">
//               has successfully completed
//             </div>
            
//             <div class="course-info">
//               ${result?.courseName || ''}
//             </div>
//           </div>
          
//           <!-- Marks Information -->
//           <div class="marks-section">
//             <div class="marks-grid">
//               <div class="marks-item">
//                 <div class="marks-label">S. No.</div>
//                 <div class="marks-value">${result?.serialNo || ''}</div>
//               </div>
              
//               <div class="marks-item">
//                 <div class="marks-label">Enrollment No.</div>
//                 <div class="marks-value">${result?.enrollmentNo || ''}</div>
//               </div>
              
//               <div class="marks-item">
//                 <div class="marks-label">Total Marks</div>
//                 <div class="marks-value">${result?.totalMarks || 0}</div>
//               </div>
              
//               <div class="marks-item">
//                 <div class="marks-label">Obtained Marks</div>
//                 <div class="marks-value">${result?.obtainedMarks || 0}</div>
//               </div>
//             </div>
//           </div>
          
//           <!-- Result Summary -->
//           <div class="result-summary">
//             <div class="percentage-section">
//               Percentage: ${result?.percentage || '0'}%
//             </div>
            
//             <div class="grade-section">
//               Grade: ${result?.grade || ''}
//             </div>
            
//             <div class="session-info">
//               Session: ${result?.session || ''}
//             </div>
            
//             <div class="session-info">
//               Course: ${result?.courseName || ''}
//             </div>
            
//             <div class="session-info">
//               College / Branch: Bharat Technical College Robertsganj
//             </div>
//           </div>
          
//           <!-- Footer with Signatures -->
//           <div class="footer-section">
//             <div class="date-section">
//               Issue Date: ${result?.certificateDate || ''}
//             </div>
            
//             <div class="signatures">
//               <div class="signature-box">
//                 <div class="signature-line"></div>
//                 <div class="signature-label">Teacher / Trainer</div>
//               </div>
              
//               <div class="signature-box">
//                 <div class="signature-label">Signature</div>
//               </div>
              
//               <div class="signature-box">
//                 <div class="signature-line"></div>
//                 <div class="signature-label">Director Signature</div>
//               </div>
//             </div>
            
//             <div class="college-stamp">
//               <img src="${Result}" alt="College Stamp" style="width: 100px;" />
//             </div>
//           </div>
//         </div>
        
//         <script>
//           window.onload = function() {
//             setTimeout(function() { 
//               window.print(); 
//             }, 500);
            
//             window.onafterprint = function() { 
//               setTimeout(function() { 
//                 window.close(); 
//               }, 500); 
//             };
//           };
//         </script>
//       </body>
//       </html>
//     `;
    
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     setTimeout(() => setIsPrinting(false), 3000);
//   };

//   const clearSearch = () => {
//     setSearchValue("");
//     setResult(null);
//     setError("");
//   };

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
//       padding: '2rem 1rem'
//     }}>
//       {/* College Header */}
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto 2rem',
//         background: 'white',
//         borderRadius: '16px',
//         boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//         padding: '2rem',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
//             <div style={{
//               padding: '1rem',
//               background: 'linear-gradient(135deg, #1e40af, #3730a3)',
//               borderRadius: '12px',
//               boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)'
//             }}>
//               <img 
//                 src={logo}
//                 alt="College Logo"
//                 style={{ width: '80px', height: '80px' }}
//               />
//             </div>
//             <div>
//               <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
//                 BHARAT TECHNICAL COLLEGE
//               </h1>
//               <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#475569' }}>
//                 Of Fire Engineering & Management
//               </p>
//             </div>
//           </div>
//           <p style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
//             An Autonomous Body, Under Govt. Act · Established Under Act 1882
//           </p>
//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
//               <MapPin style={{ width: '16px', height: '16px', color: '#ef4444' }} />
//               <span>Robertsganj, Sonbhadra, UP - 231216</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af' }}>
//               <Phone style={{ width: '16px', height: '16px' }} />
//               <span>+91-8840157051</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af' }}>
//               <Mail style={{ width: '16px', height: '16px' }} />
//               <span>bharattechnicalcollege@gmail.com</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Search Section */}
//         <div style={{
//           background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
//           borderRadius: '16px',
//           boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//           padding: '2rem',
//           marginBottom: '2rem',
//           border: '1px solid #bfdbfe'
//         }}>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
//               <Search style={{ width: '24px', height: '24px', marginRight: '0.75rem', color: '#2563eb' }} />
//               Search Student Certificate
//             </h2>
//             <p style={{ color: '#64748b' }}>Enter enrollment or serial number to view training certificate</p>
//           </div>

//           <form onSubmit={handleSearch}>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
//               <button
//                 type="button"
//                 onClick={() => setSearchType("enrollment")}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '0.75rem 1.25rem',
//                   borderRadius: '12px',
//                   border: searchType === "enrollment" ? 'none' : '1px solid #d1d5db',
//                   background: searchType === "enrollment" ? 'linear-gradient(135deg, #2563eb, #4338ca)' : 'white',
//                   color: searchType === "enrollment" ? 'white' : '#374151',
//                   cursor: 'pointer',
//                   fontWeight: '500',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <FileText style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
//                 Enrollment No
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSearchType("serial")}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '0.75rem 1.25rem',
//                   borderRadius: '12px',
//                   border: searchType === "serial" ? 'none' : '1px solid #d1d5db',
//                   background: searchType === "serial" ? 'linear-gradient(135deg, #2563eb, #4338ca)' : 'white',
//                   color: searchType === "serial" ? 'white' : '#374151',
//                   cursor: 'pointer',
//                   fontWeight: '500',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <Hash style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
//                 Serial No
//               </button>
//             </div>

//             <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
//               <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
//                 <Search style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
//               </div>
//               <input
//                 type="text"
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 placeholder={searchType === "enrollment" ? "Enter Enrollment Number (e.g., ADM07XXXXXXXX20)" : "Enter Serial Number (e.g., BT01AXXXX1)"}
//                 style={{
//                   width: '100%',
//                   padding: '1rem 1rem 1rem 3rem',
//                   border: '2px solid #93c5fd',
//                   borderRadius: '12px',
//                   fontSize: '1rem',
//                   outline: 'none',
//                   boxSizing: 'border-box'
//                 }}
//               />
//             </div>

//             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//               <button
//                 type="submit"
//                 disabled={loading || !searchValue.trim()}
//                 style={{
//                   flex: 1,
//                   minWidth: '200px',
//                   padding: '1rem 1.5rem',
//                   background: loading || !searchValue.trim() ? '#9ca3af' : 'linear-gradient(135deg, #2563eb, #4338ca)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '12px',
//                   fontSize: '1rem',
//                   fontWeight: '600',
//                   cursor: loading || !searchValue.trim() ? 'not-allowed' : 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <div style={{
//                       width: '20px',
//                       height: '20px',
//                       border: '2px solid white',
//                       borderTopColor: 'transparent',
//                       borderRadius: '50%',
//                       animation: 'spin 1s linear infinite',
//                       marginRight: '0.75rem'
//                     }} />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <Search style={{ width: '20px', height: '20px', marginRight: '0.75rem' }} />
//                     Search Certificate
//                   </>
//                 )}
//               </button>

//               {searchValue && (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   style={{
//                     padding: '1rem 1.5rem',
//                     border: '2px solid #d1d5db',
//                     background: 'white',
//                     color: '#374151',
//                     borderRadius: '12px',
//                     fontSize: '1rem',
//                     fontWeight: '500',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             {error && (
//               <div style={{
//                 marginTop: '1rem',
//                 background: '#fef2f2',
//                 borderLeft: '4px solid #ef4444',
//                 padding: '1rem',
//                 borderRadius: '8px',
//                 color: '#b91c1c'
//               }}>
//                 {error}
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Certificate Preview */}
//         {result && (
//           <>
//             <div style={{
//               background: 'white',
//               borderRadius: '12px',
//               boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
//               overflow: 'hidden',
//               border: '4px double #b8860b',
//               marginBottom: '2rem'
//             }}>
//               {/* Certificate Preview Header */}
//               <div style={{
//                 textAlign: 'center',
//                 padding: '2rem',
//                 borderBottom: '2px solid #e2e8f0',
//                 background: 'linear-gradient(135deg, #fffef5, #fefcf3)'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
//                   <img src={logo} alt="College Logo" style={{ width: '80px', height: '80px' }} />
//                   <div>
//                     <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' }}>
//                       BHARAT TECHNICAL COLLEGE
//                     </h1>
//                     <h2 style={{ fontSize: '1.125rem', color: '#1a1a2e' }}>
//                       Of Fire Engineering & Management
//                     </h2>
//                   </div>
//                   <img src={ISO} alt="ISO Certified" style={{ width: '70px', height: '70px' }} />
//                 </div>
//               </div>

//               <div style={{ padding: '2rem' }}>
//                 {/* Student Info Preview */}
//                 <div style={{ marginBottom: '2rem' }}>
//                   <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1.5rem', textAlign: 'center' }}>
//                     CERTIFICATE OF TRAINING
//                   </h3>
                  
//                   <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//                     <div style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '1rem' }}>
//                       This is to Certify that
//                     </div>
                    
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' }}>
//                       {result.studentName}
//                     </div>
                    
//                     <div style={{ fontSize: '1.25rem', color: '#475569' }}>
//                       {result.fatherPrefix || 'S/O:'} {result.fatherName}
//                     </div>
                    
//                     <div style={{ fontSize: '1.25rem', color: '#64748b', margin: '2rem 0' }}>
//                       has successfully completed
//                     </div>
                    
//                     <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e' }}>
//                       {result.courseName}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Details Grid */}
//                 <div style={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
//                   gap: '1.5rem',
//                   marginBottom: '2rem'
//                 }}>
//                   <div style={{
//                     background: '#f8fafc',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Serial No.</div>
//                     <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.serialNo}</div>
//                   </div>
                  
//                   <div style={{
//                     background: '#f8fafc',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Enrollment No.</div>
//                     <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.enrollmentNo}</div>
//                   </div>
                  
//                   <div style={{
//                     background: '#f8fafc',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Total Marks</div>
//                     <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.totalMarks}</div>
//                   </div>
                  
//                   <div style={{
//                     background: '#f8fafc',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Obtained Marks</div>
//                     <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.obtainedMarks}</div>
//                   </div>
//                 </div>

//                 {/* Result Summary */}
//                 <div style={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
//                   gap: '1.5rem',
//                   marginBottom: '2rem'
//                 }}>
//                   <div style={{
//                     background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #93c5fd',
//                     textAlign: 'center'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Percentage</div>
//                     <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d4ed8' }}>{result.percentage}%</div>
//                     <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginTop: '1rem' }}>
//                       <div style={{
//                         width: `${Math.min(parseFloat(result.percentage), 100)}%`,
//                         height: '100%',
//                         background: 'linear-gradient(90deg, #2563eb, #4338ca)',
//                         borderRadius: '4px'
//                       }} />
//                     </div>
//                   </div>
                  
//                   <div style={{
//                     background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
//                     padding: '1.5rem',
//                     borderRadius: '8px',
//                     border: '1px solid #86efac',
//                     textAlign: 'center'
//                   }}>
//                     <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Grade</div>
//                     <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>{result.grade}</div>
//                   </div>
//                 </div>

//                 {/* Session Info */}
//                 <div style={{ 
//                   background: '#faf5ff',
//                   padding: '1.5rem',
//                   borderRadius: '8px',
//                   border: '1px solid #d8b4fe',
//                   textAlign: 'center',
//                   marginBottom: '2rem'
//                 }}>
//                   <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
//                     Session: {result.session}
//                   </div>
//                   <div style={{ fontSize: '1rem', color: '#6b7280' }}>
//                     Issue Date: {result.certificateDate}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
//               <button
//                 onClick={handlePrint}
//                 disabled={isPrinting}
//                 style={{
//                   padding: '0.875rem 2rem',
//                   background: isPrinting ? '#9ca3af' : 'linear-gradient(135deg, #2563eb, #4338ca)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '12px',
//                   fontSize: '1rem',
//                   fontWeight: '600',
//                   cursor: isPrinting ? 'not-allowed' : 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
//                 }}
//               >
//                 {isPrinting ? (
//                   <>
//                     <div style={{
//                       width: '20px',
//                       height: '20px',
//                       border: '2px solid white',
//                       borderTopColor: 'transparent',
//                       borderRadius: '50%',
//                       animation: 'spin 1s linear infinite',
//                       marginRight: '0.5rem'
//                     }} />
//                     Preparing...
//                   </>
//                 ) : (
//                   <>
//                     <Printer style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
//                     Print Certificate
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={clearSearch}
//                 style={{
//                   padding: '0.875rem 2rem',
//                   background: 'linear-gradient(135deg, #4b5563, #374151)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '12px',
//                   fontSize: '1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   boxShadow: '0 4px 15px rgba(75, 85, 99, 0.4)'
//                 }}
//               >
//                 <X style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
//                 New Search
//               </button>
//             </div>
//           </>
//         )}

//         {/* Empty State */}
//         {!result && !loading && (
//           <div style={{
//             background: 'white',
//             borderRadius: '16px',
//             boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//             padding: '3rem',
//             textAlign: 'center',
//             border: '1px solid #e2e8f0'
//           }}>
//             <div style={{
//               width: '80px',
//               height: '80px',
//               margin: '0 auto 1.5rem',
//               background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <Search style={{ width: '40px', height: '40px', color: '#2563eb' }} />
//             </div>
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
//               Search Student Certificate
//             </h3>
//             <p style={{ color: '#64748b', marginBottom: '1rem' }}>
//               Enter enrollment number or serial number to view the official certificate
//             </p>
//             <p style={{ fontSize: '14px', color: '#94a3b8' }}>
//               Demo: Try <strong>ADM076211178720</strong> or <strong>BT01A00001</strong>
//             </p>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         /* Responsive Styles */
//         @media (max-width: 768px) {
//           .certificate-container {
//             padding: 1rem !important;
//           }
          
//           .logos {
//             flex-direction: column !important;
//             gap: 1rem !important;
//           }
          
//           .college-name {
//             font-size: 22px !important;
//           }
          
//           .certificate-main-title {
//             font-size: 24px !important;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .student-name {
//             font-size: 20px !important;
//           }
          
//           .course-info {
//             font-size: 18px !important;
//           }
          
//           .marks-grid {
//             grid-template-columns: 1fr !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Certificate;

// this is core tampalte code that create certificate 


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
import { googleserv } from "./googleserver/Googleserv.js";
import toast from "react-hot-toast";
import { IoLocationSharp } from "react-icons/io5";
import logo from '../assets/logo2.png'
import ISO from '../assets/ISO.png'
import VRQR from '../assets/VRQR.png'
import Result from '../assets/resultStamp.png'

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
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const Certificate = () => {
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

      if (!response || !response.success || !response.data) {
        setError("No record found for the provided details");
        setLoading(false);
        return;
      }

      const data = response.data;
      
      // Calculate percentage from your data
      let percentage = data.Percentage || data.percentage;
      if (!percentage && data.TotalMarks > 0 && data.ObtainedMarks) {
        percentage = ((data.ObtainedMarks / data.TotalMarks) * 100).toFixed(2);
      }

      let grade = data.Grade || data.grade || "";
      if (!grade && percentage) {
        const p = parseFloat(percentage);
        if (p >= 75) grade = "A (Distinction)";
        else if (p >= 60) grade = "A";
        else if (p >= 50) grade = "B";
        else grade = "C";
      }

      // Enhanced data for certificate
      const enhancedData = {
        studentName: data["Student Name"] || data.studentName || data["StudentName"] || "",
        fatherName: data["Father Name"] || data.fatherName || data["FatherName"] || "",
        dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth || data["DOB"]),
        photoUrl: data["Photo Url"] || data.photoUrl || data["PhotoURL"] || "",
        enrollmentNo: data["Enrollment No"] || data.enrollmentNo || data["EnrollmentNo"] || "",
        serialNo: data["Serial No"] || data.serialNo || data["SerialNo"] || "",
        courseName: data["Course Name"] || data.courseName || data["CourseName"] || "ADVANCED DIPLOMA IN COMPUTER APPLICATION",
        session: data.Session || data.session || data["AcademicSession"] || "2025-26",
        percentage: percentage || "0",
        grade: grade,
        totalMarks: data.TotalMarks || data["Total Marks"] || 600,
        obtainedMarks: data.ObtainedMarks || data["Obtained Marks"] || 0,
        totalInWords: convertToWords(data.ObtainedMarks || 0),
        certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
        courseDuration: data["Course Duration"] || data.courseDuration || "ONE YEAR",
        fatherPrefix: "S/O:",
        subjects: data.subjects || [],
        practicals: data.practicals || []
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
      alert("Please allow popups to print the certificate");
      setIsPrinting(false);
      return;
    }

    // const printContent = `
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <title>Certificate - ${result?.studentName || 'Student'}</title>
    //     <meta charset="UTF-8">
    //     <style>
    //       @page {
    //         size: A4;
    //         margin: 0;
    //       }
          
    //       * {
    //         margin: 0;
    //         padding: 0;
    //         box-sizing: border-box;
    //       }
          
    //       body {
    //         font-family: 'Times New Roman', serif;
    //         background: white;
    //         color: #000;
    //         -webkit-print-color-adjust: exact;
    //         print-color-adjust: exact;
    //         width: 210mm;
    //         min-height: 297mm;
    //         margin: 0;
    //         padding: 0;
    //       }
          
    //       .certificate-container {
    //         width: 210mm;
    //         min-height: 297mm;
    //         margin: 0;
    //         padding: 15mm 20mm;
    //         position: relative;
    //         background: white;
    //         border: 2px solid #000;
    //         page-break-inside: avoid;
    //       }
          
    //       /* Certificate border design */
    //       .border-decorations {
    //         position: absolute;
    //         top: 10mm;
    //         left: 10mm;
    //         right: 10mm;
    //         bottom: 10mm;
    //         border: 3px double #000;
    //         pointer-events: none;
    //       }
          
    //       /* Header Section */
    //       .header-section {
    //         text-align: center;
    //         margin-bottom: 6px;
    //         position: relative;
    //       }
          
    //       .logos {
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;
    //         margin-bottom: 12px;
    //       }
          
    //       .college-name {
    //         font-size: 24px;
    //         font-weight: bold;
    //         color: #000;
    //         margin-bottom: 5px;
    //         text-transform: uppercase;
    //         letter-spacing: 1px;
    //       }
          
    //       .college-subtitle {
    //         font-size: 16px;
    //         font-weight: bold;
    //         color: #000;
    //         margin-bottom: 8px;
    //         letter-spacing: 0.5px;
    //       }
          
    //       .govt-info {
    //         font-size: 10px;
    //         color: #000;
    //         margin-bottom: 4px;
    //         line-height: 1.3;
    //       }
          
    //       .address {
    //         font-size: 10px;
    //         color: #000;
    //         margin-bottom: 8px;
    //         font-weight: 500;
    //       }
          
    //       .website {
    //         font-size: 10px;
    //         color: #000;
    //         margin-bottom: 3px;
    //       }
          
    //       /* Certificate Title */
    //       .certificate-title {
    //         text-align: center;
    //         margin: 20px 0 25px 0;
    //         border-top: 2px solid #000;
    //         border-bottom: 2px solid #000;
    //         padding: 12px 0;
    //       }
          
    //       .certificate-main-title {
    //         font-size: 28px;
    //         font-weight: bold;
    //         text-transform: uppercase;
    //         letter-spacing: 2px;
    //         margin-bottom: 8px;
    //       }
          
    //       .certificate-subtitle {
    //         font-size: 18px;
    //         font-weight: bold;
    //         text-transform: uppercase;
    //         letter-spacing: 1px;
    //       }
          
    //       /* Student Information Section */
    //       .student-section {
    //         margin: 25px 0;
    //         padding: 0 15px;
    //       }
          
    //       .student-info-container {
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: flex-start;
    //         margin-bottom: 20px;
    //       }
          
    //       .student-details {
    //         flex: 1;
    //         margin-right: 20px;
    //       }
          
    //       .student-photo-container {
    //         width: 100px;
    //         height: 120px;
    //         border: 2px solid #000;
    //         padding: 2px;
    //         background: white;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         margin-left: 20px;
    //       }
          
    //       .student-photo {
    //         width: 100%;
    //         height: 100%;
    //         object-fit: cover;
    //       }
          
    //       .photo-placeholder {
    //         width: 100%;
    //         height: 100%;
    //         background: #f0f0f0;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         font-size: 10px;
    //         color: #666;
    //         text-align: center;
    //         padding: 5px;
    //       }
          
    //       .certificate-statement {
    //         font-size: 16px;
    //         text-align: center;
    //         margin-bottom: 25px;
    //         line-height: 1.6;
    //       }
          
    //       .student-name {
    //         font-size: 24px;
    //         font-weight: bold;
    //         text-align: center;
    //         margin: 15px 0 8px 0;
    //         text-transform: uppercase;
    //         letter-spacing: 1px;
    //       }
          
    //       .father-name {
    //         font-size: 16px;
    //         text-align: center;
    //         margin-bottom: 20px;
    //         font-weight: 500;
    //       }
          
    //       .course-info {
    //         font-size: 20px;
    //         font-weight: bold;
    //         text-align: center;
    //         margin: 20px 0 25px 0;
    //         text-transform: uppercase;
    //       }
          
    //       /* Marks Information */
    //       .marks-section {
    //         margin: 25px 0;
    //         padding: 0 20px;
    //       }
          
    //       .marks-grid {
    //         display: grid;
    //         grid-template-columns: repeat(2, 1fr);
    //         gap: 20px;
    //         margin: 15px 0;
    //       }
          
    //       .marks-item {
    //         text-align: center;
    //       }
          
    //       .marks-label {
    //         font-size: 12px;
    //         color: #000;
    //         margin-bottom: 4px;
    //       }
          
    //       .marks-value {
    //         font-size: 18px;
    //         font-weight: bold;
    //         padding: 4px;
    //         border-bottom: 2px solid #000;
    //       }
          
    //       /* Result Summary */
    //       .result-summary {
    //         margin: 30px 0;
    //         padding: 15px;
    //         text-align: center;
    //         border-top: 1px solid #000;
    //         border-bottom: 1px solid #000;
    //       }
          
    //       .grade-section {
    //         font-size: 18px;
    //         font-weight: bold;
    //         margin-bottom: 8px;
    //       }
          
    //       .percentage-section {
    //         font-size: 22px;
    //         font-weight: bold;
    //         color: #000;
    //         margin-bottom: 15px;
    //       }
          
    //       .session-info {
    //         font-size: 14px;
    //         font-weight: 500;
    //         margin: 10px 0;
    //       }
          
    //       /* Footer Section */
    //       .footer-section {
    //         margin-top: 40px;
    //         padding: 0 20px;
    //       }
          
    //       .signatures {
    //         display: flex;
    //         justify-content: space-between;
    //         margin: 30px 0 20px 0;
    //       }
          
    //       .signature-box {
    //         text-align: center;
    //         width: 150px;
    //       }
          
    //       .signature-line {
    //         border-top: 1px solid #000;
    //         margin: 40px 0 8px 0;
    //         padding-top: 8px;
    //       }
          
    //       .signature-label {
    //         font-size: 12px;
    //         font-weight: bold;
    //         margin-top: 4px;
    //       }
          
    //       .date-section {
    //         text-align: center;
    //         margin-top: 30px;
    //         font-size: 14px;
    //         font-weight: 500;
    //       }
          
    //       .college-stamp {
    //         text-align: center;
    //         margin-top: 15px;
    //       }
          
    //       .college-stamp img {
    //         max-width: 100px;
    //         height: auto;
    //       }
          
    //       /* Logo sizes */
    //       .logo-left img {
    //         width: 70px;
    //         height: 70px;
    //         object-fit: contain;
    //       }
          
    //       .logo-right img {
    //         width: 60px;
    //         height: 60px;
    //         object-fit: contain;
    //       }
          
    //       @media print {
    //         body {
    //           background: white !important;
    //           -webkit-print-color-adjust: exact;
    //           print-color-adjust: exact;
    //           margin: 0 !important;
    //           padding: 0 !important;
    //         }
            
    //         .certificate-container {
    //           border: 2px solid #000 !important;
    //           box-shadow: none !important;
    //           page-break-after: avoid;
    //           page-break-inside: avoid;
    //         }
            
    //         .no-print {
    //           display: none !important;
    //         }
            
    //         .logos {
    //           page-break-inside: avoid;
    //         }
            
    //         .student-section {
    //           page-break-inside: avoid;
    //         }
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="certificate-container">
    //       <div class="border-decorations"></div>
          
    //       <!-- College Header -->
    //       <div class="header-section">
    //         <div class="logos">
    //           <div class="logo-left">
    //             <img src="${logo}" alt="College Logo" />
    //           </div>
    //           <div class="college-info">
    //             <div class="college-name">Bharat Technical College</div>
    //             <div class="college-subtitle">Of Fire Engineering & Management</div>
    //             <div class="govt-info">
    //               An Autonomous Body, Under Govt.Act Established Under Act 1882,<br>
    //               Registered Under Govt of U.P. & Ministry of MSME, Govt of India.<br>
    //               Registration No. SON/01794/2025-2026. It is also ISO Certified.
    //             </div>
    //             <div class="address">
    //               Pusault, Robertsganj, Sonbhadra, Uttar Pradesh, India, 231216
    //             </div>
    //             <div class="website">www.bharattechnicalcollege.com</div>
    //             <div class="website">bharattechnicalcollege@gmail.com</div>
    //           </div>
    //           <div class="logo-right">
    //             <img src="${ISO}" alt="ISO Certified" />
    //           </div>
    //         </div>
    //       </div>
          
    //       <!-- Certificate Title -->
    //       <div class="certificate-title">
    //         <div class="certificate-main-title">Certificate of Training</div>
    //         <div class="certificate-subtitle">This is to Certify that</div>
    //       </div>
          
    //       <!-- Student Information -->
    //       <div class="student-section">
    //         <div class="student-info-container">
    //           <div class="student-details">
    //             <div class="certificate-statement">
    //               This is to Certify that
    //             </div>
                
    //             <div class="student-name">
    //               ${result?.studentName || ''}
    //             </div>
                
    //             <div class="father-name">
    //               ${result?.fatherPrefix || 'S/O:'} ${result?.fatherName || ''}
    //             </div>
                
    //             <div class="certificate-statement">
    //               has successfully completed
    //             </div>
                
    //             <div class="course-info">
    //               ${result?.courseName || ''}
    //             </div>
    //           </div>
              
    //           <!-- Student Photo -->
    //           <div class="student-photo-container">
    //             ${result?.photoUrl ? 
    //               `<img src="${result.photoUrl}" alt="Student Photo" class="student-photo" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>';" />` : 
    //               '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
    //             }
    //           </div>
    //         </div>
    //       </div>
          
    //       <!-- Marks Information -->
    //       <div class="marks-section">
    //         <div class="marks-grid">
    //           <div class="marks-item">
    //             <div class="marks-label">S. No.</div>
    //             <div class="marks-value">${result?.serialNo || ''}</div>
    //           </div>
              
    //           <div class="marks-item">
    //             <div class="marks-label">Enrollment No.</div>
    //             <div class="marks-value">${result?.enrollmentNo || ''}</div>
    //           </div>
              
    //           <div class="marks-item">
    //             <div class="marks-label">Total Marks</div>
    //             <div class="marks-value">${result?.totalMarks || 0}</div>
    //           </div>
              
    //           <div class="marks-item">
    //             <div class="marks-label">Obtained Marks</div>
    //             <div class="marks-value">${result?.obtainedMarks || 0}</div>
    //           </div>
    //         </div>
    //       </div>
          
    //       <!-- Result Summary -->
    //       <div class="result-summary">
    //         <div class="percentage-section">
    //           Percentage: ${result?.percentage || '0'}%
    //         </div>
            
    //         <div class="grade-section">
    //           Grade: ${result?.grade || ''}
    //         </div>
            
    //         <div class="session-info">
    //           Session: ${result?.session || ''}
    //         </div>
            
    //         <div class="session-info">
    //           Course: ${result?.courseName || ''}
    //         </div>
            
    //         <!--- <div class="session-info">
    //           College / Branch: Bharat Technical College Robertsganj
    //         </div> --->
    //       </div>
          
    //       <!-- Footer with Signatures -->
    //       <div class="footer-section">
    //         <div class="date-section">
    //           Issue Date: ${result?.certificateDate || ''}
    //         </div>
            
    //         <div class="signatures">
    //           <div class="signature-box">
    //             <div class="signature-line"></div>
    //             <div class="signature-label">Teacher / Trainer</div>
    //           </div>
              
    //           <div class="signature-box">
    //             <div class="signature-label">Signature</div>
    //           </div>
              
    //           <div class="signature-box">
    //             <div class="signature-line"></div>
    //             <div class="signature-label">Director Signature</div>
    //           </div>
    //         </div>
            
    //         <div class="college-stamp">
    //           <img src="${Result}" alt="College Stamp" />
    //         </div>
    //       </div>
    //     </div>
        
    //     <script>
    //       window.onload = function() {
    //         // Force images to load before printing
    //         setTimeout(function() { 
    //           window.print(); 
    //         }, 1000);
            
    //         window.onafterprint = function() { 
    //           setTimeout(function() { 
    //             window.close(); 
    //           }, 500); 
    //         };
    //       };
    //     </script>
    //   </body>
    //   </html>
    // `;
    


    
//     const printContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <title>Certificate - ${result?.studentName || 'Student'}</title>
//     <meta charset="UTF-8">
//     <style>
//       @page {
//         size: A4;
//         margin: 15mm;
//       }
      
//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//       }
      
//       body {
//        font-family: 'Crimson Text', 'Times New Roman', serif;
//         background: white;
//        color: #1a1a2e;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//         width: 210mm;
//         height: 297mm;
//         margin: 0 auto;
//         padding: 0;
//       }
      
//       .certificate-container {
//         width: 180mm;
//         min-height: 267mm;
//         max-height: 267mm;
//         margin: 0 auto;
//         padding: 10mm 15mm;
//         position: relative;
//         background: white;
//         border: 2px solid #000;
//         overflow: hidden;
//       }
//         /*water marks*/
//       .certificate-container::after {
//   content: "BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM BTCFSM ";
//   position: absolute;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 30px;
//   font-weight: 700;
//   color: rgba(0,0,0,0.03);
  
//   pointer-events: none;
//   z-index:1;
// }

//       /* Certificate border design */
//       .border-decorations {
//         position: absolute;
//         top: 5mm;
//         left: 5mm;
//         right: 5mm;
//         bottom: 5mm;
//         border: 2px solid #000;
//         pointer-events: none;
//       }
      
//       /* Header Section - Compact */
//       .header-section {
//         text-align: center;
//         margin-bottom: 5mm;
//       }
      
//       .logos {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 3mm;
//       }
      
//       .college-name {
//         font-size: 20px;
//         font-weight: bold;
//         color: #000;
//         margin-bottom: 2px;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
      
//       .college-subtitle {
//         font-size: 16px;
//          font-family: 'Playfair Display', serif;
//         font-weight: bold;
//         color: #000;
//         margin-bottom: 3px;
//         letter-spacing: 0.5px;
//       }
      
//       .govt-info {
//         font-size: 12px;
//         color: #000;
//         margin-bottom: 2px;
//         line-height: 1.2;
//       }
      
//       .address {
//         font-size: 12px;
//         color: #000;
//         margin-bottom: 3px;
//         font-weight: 500;
//       }
      
//       .website {
//         font-size: 8px;
//         color: #000;
//         margin-bottom: 2px;
//       }
      
//       /* Certificate Title */
//       .certificate-title {
//         text-align: center;
//         margin: 10mm 0 8mm 0;
//         border-top: 2px solid #000;
//         border-bottom: 2px solid #000;
//         padding: 4mm 0;
//       }
      
//       .certificate-main-title {
//         font-size: 22px;
//         font-weight: bold;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         margin-bottom: 3px;
//       }
      
//       .certificate-subtitle {
//         font-size: 16px;
//         font-weight: bold;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//       }
      
//       /* Student Information Section - Compact */
//       .student-section {
//         margin: 8mm 0;
//         padding: 0 10mm;
//       }
      
//       .student-info-container {
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-start;
//         margin-bottom: 5mm;
//       }
      
//       .student-details {
//         flex: 1;
//         margin-right: 10mm;
//       }
      
//       .student-photo-container {
//         width: 100px;
//         height: 100px;
//         border: 1px solid #000;
//         padding: 1px;
//         background: white;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         margin-left: 5mm;
//         flex-shrink: 0;
//       }
      
//       .student-photo {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
      
//       .photo-placeholder {
//         width: 100%;
//         height: 100%;
//         background: #f0f0f0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 8px;
//         color: #666;
//         text-align: center;
//         padding: 3px;
//       }
      
//       .certificate-statement {
//         font-size: 14px;
//         text-align: center;
//         margin-bottom: 4mm;
//         line-height: 1.4;
//       }

      
//       .student-name {
//         font-size: 18px;
//         font-weight: bold;
//         text-align: center;
//         margin: 3mm 0 2mm 0;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//       }
      
//       .father-name {
//         font-size: 14px;
//         text-align: center;
//         margin-bottom: 4mm;
//         font-weight: 500;
//       }
      
//       .course-info {
//         font-size: 16px;
//         font-weight: bold;
//         text-align: center;
//         margin: 4mm 0 5mm 0;
//         text-transform: uppercase;
//       }
      
//       /* Marks Information - Compact */
//       .marks-section {
//         margin: 5mm 0;
//         padding: 0 10mm;
//       }
      
//       .marks-grid {
//         display: grid;
//         grid-template-columns: repeat(2, 1fr);
//         gap: 8mm;
//         margin: 3mm 0;
//       }
      
//       .marks-item {
//         text-align: center;
//       }
      
//       .marks-label {
//         font-size: 15px;
//         color: #000;
//         margin-bottom: 2px;
//       }
      
//       .marks-value {
//         font-size: 14px;
//         font-weight: bold;
//         padding: 3px;
//         border-bottom: 1px solid #000;
//         min-height: 20px;
//       }
      
//       /* Result Summary - Compact */
//       .result-summary {
//         margin: 5mm 0;
//         padding: 3mm;
//         text-align: center;
//         border-top: 1px solid #000;
//         border-bottom: 1px solid #000;
//       }
      
//       .grade-section {
//         font-size: 14px;
//         font-weight: bold;
//         margin-bottom: 2px;
//       }
      
//       .percentage-section {
//         font-size: 16px;
//         font-weight: bold;
//         color: #000;
//         margin-bottom: 3mm;
//       }
      
//       .session-info {
//         font-size: 12px;
//         font-weight: 500;
//         margin: 2mm 0;
//       }
      
//       /* Footer Section - Compact */
//       .footer-section {
//         margin-top: 8mm;
//         padding: 0 10mm;
//       }
      
//       .signatures {
//         display: flex;
//         justify-content: space-between;
//         margin: 5mm 0 3mm 0;
//       }
      
//       .signature-box {
//         text-align: center;
//         width: 120px;
//       }
      
//       .signature-line {
//         border-top: 1px solid #000;
//         margin: 25px 0 5px 0;
//         padding-top: 5px;
//       }
      
//       .signature-label {
//         font-size: 10px;
//         font-weight: bold;
//         margin-top: 2px;
//       }
      
//       .date-section {
//         text-align: center;
//         margin-top: 5mm;
//         font-size: 12px;
//         font-weight: 500;
//       }
      
//       .college-stamp {
//         text-align: center;
//         margin-top: 3mm;
//       }
      
//       .college-stamp img {
//         max-width: 80px;
//         height: auto;
//       }
      
//       /* Logo sizes - Smaller */
//       .logo-left img {
//         width: 80px;
//         height: 80px;
//         object-fit: contain;
//       }
      
//       .logo-right img {
//         width: 80px;
//         height: 80px;
//         object-fit: contain;
//       }
      
//       /* Force single page */
//       .page-break {
//         page-break-before: always;
//       }
      
//       @media print {
//         body {
//           background: white !important;
//           -webkit-print-color-adjust: exact;
//           print-color-adjust: exact;
//           margin: 0 !important;
//           padding: 0 !important;
//           width: 210mm !important;
//           height: 297mm !important;
//         }
        
//         .certificate-container {
//           width: 180mm !important;
//           min-height: 267mm !important;
//           max-height: 267mm !important;
//           border: 2px solid #000 !important;
//           box-shadow: none !important;
//            background: linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%);
//           page-break-inside: avoid;
//           page-break-after: avoid;
//         }
        
//         .no-print {
//           display: none !important;
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <div class="certificate-container">
//       <div class="border-decorations"></div>
      
//       <!-- College Header -->
//       <div class="header-section">
//         <div class="logos">
//           <div class="logo-left">
//             <img src="${logo}" alt="College Logo" />
//           </div>
//           <div class="college-info">
//             <div class="college-name">Bharat Technical College</div>
//             <div class="college-subtitle">Of Fire Engineering & Management</div>
//             <div class="govt-info">
//               An Autonomous Body, Under Govt.Act Established Under Act 1882,
//                <div class="govt-info">
//               Registered Under Govt of U.P. & Ministry of MSME, Govt of India.
//               </div>
//               Registration No. SON/01794/2025-2026. It is also ISO Certified.
//             </div>
//             <div class="address">
//               Pusault, Robertsganj, Sonbhadra, Uttar Pradesh, India, 231216
//             </div>
//             <!---<div class="website">www.bharattechnicalcollege.com</div>
//             <div class="website">bharattechnicalcollege@gmail.com</div>--->
//           </div>
//           <div class="logo-right">
//             <img src="${ISO}" alt="ISO Certified" />
//           </div>
//         </div>
//       </div>
      
//       <!-- Certificate Title -->
//       <div class="certificate-title">
//         <div class="certificate-main-title">Certificate of Training</div>
//         <div class="certificate-subtitle">This is to Certify that</div>
//       </div>
      
//       <!-- Student Information -->
//       <div class="student-section">
//         <div class="student-info-container">
//           <div class="student-details">
//             <div class="certificate-statement">
//               This is to Certify that
//             </div>
            
//             <div class="student-name">
//               ${result?.studentName || ''}
//             </div>
            
//             <div class="father-name">
//               ${result?.fatherPrefix || 'S/O:'} ${result?.fatherName || ''}
//             </div>
            
//             <div class="certificate-statement">
//               has successfully completed
//             </div>
            
//             <div class="course-info">
//               ${result?.courseName || ''}
//             </div>
//           </div>
          
//           <!-- Student Photo -->
//           <div class="student-photo-container">
//             ${result?.photoUrl ? 
//               `<img src="${result.photoUrl}" alt="Student Photo" class="student-photo" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>';" />` : 
//               '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
//             }
//           </div>
//           <div class="student-photo-container">
//              ${result?.photoUrl ? 
//               `<img src="${VRQR}" alt="Student Photo"  class="student-photo" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>';" />` : 
//               '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
//             }
//           </div>
//         </div>
//       </div>
      
//       <!-- Marks Information -->
//       <div class="marks-section">
//         <div class="marks-grid">
//           <div class="marks-item">
//             <div class="marks-label">S. No.</div>
//             <div class="marks-value">${result?.serialNo || ''}</div>
//           </div>
          
//           <div class="marks-item">
//             <div class="marks-label">Enrollment No.</div>
//             <div class="marks-value">${result?.enrollmentNo || ''}</div>
//           </div>
          
//           <div class="marks-item">
//             <div class="marks-label">Total Marks</div>
//             <div class="marks-value">${result?.totalMarks || 0}</div>
//           </div>
          
//           <div class="marks-item">
//             <div class="marks-label">Obtained Marks</div>
//             <div class="marks-value">${result?.obtainedMarks || 0}</div>
//           </div>
//         </div>
//       </div>
      
//       <!-- Result Summary -->
//       <div class="result-summary">
//         <div class="percentage-section">
//           Percentage: ${result?.percentage || '0'}%
//         </div>
        
//         <div class="grade-section">
//           Grade: ${result?.grade || ''}
//         </div>
        
//         <div class="session-info">
//           Session: ${result?.session || ''}
//         </div>
        
//         <div class="session-info">
//           Course: ${result?.courseName || ''}
//         </div>
//       </div>
      
//       <!-- Footer with Signatures -->
//       <div class="footer-section">
//         <div class="date-section">
//           Issue Date: ${result?.certificateDate || ''}
//         </div>
        
//         <div class="signatures">
//           <div class="signature-box">
//             <div class="signature-line"></div>
//             <div class="signature-label">Teacher / Trainer</div>
//           </div>
          
//           <!---<div class="signature-box">
//             <div class="signature-label">Signature</div>
//           </div>--->

//            <div class="college-stamp">
//           <img src="${Result}" alt="College Stamp" />
//         </div>

//           <div class="signature-box">
//             <div class="signature-line"></div>
//             <div class="signature-label">Director Signature</div>
//           </div>
//         </div>
        
//        <!--- <div class="college-stamp">
//           <img src="${Result}" alt="College Stamp" />
//         </div>--->
//       </div>
//     </div>
    
//     <script>
//       window.onload = function() {
//         // Wait a bit for images to load
//         setTimeout(function() { 
//           window.print(); 
//         }, 800);
        
//         window.onafterprint = function() { 
//           setTimeout(function() { 
//             window.close(); 
//           }, 300); 
//         };
//       };
//     </script>
//   </body>
//   </html>
// `;

// const printContent =`<!DOCTYPE html>
// <html>
// <head>
//     <title>Certificate - ${result?.studentName || 'Student'}</title>
//     <meta charset="UTF-8">
//     <style>
//         @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;700&display=swap');

//         @page {
//             size: A4;
//             margin: 0;
//         }

//         body {
//             font-family: 'Crimson Text', serif;
//             background: #ccc;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//         }

//         /* Main Container */
//         .certificate-container {
//             width: 210mm;
//             height: 297mm;
//             background: white;
//             position: relative;
//             box-sizing: border-box;
//             border: 12px solid #f99b1c; /* Thick orange outer border */
//             padding: 10mm;
//             overflow: hidden;
//             -webkit-print-color-adjust: exact;
//         }

//         /* Inner Thin Border */
//         .inner-border {
//             position: absolute;
//             top: 5mm;
//             left: 5mm;
//             right: 5mm;
//             bottom: 5mm;
//             border: 1px solid #333;
//             pointer-events: none;
//         }

//         /* Corner Flourishes - Styled like the image */
//         .corner-flourish {
//             position: absolute;
//             width: 60mm;
//             height: 40mm;
//             background-repeat: no-repeat;
//             background-size: contain;
//             z-index: 5;
//         }
//         .top-left { top: 10mm; left: 10mm; transform: scaleX(1); opacity: 0.8; }
//         .top-right { top: 10mm; right: 10mm; transform: scaleX(-1); opacity: 0.8; }
//         .bottom-left { bottom: 10mm; left: 10mm; transform: scaleY(-1); opacity: 0.8; }
//         .bottom-right { bottom: 10mm; right: 10mm; transform: scale(-1); opacity: 0.8; }

//         /* Background Watermark */
//         .watermark {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             width: 140mm;
//             opacity: 0.08;
//             z-index: 0;
//             pointer-events: none;
//         }

//         /* Header Section */
//         .header {
//             text-align: center;
//             position: relative;
//             z-index: 10;
//             margin-top: 5mm;
//         }

//         .reg-info {
//             display: flex;
//             justify-content: space-between;
//             font-weight: bold;
//             font-size: 14pt;
//             padding: 0 10mm;
//             margin-bottom: 5mm;
//         }

//         .header-logo { width: 35mm; margin-bottom: 5mm; }
        
//         .hindi-title {
//             font-size: 20pt;
//             color: #1a3c6c;
//             margin: 0;
//             font-weight: bold;
//         }

//         .eng-title {
//             font-size: 22pt;
//             color: #1a3c6c;
//             margin: 2mm 0;
//             font-weight: bold;
//             text-transform: uppercase;
//         }

//         .sub-header {
//             font-size: 11pt;
//             font-weight: bold;
//             line-height: 1.4;
//         }

//         /* Certificate Title */
//         .cert-main-title {
//             font-size: 38pt;
//             font-family: 'Crimson Text', serif;
//             letter-spacing: 4px;
//             margin: 8mm 0;
//             font-weight: 700;
//             color: #333;
//         }

//         /* Body Content */
//         .content {
//             text-align: center;
//             font-size: 16pt;
//             line-height: 2;
//             padding: 0 15mm;
//             position: relative;
//             z-index: 10;
//         }

//         .dotted-line {
//             border-bottom: 1.5px dotted #000;
//             display: inline-block;
//             padding: 0 10px;
//             font-weight: bold;
//             text-transform: uppercase;
//             min-width: 60mm;
//         }

//         /* Photo & QR Placement */
//         .qr-code {
//             position: absolute;
//             top: 75mm;
//             left: 20mm;
//             width: 30mm;
//             height: 30mm;
//         }

//         .student-photo {
//             position: absolute;
//             top: 75mm;
//             right: 20mm;
//             width: 32mm;
//             height: 40mm;
//             border: 1px solid #000;
//             background: #eee;
//         }

//         .seal-overlay {
//             position: absolute;
//             bottom: -5mm;
//             right: -5mm;
//             width: 25mm;
//             opacity: 0.6;
//         }

//         /* Grades Table */
//         .grades-box {
//             position: absolute;
//             bottom: 65mm;
//             left: 20mm;
//             font-size: 10pt;
//             text-align: left;
//             line-height: 1.2;
//             font-family: 'Poppins', sans-serif;
//         }

//         /* Footer / Signatures */
//         .footer {
//             position: absolute;
//             bottom: 25mm;
//             width: 100%;
//             display: flex;
//             justify-content: space-around;
//             align-items: flex-end;
//             padding: 0 10mm;
//             box-sizing: border-box;
//         }

//         .sig-box {
//             text-align: center;
//             width: 60mm;
//         }

//         .sig-image {
//             height: 15mm;
//             margin-bottom: -2mm;
//         }

//         .sig-label {
//             border-top: 1.5px solid #000;
//             padding-top: 2mm;
//             font-weight: bold;
//             font-size: 11pt;
//             text-transform: uppercase;
//         }

//         .center-seal-large {
//             width: 35mm;
//             margin-bottom: -10mm;
//         }

//         @media print {
//             body { background: none; }
//             .certificate-container { border: 12px solid #f99b1c !important; }
//         }
//     </style>
// </head>
// <body>
//     <div class="certificate-container">
//         <div class="corner-flourish top-left">🌸</div>
//         <div class="corner-flourish top-right">🌸</div>
//         <div class="corner-flourish bottom-left">🌸</div>
//         <div class="corner-flourish bottom-right">🌸</div>
        
//         <div class="inner-border"></div>

//         <img src="${logo}" class="watermark" alt="watermark">

//         <div class="reg-info">
//             <div>रजि संख्या/Register No. &nbsp; <span style="font-family: sans-serif;">${result?.enrollmentNo || 'NSDVE100984168'}</span></div>
//             <div>दिनांक/Date : &nbsp; <span style="font-family: sans-serif;">${result?.certificateDate || '2023-06-28'}</span></div>
//         </div>

//         <div class="header">
//             <img src="${logo}" class="header-logo" alt="Logo">
//             <h2 class="hindi-title">व्यवसायिक शिक्षा के लिए राष्ट्रीय कौशल विकास</h2>
//             <h1 class="eng-title">National Skill Development for Vocational Education</h1>
//             <div class="sub-header">
//                 An Autonomous, in Collaboration with Skill Council For Vocational Education, Govt of India<br>
//                 In Associated with NCVTE Foundation, Incorporated with Government of India
//             </div>
//             <h1 class="cert-main-title">CERTIFICATE</h1>
//         </div>

//         <div class="qr-code">
//             <img src="${VRQR}" style="width:100%;" alt="QR">
//         </div>

//         <div class="student-photo">
//             <img src="${result?.photoUrl || ''}" style="width:100%; height:100%; object-fit: cover;" onerror="this.style.display='none'">
//             <img src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png" class="seal-overlay">
//         </div>

//         <div class="content">
//             <p>This is to certify that <span class="dotted-line" style="min-width: 90mm;">&nbsp; ${result?.studentName || ''} &nbsp;</span></p>
//             <p>has successfully completed the</p>
//             <p><span class="dotted-line" style="min-width: 130mm;">&nbsp; ${result?.courseName || 'DIPLOMA IN FIRE AND INDUSTRIAL SAFETY'} &nbsp;</span></p>
//             <p>conducted in the year <span class="dotted-line" style="min-width: 80mm;">&nbsp; ${result?.session || '01-07-2022 to 01-06-2023'} &nbsp;</span></p>
//             <p>at our Authorised Training Centre</p>
//             <p><span class="dotted-line" style="min-width: 110mm;">&nbsp; WORLD TECHNICAL INSTITUTE &nbsp;</span></p>
            
//             <div style="margin-top: 10mm; line-height: 1.8;">
//                 <p>and has been placed in <span class="dotted-line" style="min-width: 50mm;">&nbsp; ${result?.grade || 'DISTINCTION'} &nbsp;</span> Division</p>
//                 <p>with <span class="dotted-line" style="min-width: 50mm;">&nbsp; DISTINCTION &nbsp;</span> Division in Theory and</p>
//                 <p><span class="dotted-line" style="min-width: 50mm;">&nbsp; DISTINCTION &nbsp;</span> Division in Practicals.</p>
//             </div>
//         </div>

//         <div class="grades-box">
//             AA &nbsp;&nbsp;&nbsp; - Absent<br>
//             <=39% - Fail<br>
//             40% &nbsp;&nbsp; - Third Class<br>
//             41% to 59% - Second Class<br>
//             60% to 79% - First Class<br>
//             >=80% - Distinction
//         </div>

//         <div class="footer">
//             <div class="sig-box">
//                 <img src="${result?.directorSig || ''}" class="sig-image" alt=" ">
//                 <div class="sig-label">
//                     निदेशक<br>
//                     Director (Academic)
//                 </div>
//             </div>

//             <img src="${logo}" class="center-seal-large" alt="seal">

//             <div class="sig-box">
//                 <img src="${result?.controllerSig || ''}" class="sig-image" alt=" ">
//                 <div class="sig-label">
//                     परीक्षा नियंत्रक<br>
//                     Controller of Examinations
//                 </div>
//             </div>
//         </div>
//     </div>
// </body>
// </html>`;

// Replace the existing printContent variable inside handlePrint() with this:

const printContent = `<!DOCTYPE html>
<html>
<head>
    <title>Certificate - ${result?.studentName || 'Student'}</title>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Montserrat:wght@400;600&family=Crimson+Text:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Poppins', sans-serif;
            background: #888;
            width: 210mm;
            height: 297mm;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .cert-wrap {
            width: 210mm;
            height: 297mm;
            background: #fff;
            position: relative;
            overflow: hidden;
            border: 14px solid #e87c1e;
        }

        /* Thin inner border */
        .cert-wrap::before {
            content: '';
            position: absolute;
            inset: 6px;
            border: 1.5px solid #c8922a;
            pointer-events: none;
            z-index: 2;
        }

        /* Watermark text fill */
        .watermark-layer {
            position: absolute;
            inset: 0;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            padding: 10px;
            pointer-events: none;
            overflow: hidden;
        }
        .watermark-layer span {
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: rgba(0,0,0,0.045);
            white-space: nowrap;
            margin: 0 4px;
            line-height: 1.8;
        }

        /* Corner ornaments using CSS */
        .corner {
            position: absolute;
            margin-top:10px;
            width: 55px;
            height: 55px;
            z-index: 3;
        }
        .corner svg { width: 100%; height: 100%; }
        .corner-tl { top: 14px; left: 14px; }
        .corner-tr { top: 14px; right: 14px; transform: scaleX(-1); }
        .corner-bl { bottom: 14px; left: 14px; transform: scaleY(-1); }
        .corner-br { bottom: 14px; right: 14px; transform: scale(-1); }

        /* Main content */
        .content {
            position: relative;
            z-index: 10;
            padding: 18px 28px 12px 28px;
        }

        /* Top row: reg no and date */
        .top-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12pt;
            font-weight: 600;
            color: #1a1a1a;
            margin-top:50px;
            margin-bottom: 10px;
            font-family: 'Poppins', sans-serif;
        }

        /* Header 
     .header {
        display: flex;
        /* Ensures vertical centering */
        align-items: center; 
        /* Ensures the logo and text stay within the A4 width */
        width: 100%;
        max-width: 190mm; 
        
        margin: 20px auto;
        gap: 20px;
        /* Important for print: ensures flex isn't broken by overflow */
        box-sizing: border-box;
    }

    .header-logo {
        /* Specific dimensions ensure it shows up */
        width: 120px; 
        height: 120px;
        min-width: 110px; /* Prevents flex-shrink from squishing the logo */
        object-fit: contain;
        filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.1));
    }

    .header-text {
        text-align: center;
        margin-top:20px;
        /* Takes up the remaining space */
        flex: 1; 
    }

    .eng-title {
        font-family: 'Cinzel', serif;
        font-size: 20pt; /* Slightly reduced for better fit */
        font-weight: 700;
        color: #1a3a6b;
        text-transform: uppercase;
        margin: 0;
        letter-spacing: 1px;
    }

    .dept-title {
        font-family: 'Crimson Text', serif;
        font-size: 14pt;
        font-weight: 600;
        font-style: italic;
        color: #d35400;
        margin: 2px 0;
    }

    .divider {
        height: 1.5px;
        background: linear-gradient(to right, transparent, #1a3a6b, transparent);
        margin: 8px auto;
        width: 90%;
    }

    .sub-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 7.5pt;
        color: #030E3A;
        line-height: 1.4;
        text-transform: uppercase;
    }
    
    /* Ensure paragraphs inside sub-title don't have huge margins */
    .sub-title p {
        margin: 2px 0;
    }
        .header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 25px;
        margin-top: 20px;
        margin-bottom: 15px;
        padding: 0 20px;
    }

    .header-logo {
        width: 120px;
        height: 120px;
        object-fit: contain;
        flex-shrink: 0;
        /* Adds a subtle professional shadow to the logo 
        filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.1));*/
    }

    .header-text {
        text-align: center;
        flex-grow: 1;
    }

    .eng-title {
        font-family: 'Cinzel', serif; /* Classic, prestigious font for institutions */
        font-size: 22pt;
        font-weight: 700;
        color: #1a3a6b;
        text-transform: uppercase;
        margin: 0;
        letter-spacing: 1px;
        line-height: 1.1;
    }

    .dept-title {
        font-family: 'Crimson Text', serif;
        font-size: 15pt;
        font-weight: 600;
        font-style: italic;
        color: #d35400; /* Subtle contrast color (Deep Orange/Gold) */
        margin: 5px 0;
    }

    .divider {
        height: 2px;
        background: linear-gradient(to right, transparent, #1a3a6b, transparent);
        margin: 8px auto;
        width: 80%;
    }

    .sub-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 8pt;
        color: #030E3A;
        line-height: 1.6;
        margin-top: 5px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }

    .sub-title strong {
        color: #000;
        font-weight: 600;
    }

        /* CERTIFICATE big word */
        .cert-title-box {
            text-align: center;
            margin: 10px 0 8px 0;
        }
        .cert-title-word {
            font-family: 'Crimson Text', serif;
            font-size: 46pt;
            font-weight: 700;
            letter-spacing: 4px;
            color: #b5610a;
            line-height: 1.1;
        }

        /* Photo + QR row */
        .media-row {
            display: flex;
           
            justify-content: space-between;
            align-items: flex-start;
            
            margin: 12px 10px 8px 10px;
        }
        .qr-box {
            width: 120px;
            height: 120px;
            flex-shrink: 0;
        }
        .qr-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .photo-box {
            width: 90px;
            height: 105px;
            border: 2px solid #444;
            overflow: hidden;
            position: relative;
            flex-shrink: 0;
            background: #eee;
        }
        .photo-box img.student-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .photo-box img.seal-stamp {
            position: absolute;
            bottom: -6px;
            right: -6px;
            width: 40px;
            opacity: 0.55;
        }
        .no-photo-text {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 7pt;
            color: #888;
            text-align: center;
            padding: 4px;
        }
.media-row {
        display: flex;
        justify-content: space-between;
        align-items: center; /* Changed to center for better title alignment */
        margin: 20px 40px;
        position: relative;
    }

    /* QR Section */
    .qr-container {
        text-align: center;
        flex: 1;
        display: flex;
        gap:10px;
        flex-direction: column;
        align-items: flex-start;
    }
    .qr-box {
        width: 85px;
        height: 85px;
        padding: 5px;
       
        background: #fff;
    }
   

    /* Title Section */
    .title-container {
        flex: 2;
        text-align: center;
    }
    .cert-title-word {
        font-family: 'Cinzel', serif; /* Matching the college header */
        font-size: 42pt;
        font-weight: 700;
        letter-spacing: 6px;
        color: #1a3a6b; /* Matching College Blue */
        line-height: 1;
        margin: 0;
    }
    .title-underline {
        height: 3px;
        width: 60%;
        background: linear-gradient(to right, transparent, #b5610a, transparent);
        margin: 10px auto 0;
    }

    /* Photo Section */
    .photo-container {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
    .photo-box {
        width: 100px;
        height: 125px;
        border: 3px double #b5610a; /* Double border for diploma look */
        overflow: hidden;
        position: relative;
        background: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .student-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    

    .no-photo-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 7pt;
        color: #999;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

        /* Body text - certificate content */
      .cert-body {
        font-family: 'Crimson Text', serif;
        font-size: 15pt; /* Reduced slightly to fit more lines */
        line-height: 1.9;
        text-align: center;
        padding: 0 40px;
        color: #111;
        margin-top: 24px;
    }

    .cert-row {
        margin-bottom: 5px;
    }

    .cert-body .dotted {
        display: inline-block;
        border-bottom: 1.5px dotted #333;
        padding: 0 8px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13pt;
        min-width: 110px;
        vertical-align: baseline;
        color: #000;
    }

    .cert-body .dotted-wide { min-width: 280px; }

    /* Score Summary Box */
    .division-section {
        margin-top: 15px;
        padding: 0 50px;
        text-align: center;
    }

    .score-summary {
        display: flex;
        justify-content: center;
        gap: 30px;
        background: rgba(26, 58, 107, 0.05); /* Very light blue tint */
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        font-family: 'Montserrat', sans-serif;
        font-size: 11pt;
    }

    .score-item strong {
        color: #1a3a6b;
        font-size: 12pt;
    }

    .grade-text {
        font-family: 'Crimson Text', serif;
        font-size: 14pt;
        line-height: 1.5;
    }

    .grade-text .dotted-sm {
        display: inline-block;
        border-bottom: 1.5px dotted #333;
        padding: 0 10px;
        font-weight: 700;
        min-width: 80px;
    }

    /* Grade key adjustment for A4 bottom */
    .grade-key {
        font-family: 'Montserrat', sans-serif;
        font-size: 7pt;
        line-height: 1.6;
        color: #444;
        position: absolute;
        bottom: 45mm; /* Adjusted for A4 printing */
        left: 20mm;
        text-align: left;
    }

        /* Footer signatures */
        .footer {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            margin-bottom:40px;
            padding: 0 20px;
            z-index: 10;
        }
        .sig-block {
            text-align: center;
            width: 130px;
        }
        .sig-img {
            height: 38px;
            margin-bottom: -2px;
            opacity: 0.85;
        }
        .sig-line {
            border-top: 1.5px solid #222;
            padding-top: 4px;
            margin-top: 2px;
        }
        .sig-hindi {
            font-family: 'Poppins', sans-serif;
            font-size: 9pt;
            font-weight: 600;
            color: #111;
            line-height: 1.4;
        }
        .sig-eng {
            font-family: 'Poppins', sans-serif;
            font-size: 8.5pt;
            font-weight: 700;
            color: #111;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .center-seal {
            text-align: center;
        }
        .center-seal img {
            width: 100px;
            height: 100px;
            object-fit: contain;
        }

        @media print {
            body { background: none; }
            .cert-wrap { border: 14px solid #e87c1e !important; }
        }
    </style>
</head>
<body>
<div class="cert-wrap">

    <!-- Watermark layer -->
    <div class="watermark-layer">
        ${Array(120).fill('<span>BTFESM</span>').join('')}
    </div>

    <!-- Corner ornaments -->
    <div class="corner corner-tl">
        <svg viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M2 2 Q28 2 28 28 Q28 2 54 2" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <path d="M2 2 Q2 28 28 28 Q2 28 2 54" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <circle cx="2" cy="2" r="3.5" fill="#e87c1e"/>
            <circle cx="28" cy="28" r="5" fill="none" stroke="#e87c1e" stroke-width="2"/>
            <path d="M8 2 Q18 2 18 12" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <path d="M2 8 Q2 18 12 18" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <circle cx="5" cy="5" r="1.5" fill="#c8922a" opacity="0.5"/>
            <circle cx="14" cy="2" r="1.2" fill="#c8922a" opacity="0.4"/>
            <circle cx="2" cy="14" r="1.2" fill="#c8922a" opacity="0.4"/>
        </svg>
    </div>
    <div class="corner corner-tr">
        <svg viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M2 2 Q28 2 28 28 Q28 2 54 2" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <path d="M2 2 Q2 28 28 28 Q2 28 2 54" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <circle cx="2" cy="2" r="3.5" fill="#e87c1e"/>
            <circle cx="28" cy="28" r="5" fill="none" stroke="#e87c1e" stroke-width="2"/>
            <path d="M8 2 Q18 2 18 12" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <path d="M2 8 Q2 18 12 18" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <circle cx="5" cy="5" r="1.5" fill="#c8922a" opacity="0.5"/>
            <circle cx="14" cy="2" r="1.2" fill="#c8922a" opacity="0.4"/>
            <circle cx="2" cy="14" r="1.2" fill="#c8922a" opacity="0.4"/>
        </svg>
    </div>
    <div class="corner corner-bl">
        <svg viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M2 2 Q28 2 28 28 Q28 2 54 2" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <path d="M2 2 Q2 28 28 28 Q2 28 2 54" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <circle cx="2" cy="2" r="3.5" fill="#e87c1e"/>
            <circle cx="28" cy="28" r="5" fill="none" stroke="#e87c1e" stroke-width="2"/>
            <path d="M8 2 Q18 2 18 12" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <path d="M2 8 Q2 18 12 18" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <circle cx="5" cy="5" r="1.5" fill="#c8922a" opacity="0.5"/>
            <circle cx="14" cy="2" r="1.2" fill="#c8922a" opacity="0.4"/>
            <circle cx="2" cy="14" r="1.2" fill="#c8922a" opacity="0.4"/>
        </svg>
    </div>
    <div class="corner corner-br">
        <svg viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M2 2 Q28 2 28 28 Q28 2 54 2" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <path d="M2 2 Q2 28 28 28 Q2 28 2 54" stroke="#c8922a" stroke-width="2.5" fill="none"/>
            <circle cx="2" cy="2" r="3.5" fill="#e87c1e"/>
            <circle cx="28" cy="28" r="5" fill="none" stroke="#e87c1e" stroke-width="2"/>
            <path d="M8 2 Q18 2 18 12" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <path d="M2 8 Q2 18 12 18" stroke="#c8922a" stroke-width="1" fill="none" opacity="0.6"/>
            <circle cx="5" cy="5" r="1.5" fill="#c8922a" opacity="0.5"/>
            <circle cx="14" cy="2" r="1.2" fill="#c8922a" opacity="0.4"/>
            <circle cx="2" cy="14" r="1.2" fill="#c8922a" opacity="0.4"/>
        </svg>
    </div>

    <!-- Main content -->
    <div class="content">

        <!-- Reg No + Date -->
        <div class="top-meta">
            <div>रजि संख्या/Register No. &nbsp;&nbsp;<span>${result?.enrollmentNo || 'NSDVE100984168'}</span></div>
            <div>दिनांक/Date : &nbsp;&nbsp;<span>${result?.certificateDate || ''}</span></div>
        </div>

        <!-- Header -->
        <div class="header">
    <img src="${logo}" class="header-logo" alt="Logo">
    
    <div class="header-text">
        <h1 class="eng-title">Bharat Technical College</h1>
        <h2 class="dept-title">Of Fire Engineering & Safety Management</h2>
        
        <div class="divider"></div>
        
        <div class="sub-title">
            <p>An Autonomous Body Established Under Act 1882 • Registered Under Govt. of U.P. & Ministry of MSME, Govt. of India</p>
            <p><strong>Registration No:</strong> SON/01794/2025-2026 • <strong>ISO Certified Institution</strong></p>
        </div>
    </div>
</div>
  <!-- CERTIFICATE title -->
        
        <!-- QR left, Photo right -->
       <div class="media-row">
    <div class="qr-container">
        <div class="qr-box">
            <img src="${VRQR}" alt="QR Code">
        </div>
        
    </div>
    
    <div class="title-container">
        <div class="cert-title-word">CERTIFICATE</div>
        <div class="title-underline"></div>
    </div>

    <div class="photo-container">
        <div class="photo-box">
            ${result?.photoUrl
                ? `<img class="student-photo" src="${result.photoUrl}" alt="Student Photo"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="no-photo-text" style="display:none;">Photo<br>Not Available</div>`
                : '<div class="no-photo-text">Photo Not Available</div>'
            }
            
        </div>
    </div>
</div>

        <!-- Certificate body text -->
       <div class="cert-body">
    <div class="cert-row">
        This is to certify that <span class="dotted dotted-wide">&nbsp;${result?.studentName || ''}&nbsp;</span>
    </div>
    
    <div class="cert-row">
        S/o, D/o <span class="dotted dotted-wide">&nbsp;${result?.fatherName || ''}&nbsp;</span>
    </div>

    <div class="cert-row">has successfully completed the</div>
    
    <div class="cert-row">
        <span class="dotted dotted-wide">&nbsp;${result?.courseName || 'DIPLOMA IN FIRE AND INDUSTRIAL SAFETY'}&nbsp;</span>
    </div>

    <div class="cert-row">
        Course Duration <span class="dotted">&nbsp;${result?.courseDuration || '6 Months'}&nbsp;</span> 
        conducted in the session <span class="dotted">&nbsp;${result?.session || ''}&nbsp;</span>
    </div>

    <div class="cert-row">at our Authorised Training Centre</div>
    <div class="cert-row"><span class="dotted dotted-wide">&nbsp;BHARAT TECHNICAL COLLEGE&nbsp;</span></div>
</div>

<div class="division-section">
    <div class="score-summary">
        <div class="score-item">Total Marks: <strong>${result?.totalMarks || '200'}</strong></div>
        <div class="score-item">Marks Obtained: <strong>${result?.obtainedMarks || '0'}</strong></div>
        <div class="score-item">Percentage: <strong>${result?.percentage || '0'}%</strong></div>
    </div>

    <div class="grade-text">
        and has been placed in <span class="dotted dotted-sm">&nbsp;${result?.grade || 'A'}&nbsp;</span> Division
    </div>
</div>
    </div><!-- end .content -->

    <!-- Grade key bottom-left 
    <div class="grade-key">
        AA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Absent<br>
        &lt;=39% &nbsp; - Fail<br>
        40% &nbsp;&nbsp;&nbsp;&nbsp; - Third Class<br>
        41% to 59% - Second Class<br>
        60% to 79% - First Class<br>
        &gt;=80% &nbsp;&nbsp; - Distinction
    </div>-->

    <!-- Footer signatures -->
    <div class="footer">
        <div class="sig-block">
            <img src="${result?.directorSig || ''}" class="sig-img" alt="" onerror="this.style.display='none'">
            <div class="sig-line">
                <div class="sig-hindi">निदेशक</div>
                <div class="sig-eng">Director (Academic)</div>
            </div>
        </div>

        <div class="center-seal">
            <img src="${Result}" alt="Seal">
        </div>

        <div class="sig-block">
            <img src="${result?.controllerSig || ''}" class="sig-img" alt="" onerror="this.style.display='none'">
            <div class="sig-line">
                <div class="sig-hindi">परीक्षा नियंत्रक</div>
                <div class="sig-eng">Controller of Examinations</div>
            </div>
        </div>
    </div>

</div><!-- end .cert-wrap -->

<script>
    window.onload = function() {
        var imgs = document.querySelectorAll('img');
        var loaded = 0;
        function tryPrint() {
            loaded++;
            if (loaded >= imgs.length) {
                setTimeout(function() { window.print(); }, 400);
            }
        }
        if (imgs.length === 0) {
            setTimeout(function() { window.print(); }, 400);
        } else {
            imgs.forEach(function(img) {
                if (img.complete) { tryPrint(); }
                else { img.onload = tryPrint; img.onerror = tryPrint; }
            });
        }
        window.onafterprint = function() {
            setTimeout(function() { window.close(); }, 300);
        };
    };
</script>
</body>
</html>`;

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
                Of Fire Engineering & Management
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
              Search Student Certificate
            </h2>
            <p style={{ color: '#64748b' }}>Enter enrollment or serial number to view training certificate</p>
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
                placeholder={searchType === "enrollment" ? "Enter Enrollment Number (e.g., ADM076XXXXXXX20)" : "Enter Serial Number (e.g., BT01AXXXX1)"}
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
                    Search Certificate
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

        {/* Certificate Preview */}
        {result && (
          <>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              border: '4px double #b8860b',
              marginBottom: '2rem',
              padding: '2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                  <img src={logo} alt="College Logo" style={{ width: '80px', height: '80px' }} />
                  <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                      BHARAT TECHNICAL COLLEGE
                    </h1>
                    <h2 style={{ fontSize: '1.125rem', color: '#1a1a2e' }}>
                      Of Fire Engineering & Management
                    </h2>
                  </div>
                  <img src={ISO} alt="ISO Certified" style={{ width: '70px', height: '70px' }} />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1.5rem' }}>
                  CERTIFICATE OF TRAINING
                </h3>
                
                <div style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '1rem' }}>
                  This is to Certify that
                </div>
                
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                  {result.studentName}
                </div>
                
                <div style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2rem' }}>
                  {result.fatherPrefix || 'S/O:'} {result.fatherName}
                </div>
                
                <div style={{ fontSize: '1.25rem', color: '#64748b', margin: '2rem 0' }}>
                  has successfully completed
                </div>
                
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '2rem' }}>
                  {result.courseName}
                </div>

                {/* Student Photo Preview */}
                <div style={{
                  margin: '2rem auto',
                  width: '120px',
                  height: '150px',
                  border: '3px solid #1a1a2e',
                  padding: '3px',
                  background: 'white',
                  overflow: 'hidden'
                }}>
                  {result.photoUrl ? (
                    <img
                      src={result.photoUrl}
                      alt="Student"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;"><div style="text-align:center;color:#64748b;font-size:12px;">Photo Not Available</div></div>';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px' }}>Photo Not Available</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Serial No.</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.serialNo}</div>
                </div>
                
                <div style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Enrollment No.</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.enrollmentNo}</div>
                </div>
                
                <div style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Total Marks</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.totalMarks}</div>
                </div>
                
                <div style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Obtained Marks</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>{result.obtainedMarks}</div>
                </div>
              </div>

              {/* Result Summary */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #93c5fd',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Percentage</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d4ed8' }}>{result.percentage}%</div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginTop: '1rem' }}>
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
                  borderRadius: '8px',
                  border: '1px solid #86efac',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Grade</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>{result.grade}</div>
                </div>
              </div>

              {/* Session Info */}
              <div style={{ 
                background: '#faf5ff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #d8b4fe',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                  Session: {result.session}
                </div>
                <div style={{ fontSize: '1rem', color: '#6b7280' }}>
                  Issue Date: {result.certificateDate}
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
                    Print Certificate
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
              Search Student Certificate
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>
              Enter enrollment number or serial number to view the official certificate
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              Demo: Try <strong>ADM076XXXXXX20</strong> or <strong>BT01AXXXX1</strong>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Certificate ;