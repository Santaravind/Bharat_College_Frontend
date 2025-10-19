

// export default SubmissionSuccess;
// import React, { useState, useEffect } from 'react';
// import { googleSheetsService } from './services/googleSheetsService';

// const SubmissionSuccess = ({ formData: initialFormData, admissionId: propAdmissionId }) => {
//   const [displayData, setDisplayData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [manualAdmissionId, setManualAdmissionId] = useState('');
//   const [searchLoading, setSearchLoading] = useState(false);

//   // Check if we have admission data on component mount
//   useEffect(() => {
//     const loadInitialData = async () => {
//       // If we have admission ID from props, load data automatically
//       if (propAdmissionId) {
//         await fetchAdmissionData(propAdmissionId);
//       } else {
//         // Check URL parameters for payment return
//         const urlParams = new URLSearchParams(window.location.search);
//         const paymentSuccess = urlParams.get('payment_success');
        
//         if (paymentSuccess) {
//           // Show success message but keep search form visible
//           console.log('Payment successful - showing search form');
//         }
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [propAdmissionId]);

//   // Function to fetch admission data by ID
//   const fetchAdmissionData = async (admissionId) => {
//     try {
//       setSearchLoading(true);
//       setError(null);

//       // console.log('Searching for admission ID:', admissionId);

//       // Try to fetch from backend
//       const response = await googleSheetsService.getAdmissionById(admissionId);
      
//       if (response.success && response.data) {
//         console.log('Admission data found:', response.data);
//         setDisplayData({
//           admissionId: admissionId,
//           studentData: transformBackendData(response.data)
//         });
//       } else {
//         throw new Error('Admission ID not found');
//       }
//     } catch (error) {
//       console.error('Error fetching admission data:', error);
//       setError('Admission ID not found or error loading data. Please check the ID and try again.');
//       setDisplayData(null); // Ensure displayData is null on error
//     } finally {
//       setSearchLoading(false);
//       setLoading(false);
//     }
//   };

//   // Handle manual admission ID search
//   const handleManualSearch = async (e) => {
//     e.preventDefault();
//     if (!manualAdmissionId.trim()) {
//       setError('Please enter an Admission ID');
//       return;
//     }
//     await fetchAdmissionData(manualAdmissionId.trim().toUpperCase());
//   };

//   // Transform backend data
//   const transformBackendData = (backendData) => {
//     return {
//       title: backendData.title || '',
//       firstName: backendData.firstName || '',
//       lastName: backendData.lastName || '',
//       dateOfBirth: backendData.dateOfBirth || '',
//       fatherName: backendData.fatherName || '',
//       motherName: backendData.motherName || '',
//       age: backendData.age || '',
//       castCategory: backendData.castCategory || '',
//       aadharNumber: backendData.aadharNumber || '',
//       mobileNumber: backendData.mobileNumber || '',
//       email: backendData.email || '',
//       address: backendData.address || '',
//       city: backendData.city || '',
//       villagePost: backendData.villagePost || '',
//       district: backendData.district || '',
//       state: backendData.state || '',
//       pinCode: backendData.pinCode || '',
//       permanentAddress: backendData.permanentAddress || '',
//       courseProgram: backendData.courseProgram || '',
//       photoUrl: backendData.photoUrl || '',
//       gender: backendData.gender || 'Male',
//       tenth: {
//         collegeName: backendData.tenthCollegeName || backendData.tenth?.collegeName || '',
//         yearOfPassing: backendData.tenthYearOfPassing || backendData.tenth?.yearOfPassing || '',
//         percentage: backendData.tenthPercentage || backendData.tenth?.percentage || ''
//       },
//       twelfth: {
//         collegeName: backendData.twelfthCollegeName || backendData.twelfth?.collegeName || '',
//         yearOfPassing: backendData.twelfthYearOfPassing || backendData.twelfth?.yearOfPassing || '',
//         percentage: backendData.twelfthPercentage || backendData.twelfth?.percentage || ''
//       },
//       diploma: {
//         collegeName: backendData.diplomaCollegeName || backendData.diploma?.collegeName || '',
//         yearOfPassing: backendData.diplomaYearOfPassing || backendData.diploma?.yearOfPassing || '',
//         percentage: backendData.diplomaPercentage || backendData.diploma?.percentage || ''
//       },
//       graduation: {
//         collegeName: backendData.graduationCollegeName || backendData.graduation?.collegeName || '',
//         yearOfPassing: backendData.graduationYearOfPassing || backendData.graduation?.yearOfPassing || '',
//         percentage: backendData.graduationPercentage || backendData.graduation?.percentage || ''
//       },
//       postGraduation: {
//         collegeName: backendData.postGraduationCollegeName || backendData.postGraduation?.collegeName || '',
//         yearOfPassing: backendData.postGraduationYearOfPassing || backendData.postGraduation?.yearOfPassing || '',
//         percentage: backendData.postGraduationPercentage || backendData.postGraduation?.percentage || ''
//       }
//     };
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleNewAdmission = () => {
//     if (typeof localStorage !== 'undefined') {
//       localStorage.removeItem('pendingAdmissionId');
//       localStorage.removeItem('admissionFormData');
//     }
//     window.location.href = '/admission';
//   };

//   const handleNewSearch = () => {
//     setDisplayData(null);
//     setManualAdmissionId('');
//     setError(null);
//   };

//   // Show search form when no data is loaded
//   if (!displayData) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-2xl mx-auto px-4">
//           {/* Success Message */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-green-800 mb-2">
//               {propAdmissionId ? 'Admission Form' : 'Payment Successful!'}
//             </h2>
//             <p className="text-green-700">
//               {propAdmissionId 
//                 ? 'Enter your Admission ID to view and print your admission form.'
//                 : 'Your payment has been processed successfully. Enter your Admission ID to view and print your admission form.'
//               }
//             </p>
//           </div>

//           {/* Admission ID Search Form */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Your Admission ID</h3>
            
//             {/* Instructions */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//               <h4 className="font-semibold text-blue-800 mb-2">Where to find your Admission ID?</h4>
//               <ul className="text-blue-700 text-sm space-y-1">
//                 <li>• It was shown when you submitted the form</li>
//                 <li>• Check your email inbox and spam folder</li>
//                 <li>• You should have saved it before payment</li>
//                 <li>• Format: ADM followed by numbers (e.g., ADM12345678)</li>
//               </ul>
//             </div>
            
//             <form onSubmit={handleManualSearch} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Admission ID *
//                 </label>
//                 <input
//                   type="text"
//                   value={manualAdmissionId}
//                   onChange={(e) => setManualAdmissionId(e.target.value.toUpperCase())}
//                   placeholder="Enter ADM followed by numbers (e.g., ADM12345678)"
//                   className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
//                   required
//                 />
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                   <p className="text-red-700">{error}</p>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={searchLoading}
//                 className={`w-full px-6 py-3 rounded-md text-white font-semibold ${
//                   searchLoading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {searchLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Searching...
//                   </span>
//                 ) : (
//                   'View & Print Admission Form'
//                 )}
//               </button>
//             </form>

//             {/* Help Section */}
//             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <h4 className="font-semibold text-yellow-800 mb-2">Don't remember your Admission ID?</h4>
//               <p className="text-yellow-700 text-sm">
//                 • Check your email thoroughly (including spam folder)<br/>
//                 • Contact college administration: <strong>+91-8840157051</strong><br/>
//                 • Email: <strong>bharattechnicalcollege@gmail.com</strong><br/>
//                 • Visit college with your personal details for assistance
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-lg">Loading your admission details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show admission form when data is available
//   const { admissionId: displayAdmissionId, studentData } = displayData;

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 md:py-8">
//       {/* Screen View */}
//       <div className="max-w-4xl mx-auto px-3 sm:px-4 print:hidden">
//         <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6 text-center">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4">
//             ✅ Admission Form Ready!
//           </h2>
//           <div className="bg-white border border-green-300 rounded-lg p-3 md:p-4 inline-block max-w-full">
//             <p className="text-base md:text-lg font-semibold">Admission Reference ID:</p>
//             <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">{displayAdmissionId}</p>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-4 md:mb-6">
//           <button 
//             onClick={handlePrint} 
//             className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
//           >
//             🖨️ Print Admission Form
//           </button>
//           <button 
//             onClick={handleNewAdmission} 
//             className="px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base"
//           >
//             📝 New Admission
//           </button>
//           <button 
//             onClick={handleNewSearch} 
//             className="px-4 py-2 md:px-6 md:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm md:text-base"
//           >
//             🔍 Search Another ID
//           </button>
//         </div>

//         {/* Instructions */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//           <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps</h3>
//           <ul className="text-blue-700 list-disc list-inside space-y-1 text-sm">
//             <li>Print this admission form</li>
//             <li>Visit college campus with original documents</li>
//             <li>Bring this printed form for verification</li>
//             <li>Complete remaining admission formalities</li>
//           </ul>
//         </div>
//       </div>

//       {/* Print Format - Matches PDF Template */}
//       <div className="bg-white print:bg-white print:shadow-none print:border-0 print:p-0">
//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          
//           {/* Header Section - Responsive */}
//           <div className="bg-blue-900 text-white p-3 md:p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-gray-800">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 mb-3 md:mb-4 print:mb-2">
//               <div className="text-center md:text-left order-2 md:order-1">
//                 <p className="text-xs md:text-sm print:text-xs">Phone: +91-8840157051</p>
//                 <p className="text-xs md:text-sm print:text-xs">Email: bharattechnicalcollege@gmail.com</p>
//               </div>
//               <div className="text-center flex-1 order-1 md:order-2">
//                 <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold print:text-2xl mb-1 md:mb-2">BHARAT TECHNICAL COLLEGE</h1>
//                 <p className="text-sm md:text-base lg:text-lg print:text-sm italic">OF FIRE ENGINEERING & SAFETY MANAGEMENT</p>
//                 <p className="text-xs md:text-sm print:text-xs mt-1">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</p>
//               </div>
//               <div className="text-center md:text-right order-3">
//                 <p className="text-xs md:text-sm print:text-xs">Website: bharattechnicalcollege.com</p>
//                 <p className="text-xs md:text-sm print:text-xs">Approved by: Govt. of India</p>
//               </div>
//             </div>
//           </div>

//           {/* Main Title */}
//           <div className="border-b-2 border-gray-800 p-3 md:p-4 text-center">
//             <h2 className="text-lg md:text-xl lg:text-2xl font-bold print:text-xl">ADMISSION FORM</h2>
//             <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-8 mt-2 text-xs md:text-sm">
//               <p><strong>SESSION:</strong> {new Date().getFullYear()}</p>
//               <p><strong>COURSE:</strong> {studentData.courseProgram || 'DIPLOMA'}</p>
//               <p><strong>STREAM:</strong> Fire And Safety Management</p>
//             </div>
//           </div>

//           {/* Student Photo Section - Responsive */}
//           <div className="p-3 md:p-6 border-b border-gray-300">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//               <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
//                 {/* Student Photo */}
//                 <div className="flex flex-col items-center">
//                   {studentData.photoUrl ? (
//                     <img 
//                       src={studentData.photoUrl} 
//                       alt="Student Photo" 
//                       className="w-24 h-30 sm:w-28 sm:h-36 md:w-32 md:h-40 object-cover border-2 border-gray-400 print:border-gray-800 print:w-28 print:h-36"
//                     />
//                   ) : (
//                     <div className="w-24 h-30 sm:w-28 sm:h-36 md:w-32 md:h-40 border-2 border-dashed border-gray-400 flex items-center justify-center print:border-gray-800 print:w-28 print:h-36">
//                       <span className="text-gray-500 text-xs print:text-xs">No Photo</span>
//                     </div>
//                   )}
//                   <p className="text-xs mt-2 font-semibold print:text-xs">Passport Size Photo</p>
//                 </div>
                
//                 {/* Student Basic Info */}
//                 <div className="space-y-2 text-center sm:text-left">
//                   <div className="flex flex-col sm:flex-row">
//                     <span className="font-semibold w-32 print:w-28 text-sm">Enrollment No:</span>
//                     <span className="font-bold text-blue-700 text-sm md:text-base">{displayAdmissionId}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row">
//                     <span className="font-semibold w-32 print:w-28 text-sm">Candidate Name:</span>
//                     <span className="font-medium text-sm md:text-base">{studentData.title} {studentData.firstName} {studentData.lastName}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row">
//                     <span className="font-semibold w-32 print:w-28 text-sm">Father's Name:</span>
//                     <span className="text-sm md:text-base">{studentData.fatherName}</span>
//                   </div>
//                   <div className="flex flex-col sm:flex-row">
//                     <span className="font-semibold w-32 print:w-28 text-sm">Course:</span>
//                     <span className="text-sm md:text-base">{studentData.courseProgram}</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* College Stamp Area */}
//               <div className="text-center">
//                 <div className="border-2 border-dashed border-gray-400 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center print:border-gray-800 print:w-28 print:h-28 mx-auto">
//                   <p className="text-xs text-gray-500 text-center print:text-xs">College Stamp<br/>&<br/>Signature</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* General Information Section - Responsive */}
          // <div className="p-3 md:p-6">
          //   <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">GENERAL INFORMATION</h3>
            
          //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Enrollment No:</span>
          //       <span>{displayAdmissionId}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Name of Candidate:</span>
          //       <span>{studentData.title} {studentData.firstName} {studentData.lastName}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Father's Name:</span>
          //       <span>{studentData.fatherName}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Mother's Name:</span>
          //       <span>{studentData.motherName}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Date Of Birth:</span>
          //       <span>{studentData.dateOfBirth}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Nationality:</span>
          //       <span>Indian</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Category:</span>
          //       <span>{studentData.castCategory}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Gender:</span>
          //       <span>{studentData.gender || 'Male'}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Admission Type:</span>
          //       <span>Regular</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Year:</span>
          //       <span>{new Date().getFullYear()}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Contact Number:</span>
          //       <span className="break-all">{studentData.mobileNumber}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Email Address:</span>
          //       <span className="break-all">{studentData.email}</span>
          //     </div>
              
          //     <div className="sm:col-span-2 flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Candidate Address:</span>
          //       <span className="flex-1">{studentData.address}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">City:</span>
          //       <span>{studentData.city}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Pin Code:</span>
          //       <span>{studentData.pinCode}</span>
          //     </div>
              
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">State:</span>
          //       <span>{studentData.state}</span>
          //     </div>
          //     <div className="flex flex-col sm:flex-row">
          //       <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Country:</span>
          //       <span>India</span>
          //     </div>
          //   </div>
          // </div>

          // {/* Qualification Information Section - Responsive */}
          // <div className="p-3 md:p-6">
          //   <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">QUALIFICATION INFORMATION</h3>
            
          //   <div className="overflow-x-auto">
          //     <table className="w-full border-collapse border border-gray-800 text-xs md:text-sm min-w-[500px]">
          //       <thead>
          //         <tr className="bg-gray-100">
          //           <th className="border border-gray-800 p-1 md:p-2 text-left">Examination</th>
          //           <th className="border border-gray-800 p-1 md:p-2 text-left">Year</th>
          //           <th className="border border-gray-800 p-1 md:p-2 text-left">Board/University</th>
          //           <th className="border border-gray-800 p-1 md:p-2 text-left">Marks(%)</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         <tr>
          //           <td className="border border-gray-800 p-1 md:p-2">SECONDARY (10th)</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.yearOfPassing || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.collegeName || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.tenth?.percentage || '-'}%</td>
          //         </tr>
          //         <tr>
          //           <td className="border border-gray-800 p-1 md:p-2">SR. SECONDARY (12th)</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.yearOfPassing || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.collegeName || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.twelfth?.percentage || '-'}%</td>
          //         </tr>
          //         <tr>
          //           <td className="border border-gray-800 p-1 md:p-2">DIPLOMA</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.yearOfPassing || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.collegeName || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.diploma?.percentage || '-'}%</td>
          //         </tr>
          //         <tr>
          //           <td className="border border-gray-800 p-1 md:p-2">GRADUATION</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.yearOfPassing || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.collegeName || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.graduation?.percentage || '-'}%</td>
          //         </tr>
          //         <tr>
          //           <td className="border border-gray-800 p-1 md:p-2">POST GRADUATION</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.yearOfPassing || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.collegeName || '-'}</td>
          //           <td className="border border-gray-800 p-1 md:p-2">{studentData.postGraduation?.percentage || '-'}%</td>
          //         </tr>
          //       </tbody>
          //     </table>
          //   </div>
          // </div>

          // {/* Declaration Section - Responsive */}
          // <div className="p-3 md:p-6">
          //   <h3 className="text-lg md:text-xl font-bold border-b-2 border-gray-800 mb-3 md:mb-4 print:text-lg">DECLARATION</h3>
            
          //   <div className="text-xs md:text-sm space-y-2 md:space-y-3 mb-4 md:mb-6">
          //     <p>
          //       I hereby declare that entries made by me in this admission form and the documents submitted by me along with it, are true to the best of my knowledge, in all respects and in any case, if any information is found to be false, this shall entail automatic cancellation of my admission and forfeiture of all fee deposited, besides rendering me liable to such action as the College may deem proper.
          //     </p>
              
          //     <p>
          //       I take note that my admission to the College and continuation on its roll are subject to the provisions of rules of the College, issued from time to time. I shall abide by the rules of discipline and proper conduct. I am fully aware of the law regarding ragging as well as the punishment and that if, found guilty on this account I am liable to be punished appropriately. I hereby undertake that I shall not indulge in any act of ragging.
          //     </p>
              
          //     <p>
          //       In such circumstances, I will have no claim for refund of fees deposited by me the College.
          //     </p>
          //   </div>
            
          //   <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mt-6 md:mt-8">
          //     <div>
          //       <p className="text-xs md:text-sm">Place: Robertsganj, Sonbhadra</p>
          //       <p className="text-xs md:text-sm">Date: {new Date().toLocaleDateString()}</p>
          //     </div>
          //     <div className="text-center">
          //       <div className="border-t border-gray-800 w-48 md:w-64 mt-8 md:mt-12 pt-2">
          //         <p className="text-xs md:text-sm font-semibold">(Signature of Candidate)</p>
          //       </div>
          //     </div>
          //   </div>
          // </div>

          // {/* Footer Note */}
          // <div className="bg-gray-100 p-3 md:p-4 text-center text-xs print:bg-gray-100 print:mt-8">
          //   <p>This is a computer generated admission form. No signature required.</p>
          //   <p className="mt-1">Generated on: {new Date().toLocaleString()}</p>
          // </div>
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

import React, { useState, useEffect } from 'react';
import { googleSheetsService } from './services/googleSheetsService';

const SubmissionSuccess = ({ formData: initialFormData, admissionId: propAdmissionId }) => {
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Check if we have admission data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      // If we have admission ID from props, load data automatically
      if (propAdmissionId) {
        await fetchAdmissionDataByAdmissionId(propAdmissionId);
      } else {
        // Check URL parameters for payment return
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        
        if (paymentSuccess) {
          // Show success message but keep search form visible
          console.log('Payment successful - showing search form');
        }
        setLoading(false);
      }
    };

    loadInitialData();
  }, [propAdmissionId]);

  // // Function to fetch admission data by email
  // const fetchAdmissionDataByEmail = async (email) => {
  //   try {
  //     setSearchLoading(true);
  //     setError(null);

  //     console.log('Searching for admission by email:', email);

  //     // Try to fetch from backend by email
  //     const response = await googleSheetsService.getAdmissionByEmail(email);
      
  //     if (response.success && response.data) {
  //       console.log('Admission data found:', response.data);
  //       setDisplayData({
  //         admissionId: response.data.admissionId,
  //         studentData: transformBackendData(response.data)
  //       });
  //     } else {
  //       throw new Error('No admission found with this email address');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching admission data:', error);
  //     setError('No admission found with this email address. Please check your email and try again.');
  //     setDisplayData(null);
  //   } finally {
  //     setSearchLoading(false);
  //     setLoading(false);
  //   }
  // };
//   // Function to fetch admission data by email
// const fetchAdmissionDataByEmail = async (email) => {
//   try {
//     setSearchLoading(true);
//     setError(null);

//     console.log('Searching for admission by email:', email);

//     // Try to fetch from backend by email
//     const response = await googleSheetsService.getAdmissionByEmail(email);
    
//     if (response.success && response.data) {
//       console.log('Admission data found:', response.data);
      
//       // Handle both single object and array responses
//       const admissionData = Array.isArray(response.data) ? response.data[0] : response.data;
      
//       if (!admissionData) {
//         throw new Error('No admission data found');
//       }

//       setDisplayData({
//         admissionId: admissionData.admissionId,
//         studentData: transformBackendData(admissionData)
//       });
//     } else {
//       throw new Error('No admission found with this email address');
//     }
//   } catch (error) {
//     console.error('Error fetching admission data:', error);
//     setError(error.message || 'No admission found with this email address. Please check your email and try again.');
//     setDisplayData(null);
//   } finally {
//     setSearchLoading(false);
//     setLoading(false);
//   }
// };

  // // Function to fetch admission data by admission ID (for backward compatibility)
  // const fetchAdmissionDataByAdmissionId = async (admissionId) => {
  //   try {
  //     setSearchLoading(true);
  //     setError(null);

  //     const response = await googleSheetsService.getAdmissionById(admissionId);
      
  //     if (response.success && response.data) {
  //       setDisplayData({
  //         admissionId: admissionId,
  //         studentData: transformBackendData(response.data)
  //       });
  //     } else {
  //       throw new Error('Admission ID not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching admission data:', error);
  //     setError('Admission ID not found or error loading data.');
  //     setDisplayData(null);
  //   } finally {
  //     setSearchLoading(false);
  //     setLoading(false);
  //   }
  // };

  // Handle email search
  
// Function to fetch admission data by admission ID
const fetchAdmissionDataByAdmissionId = async (admissionId) => {
  try {
    setSearchLoading(true);
    setError(null);

    console.log('Searching for admission ID:', admissionId);

    const response = await googleSheetsService.getAdmissionById(admissionId);
    
    if (response.success && response.data) {
      console.log('Admission data found by ID:', response.data);
      setDisplayData({
        admissionId: response.data['Admission ID'],
        studentData: transformBackendData(response.data)
      });
    } else {
      throw new Error('Admission ID not found');
    }
  } catch (error) {
    console.error('Error fetching admission data by ID:', error);
    setError(error.message || 'Admission ID not found or error loading data.');
    setDisplayData(null);
  } finally {
    setSearchLoading(false);
    setLoading(false);
  }
};

// Function to fetch admission data by email
const fetchAdmissionDataByEmail = async (email) => {
  try {
    setSearchLoading(true);
    setError(null);

    console.log('Searching for admission by email:', email);

    const response = await googleSheetsService.getAdmissionByEmail(email);
    
    if (response.success && response.data) {
      console.log('Admission data found by email:', response.data);
      setDisplayData({
        admissionId: response.data['Admission ID'],
        studentData: transformBackendData(response.data)
      });
    } else {
      throw new Error('No admission found with this email address');
    }
  } catch (error) {
    console.error('Error fetching admission data by email:', error);
    setError(error.message || 'No admission found with this email address. Please check your email and try again.');
    setDisplayData(null);
  } finally {
    setSearchLoading(false);
    setLoading(false);
  }
};

  
  const handleEmailSearch = async (e) => {
    e.preventDefault();
    if (!searchEmail.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(searchEmail.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    
    await fetchAdmissionDataByEmail(searchEmail.trim().toLowerCase());
  };

  // Transform backend data
  // const transformBackendData = (backendData) => {
  //   return {
  //     title: backendData.title || '',
  //     firstName: backendData.firstName || '',
  //     lastName: backendData.lastName || '',
  //     dateOfBirth: backendData.dateOfBirth || '',
  //     fatherName: backendData.fatherName || '',
  //     motherName: backendData.motherName || '',
  //     age: backendData.age || '',
  //     castCategory: backendData.castCategory || '',
  //     aadharNumber: backendData.aadharNumber || '',
  //     mobileNumber: backendData.mobileNumber || '',
  //     email: backendData.email || '',
  //     address: backendData.address || '',
  //     city: backendData.city || '',
  //     villagePost: backendData.villagePost || '',
  //     district: backendData.district || '',
  //     state: backendData.state || '',
  //     pinCode: backendData.pinCode || '',
  //     permanentAddress: backendData.permanentAddress || '',
  //     courseProgram: backendData.courseProgram || '',
  //     photoUrl: backendData.photoUrl || '',
  //     gender: backendData.gender || 'Male',
  //     tenth: {
  //       collegeName: backendData.tenthCollegeName || backendData.tenth?.collegeName || '',
  //       yearOfPassing: backendData.tenthYearOfPassing || backendData.tenth?.yearOfPassing || '',
  //       percentage: backendData.tenthPercentage || backendData.tenth?.percentage || ''
  //     },
  //     twelfth: {
  //       collegeName: backendData.twelfthCollegeName || backendData.twelfth?.collegeName || '',
  //       yearOfPassing: backendData.twelfthYearOfPassing || backendData.twelfth?.yearOfPassing || '',
  //       percentage: backendData.twelfthPercentage || backendData.twelfth?.percentage || ''
  //     },
  //     diploma: {
  //       collegeName: backendData.diplomaCollegeName || backendData.diploma?.collegeName || '',
  //       yearOfPassing: backendData.diplomaYearOfPassing || backendData.diploma?.yearOfPassing || '',
  //       percentage: backendData.diplomaPercentage || backendData.diploma?.percentage || ''
  //     },
  //     graduation: {
  //       collegeName: backendData.graduationCollegeName || backendData.graduation?.collegeName || '',
  //       yearOfPassing: backendData.graduationYearOfPassing || backendData.graduation?.yearOfPassing || '',
  //       percentage: backendData.graduationPercentage || backendData.graduation?.percentage || ''
  //     },
  //     postGraduation: {
  //       collegeName: backendData.postGraduationCollegeName || backendData.postGraduation?.collegeName || '',
  //       yearOfPassing: backendData.postGraduationYearOfPassing || backendData.postGraduation?.yearOfPassing || '',
  //       percentage: backendData.postGraduationPercentage || backendData.postGraduation?.percentage || ''
  //     }
  //   };
  // };
 

// Transform backend data - FIXED VERSION
const transformBackendData = (backendData) => {
  console.log('🔍 Raw backend data for transformation:', backendData);
  
  return {
    // Personal Details
    // title: backendData['Titele'] || backendData.title || '',
    firstName: backendData['First Name'] || backendData.firstName || '',
    lastName: backendData['Last Name'] || backendData.lastName || '',
    dateOfBirth: backendData['Date of Birth'] || backendData.dateOfBirth || '',
    fatherName: backendData["Father's Name "] || backendData.fatherName || '',
    motherName: backendData["Mother's Name "] || backendData.motherName || '',
    age: backendData['Age '] || backendData.age || '',
    castCategory: backendData['Cast Category'] || backendData.castCategory || '',
    aadharNumber: backendData['Aadhar Number '] || backendData.aadharNumber || '',
    
    // Contact Details
    mobileNumber: backendData['Mobile Number '] || backendData.mobileNumber || '',
    email: backendData['Email'] || backendData.email || '',
    address: backendData['Address'] || backendData.address || '',
    city: backendData['City '] || backendData.city || '',
    villagePost: backendData['Village/Post '] || backendData.villagePost || '',
    district: backendData['District '] || backendData.district || '',
    state: backendData['State '] || backendData.state || '',
    pinCode: backendData['PIN Code'] || backendData.pinCode || '',
    permanentAddress: backendData[' Permanent Address '] || backendData.permanentAddress || '',
    
    // Course Details
    courseProgram: backendData['Course Program'] || backendData.courseProgram || '',
    
    // Photo
    photoUrl: backendData['Photo URL'] || backendData.photoUrl || '',
    
    // Education Details - Handle different column name formats
    tenth: {
      collegeName: backendData['10th College '] || backendData.tenthCollegeName || backendData.tenth?.collegeName || '',
      yearOfPassing: backendData['10th year '] || backendData.tenthYearOfPassing || backendData.tenth?.yearOfPassing || '',
      percentage: backendData['10th Percentage'] || backendData.tenthPercentage || backendData.tenth?.percentage || ''
    },
    twelfth: {
      collegeName: backendData['12th College '] || backendData.twelfthCollegeName || backendData.twelfth?.collegeName || '',
      yearOfPassing: backendData['12th Year'] || backendData.twelfthYearOfPassing || backendData.twelfth?.yearOfPassing || '',
      percentage: backendData['12th Percentage'] || backendData.twelfthPercentage || backendData.twelfth?.percentage || ''
    },
    diploma: {
      collegeName: backendData['Diploma Collage'] || backendData.diplomaCollegeName || backendData.diploma?.collegeName || '',
      yearOfPassing: backendData['Diploma Year '] || backendData.diplomaYearOfPassing || backendData.diploma?.yearOfPassing || '',
      percentage: backendData['Diploma Percentage'] || backendData.diplomaPercentage || backendData.diploma?.percentage || ''
    },
    graduation: {
      collegeName: backendData['Graduation Collage'] || backendData.graduationCollegeName || backendData.graduation?.collegeName || '',
      yearOfPassing: backendData['Garaduation Year'] || backendData.graduationYearOfPassing || backendData.graduation?.yearOfPassing || '',
      percentage: backendData['Graduation Percentage'] || backendData.graduationPercentage || backendData.graduation?.percentage || ''
    },
    postGraduation: {
      collegeName: backendData['Post Graduation Collage'] || backendData.postGraduationCollegeName || backendData.postGraduation?.collegeName || '',
      yearOfPassing: backendData['Post Graduation Year'] || backendData.postGraduationYearOfPassing || backendData.postGraduation?.yearOfPassing || '',
      percentage: backendData['Post Graduation Percentage'] || backendData.postGraduationPercentage || backendData.postGraduation?.percentage || ''
    },
    
    // Default values
    gender: 'Male' // Default gender since it's not in your data
  };
};
  const handlePrint = () => {
    window.print();
  };



  const handleNewAdmission = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('pendingAdmissionId');
      localStorage.removeItem('admissionFormData');
    }
    window.location.href = '/admission';
  };

  const handleNewSearch = () => {
    setDisplayData(null);
    setSearchEmail('');
    setError(null);
  };


  // Show search form when no data is loaded
  if (!displayData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {propAdmissionId ? 'Admission Form' : 'Payment Successful!'}
            </h2>
            <p className="text-green-700">
              {propAdmissionId 
                ? 'Enter your email address to view and print your admission form.'
                : 'Your payment has been processed successfully. Enter your email address to view and print your admission form.'
              }
            </p>
          </div>

          {/* Email Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Your Email Address</h3>
            
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">How to search?</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Enter the email address you used during admission</li>
                <li>• Make sure to enter the exact email address</li>
                <li>• Check your email inbox for any confirmation emails</li>
                <li>• The system will find your admission details automatically</li>
              </ul>
            </div>
            
            <form onSubmit={handleEmailSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Enter your email address (e.g., example@gmail.com)"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={searchLoading}
                className={`w-full px-6 py-3 rounded-md text-white font-semibold ${
                  searchLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {searchLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'View & Print Admission Form'
                )}
              </button>
            </form>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Having trouble finding your admission?</h4>
              <p className="text-yellow-700 text-sm">
                • Make sure you're using the correct email address<br/>
                • Check your spam folder for any confirmation emails<br/>
                • Contact college administration: <strong>+91-8840157051</strong><br/>
                • Email: <strong>bharattechnicalcollege@gmail.com</strong><br/>
                • Visit college with your personal details for assistance
              </p>
            </div>

            {/* Alternative Search Option */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Looking for Admission ID search?</h4>
              <p className="text-gray-700 text-sm mb-3">
                If you have your Admission ID, you can still search using it.
              </p>
              <button
                onClick={() => {
                  const admissionId = prompt('Please enter your Admission ID:');
                  if (admissionId) {
                    fetchAdmissionDataByAdmissionId(admissionId.trim().toUpperCase());
                  }
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
              >
                Search by Admission ID
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading your admission details...</p>
        </div>
      </div>
    );
  }

  // Show admission form when data is available
  const { admissionId: displayAdmissionId, studentData } = displayData;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      {/* Screen View */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 print:hidden">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4">
            ✅ Admission Form Ready!
          </h2>
          <div className="bg-white border border-green-300 rounded-lg p-3 md:p-4 inline-block max-w-full">
            <p className="text-base md:text-lg font-semibold">Admission Reference ID:</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 break-all">{displayAdmissionId}</p>
            <p className="text-sm text-gray-600 mt-1">Email: {studentData.email}</p>
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
          <button 
            onClick={handleNewSearch} 
            className="px-4 py-2 md:px-6 md:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm md:text-base"
          >
            🔍 Search Another Email
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps</h3>
          <ul className="text-blue-700 list-disc list-inside space-y-1 text-sm">
            <li>Print this admission form</li>
            <li>Visit college campus with original documents</li>
            <li>Bring this printed form for verification</li>
            <li>Complete remaining admission formalities</li>
          </ul>
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

          {/* Rest of the form remains the same... */}
          {/* ... (keep all the existing form sections) ... */}
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
              
              {/* <div className="flex flex-col sm:flex-row">
                <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Date Of Birth:</span>
                <span>{studentData.dateOfBirth}</span>
              </div> */}
              <div className="flex flex-col sm:flex-row">
  <span className="font-semibold w-48 print:w-40 mb-1 sm:mb-0">Date Of Birth: <span className='text-[10px]'>DD/MM/YYYY </span> </span>
  <span>
    {studentData.dateOfBirth
      ? new Date(studentData.dateOfBirth).toLocaleDateString('en-GB')
      : ''}
  </span>
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
              <p>
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
      <style jsx>{`
        @media print {
          body {
            margin: 2;
            padding: 3;
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
      `}</style>
    </div>
  );
};

export default SubmissionSuccess;
