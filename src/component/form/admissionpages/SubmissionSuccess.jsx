// // // components/SubmissionSuccess.jsx

// // import { useEffect, useState } from "react";

// // import React from 'react';
// //  import { useLocation, useNavigate } from 'react-router-dom';
// //  import icon from '../../assets/icon.png'
// //  import { IoLocationSharp } from "react-icons/io5";
// // const SubmissionSuccess = ({ formData, admissionId }) => {
  
// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   const handleNewAdmission = () => {
// //     window.location.reload();
// //   };

// //   return (
// //     <div className="text-center">
// //        <div className="min-h-screen w-full bg-white relative mt-5">
// //                 {/* Background with grid + dots */}
// //                 <div
// //                   className="absolute inset-0 z-0"
// //                   style={{
// //                     backgroundImage: `
// //                       linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
// //                       linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
// //                       radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
// //                     `,
// //                     backgroundSize: "20px 20px, 20px 20px, 20px 20px",
// //                     backgroundPosition: "0 0, 0 0, 0 0",
// //                   }}
// //                 />
          
// //                 {/* Content */}
          
// //                 <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl">Admission Contect us</h1>
// //                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                  
// //                   {/* Top Info Section */}
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
// //                      {/* college name */}
// //                     <div>
                     
// //                       <div className="flex justify-center mb-3">
// //                         <img src={icon} alt="College icon" className="w-30 h-25 " />
// //                       </div>
// //                       <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
// //                       <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
// //                       <p className="text-lg font-semibold">MANAGEMENT </p>
// //                     </div>
          
// //                     {/* address */}
// //                     <div>
// //                       <div className="flex justify-center mb-3">
// //                         {/* <span className="text-6xl">📍</span> */}
// //                        <IoLocationSharp className=" text-red-600 text-7xl"/>  
// //                       </div>
// //                       <h3 className="font-bold text-2xl">Address:</h3>
// //                       <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
// //                       <p className="text-lg font-semibold">Utter Pradesh</p>
// //                       <p className="text-lg font-semibold">Pin code : 231216 </p>
// //                     </div>
          
// //                     {/* Contect  */}
// //                     <div>
// //                       <div className="flex justify-center mb-3 ">
// //                         <span className="text-7xl">📞</span>
// //                       </div>
// //                       <h3 className="font-bold text-2xl">Contact us:</h3>
                     
// //                         <p className="text-blue-600 font-medium text-lg break-all">
// //                            bharattechnicalcollege@gmail.com
// //                           </p>
                      
// //                       <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
// //                     </div>
// //                     </div>
// //                     </div>                    
      
                  
// //       <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
// //         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //           <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// //           </svg>
// //         </div>
// //         <h2 className="text-3xl font-bold text-green-800 mb-4">
// //           Admission Form Submitted Successfully!
// //         </h2>
// //         <p className="text-green-700 text-lg mb-4">
// //           Your admission application has been received and saved successfully.
// //         </p>
        
// //         <div className="bg-white border border-green-300 rounded-lg p-4 inline-block">
// //           {/* admission id  */}
// //           <p className="text-lg font-semibold">Admission Reference ID:</p>
// //           <p className="text-2xl font-bold text-blue-600">{admissionId}</p>
// //         </div>
// //       </div>

// //       {/* Next Steps */}
// //       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
// //         <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
// //         <div className="space-y-4 text-left">
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">1</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Save Your Admission ID</h4>
// //               <p className="text-gray-600">Keep your Admission Reference ID safe for all future communications</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">2</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Visit College Campus</h4>
// //               <p className="text-gray-600">Visit the college within 7 days with all original documents</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">3</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Document Verification</h4>
// //               <p className="text-gray-600">Bring all original documents for verification:
// //                 <br />- 10th Certificate & Marksheet
// //                 <br />- 12th Certificate & Marksheet (if applicable)
// //                 <br />- Aadhar Card
// //                 <br />- Caste Certificate (if applicable)
// //                 <br />- Passport Size Photos
// //               </p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">4</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Complete Admission Process</h4>
// //               <p className="text-gray-600">Complete the remaining formalities and fee payment at the college</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Contact Information */}
// //       <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
// //         <h3 className="text-lg font-semibold mb-2 text-emerald-600">Bharat Technical College Contact Information</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //           <div>
// //             <strong>Address:</strong>
// //             <p className=''>Pusauli, Robertsganj

// // Sonbhadra,



// // <br /> Utter Predash, India,Pincode-  231216</p>
// //           </div>
// //           <div>
// //             <strong>Contact:</strong>
// //             <p>Phone: +91-8840157051<br />Email: bharattechnicalcollege@gmail.com</p>
// //           </div>
// //         </div>
// //         <p className="text-blue-700 text-sm mt-4">
// //           <strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM
// //         </p>
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //         <button
// //           onClick={handlePrint}
// //           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
// //         >
// //           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
// //           </svg>
// //           Print This Page
// //         </button>
        
// //         <button
// //           onClick={handleNewAdmission}
// //           className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
// //         >
// //           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
// //           </svg>
// //           Submit Another Admission
// //         </button>
// //       </div>

// //       {/* Important Note */}
// //       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
// //         <p className="text-yellow-700 text-sm">
// //           <strong>Note:</strong> This is only the online application submission. 
// //           Your admission will be confirmed only after document verification and fee payment at the college campus.
// //           Bring this admission reference ID when you visit the college.
// //         </p>
// //       </div>
      
// //     </div>
// //     </div>
// //   );
// // };

// // export default SubmissionSuccess;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import icon from '../../assets/icon.png'
// // import { IoLocationSharp } from 'react-icons/io5';
// // const SubmissionSuccess = ({ formData, admissionId }) => {
// //   const currentAdmissionId = admissionId || localStorage.getItem('pendingAdmissionId');
// //   const currentFormData = formData || JSON.parse(localStorage.getItem('pendingFormData') || '{}');

// //   const handlePrint = () => {
// //     window.print();
// //   };
// //   const navigate=useNavigate();
// //   const handleNewAdmission = (e) => {
// //     e.preventDefault();
// //     localStorage.removeItem('pendingAdmissionId');
// //     localStorage.removeItem('pendingFormData');
// //     // window.location.reload();
// //     navigate("/admission");
// //      console.log("Clicked !!")
// //   };


// // const SubmissionSuccess = ({ formData, admissionId }) => {
// //   const [currentFormData, setCurrentFormData] = useState({});
// //   const [currentAdmissionId, setCurrentAdmissionId] = useState('');
// //   //Client data not show 18/10/2025
// //   useEffect(() => {
// //     // Try multiple sources for data
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const urlAdmissionId = urlParams.get('admission_id');
    
// //     let finalAdmissionId = admissionId || 
// //                           urlAdmissionId || 
// //                           localStorage.getItem('pendingAdmissionId');
    
// //     let finalFormData = formData || 
// //                        JSON.parse(localStorage.getItem('pendingFormData') || '{}');
    
// //     // If no admission ID found, generate a temporary one
// //     if (!finalAdmissionId && finalFormData.aadharNumber) {
// //       finalAdmissionId = `TEMP${finalFormData.aadharNumber.slice(-8)}`;
// //     }
    
// //     setCurrentAdmissionId(finalAdmissionId);
// //     setCurrentFormData(finalFormData);
    
// //     console.log('Success Page Data:', {
// //       admissionId: finalAdmissionId,
// //       formData: finalFormData,
// //       urlParams: Object.fromEntries(urlParams)
// //     });
// //   }, [admissionId, formData]);

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   const handleNewAdmission = (e) => {
// //     e.preventDefault();
// //     // Clear all stored data
// //     localStorage.removeItem('pendingAdmissionId');
// //     localStorage.removeItem('pendingFormData');
// //     // Force reload to start fresh
// //     window.location.href = '/admission';
// //   };

// //   // Add loading state
// //   if (!currentAdmissionId && !currentFormData.firstName) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
// //           <p className="mt-4 text-lg">Loading admission details...</p>
// //         </div>
// //       </div>
// //     );
// //   }
// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //                  <div className='footer'> 
// //                 {/* Background with grid + dots */}
// //                 <div
// //                   className="absolute inset-0 z-0"
// //                   style={{
// //                     backgroundImage: `
// //                       linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
// //                       linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
// //                       radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
// //                     `,
// //                     backgroundSize: "20px 20px, 20px 20px, 20px 20px",
// //                     backgroundPosition: "0 0, 0 0, 0 0",
// //                   }}
// //                 />
          
// //                 {/* Content */}
          
// //                 <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl">Admission Contect us</h1>
// //                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                  
// //                   {/* Top Info Section */}
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
// //                      {/* college name */}
// //                     <div>
                     
// //                       <div className="flex justify-center mb-3">
// //                         <img src={icon} alt="College icon" className="w-30 h-25 " />
// //                       </div>
// //                       <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
// //                       <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
// //                       <p className="text-lg font-semibold">MANAGEMENT </p>
// //                     </div>
          
// //                     {/* address */}
// //                     <div>
// //                       <div className="flex justify-center mb-3">
// //                         {/* <span className="text-6xl">📍</span> */}
// //                        <IoLocationSharp className=" text-red-600 text-7xl"/>  
// //                       </div>
// //                       <h3 className="font-bold text-2xl">Address:</h3>
// //                       <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
// //                       <p className="text-lg font-semibold">Utter Pradesh</p>
// //                       <p className="text-lg font-semibold">Pin code : 231216 </p>
// //                     </div>
          
// //                     {/* Contect  */}
// //                     <div>
// //                       <div className="flex justify-center mb-3 ">
// //                         <span className="text-7xl">📞</span>
// //                       </div>
// //                       <h3 className="font-bold text-2xl">Contact us:</h3>
                     
// //                         <p className="text-blue-600 font-medium text-lg break-all">
// //                            bharattechnicalcollege@gmail.com
// //                           </p>
                      
// //                       <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
// //                     </div>
// //                     </div>
// //                   </div>
// //      </div>
// //       <div className="max-w-4xl mx-auto px-4">
// //         {/* Success Header */}
// //         <div className=' m-4 px-5 py-3'>
// //           <h1 className='text-4xl font-bold text-center items-center'>Online Submission Form </h1>
// //         </div>
// //         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
// //           <h2 className="text-3xl items-center text-center font-bold text-rose-400 mb-4">
// //             Welcome  Bharat Technical College 
// //           </h2>
// //           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            
// //             <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// //             </svg>
// //           </div>
          
// //           <div className='text-center items-center justify-center '> 
// //           <h2 className="text-3xl font-bold text-green-800 mb-4">
// //             Admission Form  Submitted Successfully!
// //           </h2>
// //           <p className="text-green-700 text-lg mb-4">
// //             Your admission form has been submitted. Please complete the payment process.
// //           </p>
// //           </div>
// //           <div className='items-center justify-center flex'> 
// //           <div className="bg-white border border-green-300 rounded-lg p-4  inline-grid text-center items-center justify-center ">
// //             <p className="text-lg font-semibold">Admission Reference ID:</p>
// //             <p className="text-2xl font-bold text-blue-600 flex ">{currentAdmissionId}</p>
// //           </div>
// //         </div>
// //            </div>

// //         {/* Student Information */}
// //         <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
// //           <div className="flex items-center space-x-6">
// //             {currentFormData.photoUrl && (
// //               <img 
// //                 src={currentFormData.photoUrl} 
// //                 alt="Student" 
// //                 className="h-32 w-32 rounded-full object-cover border-4 border-blue-200"
// //               />
// //             )}
// //             <div className="flex-1">
// //               <h3 className="text-2xl font-bold text-gray-800 mb-2">
// //                 {currentFormData.title} {currentFormData.firstName} {currentFormData.lastName}
// //               </h3>
// //               <div className="grid grid-cols-2 gap-4 text-sm">
// //                 <div>
// //                   <p><strong>Course:</strong> {currentFormData.courseProgram}</p>
// //                   <p><strong>Father's Name:</strong> {currentFormData.fatherName}</p>
// //                 </div>
// //                 <div>
// //                   <p><strong>Mobile:</strong> {currentFormData.mobileNumber}</p>
// //                   <p><strong>Email:</strong> {currentFormData.email}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>


// //        {/* Next Steps */}
// //       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
// //         <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
// //         <div className="space-y-4 text-left">
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">1</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Save Your Admission ID</h4>
// //               <p className="text-gray-600">Keep your Admission Reference ID safe for all future communications</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">2</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Visit College Campus</h4>
// //               <p className="text-gray-600">Visit the college within 7 days with all original documents</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">3</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Document Verification</h4>
// //               <p className="text-gray-600">Bring all original documents for verification:
// //                 <br />- 10th Certificate & Marksheet
// //                 <br />- 12th Certificate & Marksheet (if applicable)
// //                 <br />- Aadhar Card
// //                 <br />- Caste Certificate (if applicable)
// //                 <br />- Passport Size Photos
// //               </p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-start">
// //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
// //               <span className="text-blue-600 text-sm font-semibold">4</span>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">Complete Admission Process</h4>
// //               <p className="text-gray-600">Complete the remaining formalities and fee payment at the college</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>


// //  {/* Contact Information */}
// //       <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
// //         <h3 className="text-lg font-semibold mb-2 text-emerald-600">Bharat Technical College Contact Information</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //           <div>
// //             <strong>Address:</strong>
// //             <p className=''>Pusauli, Robertsganj,Sonbhadra
// // <br /> Utter Predash, India,Pincode-  231216</p>
// //           </div>
// //           <div>
// //             <strong>Contact:</strong>
// //             <p>Phone: +91-8840157051<br />Email: bharattechnicalcollege@gmail.com</p>
// //           </div>
// //         </div>
// //         <p className="text-blue-700 text-sm mt-4">
// //           <strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM
// //         </p>
// //       </div>

// //         {/* Payment Instructions */}
// //         {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
// //           <h3 className="text-lg font-semibold text-blue-800 mb-4">Payment Instructions</h3>
// //           <div className="space-y-3">
// //             <p className="text-blue-700">
// //               <strong>Application Fee:</strong> ₹60 (Non-refundable)
// //             </p>
// //             <p className="text-blue-700">
// //               You will be redirected to a secure payment page. Please complete the payment to finalize your admission.
// //             </p>
// //             <p className="text-blue-600 text-sm">
// //               If you are not redirected automatically, please check your browser's pop-up settings or click the payment link.
// //             </p>
// //           </div>
// //         </div> */}


// //         {/* Action Buttons */}
// //         <div className="flex flex-col sm:flex-row gap-4 justify-center footer">
// //           <button
// //             onClick={handlePrint}
// //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
// //           >
// //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
// //             </svg>
// //             Print This Page
// //           </button>
          
// //           <button
// //             onClick={handleNewAdmission}
// //             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center footer"
// //           >
// //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
// //             </svg>
// //             Submit Another Admission
// //           </button>
// //         </div>
// //            {/* Important Note */}
// //       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
// //         <p className="text-yellow-700 text-sm">
// //           <strong>Note:</strong> This is only the online application submission. 
// //           Your admission will be confirmed only after document verification and fee payment at the college campus.
// //           Bring this admission reference ID when you visit the college.
// //         </p>
// //       </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SubmissionSuccess;

// import { useLocation, useNavigate } from 'react-router-dom';
//  import icon from '../../assets/icon.png'
//  import { IoLocationSharp } from "react-icons/io5";
// import React, { useState, useEffect } from 'react';

// const SubmissionSuccess = ({ formData, admissionId }) => {
//   const [displayData, setDisplayData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSuccessData();
//   }, []);

//   const loadSuccessData = async () => {
//     try {
//       setLoading(true);
      
//       const urlParams = new URLSearchParams(window.location.search);
//       const admissionIdFromUrl = urlParams.get('admission_id');
      
//       let finalAdmissionId = admissionIdFromUrl || admissionId;
//       let finalFormData = formData;
      
//       if (!finalAdmissionId && typeof localStorage !== 'undefined') {
//         finalAdmissionId = localStorage.getItem('pendingAdmissionId');
//         const storedData = localStorage.getItem('pendingFormData');
//         if (storedData && !finalFormData) {
//           finalFormData = JSON.parse(storedData);
//         }
//       }
      
//       if (!finalAdmissionId && typeof sessionStorage !== 'undefined') {
//         finalAdmissionId = sessionStorage.getItem('pendingAdmissionId');
//       }
      
//       if (finalAdmissionId && (!finalFormData || !finalFormData.firstName)) {
//         try {
//           const response = await fetch(`/api/admissions/${finalAdmissionId}`);
//           if (response.ok) {
//             const dbData = await response.json();
//             finalFormData = { ...finalFormData, ...dbData };
//           }
//         } catch (dbError) {
//           console.log('Database fetch failed, using stored data');
//         }
//       }
      
//       if (!finalAdmissionId) {
//         finalAdmissionId = 'PENDING_CONFIRMATION';
//       }
      
//       if (!finalFormData || !finalFormData.firstName) {
//         finalFormData = {
//           firstName: 'Student',
//           lastName: '',
//           courseProgram: 'Please contact college administration',
//           mobileNumber: 'Not available',
//           email: 'Not available'
//         };
//       }
      
//       setDisplayData({
//         admissionId: finalAdmissionId,
//         studentData: finalFormData
//       });
      
//     } catch (error) {
//       console.error('Error loading success data:', error);
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
//                 <p className="text-sm print:text-xs">Website: Coming Soon</p>
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
//           .print\\:mt-8 {
//             margin-top: 2rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubmissionSuccess;


//Form format added
import React, { useState, useEffect } from 'react';

const SubmissionSuccess = ({ formData, admissionId }) => {
  const [displayData, setDisplayData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuccessData();
  }, []);

  const loadSuccessData = async () => {
    try {
      setLoading(true);
      
      const urlParams = new URLSearchParams(window.location.search);
      const admissionIdFromUrl = urlParams.get('admission_id');
      
      let finalAdmissionId = admissionIdFromUrl || admissionId;
      let finalFormData = formData;
      
      if (!finalAdmissionId && typeof localStorage !== 'undefined') {
        finalAdmissionId = localStorage.getItem('pendingAdmissionId');
        const storedData = localStorage.getItem('pendingFormData');
        if (storedData && !finalFormData) {
          finalFormData = JSON.parse(storedData);
        }
      }
      
      if (!finalAdmissionId && typeof sessionStorage !== 'undefined') {
        finalAdmissionId = sessionStorage.getItem('pendingAdmissionId');
      }
      
      if (finalAdmissionId && (!finalFormData || !finalFormData.firstName)) {
        try {
          const response = await fetch(`/api/admissions/${finalAdmissionId}`);
          if (response.ok) {
            const dbData = await response.json();
            finalFormData = { ...finalFormData, ...dbData };
          }
        } catch (dbError) {
          console.log('Database fetch failed, using stored data');
        }
      }
      
      if (!finalAdmissionId) {
        finalAdmissionId = 'PENDING_CONFIRMATION';
      }
      
      if (!finalFormData || !finalFormData.firstName) {
        finalFormData = {
          firstName: 'Student',
          lastName: '',
          courseProgram: 'Please contact college administration',
          mobileNumber: 'Not available',
          email: 'Not available',
          photoUrl: ''
        };
      }
      
      setDisplayData({
        admissionId: finalAdmissionId,
        studentData: finalFormData
      });
      
    } catch (error) {
      console.error('Error loading success data:', error);
      setDisplayData({
        admissionId: 'CONTACT_ADMIN',
        studentData: {
          firstName: 'Please contact',
          lastName: 'college administration',
          courseProgram: 'with your payment reference',
          mobileNumber: '+91-8840157051',
          email: 'bharattechnicalcollege@gmail.com',
          photoUrl: ''
        }
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading || !displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Preparing your admission details...</p>
        </div>
      </div>
    );
  }

  const { admissionId: displayAdmissionId, studentData } = displayData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Screen View */}
      <div className="max-w-4xl mx-auto px-4 print:hidden">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            ✅ Admission Form Submitted Successfully!
          </h2>
          <div className="bg-white border border-green-300 rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">Admission Reference ID:</p>
            <p className="text-2xl font-bold text-blue-600">{displayAdmissionId}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button onClick={handlePrint} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            🖨️ Print Admission Form
          </button>
          <button onClick={handleNewAdmission} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            📝 New Admission
          </button>
        </div>
      </div>

      {/* Print Format - Matches PDF Template */}
      <div className="bg-white print:bg-white print:shadow-none print:border-0 print:p-0">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Header Section */}
          <div className="bg-blue-900 text-white p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-gray-800">
            <div className="flex justify-between items-center mb-4 print:mb-2">
              <div className="text-left">
                <p className="text-sm print:text-xs">Phone: +91-8840157051</p>
                <p className="text-sm print:text-xs">Email: bharattechnicalcollege@gmail.com</p>
              </div>
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold print:text-2xl mb-2">BHARAT TECHNICAL COLLEGE</h1>
                <p className="text-lg print:text-sm italic">OF FIRE ENGINEERING & SAFETY MANAGEMENT</p>
                <p className="text-sm print:text-xs mt-1">Robertsganj, Sonbhadra, Uttar Pradesh - 231216</p>
              </div>
              <div className="text-right">
                <p className="text-sm print:text-xs">Website: Coming Soon</p>
                <p className="text-sm print:text-xs">Approved by: Govt. of India</p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="border-b-2 border-gray-800 p-4 text-center">
            <h2 className="text-2xl font-bold print:text-xl">ADMISSION FORM</h2>
            <div className="flex justify-center space-x-8 mt-2 text-sm">
              <p><strong>SESSION:</strong> {new Date().getFullYear()}</p>
              <p><strong>COURSE:</strong> {studentData.courseProgram || 'DIPLOMA'}</p>
              <p><strong>STREAM:</strong> Fire And Safety Management</p>
            </div>
          </div>

          {/* Student Photo Section - Added before General Information */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Student Photo */}
                <div className="flex flex-col items-center">
                  {studentData.photoUrl ? (
                    <img 
                      src={studentData.photoUrl} 
                      alt="Student Photo" 
                      className="w-32 h-40 object-cover border-2 border-gray-400 print:border-gray-800 print:w-28 print:h-36"
                    />
                  ) : (
                    <div className="w-32 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center print:border-gray-800 print:w-28 print:h-36">
                      <span className="text-gray-500 text-xs print:text-xs">No Photo</span>
                    </div>
                  )}
                  <p className="text-xs mt-2 font-semibold print:text-xs">Passport Size Photo</p>
                </div>
                
                {/* Student Basic Info */}
                <div className="space-y-2">
                  <div className="flex">
                    <span className="font-semibold w-32 print:w-28">Enrollment No:</span>
                    <span className="font-bold text-blue-700">{displayAdmissionId}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32 print:w-28">Candidate Name:</span>
                    <span className="font-medium">{studentData.title} {studentData.firstName} {studentData.lastName}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32 print:w-28">Father's Name:</span>
                    <span>{studentData.fatherName}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32 print:w-28">Course:</span>
                    <span>{studentData.courseProgram}</span>
                  </div>
                </div>
              </div>
              
              {/* College Stamp Area */}
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-400 w-32 h-32 flex items-center justify-center print:border-gray-800 print:w-28 print:h-28">
                  <p className="text-xs text-gray-500 text-center print:text-xs">College Stamp<br/>&<br/>Signature</p>
                </div>
              </div>
            </div>
          </div>

          {/* General Information Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">GENERAL INFORMATION</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Enrollment No:</span>
                <span>{displayAdmissionId}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Name of Candidate:</span>
                <span>{studentData.title} {studentData.firstName} {studentData.lastName}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Father's Name:</span>
                <span>{studentData.fatherName}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Mother's Name:</span>
                <span>{studentData.motherName}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Date Of Birth:</span>
                <span>{studentData.dateOfBirth}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Nationality:</span>
                <span>Indian</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Category:</span>
                <span>{studentData.castCategory}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Gender:</span>
                <span>{studentData.gender || 'Male'}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Admission Type:</span>
                <span>Regular</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Year:</span>
                <span>{new Date().getFullYear()}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Contact Number:</span>
                <span>{studentData.mobileNumber}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Email Address:</span>
                <span>{studentData.email}</span>
              </div>
              
              <div className="col-span-2 flex">
                <span className="font-semibold w-48 print:w-40">Candidate Address:</span>
                <span>{studentData.address}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">City:</span>
                <span>{studentData.city}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Pin Code:</span>
                <span>{studentData.pinCode}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">State:</span>
                <span>{studentData.state}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48 print:w-40">Country:</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Qualification Information Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">QUALIFICATION INFORMATION</h3>
            
            <table className="w-full border-collapse border border-gray-800 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-800 p-2 text-left">Examination</th>
                  <th className="border border-gray-800 p-2 text-left">Year</th>
                  <th className="border border-gray-800 p-2 text-left">Board/University</th>
                  <th className="border border-gray-800 p-2 text-left">Marks(%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 p-2">SECONDARY (10th)</td>
                  <td className="border border-gray-800 p-2">{studentData.tenth?.yearOfPassing || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.tenth?.collegeName || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.tenth?.percentage || '-'}%</td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2">SR. SECONDARY (12th)</td>
                  <td className="border border-gray-800 p-2">{studentData.twelfth?.yearOfPassing || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.twelfth?.collegeName || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.twelfth?.percentage || '-'}%</td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2">DIPLOMA</td>
                  <td className="border border-gray-800 p-2">{studentData.diploma?.yearOfPassing || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.diploma?.collegeName || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.diploma?.percentage || '-'}%</td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2">GRADUATION</td>
                  <td className="border border-gray-800 p-2">{studentData.graduation?.yearOfPassing || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.graduation?.collegeName || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.graduation?.percentage || '-'}%</td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2">POST GRADUATION</td>
                  <td className="border border-gray-800 p-2">{studentData.postGraduation?.yearOfPassing || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.postGraduation?.collegeName || '-'}</td>
                  <td className="border border-gray-800 p-2">{studentData.postGraduation?.percentage || '-'}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Declaration Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-800 mb-4 print:text-lg">DECLARATION</h3>
            
            <div className="text-sm space-y-3 mb-6">
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
            
            <div className="flex justify-between items-center mt-8">
              <div>
                <p className="text-sm">Place: Robertsganj, Sonbhadra</p>
                <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-800 w-64 mt-12 pt-2">
                  <p className="text-sm font-semibold">(Signature of Candidate)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-100 p-4 text-center text-xs print:bg-gray-100 print:mt-8">
            <p>This is a computer generated admission form. No signature required.</p>
            <p className="mt-1">Generated on: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default SubmissionSuccess;