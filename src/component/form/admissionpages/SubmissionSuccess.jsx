// //this is working code but not mobile optimise

// //Form format added
// import React, { useState, useEffect } from 'react';

// const SubmissionSuccess = ({ formData, admissionId }) => {
//   const [displayData, setDisplayData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   loadSuccessData();
//   // }, []);

//   // const loadSuccessData = async () => {
//   //   try {
//   //     setLoading(true);
      
//   //     const urlParams = new URLSearchParams(window.location.search);
//   //     const admissionIdFromUrl = urlParams.get('admission_id');
      
//   //     let finalAdmissionId = admissionIdFromUrl || admissionId;
//   //     let finalFormData = formData;
      
//   //     if (!finalAdmissionId && typeof localStorage !== 'undefined') {
//   //       finalAdmissionId = localStorage.getItem('pendingAdmissionId');
//   //       const storedData = localStorage.getItem('pendingFormData');
//   //       if (storedData && !finalFormData) {
//   //         finalFormData = JSON.parse(storedData);
//   //       }
//   //     }
      
//   //     if (!finalAdmissionId && typeof sessionStorage !== 'undefined') {
//   //       finalAdmissionId = sessionStorage.getItem('pendingAdmissionId');
//   //     }
      
//   //     if (finalAdmissionId && (!finalFormData || !finalFormData.firstName)) {
//   //       try {
//   //         const response = await fetch(`/api/admissions/${finalAdmissionId}`);
//   //         if (response.ok) {
//   //           const dbData = await response.json();
//   //           finalFormData = { ...finalFormData, ...dbData };
//   //         }
//   //       } catch (dbError) {
//   //         console.log('Database fetch failed, using stored data');
//   //       }
//   //     }
      
//   //     if (!finalAdmissionId) {
//   //       finalAdmissionId = 'PENDING_CONFIRMATION';
//   //     }
      
//   //     if (!finalFormData || !finalFormData.firstName) {
//   //       finalFormData = {
//   //         firstName: 'Student',
//   //         lastName: '',
//   //         courseProgram: 'Please contact college administration',
//   //         mobileNumber: 'Not available',
//   //         email: 'Not available',
//   //         photoUrl: ''
//   //       };
//   //     }
      
//   //     setDisplayData({
//   //       admissionId: finalAdmissionId,
//   //       studentData: finalFormData
//   //     });
      
//   //   } catch (error) {
//   //     console.error('Error loading success data:', error);
//   //     setDisplayData({
//   //       admissionId: 'CONTACT_ADMIN',
//   //       studentData: {
//   //         firstName: 'Please contact',
//   //         lastName: 'college administration',
//   //         courseProgram: 'with your payment reference',
//   //         mobileNumber: '+91-8840157051',
//   //         email: 'bharattechnicalcollege@gmail.com',
//   //         photoUrl: ''
//   //       }
//   //     });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//   const loadSuccessData = async () => {

//     //again changes for better data handling19/10/2025
//     try {
//       setLoading(true);
      
//       // ✅ MULTI-SOURCE DATA RECOVERY
//       const sources = [];
      
//       // 1. URL Parameters
//       const urlParams = new URLSearchParams(window.location.search);
//       const admissionIdFromUrl = urlParams.get('admission_id');
//       if (admissionIdFromUrl) sources.push({ type: 'url', id: admissionIdFromUrl });
      
//       // 2. Props
//       if (admissionId) sources.push({ type: 'props', id: admissionId });
      
//       // 3. LocalStorage
//       const storedAdmissionId = localStorage.getItem('pendingAdmissionId');
//       if (storedAdmissionId) sources.push({ type: 'localStorage', id: storedAdmissionId });
      
//       // 4. SessionStorage
//       const sessionAdmissionId = sessionStorage.getItem('pendingAdmissionId');
//       if (sessionAdmissionId) sources.push({ type: 'sessionStorage', id: sessionAdmissionId });
      
//       console.log('Data recovery sources:', sources);
      
//       let finalAdmissionId = admissionIdFromUrl || admissionId || storedAdmissionId || sessionAdmissionId;
//       let finalFormData = formData;
      
//       // ✅ COMPREHENSIVE FORM DATA RECOVERY
//       if (!finalFormData || !finalFormData.firstName) {
//         // Try comprehensive storage first
//         const comprehensiveData = localStorage.getItem('admissionFormData');
//         if (comprehensiveData) {
//           try {
//             const parsed = JSON.parse(comprehensiveData);
//             finalFormData = { ...finalFormData, ...parsed.formData };
//             finalAdmissionId = finalAdmissionId || parsed.admissionId;
//             console.log('Recovered from comprehensive storage');
//           } catch (e) {
//             console.log('No comprehensive data found');
//           }
//         }
        
//         // Fallback to individual field recovery
//         if (!finalFormData.firstName) {
//           const fieldMap = {
//             // Personal details
//             'title': 'title', 'firstName': 'firstName', 'lastName': 'lastName',
//             'dateOfBirth': 'dateOfBirth', 'fatherName': 'fatherName', 'motherName': 'motherName',
//             'age': 'age', 'castCategory': 'castCategory', 'aadharNumber': 'aadharNumber',
//             // Contact details
//             'mobileNumber': 'mobileNumber', 'email': 'email', 'address': 'address',
//             'city': 'city', 'villagePost': 'villagePost', 'district': 'district',
//             'state': 'state', 'pinCode': 'pinCode', 'permanentAddress': 'permanentAddress',
//             // Course
//             'courseProgram': 'courseProgram', 'photoUrl': 'photoUrl'
//           };
          
//           const recoveredData = {};
//           Object.entries(fieldMap).forEach(([storageKey, formKey]) => {
//             const value = localStorage.getItem(`admission_${storageKey}`);
//             if (value) recoveredData[formKey] = value;
//           });
          
//           if (Object.keys(recoveredData).length > 0) {
//             finalFormData = { ...finalFormData, ...recoveredData };
//             console.log('Recovered individual fields:', recoveredData);
//           }
//         }
//       }
      
//       // ✅ FINAL FALLBACK
//       if (!finalAdmissionId) {
//         finalAdmissionId = 'TEMP_' + Date.now().toString().slice(-6);
//       }
      
//       if (!finalFormData.firstName) {
//         finalFormData = {
//           firstName: 'Student',
//           courseProgram: 'Course information',
//           mobileNumber: 'Not available',
//           email: 'Not available',
//           photoUrl: ''
//         };
//       }
      
//       setDisplayData({
//         admissionId: finalAdmissionId,
//         studentData: finalFormData
//       });
      
//     } catch (error) {
//       console.error('Error in loadSuccessData:', error);
//       // Ultimate fallback
//       setDisplayData({
//         admissionId: 'CONTACT_ADMIN',
//         studentData: {
//           firstName: 'Please contact',
//           lastName: 'college administration',
//           courseProgram: 'with your payment reference',
//           mobileNumber: '+91-8840157051',
//           email: 'bharattechnicalcollege@gmail.com'
//         }
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadSuccessData();
// }, [admissionId, formData]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleNewAdmission = () => {
//     if (typeof localStorage !== 'undefined') {
//       localStorage.removeItem('pendingAdmissionId');
//       localStorage.removeItem('pendingFormData');
//     }
//     if (typeof sessionStorage !== 'undefined') {
//       sessionStorage.removeItem('pendingAdmissionId');
//     }
//     window.location.href = '/admission';
//   };

//   if (loading || !displayData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-lg">Preparing your admission details...</p>
//         </div>
//       </div>
//     );
//   }

//   const { admissionId: displayAdmissionId, studentData } = displayData;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       {/* Screen View */}
//       <div className="max-w-4xl mx-auto px-4 print:hidden">
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
//           <h2 className="text-3xl font-bold text-green-800 mb-4">
//             ✅ Admission Form Submitted Successfully!
//           </h2>
//           <div className="bg-white border border-green-300 rounded-lg p-4 inline-block">
//             <p className="text-lg font-semibold">Admission Reference ID:</p>
//             <p className="text-2xl font-bold text-blue-600">{displayAdmissionId}</p>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
//           <button onClick={handlePrint} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             🖨️ Print Admission Form
//           </button>
//           <button onClick={handleNewAdmission} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
//             📝 New Admission
//           </button>
//         </div>
//       </div>

//       {/* Print Format - Matches PDF Template */}
//       <div className="bg-white print:bg-white print:shadow-none print:border-0 print:p-0">
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          
//           {/* Header Section */}
//           <div className="bg-blue-900 text-white p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-gray-800">
//             <div className="flex justify-between items-center mb-4 print:mb-2">
//               <div className="text-left">
//                 <p className="text-sm print:text-xs">Phone: +91-8840157051</p>
//                 <p className="text-sm print:text-xs">Email: bharattechnicalcollege@gmail.com</p>
//               </div>
//               <div className="text-center flex-1">
//                 <h1 className="text-3xl font-bold print:text-2xl mb-2">BHARAT TECHNICAL COLLEGE</h1>
//                 <p className="text-lg print:text-sm italic">OF FIRE ENGINEERING & SAFETY MANAGEMENT</p>
//                 <p className="text-sm print:text-xs mt-1">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm print:text-xs">Website:  <a href="https://www.bharattechnicalcollege.com/"></a>https://www.bharattechnicalcollege.com/</p>
//                 <p className="text-sm print:text-xs">Approved by: Govt. of India</p>
//               </div>
//             </div>
//           </div>

//           {/* Main Title */}
//           <div className="border-b-2 border-gray-800 p-4 text-center">
//             <h2 className="text-2xl font-bold print:text-xl">ADMISSION FORM</h2>
//             <div className="flex justify-center space-x-8 mt-2 text-sm">
//               <p><strong>SESSION:</strong> {new Date().getFullYear()}</p>
//               <p><strong>COURSE:</strong> {studentData.courseProgram || 'DIPLOMA'}</p>
//               <p><strong>STREAM:</strong> Fire And Safety Management</p>
//             </div>
//           </div>

//           {/* Student Photo Section - Added before General Information */}
//           <div className="p-6 border-b border-gray-300">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-6">
//                 {/* Student Photo */}
//                 <div className="flex flex-col items-center">
//                   {studentData.photoUrl ? (
//                     <img 
//                       src={studentData.photoUrl} 
//                       alt="Student Photo" 
//                       className="w-32 h-40 object-cover border-2 border-gray-400 print:border-gray-800 print:w-28 print:h-36"
//                     />
//                   ) : (
//                     <div className="w-32 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center print:border-gray-800 print:w-28 print:h-36">
//                       <span className="text-gray-500 text-xs print:text-xs">No Photo</span>
//                     </div>
//                   )}
//                   <p className="text-xs mt-2 font-semibold print:text-xs">Passport Size Photo</p>
//                 </div>
                
//                 {/* Student Basic Info */}
//                 <div className="space-y-2">
//                   <div className="flex">
//                     <span className="font-semibold w-32 print:w-28">Enrollment No:</span>
//                     <span className="font-bold text-blue-700">{displayAdmissionId}</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32 print:w-28">Candidate Name:</span>
//                     <span className="font-medium">{studentData.title} {studentData.firstName} {studentData.lastName}</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32 print:w-28">Father's Name:</span>
//                     <span>{studentData.fatherName}</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32 print:w-28">Course:</span>
//                     <span>{studentData.courseProgram}</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* College Stamp Area */}
//               <div className="text-center">
//                 <div className="border-2 border-dashed border-gray-400 w-32 h-32 flex items-center justify-center print:border-gray-800 print:w-28 print:h-28">
//                   <p className="text-xs text-gray-500 text-center print:text-xs">College Stamp<br/>&<br/>Signature</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* General Information Section */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">GENERAL INFORMATION</h3>
            
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Enrollment No:</span>
//                 <span>{displayAdmissionId}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Name of Candidate:</span>
//                 <span>{studentData.title} {studentData.firstName} {studentData.lastName}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Father's Name:</span>
//                 <span>{studentData.fatherName}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Mother's Name:</span>
//                 <span>{studentData.motherName}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Date Of Birth:</span>
//                 <span>{studentData.dateOfBirth}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Nationality:</span>
//                 <span>Indian</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Category:</span>
//                 <span>{studentData.castCategory}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Gender:</span>
//                 <span>{studentData.gender || 'Male'}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Admission Type:</span>
//                 <span>Regular</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Year:</span>
//                 <span>{new Date().getFullYear()}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Contact Number:</span>
//                 <span>{studentData.mobileNumber}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Email Address:</span>
//                 <span>{studentData.email}</span>
//               </div>
              
//               <div className="col-span-2 flex">
//                 <span className="font-semibold w-48 print:w-40">Candidate Address:</span>
//                 <span>{studentData.address}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">City:</span>
//                 <span>{studentData.city}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Pin Code:</span>
//                 <span>{studentData.pinCode}</span>
//               </div>
              
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">State:</span>
//                 <span>{studentData.state}</span>
//               </div>
//               <div className="flex">
//                 <span className="font-semibold w-48 print:w-40">Country:</span>
//                 <span>India</span>
//               </div>
//             </div>
//           </div>

//           {/* Qualification Information Section */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">QUALIFICATION INFORMATION</h3>
            
//             <table className="w-full border-collapse border border-gray-800 text-sm">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-800 p-2 text-left">Examination</th>
//                   <th className="border border-gray-800 p-2 text-left">Year</th>
//                   <th className="border border-gray-800 p-2 text-left">Board/University</th>
//                   <th className="border border-gray-800 p-2 text-left">Marks(%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border border-gray-800 p-2">SECONDARY (10th)</td>
//                   <td className="border border-gray-800 p-2">{studentData.tenth?.yearOfPassing || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.tenth?.collegeName || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.tenth?.percentage || '-'}%</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-800 p-2">SR. SECONDARY (12th)</td>
//                   <td className="border border-gray-800 p-2">{studentData.twelfth?.yearOfPassing || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.twelfth?.collegeName || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.twelfth?.percentage || '-'}%</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-800 p-2">DIPLOMA</td>
//                   <td className="border border-gray-800 p-2">{studentData.diploma?.yearOfPassing || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.diploma?.collegeName || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.diploma?.percentage || '-'}%</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-800 p-2">GRADUATION</td>
//                   <td className="border border-gray-800 p-2">{studentData.graduation?.yearOfPassing || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.graduation?.collegeName || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.graduation?.percentage || '-'}%</td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-800 p-2">POST GRADUATION</td>
//                   <td className="border border-gray-800 p-2">{studentData.postGraduation?.yearOfPassing || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.postGraduation?.collegeName || '-'}</td>
//                   <td className="border border-gray-800 p-2">{studentData.postGraduation?.percentage || '-'}%</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Declaration Section */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">DECLARATION</h3>
            
//             <div className="text-sm space-y-3 mb-6">
//               <p>
//                 I hereby declare that entries made by me in this admission form and the documents submitted by me along with it, are true to the best of my knowledge, in all respects and in any case, if any information is found to be false, this shall entail automatic cancellation of my admission and forfeiture of all fee deposited, besides rendering me liable to such action as the College may deem proper.
//               </p>
              
//               <p>
//                 I take note that my admission to the College and continuation on its roll are subject to the provisions of rules of the College, issued from time to time. I shall abide by the rules of discipline and proper conduct. I am fully aware of the law regarding ragging as well as the punishment and that if, found guilty on this account I am liable to be punished appropriately. I hereby undertake that I shall not indulge in any act of ragging.
//               </p>
              
//               <p>
//                 In such circumstances, I will have no claim for refund of fees deposited by me the College.
//               </p>
//             </div>
            
//             <div className="flex justify-between items-center mt-8">
//               <div>
//                 <p className="text-sm">Place: Robertsganj, Sonbhadra</p>
//                 <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
//               </div>
//               <div className="text-center">
//                 <div className="border-t border-gray-800 w-64 mt-12 pt-2">
//                   <p className="text-sm font-semibold">(Signature of Candidate)</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer Note */}
//           <div className="bg-gray-100 p-4 text-center text-xs print:bg-gray-100 print:mt-8">
//             <p>This is a computer generated admission form. No signature required.</p>
//             <p className="mt-1">Generated on: {new Date().toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       {/* Print Styles */}
//       <style jsx>{`
//         @media print {
//           body {
//             margin: 0;
//             padding: 0;
//             background: white;
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }
//           .print\\:hidden {
//             display: none !important;
//           }
//           .print\\:bg-white {
//             background: white !important;
//           }
//           .print\\:text-black {
//             color: black !important;
//           }
//           .print\\:border-b-2 {
//             border-bottom-width: 2px !important;
//           }
//           .print\\:border-gray-800 {
//             border-color: #1f2937 !important;
//           }
//           .print\\:shadow-none {
//             box-shadow: none !important;
//           }
//           .print\\:rounded-none {
//             border-radius: 0 !important;
//           }
//           .print\\:p-0 {
//             padding: 0 !important;
//           }
//           .print\\:mb-2 {
//             margin-bottom: 0.5rem !important;
//           }
//           .print\\:text-2xl {
//             font-size: 1.5rem !important;
//           }
//           .print\\:text-xl {
//             font-size: 1.25rem !important;
//           }
//           .print\\:text-lg {
//             font-size: 1.125rem !important;
//           }
//           .print\\:text-sm {
//             font-size: 0.875rem !important;
//           }
//           .print\\:text-xs {
//             font-size: 0.75rem !important;
//           }
//           .print\\:w-40 {
//             width: 10rem !important;
//           }
//           .print\\:w-28 {
//             width: 7rem !important;
//           }
//           .print\\:h-36 {
//             height: 9rem !important;
//           }
//           .print\\:h-28 {
//             height: 7rem !important;
//           }
//           .print\\:mt-8 {
//             margin-top: 2rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubmissionSuccess;


// import React, { useState, useEffect } from 'react';

// const SubmissionSuccess = ({ formData, admissionId }) => {
//   const [displayData, setDisplayData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadSuccessData = async () => {
//       try {
//         setLoading(true);
        
//         const urlParams = new URLSearchParams(window.location.search);
//         const admissionIdFromUrl = urlParams.get('admission_id');
        
//         let finalAdmissionId = admissionIdFromUrl || admissionId;
//         let finalFormData = formData;
        
//         if (!finalAdmissionId && typeof localStorage !== 'undefined') {
//           finalAdmissionId = localStorage.getItem('pendingAdmissionId');
//           const storedData = localStorage.getItem('pendingFormData');
//           if (storedData && !finalFormData) {
//             finalFormData = JSON.parse(storedData);
//           }
//         }
        
//         if (!finalAdmissionId) {
//           finalAdmissionId = 'TEMP_' + Date.now().toString().slice(-6);
//         }
        
//         if (!finalFormData || !finalFormData.firstName) {
//           finalFormData = {
//             firstName: 'Student',
//             courseProgram: 'Course information',
//             mobileNumber: 'Not available',
//             email: 'Not available',
//             photoUrl: ''
//           };
//         }
        
//         setDisplayData({
//           admissionId: finalAdmissionId,
//           studentData: finalFormData
//         });
        
//       } catch (error) {
//         console.error('Error in loadSuccessData:', error);
//         setDisplayData({
//           admissionId: 'CONTACT_ADMIN',
//           studentData: {
//             firstName: 'Please contact',
//             lastName: 'college administration',
//             courseProgram: 'with your payment reference',
//             mobileNumber: '+91-8840157051',
//             email: 'bharattechnicalcollege@gmail.com'
//           }
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSuccessData();
//   }, [admissionId, formData]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleNewAdmission = () => {
//     if (typeof localStorage !== 'undefined') {
//       localStorage.removeItem('pendingAdmissionId');
//       localStorage.removeItem('pendingFormData');
//     }
//     if (typeof sessionStorage !== 'undefined') {
//       sessionStorage.removeItem('pendingAdmissionId');
//     }
//     window.location.href = '/admission';
//   };

//   if (loading || !displayData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-base md:text-lg">Preparing your admission details...</p>
//         </div>
//       </div>
//     );
//   }


import React, { useState, useEffect } from 'react';
import { googleSheetsService } from './services/googleSheetsService';

//fetch data form storage 
const SubmissionSuccess = ({ formData: initialFormData, admissionId: propAdmissionId }) => {
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const handlePrint = () => {
    window.print();
  };
const handleNewAdmission = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('pendingAdmissionId');
      localStorage.removeItem('pendingFormData');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('pendingAdmissionId');
    }
    window.location.href = '/admission';
  };
  useEffect(() => {
    const loadAdmissionData = async () => {
      try {
        setLoading(true);
        
        // Get admission ID from props or URL
        const urlParams = new URLSearchParams(window.location.search);
        const admissionIdFromUrl = urlParams.get('admission_id');
        const finalAdmissionId = propAdmissionId || admissionIdFromUrl;
        
        if (!finalAdmissionId) {
          throw new Error('No admission ID found');
        }

        console.log('📋 Loading admission data for:', finalAdmissionId);

        // ✅ ALWAYS try to fetch from backend first
        try {
          const response = await googleSheetsService.getAdmissionById(finalAdmissionId);
          if (response.success && response.data) {
            console.log('✅ Data loaded from backend');
            setDisplayData({
              admissionId: finalAdmissionId,
              studentData: transformBackendData(response.data)
            });
            setLoading(false);
            return;
          }
        } catch (backendError) {
          console.warn('⚠️ Backend fetch failed, trying fallbacks:', backendError);
        }

        // ✅ FALLBACK 1: Use props data
        if (initialFormData && initialFormData.firstName) {
          console.log('✅ Using prop data');
          setDisplayData({
            admissionId: finalAdmissionId,
            studentData: initialFormData
          });
          setLoading(false);
          return;
        }

        // ✅ FALLBACK 2: Local storage
        const localData = recoverFromLocalStorage(finalAdmissionId);
        if (localData) {
          console.log('✅ Using local storage data');
          setDisplayData({
            admissionId: finalAdmissionId,
            studentData: localData
          });
          setLoading(false);
          return;
        }

        // ✅ FINAL FALLBACK: Minimal data
        console.warn('⚠️ Using fallback data');
        setDisplayData({
          admissionId: finalAdmissionId,
          studentData: {
            firstName: 'Student',
            courseProgram: 'Course information',
            mobileNumber: 'Not available',
            email: 'Not available',
            photoUrl: ''
          }
        });

      } catch (err) {
        console.error('❌ Error loading admission data:', err);
        setError(err.message);
        setDisplayData({
          admissionId: 'ERROR',
          studentData: {
            firstName: 'Error loading data',
            courseProgram: 'Please contact administration',
            mobileNumber: '+91-8840157051',
            email: 'bharattechnicalcollege@gmail.com'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadAdmissionData();
  }, [initialFormData, propAdmissionId]);

  // In SubmissionSuccess.jsx - Improved data fetching
useEffect(() => {
  const fetchAdmissionData = async () => {
    try {
      setLoading(true);
      
      // Get admission ID from URL or props
      const urlParams = new URLSearchParams(window.location.search);
      const admissionIdFromUrl = urlParams.get('admission_id');
      const finalAdmissionId = propAdmissionId || admissionIdFromUrl;
      
      if (!finalAdmissionId) {
        throw new Error('No admission ID found');
      }

      console.log('🔍 Fetching data for admission:', finalAdmissionId);

      // Try multiple data sources in order of reliability
      let studentData = null;

      // 1. Try backend API first
      try {
        const response = await googleSheetsService.getAdmissionById(finalAdmissionId);
        if (response.success && response.data) {
          console.log('✅ Data loaded from backend');
          studentData = transformBackendData(response.data);
        }
      } catch (backendError) {
        console.warn('❌ Backend fetch failed:', backendError);
      }

      // 2. Fallback to localStorage
      if (!studentData) {
        studentData = recoverFromLocalStorage(finalAdmissionId);
        if (studentData) {
          console.log('✅ Data loaded from localStorage');
        }
      }

      // 3. Fallback to props
      if (!studentData && initialFormData) {
        studentData = initialFormData;
        console.log('✅ Using initial form data');
      }

      // 4. Final fallback
      if (!studentData) {
        console.warn('⚠️ Using fallback data');
        studentData = createFallbackData();
      }

      setDisplayData({
        admissionId: finalAdmissionId,
        studentData: studentData
      });

    } catch (error) {
      console.error('❌ Error loading admission data:', error);
      setError(error.message);
      setDisplayData({
        admissionId: 'ERROR',
        studentData: createFallbackData()
      });
    } finally {
      setLoading(false);
    }
  };

  fetchAdmissionData();
}, [propAdmissionId, initialFormData]);

  // Transform function (same as in AdmissionForm)
  const transformBackendData = (backendData) => {
    return {
      title: backendData.title || '',
      firstName: backendData.firstName || '',
      lastName: backendData.lastName || '',
      dateOfBirth: backendData.dateOfBirth || '',
      fatherName: backendData.fatherName || '',
      motherName: backendData.motherName || '',
      age: backendData.age || '',
      castCategory: backendData.castCategory || '',
      aadharNumber: backendData.aadharNumber || '',
      mobileNumber: backendData.mobileNumber || '',
      email: backendData.email || '',
      address: backendData.address || '',
      city: backendData.city || '',
      villagePost: backendData.villagePost || '',
      district: backendData.district || '',
      state: backendData.state || '',
      pinCode: backendData.pinCode || '',
      permanentAddress: backendData.permanentAddress || '',
      courseProgram: backendData.courseProgram || '',
      photoUrl: backendData.photoUrl || '',
      tenth: {
        collegeName: backendData.tenthCollegeName || backendData.tenth?.collegeName || '',
        yearOfPassing: backendData.tenthYearOfPassing || backendData.tenth?.yearOfPassing || '',
        percentage: backendData.tenthPercentage || backendData.tenth?.percentage || ''
      },
      // ... include other education levels
    };
  };

  // Local storage recovery
  const recoverFromLocalStorage = (admissionId) => {
    try {
      const storedData = localStorage.getItem('admissionFormData');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed.admissionId === admissionId && parsed.formData) {
          return parsed.formData;
        }
      }
    } catch (error) {
      console.error('Local storage recovery error:', error);
    }
    return null;
  };

  // ... rest of your component remains the same
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-base md:text-lg">Loading your admission details...</p>
          <p className="text-sm text-gray-500 mt-2">Admission ID: {propAdmissionId}</p>
        </div>
      </div>
    );
  }
  const { admissionId: displayAdmissionId, studentData } = displayData;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      {/* Screen View */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 print:hidden">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4">
            ✅ Admission Form Submitted Successfully!
          </h2>
          <div className="bg-white border border-green-300 rounded-lg p-3 md:p-4 inline-block max-w-full">
            <p className="text-base md:text-lg font-semibold">Admission Reference ID:</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">{displayAdmissionId}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-4 md:mb-6">
          <button 
            onClick={handlePrint} 
            className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
          >
            🖨️ Print Admission Form
          </button>
          <button 
            onClick={handleNewAdmission} 
            className="px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base"
          >
            📝 New Admission
          </button>
        </div>
      </div>

      {/* Print Format - Matches PDF Template */}
      <div className="bg-white print:bg-white print:shadow-none print:border-0 print:p-0">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Header Section - Responsive */}
          <div className="bg-blue-900 text-white p-3 md:p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-gray-800">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 mb-3 md:mb-4 print:mb-2">
              <div className="text-center md:text-left order-2 md:order-1">
                <p className="text-xs md:text-sm print:text-xs">Phone: +91-8840157051</p>
                <p className="text-xs md:text-sm print:text-xs">Email: bharattechnicalcollege@gmail.com</p>
              </div>
              <div className="text-center flex-1 order-1 md:order-2">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold print:text-2xl mb-1 md:mb-2">BHARAT TECHNICAL COLLEGE</h1>
                <p className="text-sm md:text-base lg:text-lg print:text-sm italic">OF FIRE ENGINEERING & SAFETY MANAGEMENT</p>
                <p className="text-xs md:text-sm print:text-xs mt-1">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</p>
              </div>
              <div className="text-center md:text-right order-3">
                <p className="text-xs md:text-sm print:text-xs">Website: bharattechnicalcollege.com</p>
                <p className="text-xs md:text-sm print:text-xs">Approved by: Govt. of India</p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="border-b-2 border-gray-800 p-3 md:p-4 text-center">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold print:text-xl">ADMISSION FORM</h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-8 mt-2 text-xs md:text-sm">
              <p><strong>SESSION:</strong> {new Date().getFullYear()}</p>
              <p><strong>COURSE:</strong> {studentData.courseProgram || 'DIPLOMA'}</p>
              <p><strong>STREAM:</strong> Fire And Safety Management</p>
            </div>
          </div>

          {/* Student Photo Section - Responsive */}
          <div className="p-3 md:p-6 border-b border-gray-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                {/* Student Photo */}
                <div className="flex flex-col items-center">
                  {studentData.photoUrl ? (
                    <img 
                      src={studentData.photoUrl} 
                      alt="Student Photo" 
                      className="w-24 h-30 sm:w-28 sm:h-36 md:w-32 md:h-40 object-cover border-2 border-gray-400 print:border-gray-800 print:w-28 print:h-36"
                    />
                  ) : (
                    <div className="w-24 h-30 sm:w-28 sm:h-36 md:w-32 md:h-40 border-2 border-dashed border-gray-400 flex items-center justify-center print:border-gray-800 print:w-28 print:h-36">
                      <span className="text-gray-500 text-xs print:text-xs">No Photo</span>
                    </div>
                  )}
                  <p className="text-xs mt-2 font-semibold print:text-xs">Passport Size Photo</p>
                </div>
                
                {/* Student Basic Info */}
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-32 print:w-28 text-sm">Enrollment No:</span>
                    <span className="font-bold text-blue-700 text-sm md:text-base">{displayAdmissionId}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-32 print:w-28 text-sm">Candidate Name:</span>
                    <span className="font-medium text-sm md:text-base">{studentData.title} {studentData.firstName} {studentData.lastName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-32 print:w-28 text-sm">Father's Name:</span>
                    <span className="text-sm md:text-base">{studentData.fatherName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="font-semibold w-32 print:w-28 text-sm">Course:</span>
                    <span className="text-sm md:text-base">{studentData.courseProgram}</span>
                  </div>
                </div>
              </div>
              
              {/* College Stamp Area */}
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-400 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center print:border-gray-800 print:w-28 print:h-28 mx-auto">
                  <p className="text-xs text-gray-500 text-center print:text-xs">College Stamp<br/>&<br/>Signature</p>
                </div>
              </div>
            </div>
          </div>

          {/* General Information Section - Responsive */}
          <div className="p-3 md:p-6">
            <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">GENERAL INFORMATION</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Enrollment No:</span>
                <span>{displayAdmissionId}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Name of Candidate:</span>
                <span>{studentData.title} {studentData.firstName} {studentData.lastName}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Father's Name:</span>
                <span>{studentData.fatherName}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Mother's Name:</span>
                <span>{studentData.motherName}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Date Of Birth:</span>
                <span>{studentData.dateOfBirth}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Nationality:</span>
                <span>Indian</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Category:</span>
                <span>{studentData.castCategory}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Gender:</span>
                <span>{studentData.gender || 'Male'}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Admission Type:</span>
                <span>Regular</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Year:</span>
                <span>{new Date().getFullYear()}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Contact Number:</span>
                <span className="break-all">{studentData.mobileNumber}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Email Address:</span>
                <span className="break-all">{studentData.email}</span>
              </div>
              
              <div className="sm:col-span-2 flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Candidate Address:</span>
                <span className="flex-1">{studentData.address}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">City:</span>
                <span>{studentData.city}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Pin Code:</span>
                <span>{studentData.pinCode}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">State:</span>
                <span>{studentData.state}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Country:</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Qualification Information Section - Responsive */}
          <div className="p-3 md:p-6">
            <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">QUALIFICATION INFORMATION</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-800 text-xs md:text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-800 p-1 md:p-2 text-left">Examination</th>
                    <th className="border border-gray-800 p-1 md:p-2 text-left">Year</th>
                    <th className="border border-gray-800 p-1 md:p-2 text-left">Board/University</th>
                    <th className="border border-gray-800 p-1 md:p-2 text-left">Marks(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-800 p-1 md:p-2">SECONDARY (10th)</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.yearOfPassing || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.collegeName || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.percentage || '-'}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-1 md:p-2">SR. SECONDARY (12th)</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.yearOfPassing || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.collegeName || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.percentage || '-'}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-1 md:p-2">DIPLOMA</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.yearOfPassing || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.collegeName || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.percentage || '-'}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-1 md:p-2">GRADUATION</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.yearOfPassing || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.collegeName || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.percentage || '-'}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-1 md:p-2">POST GRADUATION</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.yearOfPassing || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.collegeName || '-'}</td>
                    <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.percentage || '-'}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Declaration Section - Responsive */}
          <div className="p-3 md:p-6">
            <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">DECLARATION</h3>
            
            <div className="text-xs md:text-sm space-y-2 md:space-y-3 mb-4 md:mb-6">
              <p className='list-disc list-inside mt-3  space-y-1'>
                
                I hereby declare that entries made by me in this admission form and the documents submitted by me along with it, are true to the best of my knowledge, in all respects and in any case, if any information is found to be false, this shall entail automatic cancellation of my admission and forfeiture of all fee deposited, besides rendering me liable to such action as the College may deem proper.
              </p>
              
              <p>
                I take note that my admission to the College and continuation on its roll are subject to the provisions of rules of the College, issued from time to time. I shall abide by the rules of discipline and proper conduct. I am fully aware of the law regarding ragging as well as the punishment and that if, found guilty on this account I am liable to be punished appropriately. I hereby undertake that I shall not indulge in any act of ragging.
              </p>
              
              <p>
                In such circumstances, I will have no claim for refund of fees deposited by me the College.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mt-6 md:mt-8">
              <div>
                <p className="text-xs md:text-sm">Place: Robertsganj, Sonbhadra</p>
                <p className="text-xs md:text-sm">Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-800 w-48 md:w-64 mt-8 md:mt-12 pt-2">
                  <p className="text-xs md:text-sm font-semibold">(Signature of Candidate)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-100 p-3 md:p-4 text-center text-xs print:bg-gray-100 print:mt-8">
            <p>This is a computer generated admission form. No signature required.</p>
            <p className="mt-1">Generated on: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      
      {/* <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:border-b-2 {
            border-bottom-width: 2px !important;
          }
          .print\\:border-gray-800 {
            border-color: #1f2937 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:mb-2 {
            margin-bottom: 0.5rem !important;
          }
          .print\\:text-2xl {
            font-size: 1.5rem !important;
          }
          .print\\:text-xl {
            font-size: 1.25rem !important;
          }
          .print\\:text-lg {
            font-size: 1.125rem !important;
          }
          .print\\:text-sm {
            font-size: 0.875rem !important;
          }
          .print\\:text-xs {
            font-size: 0.75rem !important;
          }
          .print\\:w-40 {
            width: 10rem !important;
          }
          .print\\:w-28 {
            width: 7rem !important;
          }
          .print\\:h-36 {
            height: 9rem !important;
          }
          .print\\:h-28 {
            height: 7rem !important;
          }
          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
        }
      `}</style> */}
      <style jsx>{`
  @media print {
    /* Reset and base styles */
    * {
      margin: 2 !important;
      padding: 2 !important;
      box-sizing: border-box !important;
    }
    
    body {
      margin: 2 !important;
      padding: 2 !important;
      background: white !important;
      width: 100% !important;
      height: 100% !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-family: "Times New Roman", Times, serif !important;
    }

    /* Force A4/Landscape size */
    @page {
      size: A4 landscape;
      margin: 0.5cm;
    }

    /* Main container for print */
    .print-container {
      width: 100% !important;
      max-width: none !important;
      margin: 0 auto !important;
      padding: 0 !important;
      background: white !important;
    }

    /* Hide non-print elements */
    .print\\:hidden {
      display: none !important;
    }

    /* Print-specific styles */
    .print\\:bg-white {
      background: white !important;
    }
    .print\\:text-black {
      color: black !important;
    }
    .print\\:border-b-2 {
      border-bottom-width: 2px !important;
    }
    .print\\:border-gray-800 {
      border-color: #1f2937 !important;
    }
    .print\\:shadow-none {
      box-shadow: none !important;
    }
    .print\\:rounded-none {
      border-radius: 0 !important;
    }
    .print\\:p-0 {
      padding: 0 !important;
    }
    .print\\:mb-2 {
      margin-bottom: 0.5rem !important;
    }

    /* Font sizes for print */
    .print\\:text-2xl {
      font-size: 18pt !important;
      line-height: 1.2 !important;
    }
    .print\\:text-xl {
      font-size: 16pt !important;
      line-height: 1.3 !important;
    }
    .print\\:text-lg {
      font-size: 14pt !important;
      line-height: 1.3 !important;
    }
    .print\\:text-base {
      font-size: 12pt !important;
      line-height: 1.4 !important;
    }
    .print\\:text-sm {
      font-size: 11pt !important;
      line-height: 1.4 !important;
    }
    .print\\:text-xs {
      font-size: 10pt !important;
      line-height: 1.4 !important;
    }

    /* Layout for print */
    .print\\:w-40 {
      width: 10rem !important;
    }
    .print\\:w-28 {
      width: 7rem !important;
    }
    .print\\:h-36 {
      height: 9rem !important;
    }
    .print\\:h-28 {
      height: 7rem !important;
    }
    .print\\:mt-8 {
      margin-top: 2rem !important;
    }

    /* Ensure proper spacing */
    .print\\:space-y-4 > * + * {
      margin-top: 1rem !important;
    }

    /* Table styles for print */
    table {
      width: 100% !important;
      border-collapse: collapse !important;
      font-size: 10pt !important;
      page-break-inside: auto !important;
    }
    
    th, td {
      border: 1px solid #000 !important;
      padding: 6px 8px !important;
      text-align: left !important;
    }

    th {
      background-color: #f8f9fa !important;
      font-weight: bold !important;
    }

    /* Prevent page breaks inside important elements */
    .print\\:break-inside-avoid {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Force page breaks where needed */
    .print\\:page-break-before {
      page-break-before: always !important;
    }

    .print\\:page-break-after {
      page-break-after: always !important;
    }

    /* Image handling */
    img {
      max-width: 100% !important;
      height: auto !important;
      print-color-adjust: exact !important;
    }

    /* Ensure good contrast */
    .text-gray-800,
    .text-gray-700,
    .text-gray-600 {
      color: #000 !important;
    }

    /* Remove backgrounds for better printing */
    .bg-gray-50,
    .bg-blue-50,
    .bg-green-50,
    .bg-yellow-50 {
      background: transparent !important;
      border: 1px solid #ccc !important;
    }

    /* Header styles */
    .print-header {
      border-bottom: 2px solid #000 !important;
      margin-bottom: 1rem !important;
      padding-bottom: 0.5rem !important;
    }

    /* Section spacing */
    .print-section {
      margin-bottom: 1.5rem !important;
      page-break-inside: avoid !important;
    }

    /* Flexbox for print */
    .print\\:flex {
      display: flex !important;
    }
    
    .print\\:flex-row {
      flex-direction: row !important;
    }
    
    .print\\:justify-between {
      justify-content: space-between !important;
    }
    
    .print\\:items-center {
      align-items: center !important;
    }

    /* Grid for print */
    .print\\:grid {
      display: grid !important;
    }
    
    .print\\:grid-cols-2 {
      grid-template-columns: 1fr 1fr !important;
      gap: 1rem !important;
    }

    /* Ensure all content is visible */
    .overflow-hidden {
      overflow: visible !important;
    }

    /* Remove any transforms or animations */
    * {
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
  }

  /* Screen styles that mimic print layout */
  @media screen and (min-width: 768px) {
    .print-preview {
      max-width: 297mm; /* A4 width */
      min-height: 210mm; /* A4 height */
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      padding: 20px;
    }
  }
`}</style>
    </div>
  );
};

export default SubmissionSuccess;