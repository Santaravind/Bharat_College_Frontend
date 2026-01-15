
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
    
    const printContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Certificate - ${result?.studentName || 'Student'}</title>
    <meta charset="UTF-8">
    <style>
      @page {
        size: A4;
        margin: 15mm;
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
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 0;
      }
      
      .certificate-container {
        width: 180mm;
        min-height: 267mm;
        max-height: 267mm;
        margin: 0 auto;
        padding: 10mm 15mm;
        position: relative;
        background: white;
        border: 2px solid #000;
        overflow: hidden;
      }
        /*water marks*/
      .certificate-container::after {
  content: "BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM  BTCFSM BTCFSM BTCFSM BTCFSM ";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: rgba(0,0,0,0.03);
  
  pointer-events: none;
  z-index:1;
}

      /* Certificate border design */
      .border-decorations {
        position: absolute;
        top: 5mm;
        left: 5mm;
        right: 5mm;
        bottom: 5mm;
        border: 2px solid #000;
        pointer-events: none;
      }
      
      /* Header Section - Compact */
      .header-section {
        text-align: center;
        margin-bottom: 5mm;
      }
      
      .logos {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3mm;
      }
      
      .college-name {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        margin-bottom: 2px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .college-subtitle {
        font-size: 16px;
         font-family: 'Playfair Display', serif;
        font-weight: bold;
        color: #000;
        margin-bottom: 3px;
        letter-spacing: 0.5px;
      }
      
      .govt-info {
        font-size: 12px;
        color: #000;
        margin-bottom: 2px;
        line-height: 1.2;
      }
      
      .address {
        font-size: 12px;
        color: #000;
        margin-bottom: 3px;
        font-weight: 500;
      }
      
      .website {
        font-size: 8px;
        color: #000;
        margin-bottom: 2px;
      }
      
      /* Certificate Title */
      .certificate-title {
        text-align: center;
        margin: 10mm 0 8mm 0;
        border-top: 2px solid #000;
        border-bottom: 2px solid #000;
        padding: 4mm 0;
      }
      
      .certificate-main-title {
        font-size: 22px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 3px;
      }
      
      .certificate-subtitle {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Student Information Section - Compact */
      .student-section {
        margin: 8mm 0;
        padding: 0 10mm;
      }
      
      .student-info-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5mm;
      }
      
      .student-details {
        flex: 1;
        margin-right: 10mm;
      }
      
      .student-photo-container {
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        padding: 1px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5mm;
        flex-shrink: 0;
      }
      
      .student-photo {
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
        font-size: 8px;
        color: #666;
        text-align: center;
        padding: 3px;
      }
      
      .certificate-statement {
        font-size: 14px;
        text-align: center;
        margin-bottom: 4mm;
        line-height: 1.4;
      }

      
      .student-name {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin: 3mm 0 2mm 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .father-name {
        font-size: 14px;
        text-align: center;
        margin-bottom: 4mm;
        font-weight: 500;
      }
      
      .course-info {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin: 4mm 0 5mm 0;
        text-transform: uppercase;
      }
      
      /* Marks Information - Compact */
      .marks-section {
        margin: 5mm 0;
        padding: 0 10mm;
      }
      
      .marks-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8mm;
        margin: 3mm 0;
      }
      
      .marks-item {
        text-align: center;
      }
      
      .marks-label {
        font-size: 15px;
        color: #000;
        margin-bottom: 2px;
      }
      
      .marks-value {
        font-size: 14px;
        font-weight: bold;
        padding: 3px;
        border-bottom: 1px solid #000;
        min-height: 20px;
      }
      
      /* Result Summary - Compact */
      .result-summary {
        margin: 5mm 0;
        padding: 3mm;
        text-align: center;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
      }
      
      .grade-section {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;
      }
      
      .percentage-section {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        margin-bottom: 3mm;
      }
      
      .session-info {
        font-size: 12px;
        font-weight: 500;
        margin: 2mm 0;
      }
      
      /* Footer Section - Compact */
      .footer-section {
        margin-top: 8mm;
        padding: 0 10mm;
      }
      
      .signatures {
        display: flex;
        justify-content: space-between;
        margin: 5mm 0 3mm 0;
      }
      
      .signature-box {
        text-align: center;
        width: 120px;
      }
      
      .signature-line {
        border-top: 1px solid #000;
        margin: 25px 0 5px 0;
        padding-top: 5px;
      }
      
      .signature-label {
        font-size: 10px;
        font-weight: bold;
        margin-top: 2px;
      }
      
      .date-section {
        text-align: center;
        margin-top: 5mm;
        font-size: 12px;
        font-weight: 500;
      }
      
      .college-stamp {
        text-align: center;
        margin-top: 3mm;
      }
      
      .college-stamp img {
        max-width: 80px;
        height: auto;
      }
      
      /* Logo sizes - Smaller */
      .logo-left img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
      
      .logo-right img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
      
      /* Force single page */
      .page-break {
        page-break-before: always;
      }
      
      @media print {
        body {
          background: white !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          margin: 0 !important;
          padding: 0 !important;
          width: 210mm !important;
          height: 297mm !important;
        }
        
        .certificate-container {
          width: 180mm !important;
          min-height: 267mm !important;
          max-height: 267mm !important;
          border: 2px solid #000 !important;
          box-shadow: none !important;
           background: linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%);
          page-break-inside: avoid;
          page-break-after: avoid;
        }
        
        .no-print {
          display: none !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <div class="border-decorations"></div>
      
      <!-- College Header -->
      <div class="header-section">
        <div class="logos">
          <div class="logo-left">
            <img src="${logo}" alt="College Logo" />
          </div>
          <div class="college-info">
            <div class="college-name">Bharat Technical College</div>
            <div class="college-subtitle">Of Fire Engineering & Management</div>
            <div class="govt-info">
              An Autonomous Body, Under Govt.Act Established Under Act 1882,
               <div class="govt-info">
              Registered Under Govt of U.P. & Ministry of MSME, Govt of India.
              </div>
              Registration No. SON/01794/2025-2026. It is also ISO Certified.
            </div>
            <div class="address">
              Pusault, Robertsganj, Sonbhadra, Uttar Pradesh, India, 231216
            </div>
            <!---<div class="website">www.bharattechnicalcollege.com</div>
            <div class="website">bharattechnicalcollege@gmail.com</div>--->
          </div>
          <div class="logo-right">
            <img src="${ISO}" alt="ISO Certified" />
          </div>
        </div>
      </div>
      
      <!-- Certificate Title -->
      <div class="certificate-title">
        <div class="certificate-main-title">Certificate of Training</div>
        <div class="certificate-subtitle">This is to Certify that</div>
      </div>
      
      <!-- Student Information -->
      <div class="student-section">
        <div class="student-info-container">
          <div class="student-details">
            <div class="certificate-statement">
              This is to Certify that
            </div>
            
            <div class="student-name">
              ${result?.studentName || ''}
            </div>
            
            <div class="father-name">
              ${result?.fatherPrefix || 'S/O:'} ${result?.fatherName || ''}
            </div>
            
            <div class="certificate-statement">
              has successfully completed
            </div>
            
            <div class="course-info">
              ${result?.courseName || ''}
            </div>
          </div>
          
          <!-- Student Photo -->
          <div class="student-photo-container">
            ${result?.photoUrl ? 
              `<img src="${result.photoUrl}" alt="Student Photo" class="student-photo" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>';" />` : 
              '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
            }
          </div>
          <div class="student-photo-container">
             ${result?.photoUrl ? 
              `<img src="${VRQR}" alt="Student Photo"  class="student-photo" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>';" />` : 
              '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
            }
          </div>
        </div>
      </div>
      
      <!-- Marks Information -->
      <div class="marks-section">
        <div class="marks-grid">
          <div class="marks-item">
            <div class="marks-label">S. No.</div>
            <div class="marks-value">${result?.serialNo || ''}</div>
          </div>
          
          <div class="marks-item">
            <div class="marks-label">Enrollment No.</div>
            <div class="marks-value">${result?.enrollmentNo || ''}</div>
          </div>
          
          <div class="marks-item">
            <div class="marks-label">Total Marks</div>
            <div class="marks-value">${result?.totalMarks || 0}</div>
          </div>
          
          <div class="marks-item">
            <div class="marks-label">Obtained Marks</div>
            <div class="marks-value">${result?.obtainedMarks || 0}</div>
          </div>
        </div>
      </div>
      
      <!-- Result Summary -->
      <div class="result-summary">
        <div class="percentage-section">
          Percentage: ${result?.percentage || '0'}%
        </div>
        
        <div class="grade-section">
          Grade: ${result?.grade || ''}
        </div>
        
        <div class="session-info">
          Session: ${result?.session || ''}
        </div>
        
        <div class="session-info">
          Course: ${result?.courseName || ''}
        </div>
      </div>
      
      <!-- Footer with Signatures -->
      <div class="footer-section">
        <div class="date-section">
          Issue Date: ${result?.certificateDate || ''}
        </div>
        
        <div class="signatures">
          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="signature-label">Teacher / Trainer</div>
          </div>
          
          <!---<div class="signature-box">
            <div class="signature-label">Signature</div>
          </div>--->

           <div class="college-stamp">
          <img src="${Result}" alt="College Stamp" />
        </div>

          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="signature-label">Director Signature</div>
          </div>
        </div>
        
       <!--- <div class="college-stamp">
          <img src="${Result}" alt="College Stamp" />
        </div>--->
      </div>
    </div>
    
    <script>
      window.onload = function() {
        // Wait a bit for images to load
        setTimeout(function() { 
          window.print(); 
        }, 800);
        
        window.onafterprint = function() { 
          setTimeout(function() { 
            window.close(); 
          }, 300); 
        };
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
                placeholder={searchType === "enrollment" ? "Enter Enrollment Number (e.g., ADM076211178720)" : "Enter Serial Number (e.g., BT01A00001)"}
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
              Demo: Try <strong>ADM076211178720</strong> or <strong>BT01A00001</strong>
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