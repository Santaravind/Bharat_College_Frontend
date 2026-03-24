


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
import logo from '../assets/logonobg.png'
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
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const AdminResult = () => {
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
        console.log(data);//new
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
      // studentName: data["Student Name"] || data.studentName || "",
      // fatherName: data["Father Name"] || data.fatherName || "",
      // dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth),
      // photoUrl: data["Photo Url"] || data.photoUrl || "",
      // enrollmentNo: data["Enrollment No"] || data.enrollmentNo || "",
      // serialNo: data["Serial No"] || data.serialNo || "",
      // courseName: data["Course Name"] || data.courseName || "",
      // session: data.Session || data.session || "",
      // percentage,
      // grade,
      // subjects: subjectsWithWords,
      // totalMarks,
      // obtainedMarks,
      // totalInWords: convertToWords(obtainedMarks),
      // institutionName: "BHARAT TECHNICAL COLLEGE",
      // institutionAddress: "Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216",
      // // centreCode: "UP/504",
      // certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
      // courseDuration: "ONE YEAR"
      studentName: data["Student Name"] || data.studentName || "",
  fatherName: data["Father Name"] || data.fatherName || "",
  dateOfBirth: formatDate(data["Date of Birth"] || data.dateOfBirth),
  photoUrl: data["Photo Url"] || data.photoUrl || "",
  enrollmentNo: data["Enrollment No"] || data.enrollmentNo || "",
  serialNo: data["Serial No"] || data.serialNo || "",
  rollNo: data["Roll No"] || data.rollNo || "", // ADD THIS
  courseName: data["Course Name"] || data.courseName || "",
  session: data.Session || data.session || "",
  examinationCenter: data["Examination Center"] || data.examinationCenter || "", // ADD THIS
  percentage:data["Percentage"] ||data.percentage||"",
 grade: data["Grade"] || data.grade || "",
  subjects: subjectsWithWords.map((subject, index) => ({
    ...subject,
    // Add codes from original data if available
    code: data.subjects?.[index]?.subjectCode || `SUB${String(index + 1).padStart(3, '0')}`,
    theory: subject.type === 'theory' ? subject.obtainedMarks : subject.obtainedMarks,
    practical: subject.type === 'practical' ? subject.obtainedMarks : '-'
  })),
  totalMarks,
  obtainedMarks,
  totalInWords: convertToWords(obtainedMarks),
  institutionName: "BHARAT TECHNICAL COLLEGE",
  institutionAddress: "Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216",
  centreCode: data["Examination Center"] || "JH/NCVTE/N1047669", // ADD THIS
  certificateDate: formatDate(data["Issue Date"] || data.issueDate || new Date().toISOString()),
  courseDuration: data["Course Duration"] || "ONE YEAR"
    };

    setResult(enhancedData);
  } catch (err) {
    console.error("Search error:", err);
    setError("Failed to fetch data. Please try again.");
  } finally {
    setLoading(false);
  }
};

// this working but clint now want student can print result 
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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Hind:wght@400;600&display=swap" rel="stylesheet">
        
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;600;700&family=Playfair+Display:wght@700;900&family=Roboto:wght@400;700&display=swap');
            /* 1. RESET & PAGE SETUP */
            @page { 
                size: A4; 
                margin: 0; /* Let the container handle margins */
            }
            
            * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
            }

            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            /* 2. FIXED DIMENSIONS FOR A4 */
            .certificate-container {
                width: 210mm;
                height: 297mm; /* Fixed A4 height */
                background: white;
                padding: 30px;
                position: relative;
                overflow: hidden; /* Prevents bleed */
                
                /* Border logic: ensures border stays inside the width */
                border: 12px solid transparent;
                border-image: url('https://img.icons8.com/color/48/star--v1.png') 30 round;
                outline: 1.5px solid #1a3a6c;
                outline-offset: -8px;
            }

            /* 3. SCANNABLE LAYOUT SECTIONS */
          .header-container {
        font-family: 'Roboto', sans-serif;
        color: #1a3a6c;
        padding: 20px;
       a formal border */
        background-color: #fff;
    }

    /* Main Branding Section */
    .brand-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border-bottom: 2px solid #d4af37; /* Gold accent line */
        padding-bottom: 15px;
        margin-bottom: 15px;
    }

    .college-info {
        flex: 1;
        padding: 0 10px;
    }

    .college-info h1 {
        font-family: 'Playfair Display', serif; /* Serif for academic prestige */
        font-size: 20px;
        text-transform: uppercase;
        
        margin: 10px 0 8px 0;
        letter-spacing: 0.5px;
        color: #202f34;
    }

    .accreditation {
        font-size: 12px;
        color: #444;
        line-height: 1.4;
        max-width: 800px;
        margin: 0 auto;
        font-weight: 500;
    }

    .logo-img {
        width: 140px;
        height: auto;
    }

    /* Document Title Section */
    .statement-header {
        text-align: center;
        background-color: #f8f9fa; /* Light grey subtle background */
        padding: 10px;
        border-radius: 4px;
    }

    .statement-header h3 {
        margin: 0;
        font-size: 20px;
        letter-spacing: 2px;
        font-weight: 700;
    }

    .hindi-title {
        font-family: 'Hind', sans-serif;
        font-size: 22px;
        margin-bottom: 2px !important;
        color: #c41e3a; /* Traditional Deep Red for Hindi heading */
    }

    .document-type {
        font-size: 13px;
        font-weight: 700;
        margin-top: 5px;
        text-transform: uppercase;
        color: #555;
        border-top: 1px solid #ccc;
        display: inline-block;
        padding-top: 5px;
    }
            .statement-header {
                border-top: 2px solid #1a3a6c;
                border-bottom: 2px solid #1a3a6c;
                margin: 10px 0;
                padding: 5px 0;
                text-align: center;
            }

            .statement-header h3 { font-size: 20px; letter-spacing: 1px; }

            .top-meta-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
                font-size: 11px;
            }

            .top-meta-table td {
                border: 1px solid #ccc;
                padding: 6px;
                text-align: center;
                background: #f9f9f9;
            }

            .label-hindi { display: block; font-size: 9px; font-family: 'Hind', sans-serif; color: #444; }

            .student-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2px 0;
        gap: 20px;
        padding: 0 10px;
        font-family: 'Roboto', sans-serif;
    }

    .student-info-text {
        flex: 1;
        line-height: 1.2; /* Spaced out for readability */
        color: #333;
    }

    .student-info-text p {
        margin: 0;
        font-size: 13.5px;
    }

    /* Styling the dynamic data */
    .detail-row {
        font-weight: 600;
        color: #1a3a6c;
        
        padding: 0 2px;
        display: inline-block;
        min-width: 150px;
        text-transform: uppercase;
    }

    .hindi-inline {
        font-family: 'Hind', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #444;
    }

    /* Photo Box Styling */
    .photo-container {
        width: 130px;
        text-align: center;
    }

    .photo-box {
        width: 120px;
        height: 145px;
        border: 2px solid #1a3a6c;
        background: #fdfdfd;
        padding:4px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    }

    .student-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .no-photo-text {
        font-size: 10px;
        color: #999;
        text-transform: uppercase;
        font-weight: bold;
    }

            .detail-row { 
                border-bottom: 1px dotted #666; 
                font-weight: bold; 
                display: inline-block;
                padding: 0 10px;
            }

            .marks-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                text-align: center;
                font-size: 11px;
            }

            .marks-table th, .marks-table td {
                border: 1px solid #000;
                padding: 6px 4px;
            }

            .marks-table th {
                background-color: #f2f2f2;
                color: #1a3a6c;
                font-size: 10px;
            }

            .total-row {
                background-color: #f2f2f2;
                font-weight: bold;
            }

            
    .footer-container {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end; /* Keeps everything anchored to the bottom */
        padding: 0 10px;
        font-family: 'Roboto', sans-serif;
    }

    /* Column 1: Legend (Left) */
    .footer-left {
        flex: 1;
        max-width: 30%;
    }

    .result-legend {
        font-size: 10px;
        color: #444;
        line-height: 1.4;
        border: 1px solid #ccc;
        padding: 8px;
        background-color: #fcfcfc;
        border-radius: 4px;
    }

    /* Column 2: Signature Image (Center) */
    .footer-center {
        flex: 1;
        display: flex;
        justify-content: center; /* Perfect horizontal center */
        align-items: center;
        height: 100px; /* Provides space for the signature */
    }

    .signature-img {
        max-width: 120px;
        max-height: 80px;
        object-fit: contain;
    }

    /* Column 3: Title & Line (Right) */
    .footer-right {
        flex: 1;
        max-width: 30%;
        text-align: center;
    }

    .signature-line {
        border-top: 1.5px solid #1a3a6c;
        width: 100%;
        margin-bottom: 8px;
    }

    .signature-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #1a3a6c;
        line-height: 1.2;
    }

    .issue-details {
        margin-top: 12px;
        font-size: 11px;
        line-hight:2.5;
        font-weight: 600;
        color: #555;
    }

            .result-legend {
                font-size: 9px;
                border: 1px solid #000;
                padding: 5px;
                width: 180px;
            }

            .watermark {
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.06;
                width: 450px;
                pointer-events: none;
                z-index: 0;
            }

            /* 4. PRINT SPECIFIC FIXES */
            @media print {
                body { background: none; padding: 0; }
                .certificate-container { 
                    margin: 0; 
                    border-width: 12px !important; /* Ensure border displays */
                }
            }
        </style>
    </head>
    <body>

        <div class="certificate-container">
            <img src="${logo}" class="watermark" alt="watermark">

           <div class="header-container">
           <div class="brand-section">
           <img src="${logo}" class="logo-img" alt="College Logo" />
        
            <div class="college-info">
              <h1>Bharat Technical College of Fire Engineering & Safety Management</h1>
               <p class="accreditation">
                An Autonomous Body, Under Govt. Act Established Under Act 1882<br>
                Registered Under Govt. of U.P. & Ministry of MSME, Govt. of India | Registration No. SON/01794/2025-2026<br>
                <strong>ISO 9001:2015 Certified Institution</strong>
              </p>
            </div>

              <img src="${VRQR}" class="logo-img" style="width: 100px;" alt="QR Verification" />
            </div>
 
           <div class="statement-header">
             <h3 class="hindi-title">सेंट्रल बोर्ड परीक्षा</h3>
            <h3>CENTRAL BOARD OF EXAMINATION</h3>
            <p class="document-type">STATEMENT OF MARKS / मार्क्स के वक्तव्य</p>
            </div>
          </div>

            <table class="top-meta-table">
                <tr>
                    <td><span class="label-hindi">नामांकन संख्या</span> Enrollment No.</td>
                    <td><span class="label-hindi">अनुक्रमांक</span> Roll No.</td>
                    <td><span class="label-hindi">केन्द्र </span> Centre Name</td>
                    <td><span class="label-hindi">प्रमाण-पत्र क्रमांक</span> Cert No.</td>
                </tr>
                <tr style="font-weight: bold; font-size: 13px;">
                    <td>${result?.enrollmentNo || 'NSDVE100984168'}</td>
                    <td>${result?.rollNo || 'CHDS1000'}</td>
                    <td>${result?.centreCode || 'JH/NCVTE/N1047669'}</td>
                    <td>${result?.serialNo || 'NSDVE12343'}</td>
                </tr>
            </table>

        <div class="student-container">
         <div class="student-info-text">
        <p>
            <span class="hindi-inline">प्रमाणित किया जाता है कि</span> (This is to certify that) 
            <span class="detail-row">${result?.studentName?.toUpperCase() || 'N/A'}</span>
        </p>
        
        <p><span class="hindi-inline">परिषद् के अभिलेखानुसार</span> (According to the Board's Record)</p>
        
       
        
        <p>
            <span class="hindi-inline">एवं श्री</span> (and Mr.) 
            <span class="detail-row">${result?.fatherName || 'N/A'}</span>
        </p>
        
        <p>
            <span class="hindi-inline">जिनकी जन्मतिथि</span> (Whose Date of Birth is) 
            <span class="detail-row">${result?.dateOfBirth || 'N/A'}</span>
        </p>
        
        <p>
            <span class="hindi-inline">की सेंट्रल बोर्ड परीक्षा</span> (Passed Central Board Exam held in) 
            <span class="detail-row">${result?.session || 'N/A'}</span>
        </p>

        <p>
            <span class="hindi-inline">कोर्स और अवधि</span> (Course with Duration) 
            <span class="detail-row">${result?.courseDuration || 'N/A'}</span>
        </p>

        <p>
            <span class="hindi-inline">परीक्षा केंद्र</span> (Center Name) 
            <span class="detail-row" style="min-width: 250px;">${result?.examinationCenter?.toUpperCase() || 'BHARAT TECHNICAL COLLEGE'}</span>
        </p>

        <p>
            <span class="hindi-inline">श्रेणी</span> (Division) 
            <span class="detail-row" style="min-width: 50px;">${result?.grade ?? 'A'}</span>
        </p>
    </div>

    <div class="photo-container">
        <div class="photo-box">
            ${result?.photoUrl
                ? `<img class="student-photo" src="${result.photoUrl}" alt="Student" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="no-photo-text" style="display:none;">PHOTO<br>REQUIRED</div>`
                : '<div class="no-photo-text">PASTE PHOTO<br>HERE</div>'
            }
        </div>
    </div>
</div>

            <table class="marks-table">
                <thead>
                    <tr>
                        <th rowspan="2" style="width:35%">विषय<br>(SUBJECTS)</th>
                        <th rowspan="2">विषय कोड<br>(CODE)</th>
                        <th rowspan="2">अधिकतम अंक<br>(MAX)</th>
                        <th colspan="2">प्राप्तांक (MARKS OBTAINED)</th>
                        <th rowspan="2">योग<br>(TOTAL)</th>
                        <th rowspan="2">योग शब्दों में<br>(TOTAL IN WORDS)</th>
                    </tr>
                    <tr>
                        <th>लिखित</th>
                        <th>प्रायो.</th>
                    </tr>
                </thead>
                <tbody>
              ${result?.subjects?.map(sub => `
               <tr>
                <td style="text-align: left; font-weight: bold; padding-left: 8px;">${sub.name}</td>
                <td>${sub.code || 'FSS400'}</td>
                <td>${sub.maxMarks}</td>
                <td>${sub.type === 'theory' ? sub.obtainedMarks : '-'}</td>
                <td>${sub.type === 'practical' ? sub.obtainedMarks : '-'}</td>
                <td><strong>${sub.obtainedMarks}</strong></td>
                <td style="text-transform: uppercase; font-size: 9px;">${sub.inWords}</td>
             </tr>
           `).join('')}
  
  <!-- Add practical subjects separately if they exist -->
            ${result?.practicals?.map((practical, index) => `
              <tr>
      <td style="text-align: left; font-weight: bold; padding-left: 8px;">${practical.name}</td>
      <td>${practical.practicalCode || `PRAC${String(index + 1).padStart(3, '0')}`}</td>
      <td>${practical.maxMarks}</td>
      <td>-</td>
      <td>${practical.obtainedMarks}</td>
      <td><strong>${practical.obtainedMarks}</strong></td>
      <td style="text-transform: uppercase; font-size: 9px;">${convertToWords(practical.obtainedMarks)}</td>
    </tr>
  `).join('')}
</tbody>
            </table>

    <div class="footer-container">
    
    <div class="footer-left">
        <div class="result-legend">
            <strong style="display:block; border-bottom:1px solid #ddd; margin-bottom:4px; font-size:9px;">
                GRADING SCALE / ग्रेडिंग पैमाना
            </strong>
            AA - Absent | &lt; 39% - Fail<br>
            40% to 59% - Second Class<br>
            60% to 79% - First Class<br>
            &gt;= 80% - Distinction
        </div>
        <div class="issue-details">
            <div>Place: Sonbhadra, U.P.</div>
            <!--<div>Date: ${result?.certificateDate || '15/06/2025'}</div>-->
             
            <div> Data:     </div>
        </div>
    </div>

    <div class="footer-center">
        <img src="${Result}" alt="Official Stamp/Signature" class="signature-img" />
    </div>

    <div class="footer-right">
        <div class="signature-line"></div>
        <div class="signature-title">
            Controller of Examination<br>
            <span style="font-size: 9px; font-weight: 400;">CENTRAL BOARD OF EXAMINATION</span>
        </div>
    </div>

</div>
            </div>
        </div>

        <script>
            window.onload = function() {
                setTimeout(function() { 
                    window.print(); 
                }, 1000);
            };
        </script>
    </body>
    </html>
`;
const cleanContent = printContent.replace(/undefined/g, "");
printWindow.document.write(cleanContent);
    // printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => setIsPrinting(false), 3000);
  };

// const handlePrint = () => {
//   setIsPrinting(true);

//   const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

//   if (!printWindow) {
//     alert("Please allow popups to print the marksheet");
//     setIsPrinting(false);
//     return;
//   }

//   const printContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Marksheet - ${result?.studentName || 'Student'}</title>
//       <meta charset="UTF-8">
//       <style>
//         @page {
//           size: A4;
//           margin: 15mm;
//         }
        
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
        
//         body {
//           font-family: 'Times New Roman', Times, serif;
//           color: #000;
//           -webkit-print-color-adjust: exact;
//           print-color-adjust: exact;
//           position: relative;
//           min-height: 100vh;
//           background: #fff;
//         }
        
//         /* Watermark */
//         body::after {
//           content: "BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM BTCFSM";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%) rotate(-30deg);
//           font-size: 36px;
//           font-weight: bold;
//           color: rgba(0,0,0,0.03);
//           white-space: nowrap;
//           pointer-events: none;
//           z-index: 1;
//           width: 200%;
//           text-align: center;
//         }
        
//         .certificate-container {
//           max-width: 210mm;
//           margin: 0 auto;
//           padding: 20px;
//           background: white;
//           border: 2px solid #000;
//           position: relative;
//           z-index: 2;
//         }
        
//         .header {
//           text-align: center;
//           margin-bottom: 20px;
//         }
        
//         .main-title {
//           font-size: 22px;
//           font-weight: bold;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           line-height: 1.3;
//         }
        
//         .hindi-title {
//           font-size: 18px;
//           font-weight: bold;
//           margin-bottom: 5px;
//         }
        
//         .sub-title {
//           font-size: 14px;
//           font-weight: 500;
//           margin: 5px 0;
//         }
        
//         .govt-info {
//           font-size: 12px;
//           border-top: 1px solid #000;
//           border-bottom: 1px solid #000;
//           padding: 5px 0;
//           margin: 10px 0;
//         }
        
//         .board-title {
//           font-size: 18px;
//           font-weight: bold;
//           text-transform: uppercase;
//           margin: 15px 0 5px;
//         }
        
//         .statement-title {
//           font-size: 24px;
//           font-weight: bold;
//           text-transform: uppercase;
//           border-bottom: 2px solid #000;
//           display: inline-block;
//           padding-bottom: 5px;
//           margin-bottom: 20px;
//         }
        
//         /* Three column layout */
//         .details-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 20px;
//           border: 1px solid #000;
//           padding: 10px;
//           margin-bottom: 20px;
//         }
        
//         .detail-item {
//           text-align: center;
//         }
        
//         .detail-label {
//           font-size: 12px;
//           font-weight: normal;
//         }
        
//         .detail-value {
//           font-size: 14px;
//           font-weight: bold;
//           margin-top: 5px;
//           word-break: break-word;
//         }
        
//         /* Student info section */
//         .student-info-section {
//           margin-bottom: 20px;
//         }
        
//         .info-line {
//           display: flex;
//           margin-bottom: 8px;
//           font-size: 14px;
//         }
        
//         .info-label {
//           font-weight: bold;
//           width: 200px;
//         }
        
//         .info-value {
//           font-weight: normal;
//           border-bottom: 1px dotted #000;
//           flex: 1;
//           padding-left: 10px;
//         }
        
//         /* Marks table */
//         .marks-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 20px 0;
//           font-size: 12px;
//         }
        
//         .marks-table th,
//         .marks-table td {
//           border: 1px solid #000;
//           padding: 8px 5px;
//           text-align: center;
//         }
        
//         .marks-table th {
//           background: #f0f0f0;
//           font-weight: bold;
//           font-size: 11px;
//         }
        
//         .marks-table .subject-cell {
//           text-align: left;
//         }
        
//         .total-row {
//           font-weight: bold;
//           background: #f0f0f0;
//         }
        
//         .grand-total {
//           margin-top: 10px;
//           text-align: right;
//           font-size: 14px;
//           font-weight: bold;
//         }
        
//         /* Grade scale */
//         .grade-scale {
//           margin: 20px 0;
//           font-size: 11px;
//           display: flex;
//           gap: 20px;
//           flex-wrap: wrap;
//         }
        
//         .grade-item {
//           margin-right: 15px;
//         }
        
//         /* Footer */
//         .footer {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 40px;
//           font-size: 12px;
//         }
        
//         .signature {
//           text-align: center;
//           width: 200px;
//         }
        
//         .signature-line {
//           border-top: 1px solid #000;
//           margin: 30px 0 5px;
//           width: 100%;
//         }
        
//         .place-date {
//           display: flex;
//           justify-content: space-between;
//           margin: 20px 0;
//           font-size: 12px;
//         }
        
//         .controller {
//           text-align: right;
//           margin-top: 20px;
//           font-weight: bold;
//         }
        
//         @media print {
//           body { background: white; }
//           body::after { opacity: 0.1; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="certificate-container">
//         <!-- Header -->
//         <div class="header">
//           <div class="hindi-title">राष्ट्रीय कौशल विकास संगठन</div>
//           <div class="main-title">NATIONAL SKILL DEVELOPMENT ORGANISATION</div>
//           <div class="sub-title">(An Autonomous Body, Registered Under Govt. of India)</div>
//           <div class="sub-title">In Collaboration with Skill Council For Vocational Education, Govt of India</div>
//           <div class="sub-title">In Associated with NCVTE Foundation, Incorporated with Government of India</div>
          
//           <div class="board-title">केन्द्रीय बोर्ड परीक्षा</div>
//           <div class="board-title">CENTRAL BOARD OF EXAMINATION</div>
//           <div class="statement-title">STATEMENT OF MARKS / अंकों का विवरण</div>
//         </div>

//         <!-- Three column details -->
//         <div class="details-grid">
//           <div class="detail-item">
//             <div class="detail-label">नामांकन संख्या / Enrollment No.</div>
//             <div class="detail-value">${result?.enrollmentNo || ''}</div>
//           </div>
//           <div class="detail-item">
//             <div class="detail-label">अनुक्रमांक / Roll No.</div>
//             <div class="detail-value">${result?.rollNo || 'CUS12343'}</div>
//           </div>
//           <div class="detail-item">
//             <div class="detail-label">प्रमाण-पत्र क्रमांक / Certificate No.</div>
//             <div class="detail-value">${result?.certificateNo || 'NSDVE' + (result?.enrollmentNo?.slice(-5) || '12343')}</div>
//           </div>
//         </div>

//         <!-- Student Information -->
//         <div class="student-info-section">
//           <div class="info-line">
//             <span class="info-label">प्रमाणित किया जाता है कि (This is to certify that)</span>
//             <span class="info-value">${result?.studentName || ''}</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">परिषद के अभिलेखानुसार (According to the Board's Record)</span>
//             <span class="info-value"></span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">आत्मज / आत्मजा श्रीमती (Son/Daughter of Mrs.)</span>
//             <span class="info-value">${result?.motherName || ''}</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">एवं श्री (and Mr.)</span>
//             <span class="info-value">${result?.fatherName || ''}</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">जिनकी जन्मतिथि (Whose Date of Birth is)</span>
//             <span class="info-value">${result?.dateOfBirth || ''}</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">की केन्द्रीय बोर्ड परीक्षा / केन्द्र (has passed Central Board Examination held in)</span>
//             <span class="info-value">Jun-2023</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">से श्रेणी (with Division)</span>
//             <span class="info-value">${result?.grade || 'DISTINCTION'}</span>
//           </div>
//           <div class="info-line">
//             <span class="info-label">परीक्षार्थी के विषयवार प्राप्तांक निम्नलिखित हैं। (Marks obtained by the candidate subject wise are as under)</span>
//             <span class="info-value"></span>
//           </div>
//         </div>

//         <!-- Marks Table -->
//         <table class="marks-table">
//           <thead>
//             <tr>
//               <th>विषय (SUBJECTS)</th>
//               <th>विषय कोड (SUBJECT CODE)</th>
//               <th>अधिकतम अंक (MAXIMUM MARKS)</th>
//               <th>प्राप्तांक (MARKS OBTAINED)</th>
//               <th>योग (TOTAL)</th>
//               <th>योग शब्दों में (TOTAL IN WORDS)</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${result?.subjects?.map((subject, index) => `
//               <tr>
//                 <td class="subject-cell">${subject.name}</td>
//                 <td>FSS400-${(index + 1).toString().padStart(2, '0')}</td>
//                 <td>${subject.maxMarks}</td>
//                 <td>${subject.obtainedMarks}</td>
//                 <td>${subject.obtainedMarks}</td>
//                 <td style="font-size: 11px;">${subject.inWords}</td>
//               </tr>
//             `).join('') || ''}
//           </tbody>
//         </table>

//         <!-- Grand Total -->
//         <div style="margin: 10px 0; text-align: right; font-weight: bold;">
//           कुल योग एवं परिणाम (GRAND TOTAL & RESULT): ${result?.totalMarks || 0} ${result?.obtainedMarks || 0} 568
//         </div>

//         <!-- Grade Scale -->
//         <div class="grade-scale">
//           <span class="grade-item">AA - Absent</span>
//           <span class="grade-item">&lt;35% - Fail</span>
//           <span class="grade-item">40% - Third Class</span>
//           <span class="grade-item">41% to 59% - Second Class</span>
//           <span class="grade-item">60% to 79% - First Class</span>
//           <span class="grade-item">&gt;=80% - Distinction</span>
//         </div>

//         <!-- Place/Date and Signature -->
//         <div class="place-date">
//           <div>स्थान / Place: Chennai</div>
//           <div>दिनांक / Date: 28-06-2023</div>
//         </div>

//         <div class="controller">
//           Controller of Examination
//         </div>

//         <!-- Print Info -->
//         <div style="text-align: center; font-size: 9px; margin-top: 20px; color: #666;">
//           This is a computer-generated document. Printed on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
//         </div>
//       </div>
      
//       <script>
//         window.onload = function() {
//           setTimeout(function() { window.print(); }, 500);
//           window.onafterprint = function() { setTimeout(function() { window.close(); }, 500); };
//         };
//       </script>
//     </body>
//     </html>
//   `;
  
//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   setTimeout(() => setIsPrinting(false), 3000);
// };

  const clearSearch = () => {
    setSearchValue("");
    setResult(null);
    setError("");
  };

  return (
  
    
    <>
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
                    width: '120px',
                    height: '120px',
                    borderRadius: '90%',
                    // background: 'linear-gradient(135deg, #d4af37, #b8860b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //border: '2px solid '
                  }}>
                    {/* <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: '700', color: '#1a1a2e' }}>ISO</span> */}
                    <img src={ISO} alt="iso certificate"  width={150} height={150}/>
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

            {/* Action Buttons  this workin but not  require in this time  */}
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
    </>
  );
};

export default AdminResult;

