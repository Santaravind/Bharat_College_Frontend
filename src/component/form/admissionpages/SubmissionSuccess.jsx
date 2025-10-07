// components/SubmissionSuccess.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmissionSuccess = ({ formData, admissionId }) => {
  //    const query = new URLSearchParams(useLocation().search);
  // const status = query.get("status");

  const handlePrint = () => {
    window.print();
  };

  const handleNewAdmission = () => {
    window.location.reload();
  };
// const handlePayment = () => {
//     navigate(`/payment?admissionId=${admissionId}`);
//   };
  return (
    <div className="text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
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
      {/* if (status !== "paid") {
           <>
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Pending!
        </h2>
        <p className="text-gray-700 mb-6">
          Please complete your payment to confirm admission.
        </p>
        <button
        //   onClick={() => navigate(`/payment?admissionId=${admissionId}`)}
           onClick={() => navigate(`https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view`)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Proceed to Payment
        </button>
      </div>
    </>
  } */}
    </div>
  );
};

export default SubmissionSuccess;