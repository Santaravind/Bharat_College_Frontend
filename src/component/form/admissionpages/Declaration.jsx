// import React from 'react';


// const Declaration = ({ formData, errors, onChange, onSubmit, isSubmitting }) => {
//   const handlePaymentRedirect = async (e) => {
//     e.preventDefault();
    
//     if (!formData.declarationAccepted) {
//       setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
//       return;
//     }

//     try {
//       // First submit the form data with payment status as "paid"
//       const submissionData = {
//         ...formData,
//         paymentStatus: 'paid',
//         status: 'ADMISSION_CONFIRMED'
//       };
      
//       await onSubmit(submissionData);
      
//       // If submission is successful, redirect to payment
//       const paymentUrl = "https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view";
//       window.location.href = paymentUrl;
//     } catch (error) {
//       console.error("Error saving data before payment:", error);
//       alert("Something went wrong while saving your details. Please try again.");
//     }
//   };



// this new changesh
// const Declaration = ({ formData, errors, onChange,  onSubmit, isSubmitting,  setIsSubmitting,  setErrors   }) => {
//   // const handlePaymentRedirect = async (e) => {
//   //   e.preventDefault();
//   //   //client data not show 18/10/2025
//   //   if (!formData.declarationAccepted) {
//   //     setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
//   //     return;
//   //   }

//   //   try {
//   //     setIsSubmitting(true);
      
//   //     // Generate admission ID
//   //     const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
      
//   //     // ✅ FIRST: Save to database with PENDING status
//   //     const submissionData = {
//   //       ...formData,
//   //       admissionId: generatedAdmissionId,
//   //       paymentStatus: 'pending', // Important: don't set as 'paid' yet
//   //       status: 'PENDING_PAYMENT',
//   //       submissionTimestamp: new Date().toISOString()
//   //     };

//   //     // ✅ WAIT for database save to complete
//   //     await onSubmit(submissionData);
      
//   //     // ✅ Store in multiple places for redundancy
//   //     if (typeof localStorage !== 'undefined') {
//   //       localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
//   //       localStorage.setItem('pendingFormData', JSON.stringify(formData));
//   //     }
//   //     if (typeof sessionStorage !== 'undefined') {
//   //       sessionStorage.setItem('pendingAdmissionId', generatedAdmissionId);
//   //     }
      
//   //     // ✅ Create SUCCESS URL with all necessary parameters
//   //     const successUrl = `${window.location.origin}${window.location.pathname}?payment_return=true&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;
      
//   //     // const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&data=${returnData}&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;

//   //     // ✅ Redirect to payment with success URL
//   //     const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${generatedAdmissionId}&success_url=${encodeURIComponent(successUrl)}`;
      
//   //     // ✅ Use location.replace instead of href for better handling
//   //     window.location.replace(paymentUrl);
      
//   //   } catch (error) {
//   //     console.error("Error in payment redirect:", error);
//   //     setIsSubmitting(false);
//   //     alert("Something went wrong. Please try again.");
//   //   }
//   // };
 
//  const handlePaymentRedirect = async (e) => {
//   e.preventDefault();
//    //changes on 19-10-2025
//   if (!formData.declarationAccepted) {
//     setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
//     return;
//   }

//   try {
//     setIsSubmitting(true);
    
//     // Generate admission ID
//     const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
    
//     // ✅ COMPREHENSIVE DATA STORAGE
//     const storageData = {
//       formData: formData,
//       admissionId: generatedAdmissionId,
//       timestamp: new Date().toISOString(),
//       paymentStatus: 'pending'
//     };

//     // Store in multiple storage mechanisms for redundancy
//     localStorage.setItem('admissionFormData', JSON.stringify(storageData));
//     localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
//     sessionStorage.setItem('admissionBackup', JSON.stringify(storageData));
    
//     // Also store individual fields for extra safety
//     Object.keys(formData).forEach(key => {
//       if (formData[key] && typeof formData[key] === 'string') {
//         localStorage.setItem(`admission_${key}`, formData[key]);
//       }
//     });

//     // ✅ Prepare submission data
//     const submissionData = {
//       ...formData,
//       admissionId: generatedAdmissionId,
//       paymentStatus: 'pending',
//       status: 'PENDING_PAYMENT',
//       submissionTimestamp: new Date().toISOString()
//     };

//     // ✅ Submit to Google Sheets
//     await onSubmit(e, submissionData);
    
//     console.log('Data saved locally:', storageData);
    
//     // ✅ Create robust return URL with all data encoded
//     const returnData = btoa(JSON.stringify({
//       admissionId: generatedAdmissionId,
//       timestamp: Date.now(),
//       source: 'payment_redirect'
//     }));
    
//     // const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&data=${returnData}&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;
    
//     // // ✅ Redirect to payment
//     // const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${generatedAdmissionId}&success_url=${encodeURIComponent(successUrl)}`;
    
   
// const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&admission_id=${generatedAdmissionId}`;

// const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${generatedAdmissionId}&callback_url=${encodeURIComponent(successUrl)}`;

//     // Use replace to prevent back button issues
//     window.location.replace(paymentUrl);
    
//   } catch (error) {
//     console.error("Payment redirect error:", error);
//     setIsSubmitting(false);
//     alert("Failed to proceed to payment. Please try again.");
//   }
// };
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Declaration</h2>
      
//       {/* Summary Section */}
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div>
//             <strong>Personal Details:</strong>
//             <p>Name: {formData.title} {formData.firstName} {formData.lastName}</p>
//             <p>DOB: {formData.dateOfBirth} (Age: {formData.age})</p>
//             <p>Aadhar: {formData.aadharNumber}</p>
//             <p>Category: {formData.castCategory}</p>
//           </div>
          
//           <div>
//             <strong>Contact Details:</strong>
//             <p>Mobile: {formData.mobileNumber}</p>
//             <p>Email: {formData.email}</p>
//             <p>Course: {formData.courseProgram}</p>
//           </div>
//         </div>
//       </div>

//       {/* Rules and Instructions */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold text-yellow-800 mb-4">
//           📋 Important Rules and Instructions
//         </h3>
//         <ul className="list-disc list-inside space-y-2 text-yellow-700">
//           <li>All personal details must exactly match with your 10th class certificate</li>
//           <li>Aadhar number must match with your Aadhar card</li>
//           <li>Any mismatch in details will lead to immediate admission cancellation</li>
//           <li>All educational qualifications must be verified with original documents</li>
//           <li>False information may lead to legal action</li>
//           <li>You will need to visit college for document verification and payment</li>
//         </ul>
//       </div>

//       {/* Payment Information */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold text-blue-800 mb-2">Payment Information</h3>
//         <p className="text-blue-700">
//           <strong>Application Fee:</strong> ₹60 (Non-refundable)
//         </p>
//         <p className="text-sm text-blue-600 mt-2">
//           After submitting the form, you will be redirected to a secure payment page. 
//           Your admission will be confirmed by the college Not your payment .
//         </p>
//       </div>

//       {/* Declaration Checkbox */}
//       <div className="border rounded-lg p-6 mb-6">
//         <div className="flex items-start">
//           <input
//             type="checkbox"
//             name="declarationAccepted"
//             checked={formData.declarationAccepted}
//             onChange={onChange}
//             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
//           />
//           <label className="ml-3 block text-sm text-gray-900">
//             <span className="font-semibold">I hereby declare that:</span>
//             <ul className="list-disc list-inside mt-2 space-y-1">
//               <li>All the information provided in this form is true and correct to the best of my knowledge</li>
//               <li>All details match with my 10th class certificate and Aadhar card</li>
//               <li>I understand that any mismatch will lead to cancellation of my admission</li>
//               <li>I have read and understood all the rules and instructions mentioned above</li>
//               <li>I agree to pay the application fee of ₹60</li>
//               <li>I will visit the college campus for document verification and fee payment</li>
//             </ul>
//           </label>
//         </div>
//         {errors.declarationAccepted && (
//           <p className="text-red-500 text-sm mt-2">{errors.declarationAccepted}</p>
//         )}
//       </div>

//       {/* Submit Error */}
//       {errors.submit && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//           <p className="text-red-700">{errors.submit}</p>
//         </div>
//       )}

//       {/* Navigation Buttons */}
//       {/* <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//         >
//           Previous
//         </button>
        
//         <button
//           type="button"
//           onClick={handlePaymentRedirect}
//           disabled={!formData.declarationAccepted || isSubmitting}
//           className={`px-6 py-2 rounded-md ${
//             !formData.declarationAccepted || isSubmitting
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 text-white hover:bg-green-700'
//           }`}
//         >
//           {isSubmitting ? (
//             <span className="flex items-center">
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting...
//             </span>
//           ) : (
//             'Submit Form & Proceed to Payment'
//           )}
//         </button>
//       </div> */}
//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//         >
//           Previous
//         </button>
        
//         <button
//           type="button"
//           onClick={handlePaymentRedirect}
//           disabled={!formData.declarationAccepted || isSubmitting}
//           className={`px-6 py-2 rounded-md ${
//             !formData.declarationAccepted || isSubmitting
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 text-white hover:bg-green-700'
//           }`}
//         >
//           {isSubmitting ? (
//             <span className="flex items-center">
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting...
//             </span>
//           ) : (
//             'Submit Form & Proceed to Payment'
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Declaration;


// import React, { useState } from 'react';

// const Declaration = ({ formData, errors, onChange, onSubmit, isSubmitting, setIsSubmitting, setErrors }) => {
//   const [showAdmissionIdModal, setShowAdmissionIdModal] = useState(false);
//   const [generatedAdmissionId, setGeneratedAdmissionId] = useState('');

//   //this for search by user id 
//   const handlePaymentRedirect = async (e) => {
//     e.preventDefault();
    
//     if (!formData.declarationAccepted) {
//       setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
//       return;
//     }

//     try {
//       setIsSubmitting(true);
      
//       // Generate admission ID
//       const admissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
//       setGeneratedAdmissionId(admissionId);
      
//       // Comprehensive data storage
//       const storageData = {
//         formData: formData,
//         admissionId: admissionId,
//         timestamp: new Date().toISOString(),
//         paymentStatus: 'pending'
//       };

//       // Store data
//       localStorage.setItem('admissionFormData', JSON.stringify(storageData));
//       localStorage.setItem('pendingAdmissionId', admissionId);
      
//       // Store individual fields for backup
//       Object.keys(formData).forEach(key => {
//         if (formData[key] && typeof formData[key] === 'string') {
//           localStorage.setItem(`admission_${key}`, formData[key]);
//         }
//       });

//       // Prepare submission data
//       const submissionData = {
//         ...formData,
//         admissionId: admissionId,
//         paymentStatus: 'pending',
//         status: 'PENDING_PAYMENT',
//         submissionTimestamp: new Date().toISOString()
//       };

//       // Submit to Google Sheets
//       await onSubmit(e, submissionData);
      
//       console.log('Data saved locally with Admission ID:', admissionId);
      
//       // Show admission ID modal instead of immediate redirect
//       setShowAdmissionIdModal(true);
      
//     } catch (error) {
//       console.error("Payment redirect error:", error);
//       setIsSubmitting(false);
//       alert("Failed to proceed to payment. Please try again.");
//     }
//   };

//   const handleProceedToPayment = () => {
//     // Close modal and redirect to payment
//     setShowAdmissionIdModal(false);
//     const paymentUrl = "https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view";
//     window.location.replace(paymentUrl);
//   };

//   const handleCopyAdmissionId = () => {
//     navigator.clipboard.writeText(generatedAdmissionId);
//     alert('Admission ID copied to clipboard!');
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Declaration</h2>
      
//       {/* Summary Section */}
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div>
//             <strong>Personal Details:</strong>
//             <p>Name: {formData.title} {formData.firstName} {formData.lastName}</p>
//             <p>DOB: {formData.dateOfBirth} (Age: {formData.age})</p>
//             <p>Aadhar: {formData.aadharNumber}</p>
//             <p>Category: {formData.castCategory}</p>
//           </div>
          
//           <div>
//             <strong>Contact Details:</strong>
//             <p>Mobile: {formData.mobileNumber}</p>
//             <p>Email: {formData.email}</p>
//             <p>Course: {formData.courseProgram}</p>
//           </div>
//         </div>
//       </div>

//       {/* Rules and Instructions */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold text-yellow-800 mb-4">
//           📋 Important Rules and Instructions
//         </h3>
//         <ul className="list-disc list-inside space-y-2 text-yellow-700">
//           <li>All personal details must exactly match with your 10th class certificate</li>
//           <li>Aadhar number must match with your Aadhar card</li>
//           <li>Any mismatch in details will lead to immediate admission cancellation</li>
//           <li>All educational qualifications must be verified with original documents</li>
//           <li>False information may lead to legal action</li>
//           <li>You will need to visit college for document verification and payment</li>
//         </ul>
//       </div>

//       {/* Payment Information */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold text-blue-800 mb-2">Payment Information</h3>
//         <p className="text-blue-700">
//           <strong>Application Fee:</strong> ₹60 (Non-refundable)
//         </p>
//         <p className="text-sm text-blue-600 mt-2">
//           After submitting the form, you will be redirected to a secure payment page. 
//           Your admission will be confirmed by the college after payment verification.
//         </p>
//       </div>

//       {/* Declaration Checkbox */}
//       <div className="border rounded-lg p-6 mb-6">
//         <div className="flex items-start">
//           <input
//             type="checkbox"
//             name="declarationAccepted"
//             checked={formData.declarationAccepted}
//             onChange={onChange}
//             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
//           />
//           <label className="ml-3 block text-sm text-gray-900">
//             <span className="font-semibold">I hereby declare that:</span>
//             <ul className="list-disc list-inside mt-2 space-y-1">
//               <li>All the information provided in this form is true and correct to the best of my knowledge</li>
//               <li>All details match with my 10th class certificate and Aadhar card</li>
//               <li>I understand that any mismatch will lead to cancellation of my admission</li>
//               <li>I have read and understood all the rules and instructions mentioned above</li>
//               <li>I agree to pay the application fee of ₹60</li>
//               <li>I will visit the college campus for document verification and fee payment</li>
//             </ul>
//           </label>
//         </div>
//         {errors.declarationAccepted && (
//           <p className="text-red-500 text-sm mt-2">{errors.declarationAccepted}</p>
//         )}
//       </div>

//       {/* Submit Error */}
//       {errors.submit && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//           <p className="text-red-700">{errors.submit}</p>
//         </div>
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//         >
//           Previous
//         </button>
        
//         <button
//           type="button"
//           onClick={handlePaymentRedirect}
//           disabled={!formData.declarationAccepted || isSubmitting}
//           className={`px-6 py-2 rounded-md ${
//             !formData.declarationAccepted || isSubmitting
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-600 text-white hover:bg-green-700'
//           }`}
//         >
//           {isSubmitting ? (
//             <span className="flex items-center">
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Submitting...
//             </span>
//           ) : (
//             'Submit Form & Proceed to Payment'
//           )}
//         </button>
//       </div>

//       {/* Admission ID Modal */}
//       {showAdmissionIdModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <div className="text-center">
//               {/* Success Icon */}
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
              
//               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                 Form Submitted Successfully!
//               </h3>
              
//               <p className="text-gray-600 mb-4">
//                 Please note down your Admission ID for future reference:
//               </p>

//               {/* Admission ID Display */}
//               <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
//                 <p className="text-sm font-semibold text-blue-800 mb-2">Your Admission ID:</p>
//                 <p className="text-2xl font-bold text-blue-600 break-all">{generatedAdmissionId}</p>
//               </div>

//               {/* Important Instructions */}
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left">
//                 <h4 className="font-semibold text-yellow-800 mb-2">📝 Important:</h4>
//                 <ul className="text-yellow-700 text-sm space-y-1">
//                   <li>• <strong>Save this Admission ID carefully</strong></li>
//                   <li>• You'll need it to print your admission form</li>
//                   <li>• Take a screenshot or write it down</li>
//                   <li>• After payment, use this ID to access your form</li>
//                 </ul>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                 <button
//                   onClick={handleCopyAdmissionId}
//                   className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                   </svg>
//                   Copy ID
//                 </button>
//                 <button
//                   onClick={handleProceedToPayment}
//                   className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
//                   </svg>
//                   Proceed to Payment
//                 </button>
//               </div>

//               {/* Additional Info */}
//               <p className="text-xs text-gray-500 mt-4">
//                 You'll be redirected to a secure payment page. After payment, use your Admission ID to print the form.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Declaration;
import React, { useState } from 'react';

const Declaration = ({ formData, errors, onChange, onSubmit, isSubmitting, setIsSubmitting, setErrors }) => {
  const [showAdmissionIdModal, setShowAdmissionIdModal] = useState(false);
  const [generatedAdmissionId, setGeneratedAdmissionId] = useState('');

  const handlePaymentRedirect = async (e) => {
    e.preventDefault();
    
    if (!formData.declarationAccepted) {
      setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Generate admission ID
      const admissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
      setGeneratedAdmissionId(admissionId);
      
      // Comprehensive data storage
      const storageData = {
        formData: formData,
        admissionId: admissionId,
        timestamp: new Date().toISOString(),
        paymentStatus: 'pending'
      };

      // Store data in localStorage
      localStorage.setItem('admissionFormData', JSON.stringify(storageData));
      localStorage.setItem('pendingAdmissionId', admissionId);
      localStorage.setItem('currentAdmissionId', admissionId);
      
      // Store individual fields for backup
      Object.keys(formData).forEach(key => {
        if (formData[key] && typeof formData[key] === 'string') {
          localStorage.setItem(`admission_${key}`, formData[key]);
        }
      });

      // Prepare submission data
      const submissionData = {
        ...formData,
        admissionId: admissionId,
        paymentStatus: 'pending',
        status: 'PENDING_PAYMENT',
        submissionTimestamp: new Date().toISOString()
      };

      // Submit to Google Sheets
      await onSubmit(e, submissionData);
      
      console.log('Data saved locally with Admission ID:', admissionId);
      
      // Direct redirect to payment after successful submission
      const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${admissionId}`;
      window.location.replace(paymentUrl);
      
    } catch (error) {
      console.error("Payment redirect error:", error);
      setIsSubmitting(false);
      alert("Failed to proceed to payment. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Declaration</h2>
      
      {/* Summary Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Personal Details:</strong>
            <p>Name: {formData.title} {formData.firstName} {formData.lastName}</p>
            <p>DOB: {formData.dateOfBirth} (Age: {formData.age})</p>
            <p>Aadhar: {formData.aadharNumber}</p>
            <p>Category: {formData.castCategory}</p>
          </div>
          
          <div>
            <strong>Contact Details:</strong>
            <p>Mobile: {formData.mobileNumber}</p>
            <p>Email: {formData.email}</p>
            <p>Course: {formData.courseProgram}</p>
          </div>
        </div>
      </div>

      {/* Rules and Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">
          📋 Important Rules and Instructions
        </h3>
        <ul className="list-disc list-inside space-y-2 text-yellow-700">
          <li>All personal details must exactly match with your 10th class certificate</li>
          <li>Aadhar number must match with your Aadhar card</li>
          <li>Any mismatch in details will lead to immediate admission cancellation</li>
          <li>All educational qualifications must be verified with original documents</li>
          <li>False information may lead to legal action</li>
          <li>You will need to visit college for document verification and payment</li>
        </ul>
      </div>

      {/* Payment Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Payment Information</h3>
        <p className="text-blue-700">
          <strong>Application Fee:</strong> ₹60 (Non-refundable)
        </p>
        <p className="text-sm text-blue-600 mt-2">
          After submitting the form, you will be redirected to a secure payment page. 
          Your admission will be confirmed by the college after payment verification.
        </p>
      </div>

      {/* Declaration Checkbox */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            name="declarationAccepted"
            checked={formData.declarationAccepted}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label className="ml-3 block text-sm text-gray-900">
            <span className="font-semibold">I hereby declare that:</span>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All the information provided in this form is true and correct to the best of my knowledge</li>
              <li>All details match with my 10th class certificate and Aadhar card</li>
              <li>I understand that any mismatch will lead to cancellation of my admission</li>
              <li>I have read and understood all the rules and instructions mentioned above</li>
              <li>I agree to pay the application fee of ₹60</li>
              <li>I will visit the college campus for document verification and fee payment</li>
            </ul>
          </label>
        </div>
        {errors.declarationAccepted && (
          <p className="text-red-500 text-sm mt-2">{errors.declarationAccepted}</p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{errors.submit}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={handlePaymentRedirect}
          disabled={!formData.declarationAccepted || isSubmitting}
          className={`px-6 py-2 rounded-md ${
            !formData.declarationAccepted || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Form & Proceed to Payment'
          )}
        </button>
      </div>
    </div>
  );
};

export default Declaration;