// components/SubmissionSuccess.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.png'
import { IoLocationSharp } from "react-icons/io5";
const SubmissionSuccess = ({ formData, admissionId }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const handleNewAdmission = () => {
    window.location.reload();
  };

  return (
    <div className="text-center">
       <div className="min-h-screen w-full bg-white relative mt-5">
                {/* Background with grid + dots */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
                      radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px, 20px 20px, 20px 20px",
                    backgroundPosition: "0 0, 0 0, 0 0",
                  }}
                />
          
                {/* Content */}
          
                <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl">Admission Contect us</h1>
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                  
                  {/* Top Info Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
                     {/* college name */}
                    <div>
                     
                      <div className="flex justify-center mb-3">
                        <img src={icon} alt="College icon" className="w-30 h-25 " />
                      </div>
                      <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
                      <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
                      <p className="text-lg font-semibold">MANAGEMENT </p>
                    </div>
          
                    {/* address */}
                    <div>
                      <div className="flex justify-center mb-3">
                        {/* <span className="text-6xl">📍</span> */}
                       <IoLocationSharp className=" text-red-600 text-7xl"/>  
                      </div>
                      <h3 className="font-bold text-2xl">Address:</h3>
                      <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
                      <p className="text-lg font-semibold">Utter Pradesh</p>
                      <p className="text-lg font-semibold">Pin code : 231216 </p>
                    </div>
          
                    {/* Contect  */}
                    <div>
                      <div className="flex justify-center mb-3 ">
                        <span className="text-7xl">📞</span>
                      </div>
                      <h3 className="font-bold text-2xl">Contact us:</h3>
                     
                        <p className="text-blue-600 font-medium text-lg break-all">
                           bharattechnicalcollege@gmail.com
                          </p>
                      
                      <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
                    </div>
                    </div>
                    </div>                    
      
                  </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Admission Form Submitted Successfully!
        </h2>
        <p className="text-green-700 text-lg mb-4">
          Your admission application has been received and saved successfully.
        </p>
        
        <div className="bg-white border border-green-300 rounded-lg p-4 inline-block">
          <p className="text-lg font-semibold">Admission Reference ID:</p>
          <p className="text-2xl font-bold text-blue-600">{admissionId}</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-semibold">Save Your Admission ID</h4>
              <p className="text-gray-600">Keep your Admission Reference ID safe for all future communications</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-semibold">Visit College Campus</h4>
              <p className="text-gray-600">Visit the college within 7 days with all original documents</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-semibold">Document Verification</h4>
              <p className="text-gray-600">Bring all original documents for verification:
                <br />- 10th Certificate & Marksheet
                <br />- 12th Certificate & Marksheet (if applicable)
                <br />- Aadhar Card
                <br />- Caste Certificate (if applicable)
                <br />- Passport Size Photos
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">4</span>
            </div>
            <div>
              <h4 className="font-semibold">Complete Admission Process</h4>
              <p className="text-gray-600">Complete the remaining formalities and fee payment at the college</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2 text-emerald-600">Bharat Technical College Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Address:</strong>
            <p className=''>Pusauli, Robertsganj

Sonbhadra,



<br /> Utter Predash, India,Pincode-  231216</p>
          </div>
          <div>
            <strong>Contact:</strong>
            <p>Phone: +91-8840157051<br />Email: bharattechnicalcollege@gmail.com</p>
          </div>
        </div>
        <p className="text-blue-700 text-sm mt-4">
          <strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print This Page
        </button>
        
        <button
          onClick={handleNewAdmission}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Submit Another Admission
        </button>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <p className="text-yellow-700 text-sm">
          <strong>Note:</strong> This is only the online application submission. 
          Your admission will be confirmed only after document verification and fee payment at the college campus.
          Bring this admission reference ID when you visit the college.
        </p>
      </div>
      
    </div>
  );
};

export default SubmissionSuccess;