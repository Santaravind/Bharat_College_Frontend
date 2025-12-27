


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

// this working but clint now want student can print result 
  const handlePrint = () => {
    setIsPrinting(true);

    const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');

    if (!printWindow) {
      alert("Please allow popups to print the marksheet");
      setIsPrinting(false);
      return;
    }
 // it is well working well water marks  
    // const printContent = `
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <title>Marksheet - ${result?.studentName || 'Student'}</title>
    //     <meta charset="UTF-8">
    //     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet">
    //     <style>
    //       @page {
    //       size: A4;
    //       margin: 10mm;
    //     }
          
    //       * {
    //         margin: 0;
    //         padding: 0;
    //         box-sizing: border-box;
    //       }
          
    //       body {
    //         font-family: 'Crimson Text', 'Times New Roman', serif;
    //         background: white;
    //         color: #1a1a2e;
    //         -webkit-print-color-adjust: exact;
    //         print-color-adjust: exact;
    //       }
          
    //       .certificate-container {
    //         max-width: 210mm;
    //         margin: 0 auto;
    //         padding: 15px;
    //         background: linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%);
    //         border: 4px double #b8860b;
    //         position: relative;
    //       }
          
    //       .certificate-container::before {
    //         content: '';
    //         position: absolute;
    //         top: 8px;
    //         left: 8px;
    //         right: 8px;
    //         bottom: 8px;
    //         border: 2px solid #d4af37;
    //         pointer-events: none;
    //       }
          
    //       .header {
    //         text-align: center;
    //         padding-bottom: 15px;
    //         margin-bottom: 15px;
    //         border-bottom: 3px double #1a1a2e;
    //       }
          
    //       .header-top {
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         gap: 20px;
    //         margin-bottom: 10px;
    //       }
          
    //       .emblem {
    //         width: 70px;
    //         height: 70px;
    //         border-radius: 50%;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         font-weight: bold;
    //         font-size: 12px;
    //         border: 0px solid #b8860b;
    //       }
          
    //       .emblem-left {
    //         background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
    //         color: #d4af37;
    //       }
          
    //       .emblem-right {
    //         // background: linear-gradient(135deg, #d4af37, #b8860b);
    //         // // color: #1a1a2e;
    //       }
          
    //       .header-text {
    //         flex: 1;
    //       }
          
    //       .govt-text {
    //         font-size: 10px;
    //         color: #666;
    //         letter-spacing: 2px;
    //         margin-bottom: 5px;
    //       }
          
    //       .college-name {
    //         font-family: 'Playfair Display', serif;
    //         font-size: 24px;
    //         font-weight: 700;
    //         color: #1a1a2e;
    //         margin-bottom: 3px;
    //       }
          
    //       .college-subtitle {
    //         font-family: 'Playfair Display', serif;
    //         font-size: 16px;
    //         color: #1a1a2e;
    //         margin-bottom: 5px;
    //       }
          
    //       .reg-info {
    //         font-size: 10px;
    //         color: #666;
    //       }
          
    //       .board-title {
    //         background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
    //         color: #d4af37;
    //         padding: 8px 25px;
    //         display: inline-block;
    //         font-size: 12px;
    //         font-weight: 600;
    //         letter-spacing: 2px;
    //         margin-top: 10px;
    //       }
          
    //       .statement-title {
    //         font-family: 'Playfair Display', serif;
    //         font-size: 26px;
    //         font-weight: 700;
    //         color: #1a1a2e;
    //         margin-top: 10px;
    //         letter-spacing: 3px;
    //       }
          
    //       .student-section {
    //         display: flex;
    //         gap: 20px;
    //         margin-bottom: 20px;
    //       }
          
    //       .student-info {
    //         flex: 1;
    //       }
          
    //       .info-row {
    //         display: flex;
    //         margin-bottom: 8px;
    //         align-items: flex-start;
    //       }
          
    //       .info-label {
    //         font-weight: 600;
    //         width: 180px;
    //         min-width: 180px;
    //         font-size: 11px;
    //         color: #1a1a2e;
    //       }
          
    //       .info-value {
    //         flex: 1;
    //         border-bottom: 1px solid #1a1a2e;
    //         padding-bottom: 2px;
    //         font-weight: 600;
    //         font-size: 12px;
    //         text-transform: uppercase;
    //       }
          
    //       .photo-container {
    //         width: 120px;
    //         height: 150px;
    //         border: 3px solid #1a1a2e;
    //         padding: 3px;
    //         background: white;
    //       }
          
    //       .photo-container img {
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
    //       }
          
    //       .marks-table {
    //         width: 100%;
    //         border-collapse: collapse;
    //         margin: 15px 0;
    //         font-size: 10px;
    //       }
          
    //       .marks-table th,
    //       .marks-table td {
    //         border: 1px solid #1a1a2e;
    //         padding: 6px 8px;
    //         text-align: center;
    //       }
          
    //       .marks-table th {
    //         background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
    //         color: #d4af37;
    //         font-weight: 600;
    //         font-size: 9px;
    //       }
          
    //       .marks-table .subject-cell {
    //         text-align: left;
    //         font-weight: 500;
    //       }
          
    //       .marks-table .total-row {
    //         background: linear-gradient(135deg, #f8f4e8, #fffef5);
    //         font-weight: 700;
    //       }
          
    //       .marks-table .total-row td {
    //         font-size: 11px;
    //       }
          
    //       .footer-section {
    //         display: flex;
    //         justify-content: space-between;
    //         margin-top: 15px;
    //         font-size: 10px;
    //       }
          
    //       .footer-left, .footer-right {
    //         max-width: 45%;
    //       }
          
    //       .grade-scale {
    //         margin-top: 5px;
    //       }
          
    //       .grade-scale div {
    //         margin: 2px 0;
    //       }
          
    //       .result-box {
    //         text-align: center;
    //         margin: 20px 0;
    //         padding: 12px;
    //         background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
    //         color: #d4af37;
    //       }
          
    //       .result-text {
    //         font-family: 'Playfair Display', serif;
    //         font-size: 18px;
    //         font-weight: 700;
    //         letter-spacing: 2px;
    //       }
          
    //       .signature-section {
    //         display: flex;
    //         justify-content: space-between;
    //         margin-top: 40px;
    //         padding-top: 20px;
    //       }
          
    //       .signature-box {
    //         text-align: center;
    //         width: 200px;
    //       }
          
    //       .signature-line {
    //         border-top: 1px solid #1a1a2e;
    //         margin-bottom: 5px;
    //       }
          
    //       .signature-label {
    //         font-size: 10px;
    //         font-weight: 600;
    //       }
          
    //       .print-footer {
    //         text-align: center;
    //         margin-top: 15px;
    //         padding-top: 10px;
    //         border-top: 1px dashed #ccc;
    //         font-size: 9px;
    //         color: #888;
    //       }
          
    //       @media print {
    //         body { background: white !important; }
    //         .certificate-container { 
    //           border: 4px double #b8860b !important;
    //           box-shadow: none !important;
    //         }
    //           .certificate-container { position: relative; z-index: 2; }

    //             .watermark {
    //             position: fixed;
    //             top: 50%;
    //             left: 50%;
    //             transform: translate(-50%, -50%) rotate(-30deg);
    //             font-family: 'Playfair Display', serif;
    //             font-size: 96px;             /* adjust size for A4 */
    //             letter-spacing: 8px;
    //             color: rgba(0,0,0,0.06);     /* light watermark */
    //             white-space: nowrap;
    //             pointer-events: none;
    //             z-index: 1;                  /* behind certificate-container (z-index:2) */
    //             -webkit-print-color-adjust: exact;
    //            print-color-adjust: exact;
    //          }

    //           @media print {
    //           .watermark { font-size: 120px; color: rgba(0,0,0,0.05); } /* tweak for print */
    //           }
    //       }
    //     </style>
    //   </head>
    //   <body>
    //   <div class="watermark">SAMPLE</div>
    //   <div class="certificate-container">
    //     <div class="certificate-container">
    //       <!-- Header -->
    //       <div class="header">
    //         <div class="header-top">
    //           <div class="emblem emblem-left"><img 
    //           src="${logo}"
    //            alt="College Logo"
    //            style="width:90px;height:90px;object-fit:contain;margin-bottom:6px;"
    //            />
    //               </div>
    //           <div class="header-text">
    //             <div class="govt-text">AN AUTONOMOUS BODY UNDER GOVT. ACT • ESTABLISHED UNDER ACT 1882</div>
    //             <div class="college-name">BHARAT TECHNICAL COLLEGE</div>
    //             <div class="college-subtitle">Of Fire Engineering & Safety Management</div>
    //             <div class="reg-info">Reg. No. SON/01794/2025-2026 • ISO Certified</div>
    //             <div class="reg-info">Pusauli, Robertsganj, Sonbhadra, Uttar Pradesh - 231216</div>
    //           </div>
    //           <div class="emblem emblem-right"><img 
    //           src="${ISO}"
    //            alt="College Logo"
    //            style="width:70px;height:70px;object-fit:contain;margin-bottom:0px;"
    //            /></div>
    //         </div>
    //         <div class="board-title">CENTRAL BOARD OF EXAMINATIONS</div>
    //         <div class="statement-title">STATEMENT OF MARKS</div>
    //       </div>
          
    //       <!-- Student Section -->
    //       <div class="student-section">
    //         <div class="student-info">
    //           <div class="info-row">
    //             <div class="info-label">NAME OF CANDIDATE</div>
    //             <div class="info-value">${result?.studentName || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">FATHER'S NAME</div>
    //             <div class="info-value">${result?.fatherName || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">COURSE NAME</div>
    //             <div class="info-value">${result?.courseName || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">COURSE DURATION</div>
    //             <div class="info-value">${result?.courseDuration || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">ENROLLMENT NO</div>
    //             <div class="info-value">${result?.enrollmentNo || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">SERIAL NO</div>
    //             <div class="info-value">${result?.serialNo || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">SESSION</div>
    //             <div class="info-value">${result?.session || ''}</div>
    //           </div>
    //           <div class="info-row">
    //             <div class="info-label">INSTITUTION</div>
    //             <div class="info-value">${result?.institutionName || ''}</div>
    //           </div>
    //         </div>
    //         <div class="photo-container">
    //           ${result?.photoUrl ?
    //             `<img src="${result.photoUrl}" alt="Student Photo" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>'" />`
    //             : '<div class="photo-placeholder">PHOTO NOT AVAILABLE</div>'
    //           }
    //         </div>
    //       </div>
          
    //       <!-- Marks Table -->
    //       <table class="marks-table">
    //         <thead>
    //           <tr>
    //             <th rowspan="2" style="width: 40px;">S.NO</th>
    //             <th rowspan="2">SUBJECTS</th>
    //             <th colspan="2">MARKS</th>
    //             <th colspan="2">MARKS AWARDED</th>
    //           </tr>
    //           <tr>
    //             <th>MAX</th>
    //             <th>MIN</th>
    //             <th>OBTAINED</th>
    //             <th>IN WORDS</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           ${result?.subjects?.map((subject, index) => `
    //             <tr>
    //               <td>${index + 1}</td>
    //               <td class="subject-cell">${subject.name}</td>
    //               <td>${subject.maxMarks}</td>
    //               <td>${subject.minMarks}</td>
    //               <td><strong>${subject.obtainedMarks}</strong></td>
    //               <td style="font-size: 9px;">${subject.inWords}</td>
    //             </tr>
    //           `).join('') || ''}
    //           <tr class="total-row">
    //             <td colspan="2"><strong>GRAND TOTAL</strong></td>
    //             <td><strong>${result?.totalMarks || 0}</strong></td>
    //             <td><strong>${result?.subjects ? result.subjects.length * 40 : 0}</strong></td>
    //             <td><strong>${result?.obtainedMarks || 0}</strong></td>
    //             <td><strong>${result?.totalInWords || ''}</strong></td>
    //           </tr>
    //         </tbody>
    //       </table>
          
    //       <!-- Footer Info -->
    //       <div class="footer-section">
    //         <div class="footer-left">
    //           <div><strong>Date of Birth:</strong> ${result?.dateOfBirth || ''}</div>
    //           <div><strong>Centre Code:</strong> ${result?.centreCode || ''}</div>
    //           <div><strong>Issue Date:</strong> ${result?.certificateDate || ''}</div>
    //         </div>
    //         <div class="footer-right">
    //           <div><strong>GRADING SCALE:</strong></div>
    //           <div class="grade-scale">
    //             <div>Distinction: 75% and above</div>
    //             <div>First Division: 60% to 74%</div>
    //             <div>Second Division: 50% to 59%</div>
    //           </div>
    //         </div>
    //       </div>
          
    //       <!-- Result Box -->
    //       <div class="result-box">
    //         <div class="result-text">
    //           RESULT: ${result?.grade?.toUpperCase() || 'N/A'} — ${result?.percentage || '0'}%
    //         </div>
    //       </div>
          
    //       <!-- Signature Section -->
    //       <div class="signature-section">
    //         <div class="signature-box">
    //           <div class="signature-line"></div>
    //           <div class="signature-label">Examination Controller</div>
    //         </div>
    //         <div class="signature-box">
    //           <div class="signature-line"></div>
    //           <div class="signature-label">Director</div>
    //         </div>
    //       </div>
          
    //       <!-- Print Footer -->
    //       <div class="print-footer">
    //         This is a computer-generated document. Printed on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
    //       </div>
    //     </div>
    //     </div>
    //     <script>
    //       window.onload = function() {
    //         setTimeout(function() { window.print(); }, 500);
    //         window.onafterprint = function() { setTimeout(function() { window.close(); }, 500); };
    //       };
    //     </script>
    //   </body>
    //   </html>
    // `;

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
            color: #1a1a2e;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            position: relative;
            min-height: 100vh;
          }
          
          /* Watermark container covering entire page */
          .watermark-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
          }
          
          /* Main diagonal watermark */
          .watermark-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-family: 'Playfair Display', serif;
            font-size: 140px;
            font-weight: 800;
            letter-spacing: 25px;
            color: rgba(0, 0, 0, 0.08);
            white-space: nowrap;
            opacity: 0.3;
            text-transform: uppercase;
          }
          
          /* Additional watermark repetitions */
          .watermark-small {
            position: absolute;
            font-family: 'Playfair Display', serif;
            font-size: 70px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.03);
            letter-spacing: 15px;
            opacity: 0.3;
            text-transform: uppercase;
          }
          
          .certificate-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 15px;
            background: linear-gradient(135deg, #fffef5 0%, #fefcf3 50%, #fffef5 100%);
            border: 4px double #b8860b;
            position: relative;
            z-index: 2;
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
            border: 0px solid #b8860b;
          }
          
          .emblem-left {
            background: linear-gradient(135deg, #1a1a2e, #2d2d5a);
            color: #d4af37;
          }
          
          .emblem-right {
            /* optional right emblem background */
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
             margin-top: -20px;
            width: 200px;
          }
          
          .signature-line {
             margin-top: 40px;
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
           
            font-size: 9px;
            
          }
          
          @media print {
            body { 
              background: white !important; 
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact; 
            }
            .certificate-container { 
              border: 4px double #b8860b !important;
              box-shadow: none !important;
            }
            .watermark-text {
              color: rgba(0, 0, 0, 0.07) !important;
              opacity: 0.2 !important;
            }
            .watermark-small {
              color: rgba(0, 0, 0, 0.04) !important;
              opacity: 0.3 !important;
            }
          }
        </style>
      </head>
      <body>
     

        <!-- Single certificate container -->
        <div class="certificate-container">
          <!-- Header -->
          <div class="header">
            <div class="header-top">
              <div class="emblem emblem-left">
                <img 
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
              <div class="emblem emblem-right">
                <img 
                  src="${ISO}"
                  alt="ISO Logo"
                  style="width:70px;height:70px;object-fit:contain;margin-bottom:0px;"
                />
              </div>
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
               <!-- Watermark Overlay -->
        <div class="watermark-overlay">
          <div class="watermark-text">BTCFSM</div>
          <div class="watermark-small" style="top: 15%; left: 5%; transform: rotate(-30deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 25%; right: 5%; transform: rotate(20deg);">BTCFSM</div>
          <div class="watermark-small" style="bottom: 20%; left: 10%; transform: rotate(-15deg);">BTCFSM</div>
          <div class="watermark-small" style="bottom: 10%; right: 10%; transform: rotate(30deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 40%; left: 15%; transform: rotate(-10deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 70%; right: 15%; transform: rotate(15deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 85%; left: 20%; transform: rotate(-25deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 60%; left: 25%; transform: rotate(-5deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 30%; right: 25%; transform: rotate(10deg);">BTCFSM</div>
        </div>

           <!-- Watermark Overlay -->
        <div class="watermark-overlay">
          <div class="watermark-text">BTCFSM</div>
          <div class="watermark-small" style="top: 15%; left: 5%; transform: rotate(-30deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 25%; right: 5%; transform: rotate(20deg);">BTCFSM</div>
          <div class="watermark-small" style="bottom: 20%; left: 10%; transform: rotate(-15deg);">BTCFSM</div>
          <div class="watermark-small" style="bottom: 10%; right: 10%; transform: rotate(30deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 40%; left: 15%; transform: rotate(-10deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 70%; right: 15%; transform: rotate(15deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 85%; left: 20%; transform: rotate(-25deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 60%; left: 25%; transform: rotate(-5deg);">BTCFSM</div>
          <div class="watermark-small" style="top: 30%; right: 25%; transform: rotate(10deg);">BTCFSM</div>
        </div>
            <div class="photo-container">
              ${
                result?.photoUrl
                  ? `<img src="${result.photoUrl}" alt="Student Photo" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>PHOTO NOT AVAILABLE</div>'" />`
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
              ${
                result?.subjects?.map((subject, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td class="subject-cell">${subject.name}</td>
                    <td>${subject.maxMarks}</td>
                    <td>${subject.minMarks}</td>
                    <td><strong>${subject.obtainedMarks}</strong></td>
                    <td style="font-size: 9px;">${subject.inWords}</td>
                  </tr>
                `).join('') || ''
              }
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
              <div class="signature-label">Controller of Examination </div>
            </div>
            <div class="signature-box">
                <img 
                  src="${Result}"
                  alt="College Stamp"
                  style="width:70px;height:70px;object-fit:contain;margin-top:-3px;"
                />
            </div>
          </div>
          
          <!-- Print Footer -->
          <div class="print-footer">
             
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
  );
};

export default AdminResult;

