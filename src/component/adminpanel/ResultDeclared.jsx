//before subject 
// import React, { useState, useEffect } from "react";
// import { googleSheetsService } from "../form/admissionpages/services/googleSheetsService.js";
// import { googleserv } from "./googleserver/Googleserv.js";
// function ResultDeclared() {
//   const [formData, setFormData] = useState({
//     serialNo: "",
//     enrollmentNo: "",
//     firstName: "",
//     lastName: "",
//     fatherName: "",
//     dateOfBirth: "",
//     courseName: "",
//     totalMarks: "",
//     obtainedMarks: "",
//     percentage: "",
//     grade: "",
//     session: "",
//     issueDate: new Date().toISOString().split("T")[0],
//     photoUrl: "", // ✅ add this
//   });
//   // console.log(formData);
//   const [loading, setLoading] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Calculate percentage and grade automatically
//   useEffect(() => {
//     if (formData.totalMarks && formData.obtainedMarks) {
//       const total = parseFloat(formData.totalMarks);
//       const obtained = parseFloat(formData.obtainedMarks);

//       if (total > 0 && obtained >= 0) {
//         const percentage = ((obtained / total) * 100).toFixed(2);
//         const grade = calculateGrade(percentage);

//         setFormData((prev) => ({
//           ...prev,
//           percentage,
//           grade,
//         }));
//       }
//     }
//   }, [formData.totalMarks, formData.obtainedMarks]);

//   const calculateGrade = (percentage) => {
//     const percent = parseFloat(percentage);
//     if (percent >= 90) return "A+";
//     if (percent >= 80) return "A";
//     if (percent >= 70) return "B+";
//     if (percent >= 60) return "B";
//     if (percent >= 50) return "C";
//     if (percent >= 40) return "D";
//     return "F";
//   };

//   //it working 100%
//   const fetchStudentData = async (enrollmentNo) => {
//     try {
//       setSearchLoading(true);
//       setError(null);

//       const response = await googleSheetsService.getAdmissionById(enrollmentNo);

//       if (response.success && response.data) {
//         const studentData = transformBackendData(response.data);

//         setFormData((prev) => ({
//           ...prev,
//           ...studentData,
//           enrollmentNo: enrollmentNo,
//         }));
//         setIsEditing(true);
//       } else {
//         throw new Error("Student not found with this enrollment number");
//       }
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//       setError(error.message || "Student not found or error loading data.");
//       setIsEditing(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };
//   //it working 100%
//   const transformBackendData = (backendData) => {
//     return {
//       firstName: backendData["First Name"] || backendData.firstName || "",
//       lastName: backendData["Last Name"] || backendData.lastName || "",
//       dateOfBirth:
//         backendData["Date of Birth"] || backendData.dateOfBirth || "",
//       fatherName: backendData["Father's Name "] || backendData.fatherName || "",
//       courseName:
//         backendData["Course Program"] || backendData.courseProgram || "",
//       photoUrl: backendData["Photo URL"] || backendData.photoUrl || "",
//     };
//   };

//   //it working 100%
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   //it working 100%
//   const handleEnrollmentNoSearch = (e) => {
//     const enrollmentNo = e.target.value.trim();
//     if (enrollmentNo.length >= 3) {
//       fetchStudentData(enrollmentNo);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);
//   //   setSuccess(null);

//   //   try {
//   //     // Validate required fields
//   //     if (!formData.enrollmentNo || !formData.firstName || !formData.courseName ||
//   //         !formData.totalMarks || !formData.obtainedMarks) {
//   //       throw new Error('Please fill all required fields');
//   //     }

//   //     const resultData = {
//   //       serialNo: formData.serialNo || `RES-${Date.now()}`,
//   //       enrollmentNo: formData.enrollmentNo,
//   //       studentName: `${formData.firstName} ${formData.lastName}`.trim(),
//   //       fatherName: formData.fatherName,
//   //       dateOfBirth: formData.dateOfBirth,
//   //       courseName: formData.courseName,
//   //       totalMarks: parseFloat(formData.totalMarks),
//   //       obtainedMarks: parseFloat(formData.obtainedMarks),
//   //       percentage: parseFloat(formData.percentage),
//   //       grade: formData.grade,
//   //       session: formData.session,
//   //       issueDate: formData.issueDate,
//   //       timestamp: new Date().toISOString()
//   //     };

//   //     let response;
//   //     if (isEditing) {
//   //       response = await googleSheetsService.updateResultData(formData.enrollmentNo, resultData);
//   //     } else {
//   //       response = await googleSheetsService.saveResultData(resultData);
//   //     }

//   //     if (response.success) {
//   //       setSuccess(`Result ${isEditing ? 'updated' : 'saved'} successfully!`);
//   //       if (!isEditing) {
//   //         // Reset form after successful submission for new entry
//   //         setFormData({
//   //           serialNo: '',
//   //           enrollmentNo: '',
//   //           firstName: '',
//   //           lastName: '',
//   //           fatherName: '',
//   //           dateOfBirth: '',
//   //           courseName: '',
//   //           totalMarks: '',
//   //           obtainedMarks: '',
//   //           percentage: '',
//   //           grade: '',
//   //           session: '',
//   //           issueDate: new Date().toISOString().split('T')[0]
//   //         });
//   //         setIsEditing(false);
//   //       }
//   //     } else {
//   //       throw new Error(response.message || 'Failed to save result');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving result:', error);
//   //     setError(error.message || 'Failed to save result. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Validate required fields
//       if (
//         !formData.firstName ||
//         !formData.courseName ||
//         !formData.totalMarks ||
//         !formData.obtainedMarks
//       ) {
//         throw new Error("Please fill all required fields");
//       }

//       // Validate marks
//       const totalMarks = parseFloat(formData.totalMarks);
//       const obtainedMarks = parseFloat(formData.obtainedMarks);

//       if (obtainedMarks > totalMarks) {
//         throw new Error("Obtained marks cannot be greater than total marks");
//       }

//       if (totalMarks <= 0) {
//         throw new Error("Total marks must be greater than 0");
//       }

//       const studentName = `${formData.firstName} ${formData.lastName}`.trim();

//       if (
//         !studentName ||
//         !formData.courseName ||
//         !formData.totalMarks ||
//         !formData.obtainedMarks
//       ) {
//         throw new Error("Please fill all required fields");
//       }

//       const resultData = {
//         serialNo: formData.serialNo || `BT01A${Date.now()}`,
//         enrollmentNo: formData.enrollmentNo,
//         studentName,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         fatherName: formData.fatherName,
//         dateOfBirth: new Date(formData.dateOfBirth).toLocaleDateString("en-CA"),

//         // dateOfBirth: formData.dateOfBirth,
//         courseName: formData.courseName,
//         totalMarks: parseFloat(formData.totalMarks),
//         obtainedMarks: parseFloat(formData.obtainedMarks),
//         percentage: parseFloat(formData.percentage),
//         grade: formData.grade,
//         session: formData.session,
//         issueDate: formData.issueDate,
//         photoUrl: formData.photoUrl,
//       };

//       // console.log("handle submit ", resultData);

//       const response = await googleserv.saveResultData(resultData);

//       if (response.success) {
//         setSuccess(`Result saved successfully! ${response.data.message}`);

//         // Reset form after successful submission
//         setFormData({
//           serialNo: "",
//           enrollmentNo: "",
//           firstName: "",
//           lastName: "",
//           fatherName: "",
//           dateOfBirth: "",
//           courseName: "",
//           totalMarks: "",
//           obtainedMarks: "",
//           percentage: "",
//           grade: "",
//           session:
//             new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
//           issueDate: new Date().toISOString().split("T")[0],
//           photoUrl: "",
//         });
//       } else {
//         throw new Error(response.message || "Failed to save result");
//       }
//     } catch (error) {
//       // console.error("Error saving result:", error);
//       setError(error.message || "Failed to save result. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       serialNo: "",
//       enrollmentNo: "",
//       firstName: "",
//       lastName: "",
//       fatherName: "",
//       dateOfBirth: "",
//       courseName: "",
//       totalMarks: "",
//       obtainedMarks: "",
//       percentage: "",
//       grade: "",
//       session: "",
//       photoUrl: "",
//       issueDate: new Date().toISOString().split("T")[0],
//     });
//     setIsEditing(false);
//     setError(null);
//     setSuccess(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Result Declaration Form
//           </h1>
//           <p className="text-gray-600">
//             Fill student result details. Use enrollment number to auto-fill
//             student information.
//           </p>
//         </div>

//         {/* Success/Error Messages */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error</h3>
//                 <div className="mt-1 text-sm text-red-700">{error}</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-green-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-green-800">Success</h3>
//                 <div className="mt-1 text-sm text-green-700">{success}</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-lg overflow-hidden"
//         >
//           <div className="px-6 py-8 space-y-8">
//             {/* Enrollment Search Section */}
//             <div className="border-b border-gray-200 pb-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 Student Search
//               </h3>
//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label
//                     htmlFor="enrollmentNo"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Enrollment Number *
//                   </label>
//                   <div className="flex space-x-4">
//                     <input
//                       type="text"
//                       id="enrollmentNo"
//                       name="enrollmentNo"
//                       value={formData.enrollmentNo}
//                       onChange={(e) => {
//                         handleInputChange(e);
//                         handleEnrollmentNoSearch(e);
//                       }}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter enrollment number to auto-fill student details"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={resetForm}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                   {searchLoading && (
//                     <p className="mt-2 text-sm text-blue-600">
//                       Searching for student data...
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Student Information Section */}
//             <div className="border-b border-gray-200 pb-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 Student Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     First Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="fatherName"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Father's Name
//                   </label>
//                   <input
//                     type="text"
//                     id="fatherName"
//                     name="fatherName"
//                     value={formData.fatherName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="   ">
//                   <div>
//                     <label
//                       htmlFor="photoUrl"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       {" "}
//                       Student Photo{" "}
//                     </label>
//                   </div>

//                   {formData.photoUrl ? (
//                     <img
//                       src={formData.photoUrl}
//                       alt="Student"
//                       className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
//                     />
//                   ) : (
//                     <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
//                       <span className="text-gray-500 text-sm">No Photo</span>
//                     </div>
//                   )}

//                   {/* <div className="flex items-center space-x-4">
//     <div className="flex-shrink-0">
//       {formData.photoUrl ? (
//         <img 
//           src={formData.photoUrl} 
//           alt="Student" 
//           className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
//         />
//       ) : (
//         <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
//           <span className="text-gray-500 text-sm">No Photo</span>
//         </div>
//       )}
//     </div>
//     <div className="flex-1">
//       <input
//         type="file"
//         name="photo"
//         accept="image/*"
//         // onChange={onChange}
//         className="hidden"
//         id="photo-upload"
//       />
//       <label
//         htmlFor="photo-upload"
//         className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         {uploadingPhoto ? 'Uploading...' : 'Choose Photo'}
//       </label>
      
//       <p className="text-xs text-gray-500 mt-1">
//         JPEG, PNG, or JPG, Max 500KB. This photo will be used for your ID card.
//       </p>
//     </div>
//   </div> */}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="dateOfBirth"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     id="dateOfBirth"
//                     name="dateOfBirth"
//                     value={
//                       formData.dateOfBirth
//                         ? formData.dateOfBirth.split("T")[0]
//                         : ""
//                     }
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="courseName"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Course Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="courseName"
//                     name="courseName"
//                     value={formData.courseName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Result Details Section */}
//             <div className="border-b border-gray-200 pb-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 Result Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label
//                     htmlFor="totalMarks"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Total Marks *
//                   </label>
//                   <input
//                     type="number"
//                     id="totalMarks"
//                     name="totalMarks"
//                     value={formData.totalMarks}
//                     onChange={handleInputChange}
//                     min="0"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="obtainedMarks"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Obtained Marks *
//                   </label>
//                   <input
//                     type="number"
//                     id="obtainedMarks"
//                     name="obtainedMarks"
//                     value={formData.obtainedMarks}
//                     onChange={handleInputChange}
//                     min="0"
//                     step="0.01"
//                     max={formData.totalMarks}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="percentage"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Percentage
//                   </label>
//                   <input
//                     type="text"
//                     id="percentage"
//                     name="percentage"
//                     value={formData.percentage}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="grade"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Grade
//                   </label>
//                   <input
//                     type="text"
//                     id="grade"
//                     name="grade"
//                     value={formData.grade}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="session"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Session
//                   </label>
//                   <input
//                     type="text"
//                     id="session"
//                     name="session"
//                     value={formData.session}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 2023-2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="issueDate"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Issue Date
//                   </label>
//                   <input
//                     type="date"
//                     id="issueDate"
//                     name="issueDate"
//                     value={formData.issueDate}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="serialNo"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Serial Number
//                   </label>
//                   <input
//                     type="text"
//                     id="serialNo"
//                     name="serialNo"
//                     value={formData.serialNo}
//                     onChange={handleInputChange}
//                     placeholder="Auto-generated if empty"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Reset Form
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading
//                   ? "Saving..."
//                   : isEditing
//                   ? "Set Result"
//                   : "Save Result"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default ResultDeclared;
import React, { useState, useEffect } from "react";
import { googleSheetsService } from "../form/admissionpages/services/googleSheetsService.js";
import { googleserv } from "./googleserver/Googleserv.js";
import { Plus, Trash2, Search, User, BookOpen, Calculator, Calendar, Hash } from "lucide-react";

function ResultDeclared() {
  const [formData, setFormData] = useState({
    serialNo: "",
    enrollmentNo: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    courseName: "",
    totalMarks: "",
    obtainedMarks: "",
    percentage: "",
    grade: "",
    session: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    issueDate: new Date().toISOString().split("T")[0],
    photoUrl: "",
    subjects: [],
    practicals: []
  });

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); // personal, subjects, practicals

  // Default subject template
  const defaultSubject = {
    id: Date.now(),
    name: "",
    maxMarks: "",
    obtainedMarks: "",
    percentage: "",
    grade: ""
  };

  // Default practical template
  const defaultPractical = {
    id: Date.now() + 1000,
    name: "",
    type: "",
    maxMarks: "",
    obtainedMarks: "",
    percentage: "",
    grade: ""
  };

  // Initialize with 5 subjects and 4 practicals
  useEffect(() => {
    const initialSubjects = Array.from({ length: 5 }, (_, i) => ({
      ...defaultSubject,
      id: Date.now() + i,
      name: `Subject ${i + 1}`
    }));

    const practicalTypes = ["Practical I", "Practical II", "Practical III", "Practical IV", "Practical V"];
    const initialPracticals = Array.from({ length: 5 }, (_, i) => ({
      ...defaultPractical,
      id: Date.now() + i + 1000,
      name: practicalTypes[i],
      type: practicalTypes[i]
    }));

    setFormData(prev => ({
      ...prev,
      subjects: initialSubjects,
      practicals: initialPracticals
    }));
  }, []);

  // Calculate subject/practical percentage and grade
  useEffect(() => {
    // Calculate for each subject
    const updatedSubjects = formData.subjects.map(subject => {
      const maxMarks = parseFloat(subject.maxMarks) || 0;
      const obtainedMarks = parseFloat(subject.obtainedMarks) || 0;
      
      let percentage = "";
      let grade = "";
      
      if (maxMarks > 0 && obtainedMarks >= 0) {
        percentage = ((obtainedMarks / maxMarks) * 100).toFixed(2);
        grade = calculateGrade(parseFloat(percentage));
      }
      
      return {
        ...subject,
        percentage,
        grade
      };
    });

    // Calculate for each practical
    const updatedPracticals = formData.practicals.map(practical => {
      const maxMarks = parseFloat(practical.maxMarks) || 0;
      const obtainedMarks = parseFloat(practical.obtainedMarks) || 0;
      
      let percentage = "";
      let grade = "";
      
      if (maxMarks > 0 && obtainedMarks >= 0) {
        percentage = ((obtainedMarks / maxMarks) * 100).toFixed(2);
        grade = calculateGrade(parseFloat(percentage));
      }
      
      return {
        ...practical,
        percentage,
        grade
      };
    });

    // Calculate overall totals
    let totalMaxMarks = 0;
    let totalObtainedMarks = 0;
    let itemCount = 0;

    updatedSubjects.forEach(subject => {
      const max = parseFloat(subject.maxMarks) || 0;
      const obtained = parseFloat(subject.obtainedMarks) || 0;
      if (max > 0) {
        totalMaxMarks += max;
        totalObtainedMarks += obtained;
        itemCount++;
      }
    });

    updatedPracticals.forEach(practical => {
      const max = parseFloat(practical.maxMarks) || 0;
      const obtained = parseFloat(practical.obtainedMarks) || 0;
      if (max > 0) {
        totalMaxMarks += max;
        totalObtainedMarks += obtained;
        itemCount++;
      }
    });

    // Calculate overall percentage and grade
    let overallPercentage = "";
    let overallGrade = "F";
    
    if (totalMaxMarks > 0) {
      overallPercentage = ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2);
      overallGrade = calculateGrade(parseFloat(overallPercentage));
    }

    // Update state
    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects,
      practicals: updatedPracticals,
      totalMarks: totalMaxMarks.toString(),
      obtainedMarks: totalObtainedMarks.toString(),
      percentage: overallPercentage,
      grade: overallGrade
    }));
  }, [formData.subjects.map(s => s.maxMarks + s.obtainedMarks).join(), 
      formData.practicals.map(p => p.maxMarks + p.obtainedMarks).join()]);

  const calculateGrade = (percentage) => {
    const percent = parseFloat(percentage);
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B+";
    if (percent >= 60) return "B";
    if (percent >= 50) return "C";
    if (percent >= 40) return "D";
    return "F";
  };

  // Subject handlers
  const handleSubjectChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const addSubject = () => {
    const newSubject = {
      ...defaultSubject,
      id: Date.now() + formData.subjects.length,
      name: `Subject ${formData.subjects.length + 1}`
    };
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));
  };

  const removeSubject = (id) => {
    if (formData.subjects.length > 1) {
      setFormData(prev => ({
        ...prev,
        subjects: prev.subjects.filter(subject => subject.id !== id)
      }));
    }
  };

  // Practical handlers
  const handlePracticalChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      practicals: prev.practicals.map(practical =>
        practical.id === id ? { ...practical, [field]: value } : practical
      )
    }));
  };

  const addPractical = () => {
    const practicalTypes = ["Practical I", "Practical II", "Practical III", "Practical IV", "Practical V", 
                          "Practical VI", "Practical VII", "Practical VIII"];
    const nextIndex = formData.practicals.length;
    const nextType = practicalTypes[nextIndex] || `Practical ${nextIndex + 1}`;
    
    const newPractical = {
      ...defaultPractical,
      id: Date.now() + formData.practicals.length + 1000,
      name: nextType,
      type: nextType
    };
    setFormData(prev => ({
      ...prev,
      practicals: [...prev.practicals, newPractical]
    }));
  };

  const removePractical = (id) => {
    if (formData.practicals.length > 1) {
      setFormData(prev => ({
        ...prev,
        practicals: prev.practicals.filter(practical => practical.id !== id)
      }));
    }
  };

  // Existing functions
  const fetchStudentData = async (enrollmentNo) => {
    try {
      setSearchLoading(true);
      setError(null);

      const response = await googleSheetsService.getAdmissionById(enrollmentNo);

      if (response.success && response.data) {
        const studentData = transformBackendData(response.data);

        setFormData((prev) => ({
          ...prev,
          ...studentData,
          enrollmentNo: enrollmentNo,
        }));
        setIsEditing(true);
        setSuccess("Student data loaded successfully!");
      } else {
        throw new Error("Student not found with this enrollment number");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError(error.message || "Student not found or error loading data.");
      setIsEditing(false);
    } finally {
      setSearchLoading(false);
    }
  };

  const transformBackendData = (backendData) => {
    return {
      firstName: backendData["First Name"] || backendData.firstName || "",
      lastName: backendData["Last Name"] || backendData.lastName || "",
      dateOfBirth: backendData["Date of Birth"] || backendData.dateOfBirth || "",
      fatherName: backendData["Father's Name "] || backendData.fatherName || "",
      courseName: backendData["Course Program"] || backendData.courseProgram || "",
      photoUrl: backendData["Photo URL"] || backendData.photoUrl || "",
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnrollmentNoSearch = (e) => {
    const enrollmentNo = e.target.value.trim();
    if (enrollmentNo.length >= 6) {
      fetchStudentData(enrollmentNo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      if (!formData.enrollmentNo || !formData.firstName || !formData.courseName) {
        throw new Error("Please fill all required fields (Enrollment No, First Name, Course Name)");
      }

      // Validate at least one subject has marks
      const hasSubjectMarks = formData.subjects.some(
        subject => subject.maxMarks && subject.obtainedMarks
      );

      const hasPracticalMarks = formData.practicals.some(
        practical => practical.maxMarks && practical.obtainedMarks
      );

      if (!hasSubjectMarks && !hasPracticalMarks) {
        throw new Error("Please enter marks for at least one subject or practical");
      }

      // Validate marks
      formData.subjects.forEach((subject, index) => {
        if (subject.maxMarks && subject.obtainedMarks) {
          const max = parseFloat(subject.maxMarks);
          const obtained = parseFloat(subject.obtainedMarks);
          if (obtained > max) {
            throw new Error(`Subject ${index + 1}: Obtained marks cannot be greater than maximum marks`);
          }
        }
      });

      formData.practicals.forEach((practical, index) => {
        if (practical.maxMarks && practical.obtainedMarks) {
          const max = parseFloat(practical.maxMarks);
          const obtained = parseFloat(practical.obtainedMarks);
          if (obtained > max) {
            throw new Error(`${practical.name}: Obtained marks cannot be greater than maximum marks`);
          }
        }
      });

      const studentName = `${formData.firstName} ${formData.lastName}`.trim();

      // Prepare data for database
      const resultData = {
        serialNo: formData.serialNo || `RES-${Date.now().toString().slice(-8)}`,
        enrollmentNo: formData.enrollmentNo,
        studentName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fatherName: formData.fatherName,
        dateOfBirth: new Date(formData.dateOfBirth).toLocaleDateString("en-CA"),
        //dateOfBirth: formData.dateOfBirth || "",
        courseName: formData.courseName,
        totalMarks: parseFloat(formData.totalMarks) || 0,
        obtainedMarks: parseFloat(formData.obtainedMarks) || 0,
        percentage: parseFloat(formData.percentage) || 0,
        grade: formData.grade || "F",
        session: formData.session,
        issueDate: formData.issueDate,
        photoUrl: formData.photoUrl,
        subjects: formData.subjects.map(subject => ({
          name: subject.name,
          maxMarks: parseFloat(subject.maxMarks) || 0,
          obtainedMarks: parseFloat(subject.obtainedMarks) || 0,
          percentage: parseFloat(subject.percentage) || 0,
          grade: subject.grade || "F"
        })),
        practicals: formData.practicals.map(practical => ({
          name: practical.name,
          type: practical.type,
          maxMarks: parseFloat(practical.maxMarks) || 0,
          obtainedMarks: parseFloat(practical.obtainedMarks) || 0,
          percentage: parseFloat(practical.percentage) || 0,
          grade: practical.grade || "F"
        })),
        timestamp: new Date().toISOString()
      };

      console.log("Saving to database:", resultData);

      const response = await googleserv.saveResultData(resultData);
         
      if (response.success) {
        setSuccess("Result saved successfully! All subject and practical data has been stored.");
        resetForm();
      } else {
        throw new Error(response.message || "Failed to save result");
      }
    } catch (error) {
      setError(error.message || "Failed to save result. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    const initialSubjects = Array.from({ length: 5 }, (_, i) => ({
      ...defaultSubject,
      id: Date.now() + i,
      name: `Subject ${i + 1}`
    }));

    const practicalTypes = ["Practical I", "Practical II", "Practical III", "Practical IV", "Practical V"];
    const initialPracticals = Array.from({ length: 5 }, (_, i) => ({
      ...defaultPractical,
      id: Date.now() + i + 1000,
      name: practicalTypes[i],
      type: practicalTypes[i]
    }));

    setFormData({
      serialNo: "",
      enrollmentNo: "",
      firstName: "",
      lastName: "",
      fatherName: "",
      dateOfBirth: "",
      courseName: "",
      totalMarks: "",
      obtainedMarks: "",
      percentage: "",
      grade: "",
      session: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      issueDate: new Date().toISOString().split("T")[0],
      photoUrl: "",
      subjects: initialSubjects,
      practicals: initialPracticals
    });
    setIsEditing(false);
    setActiveTab("personal");
  };

  // Tab navigation component
  const TabButton = ({ tab, icon, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Result Declaration System
          </h1>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Enter student marks for subjects and practicals. All data will be stored in the database.
          </p> */}
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 animate-fadeIn">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 animate-fadeIn">
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-green-800">Success</h3>
                  <div className="mt-1 text-sm text-green-700">{success}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-3 px-6 py-4">
              <TabButton 
                tab="personal" 
                icon={<User className="h-4 w-4" />} 
                label="Student Info" 
              />
              <TabButton 
                tab="subjects" 
                icon={<BookOpen className="h-4 w-4" />} 
                label="Subjects" 
              />
              <TabButton 
                tab="practicals" 
                icon={<Calculator className="h-4 w-4" />} 
                label="Practicals" 
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-8">
              {/* Student Search */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Search className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Student Search</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enrollment Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.enrollmentNo}
                        onChange={(e) => {
                          handleInputChange(e);
                          handleEnrollmentNoSearch(e);
                        }}
                        name="enrollmentNo"
                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter enrollment number (min 6 characters)"
                        required
                      />
                      {searchLoading && (
                        <div className="absolute right-3 top-3">
                          <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Name
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] :""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo and Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Photo 
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {formData.photoUrl ? (
                            <img
                              src={formData.photoUrl}
                              alt="Student"
                              className="h-20 w-20 rounded-full object-cover border-2 border-blue-200 shadow"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                              }}
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                              <User className="h-10 w-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <input
                          type="text"
                          name="photoUrl"
                          value={formData.photoUrl}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="Enter photo URL (optional)"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Academic Session *
                        </label>
                        <input
                          type="text"
                          name="session"
                          value={formData.session}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subjects Tab */}
              {activeTab === "subjects" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Subject Marks</h3>
                      <p className="text-sm text-gray-600">Enter marks for each subject</p>
                    </div>
                    <button
                      type="button"
                      onClick={addSubject}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.subjects.map((subject, index) => (
                      <div key={subject.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <Hash className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-medium text-gray-900">Subject {index + 1}</h4>
                          </div>
                          {formData.subjects.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSubject(subject.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subject Name
                            </label>
                            <input
                              type="text"
                              value={subject.name}
                              onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              placeholder="Enter subject name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Marks
                            </label>
                            <input
                              type="number"
                              value={subject.maxMarks}
                              onChange={(e) => handleSubjectChange(subject.id, 'maxMarks', e.target.value)}
                              min="0"
                              step="0.01"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              placeholder="100"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Obtained Marks
                            </label>
                            <input
                              type="number"
                              value={subject.obtainedMarks}
                              onChange={(e) => handleSubjectChange(subject.id, 'obtainedMarks', e.target.value)}
                              min="0"
                              step="0.01"
                              max={subject.maxMarks}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              placeholder="85"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Percentage
                            </label>
                            <input
                              type="text"
                              value={subject.percentage || ""}
                              readOnly
                              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grade
                            </label>
                            <div className={`w-full px-4 py-2 rounded-lg font-medium text-center ${
                              subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                              subject.grade === 'A' ? 'bg-green-50 text-green-700' :
                              subject.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                              subject.grade === 'B' ? 'bg-blue-50 text-blue-700' :
                              subject.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              subject.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {subject.grade || "F"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practicals Tab */}
              {activeTab === "practicals" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Practical Marks</h3>
                      <p className="text-sm text-gray-600">Enter marks for practicals (I to IV)</p>
                    </div>
                    <button
                      type="button"
                      onClick={addPractical}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Practical
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.practicals.map((practical, index) => (
                      <div key={practical.id} className="bg-purple-50 rounded-xl p-4 border border-purple-200 hover:border-purple-300 transition">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                              <Calculator className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{practical.name}</h4>
                              <p className="text-xs text-purple-600">Practical {practical.type?.replace('Practical ', '') || index + 1}</p>
                            </div>
                          </div>
                          {formData.practicals.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePractical(practical.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Practical Name
                            </label>
                            <input
                              type="text"
                              value={practical.name}
                              onChange={(e) => handlePracticalChange(practical.id, 'name', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                              placeholder="Enter practical name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Marks
                            </label>
                            <input
                              type="number"
                              value={practical.maxMarks}
                              onChange={(e) => handlePracticalChange(practical.id, 'maxMarks', e.target.value)}
                              min="0"
                              step="0.01"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                              placeholder="50"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Obtained Marks
                            </label>
                            <input
                              type="number"
                              value={practical.obtainedMarks}
                              onChange={(e) => handlePracticalChange(practical.id, 'obtainedMarks', e.target.value)}
                              min="0"
                              step="0.01"
                              max={practical.maxMarks}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                              placeholder="45"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Percentage
                            </label>
                            <input
                              type="text"
                              value={practical.percentage || ""}
                              readOnly
                              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-medium"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grade
                            </label>
                            <div className={`w-full px-4 py-2 rounded-lg font-medium text-center ${
                              practical.grade === 'A+' ? 'bg-green-100 text-green-800' :
                              practical.grade === 'A' ? 'bg-green-50 text-green-700' :
                              practical.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                              practical.grade === 'B' ? 'bg-blue-50 text-blue-700' :
                              practical.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              practical.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {practical.grade || "F"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary Section */}
            <div className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1">Total Marks</p>
                  <p className="text-2xl font-bold text-blue-600">{formData.totalMarks || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                  <p className="text-sm text-gray-500 mb-1">Obtained Marks</p>
                  <p className="text-2xl font-bold text-green-600">{formData.obtainedMarks || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                  <p className="text-sm text-gray-500 mb-1">Percentage</p>
                  <p className="text-2xl font-bold text-purple-600">{formData.percentage || 0}%</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100">
                  <p className="text-sm text-gray-500 mb-1">Grade</p>
                  <p className={`text-2xl font-bold ${
                    formData.grade === 'A+' ? 'text-green-600' :
                    formData.grade === 'A' ? 'text-green-500' :
                    formData.grade === 'B+' ? 'text-blue-600' :
                    formData.grade === 'B' ? 'text-blue-500' :
                    formData.grade === 'C' ? 'text-yellow-600' :
                    formData.grade === 'D' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {formData.grade || "F"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  <p>Subjects with marks: {formData.subjects.filter(s => s.obtainedMarks).length}</p>
                  <p>Practicals with marks: {formData.practicals.filter(p => p.obtainedMarks).length}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  >
                    Reset All
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </span>
                    ) : (
                      "Save Result to Database"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Note
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All data including subject marks, practical marks, and student information will be stored in the database.</p>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ResultDeclared;