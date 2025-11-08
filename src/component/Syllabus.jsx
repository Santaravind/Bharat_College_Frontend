import React, { useState } from 'react';

 import Healthcare from './assets/Syllaybus/CERTIFICATE-IN-HEALTH-CARE-ASSISTANT.pdf';
 import Healthcareassistant from './assets/Syllaybus/HealthCareAssistant.pdf';
 import dialysistechnology from './assets/Syllaybus/DIALYSISTECHNOLOGY.pdf';
 import  firesafety from './assets/Syllaybus/DIPLOMA-IN-FIRE-SAFETY.pdf';
 import  hotel from './assets/Syllaybus/DIPLOMA-IN-HOTEL-MANAGEMENT-CATERING-SCIENCE.pdf';
 import  operation from './assets/Syllaybus/DIPLOMA-IN-OPERATION-THEATRE-TECHNOLOGY-Two-Years.pdf';
 import  radiology from './assets/Syllaybus/DIPLOMA-IN-RADIOLOGY-IMAGING-TECHNOLOGY.pdf';
 import  refigerationair from './assets/Syllaybus/Diploma-in-Refrigeration-and-Air-Conditioning-Engineering.pdf';
 import  tigmig from './assets/Syllaybus/DIPLOMA-IN-TIG-AND-MIG-WELDING-TECHNOLOG.pdf';
 import  welding from './assets/Syllaybus/DIPLOMA-IN-WELDING-TECHNOLOG.pdf';
 import  dmlt from  './assets/Syllaybus/DMLT.cdr.pdf';
 import  airline from  './assets/Syllaybus/DIPLOMA-IN-AIRLINE-TRAVEL-MANAGEMENT.pdf';
 import  postfiresefty from  './assets/Syllaybus/POST-DIPLOMA-IN-FIRE-SAFETY-ENGINEERING-TECHNIQUES.pdf';
 
   
const Syllabus= () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, name: "CERTIFICATE IN HEALTH CARE ASSISTANT", duration: "1 Year" },
    { id: 2, name: "DIPLOMA IN  Health Care Assistant ", duration: "2 Year" },
    { id: 3, name: " DIPLOMA IN DIALYSIS TECHNOLOGY ", duration: "2 Year" },
    { id: 4, name: "DIPLOMA IN Fire Safety Management ", duration: "1 Year" },
    { id: 5, name: "DIPLOMA IN HOTEL MANAGEMENT & CATERING SCIENCE ", duration: "2 Year" },
    { id: 6, name: "DIPLOMA IN OPERATION THEATRE TECHNOLOGY", duration: "2 Year" },
    { id: 7, name: "DIPLOMA IN RADIOLOGY & IMAGING TECHNOLOGY ", duration: "1 Year" },
    { id: 8, name: "DIPLOMA IN Refrigeration and Air Conditioning Engineering ", duration: "1 Year" },
    { id: 9, name: "DIPLOMA IN TIG AND MIG  WELDING TECHNOLOGY", duration: "1 Year" },
    { id: 10, name: "DIPLOMA IN WELDING TECHNOLOGY-ONE YEAR", duration: "1 Year" },
    { id: 11, name: "DIPLOMA IN MEDICAL LABORATORY TECHNOLOGY ", duration: "2 Year" },
    { id: 12, name: "DIPLOMA IN AIRLINE AND TRAVEL MANAGEMENT", duration: "2 Year" },
    { id: 13, name: "POST DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES", duration: "1 Year" },
    // { id: 14, name: "Certificate in Visual C++", duration: "2 Months" }
  ];

  // Mock PDF URLs - replace these with your actual PDF file paths
  const pdfUrls = {
    1: Healthcare,
    2: Healthcareassistant,
    3: dialysistechnology,
    4: firesafety,
    5: hotel,
    6: operation,
    7: radiology,
    8: refigerationair,
    9: tigmig,    
    10: welding,
    11: dmlt,
    12: airline,
    13: postfiresefty,
  };

  const handlePdfDownload = (courseId) => {
    const pdfUrl = pdfUrls[courseId];
    if (pdfUrl) {
      // Open PDF in new tab
      window.open(pdfUrl, '_blank');
    } else {
      alert('Syllabus PDF not available for this course');
    }
  };

  const getCourseDetails = (courseId) => {
    // Mock course details - replace with actual details
    const details = {
     //  14: "Visual C++ programming, Windows applications development, and OOP concepts."
    };
    return details[courseId] || "Course details not available. View the syllabus PDF for more information.";
  };

  return (
    // <div className="min-h-screen bg-gray-50 py-8">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     {/* Header */}
    //     <div className="text-center mb-12">
    //       <h1 className="text-4xl font-bold text-gray-900 mb-4">
    //          Courses Syllabus
    //       </h1>
    //       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    //         Browse through our comprehensive list of  courses and download their detailed syllabus
    //       </p>
    //     </div>

    //     {/* Courses Grid */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    //       {courses.map((course) => (
    //         <div
    //           key={course.id}
    //           className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
    //         >
    //           <div className="flex justify-between items-start mb-4">
    //             <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
    //               {course.duration}
    //             </span>
    //           </div>
              
    //           <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
    //             {course.name}
    //           </h3>
              
    //           <div className="flex justify-between items-center mt-4">
    //             <button
    //               onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
    //               className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
    //             >
    //               {selectedCourse?.id === course.id ? 'Hide Details' : 'View Details'}
    //             </button>
                
    //             <button
    //               onClick={() => handlePdfDownload(course.id)}
    //               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center"
    //             >
    //               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //               </svg>
    //               Syllabus PDF
    //             </button>
    //           </div>

    //           {/* Course Details */}
    //           {selectedCourse?.id === course.id && (
    //             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
    //               <p className="text-gray-700 text-sm">
    //                 {getCourseDetails(course.id)}
    //               </p>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     {/* Information Section */}
    //     <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
    //       <div className="flex items-center mb-4">
    //         <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //         </svg>
    //         <h3 className="text-lg font-semibold text-blue-800">Important Information</h3>
    //       </div>
    //       <ul className="text-blue-700 space-y-2">
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">•</span>
    //           Click on "Syllabus PDF" to view and download the course syllabus
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">•</span>
    //           PDF files will open in a new browser tab
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">•</span>
    //           All syllabi are subject to updates and revisions
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg> 
      </div> */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
        Courses Syllabus
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Explore our comprehensive collection of course syllabus and download detailed curriculum information
      </p>
    </div>

    {/* Courses Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
              {course.duration}
            </span>
            <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-300">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-gray-900 transition-colors duration-300">
            {course.name}
          </h3>
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-all duration-300 flex items-center group/btn"
            >
              {selectedCourse?.id === course.id ? (
                <>
                  <svg className="w-4 h-4 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Hide Details
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 group-hover/btn:translate-y-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View Details
                </>
              )}
            </button>
            
            <button
              onClick={() => handlePdfDownload(course.id)}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Syllabus PDF
            </button>
          </div>

          {/* Course Details */}
          {selectedCourse?.id === course.id && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 animate-fade-in">
              <div className="flex items-start mb-3">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 leading-relaxed">
                  {getCourseDetails(course.id)}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

   
    
  </div>
</div>
    </>
  );
};



export default Syllabus
