// import React from 'react'
// import { googleSheetsService } from '../form/admissionpages/services/googleSheetsService.js'
// function ResultDeclared() {
//   const fetchAdmissionDataByAdmissionId = async (admissionId) => {
//   try {
//     setSearchLoading(true);
//     setError(null);
// // Function to fetch admission data by admission ID
//     console.log('Searching for admission ID:', admissionId);

//     const response = await googleSheetsService.getAdmissionById(admissionId);

//     if (response.success && response.data) {
//       console.log('Admission data found by ID:', response.data);
//       setDisplayData({
//         admissionId: response.data['Admission ID'],
//         studentData: transformBackendData(response.data)
//       });
//     } else {
//       throw new Error('Admission ID not found');
//     }
//   } catch (error) {
//     console.error('Error fetching admission data by ID:', error);
//     setError(error.message || 'Admission ID not found or error loading data.');
//     setDisplayData(null);
//   } finally {
//     setSearchLoading(false);
//     setLoading(false);
//   }
// };

// const transformBackendData = (backendData) => {
//   console.log('🔍 Raw backend data for transformation:', backendData);

//   return {

//     firstName: backendData['First Name'] || backendData.firstName || '',
//     lastName: backendData['Last Name'] || backendData.lastName || '',
//     dateOfBirth: backendData['Date of Birth'] || backendData.dateOfBirth || '',
//     fatherName: backendData["Father's Name "] || backendData.fatherName || '',
//   }
// }
//   return (
//     <>
//       student result fid...
//     </>
//   )
// }

// export default ResultDeclared

// const [formData, setFormData] = useState({
//     serialNo: '',
//     studentName: '',
//     fatherName: '',
//     dateOfBirth: '',
//     courseName: '',
//     totalMarks: '',
//     obtainedMarks: '',
//     percentage: '',
//     grade: '',
//     session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
//     issueDate: new Date().toISOString().split('T')[0]
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Calculate percentage and grade automatically
//   useEffect(() => {
//     if (formData.totalMarks && formData.obtainedMarks) {
//       const total = parseFloat(formData.totalMarks);
//       const obtained = parseFloat(formData.obtainedMarks);

//       if (total > 0 && obtained >= 0) {
//         const percentage = ((obtained / total) * 100).toFixed(2);
//         const grade = calculateGrade(percentage);

//         setFormData(prev => ({
//           ...prev,
//           percentage,
//           grade
//         }));
//       }
//     }
//   }, [formData.totalMarks, formData.obtainedMarks]);

//   const calculateGrade = (percentage) => {
//     const percent = parseFloat(percentage);
//     if (percent >= 90) return 'A+';
//     if (percent >= 80) return 'A';
//     if (percent >= 70) return 'B+';
//     if (percent >= 60) return 'B';
//     if (percent >= 50) return 'C';
//     if (percent >= 40) return 'D';
//     return 'F';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError(null);
//   setSuccess(null);

//   try {
//     // Validate required fields
//     if (!formData.studentName || !formData.courseName ||
//         !formData.totalMarks || !formData.obtainedMarks) {
//       throw new Error('Please fill all required fields');
//     }

//     // Validate marks
//     const totalMarks = parseFloat(formData.totalMarks);
//     const obtainedMarks = parseFloat(formData.obtainedMarks);

//     if (obtainedMarks > totalMarks) {
//       throw new Error('Obtained marks cannot be greater than total marks');
//     }

//     if (totalMarks <= 0) {
//       throw new Error('Total marks must be greater than 0');
//     }

//     const resultData = {
//       serialNo: formData.serialNo, // Will be auto-generated if empty
//       studentName: formData.studentName,
//       fatherName: formData.fatherName,
//       dateOfBirth: formData.dateOfBirth,
//       courseName: formData.courseName,
//       totalMarks: totalMarks,
//       obtainedMarks: obtainedMarks,
//       percentage: parseFloat(formData.percentage),
//       grade: formData.grade,
//       session: formData.session,
//       issueDate: formData.issueDate
//     };

//     const response = await googleSheetsService.saveResultData(resultData);

//     if (response.success) {
//       setSuccess(`Result saved successfully! ${response.data.message}`);

//       // Reset form after successful submission
//       setFormData({
//         serialNo: '',
//         studentName: '',
//         fatherName: '',
//         dateOfBirth: '',
//         courseName: '',
//         totalMarks: '',
//         obtainedMarks: '',
//         percentage: '',
//         grade: '',
//         session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
//         issueDate: new Date().toISOString().split('T')[0]
//       });
//     } else {
//       throw new Error(response.message || 'Failed to save result');
//     }
//   } catch (error) {
//     console.error('Error saving result:', error);
//     setError(error.message || 'Failed to save result. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   const resetForm = () => {
//     setFormData({
//       serialNo: '',
//       studentName: '',
//       fatherName: '',
//       dateOfBirth: '',
//       courseName: '',
//       totalMarks: '',
//       obtainedMarks: '',
//       percentage: '',
//       grade: '',
//       session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
//       issueDate: new Date().toISOString().split('T')[0]
//     });
//     setError(null);
//     setSuccess(null);
//   };

import React, { useState, useEffect } from "react";
import { googleSheetsService } from "../form/admissionpages/services/googleSheetsService.js";
import { googleserv } from "./googleserver/Googleserv.js";
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
    session: "",
    issueDate: new Date().toISOString().split("T")[0],
    photoUrl: "", // ✅ add this
  });
  // console.log(formData);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate percentage and grade automatically
  useEffect(() => {
    if (formData.totalMarks && formData.obtainedMarks) {
      const total = parseFloat(formData.totalMarks);
      const obtained = parseFloat(formData.obtainedMarks);

      if (total > 0 && obtained >= 0) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        const grade = calculateGrade(percentage);

        setFormData((prev) => ({
          ...prev,
          percentage,
          grade,
        }));
      }
    }
  }, [formData.totalMarks, formData.obtainedMarks]);

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

  //it working 100%
  const fetchStudentData = async (enrollmentNo) => {
    try {
      setSearchLoading(true);
      setError(null);

      const response = await googleSheetsService.getAdmissionById(enrollmentNo);

      if (response.success && response.data) {
        console.log(response.data);
        const studentData = transformBackendData(response.data);

        setFormData((prev) => ({
          ...prev,
          ...studentData,
          enrollmentNo: enrollmentNo,
        }));
        setIsEditing(true);
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
  //it working 100%
  const transformBackendData = (backendData) => {
    return {
      firstName: backendData["First Name"] || backendData.firstName || "",
      lastName: backendData["Last Name"] || backendData.lastName || "",
      dateOfBirth:
        backendData["Date of Birth"] || backendData.dateOfBirth || "",
      fatherName: backendData["Father's Name "] || backendData.fatherName || "",
      courseName:
        backendData["Course Program"] || backendData.courseProgram || "",
          photoUrl: backendData["Photo URL"] || backendData.photoUrl || "",
    };
  };

  //it working 100%
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //it working 100%
  const handleEnrollmentNoSearch = (e) => {
    const enrollmentNo = e.target.value.trim();
    if (enrollmentNo.length >= 3) {
      fetchStudentData(enrollmentNo);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(null);

  //   try {
  //     // Validate required fields
  //     if (!formData.enrollmentNo || !formData.firstName || !formData.courseName ||
  //         !formData.totalMarks || !formData.obtainedMarks) {
  //       throw new Error('Please fill all required fields');
  //     }

  //     const resultData = {
  //       serialNo: formData.serialNo || `RES-${Date.now()}`,
  //       enrollmentNo: formData.enrollmentNo,
  //       studentName: `${formData.firstName} ${formData.lastName}`.trim(),
  //       fatherName: formData.fatherName,
  //       dateOfBirth: formData.dateOfBirth,
  //       courseName: formData.courseName,
  //       totalMarks: parseFloat(formData.totalMarks),
  //       obtainedMarks: parseFloat(formData.obtainedMarks),
  //       percentage: parseFloat(formData.percentage),
  //       grade: formData.grade,
  //       session: formData.session,
  //       issueDate: formData.issueDate,
  //       timestamp: new Date().toISOString()
  //     };

  //     let response;
  //     if (isEditing) {
  //       response = await googleSheetsService.updateResultData(formData.enrollmentNo, resultData);
  //     } else {
  //       response = await googleSheetsService.saveResultData(resultData);
  //     }

  //     if (response.success) {
  //       setSuccess(`Result ${isEditing ? 'updated' : 'saved'} successfully!`);
  //       if (!isEditing) {
  //         // Reset form after successful submission for new entry
  //         setFormData({
  //           serialNo: '',
  //           enrollmentNo: '',
  //           firstName: '',
  //           lastName: '',
  //           fatherName: '',
  //           dateOfBirth: '',
  //           courseName: '',
  //           totalMarks: '',
  //           obtainedMarks: '',
  //           percentage: '',
  //           grade: '',
  //           session: '',
  //           issueDate: new Date().toISOString().split('T')[0]
  //         });
  //         setIsEditing(false);
  //       }
  //     } else {
  //       throw new Error(response.message || 'Failed to save result');
  //     }
  //   } catch (error) {
  //     console.error('Error saving result:', error);
  //     setError(error.message || 'Failed to save result. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      if (
        !formData.firstName ||
        !formData.courseName ||
        !formData.totalMarks ||
        !formData.obtainedMarks
      ) {
        throw new Error("Please fill all required fields");
      }

      // Validate marks
      const totalMarks = parseFloat(formData.totalMarks);
      const obtainedMarks = parseFloat(formData.obtainedMarks);

      if (obtainedMarks > totalMarks) {
        throw new Error("Obtained marks cannot be greater than total marks");
      }

      if (totalMarks <= 0) {
        throw new Error("Total marks must be greater than 0");
      }

      const studentName = `${formData.firstName} ${formData.lastName}`.trim();

      if (
        !studentName ||
        !formData.courseName ||
        !formData.totalMarks ||
        !formData.obtainedMarks
      ) {
        throw new Error("Please fill all required fields");
      }

      const resultData = {
        serialNo: formData.serialNo || `RES-${Date.now()}`,
        enrollmentNo: formData.enrollmentNo,
        studentName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fatherName: formData.fatherName,
        dateOfBirth: new Date(formData.dateOfBirth).toLocaleDateString('en-CA'),

        // dateOfBirth: formData.dateOfBirth,
        courseName: formData.courseName,
        totalMarks: parseFloat(formData.totalMarks),
        obtainedMarks: parseFloat(formData.obtainedMarks),
        percentage: parseFloat(formData.percentage),
        grade: formData.grade,
        session: formData.session,
        issueDate: formData.issueDate,
        photoUrl:formData.photoUrl
      };

      // console.log("handle submit ", resultData);

      const response = await googleserv.saveResultData(resultData);

      if (response.success) {
        setSuccess(`Result saved successfully! ${response.data.message}`);

        // Reset form after successful submission
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
          session:
            new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
          issueDate: new Date().toISOString().split("T")[0],
          photoUrl:""
        });
      } else {
        throw new Error(response.message || "Failed to save result");
      }
    } catch (error) {
      // console.error("Error saving result:", error);
      setError(error.message || "Failed to save result. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
      session: "",
      photoUrl:"",
      issueDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Result Declaration Form
          </h1>
          <p className="text-gray-600">
            Fill student result details. Use enrollment number to auto-fill
            student information.
          </p>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-1 text-sm text-green-700">{success}</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="px-6 py-8 space-y-8">
            {/* Enrollment Search Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Student Search
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="enrollmentNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enrollment Number *
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      id="enrollmentNo"
                      name="enrollmentNo"
                      value={formData.enrollmentNo}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleEnrollmentNoSearch(e);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter enrollment number to auto-fill student details"
                      required
                    />
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Clear
                    </button>
                  </div>
                  {searchLoading && (
                    <p className="mt-2 text-sm text-blue-600">
                      Searching for student data...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Student Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fatherName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                     
                     <div className="   ">
                      <div>
                         <label    htmlFor="photoUrl"
                    className="block text-sm font-medium text-gray-700 mb-2"> Student Photo </label>
                      </div>
                     
  {formData.photoUrl ? (
  <img 
    src={formData.photoUrl} 
    alt="Student" 
    className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
  />
) : (
  <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
    <span className="text-gray-500 text-sm">No Photo</span>
  </div>
)}

  {/* <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">
      {formData.photoUrl ? (
        <img 
          src={formData.photoUrl} 
          alt="Student" 
          className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
        />
      ) : (
        <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Photo</span>
        </div>
      )}
    </div>
    <div className="flex-1">
      <input
        type="file"
        name="photo"
        accept="image/*"
        // onChange={onChange}
        className="hidden"
        id="photo-upload"
      />
      <label
        htmlFor="photo-upload"
        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {uploadingPhoto ? 'Uploading...' : 'Choose Photo'}
      </label>
      
      <p className="text-xs text-gray-500 mt-1">
        JPEG, PNG, or JPG, Max 500KB. This photo will be used for your ID card.
      </p>
    </div>
  </div> */}
</div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={
                      formData.dateOfBirth
                        ? formData.dateOfBirth.split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Name *
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Result Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Result Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label
                    htmlFor="totalMarks"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Marks *
                  </label>
                  <input
                    type="number"
                    id="totalMarks"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="obtainedMarks"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Obtained Marks *
                  </label>
                  <input
                    type="number"
                    id="obtainedMarks"
                    name="obtainedMarks"
                    value={formData.obtainedMarks}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    max={formData.totalMarks}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Percentage
                  </label>
                  <input
                    type="text"
                    id="percentage"
                    name="percentage"
                    value={formData.percentage}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="grade"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Grade
                  </label>
                  <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="session"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Session
                  </label>
                  <input
                    type="text"
                    id="session"
                    name="session"
                    value={formData.session}
                    onChange={handleInputChange}
                    placeholder="e.g., 2023-2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="issueDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Issue Date
                  </label>
                  <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="serialNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Serial Number
                  </label>
                  <input
                    type="text"
                    id="serialNo"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleInputChange}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Set Result"
                  : "Save Result"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResultDeclared;
