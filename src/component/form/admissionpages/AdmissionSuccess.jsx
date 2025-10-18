import React from 'react';

const AdmissionSuccess = ({ formData }) => {
  return (
    <div className="text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Admission Successful!
        </h2>
        <p className="text-green-700 text-lg mb-4">
          Your admission has been confirmed successfully.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-semibold">Visit College Campus</h4>
              <p className="text-gray-600">Visit the college within 7 days with all original documents</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-semibold">Document Verification</h4>
              <p className="text-gray-600">Bring all original documents for verification</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-blue-600 text-sm font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-semibold">Complete Admission Process</h4>
              <p className="text-gray-600">Complete the remaining formalities at the college</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Admission Reference</h3>
       <p className="text-blue-700">
                  Your Admission ID: <strong>ADM{formData?.aadharNumber?.slice(-8) || "N/A"}</strong>
           </p>

        <p className="text-sm text-blue-600 mt-2">
          Please keep this reference number for all future communications
        </p>
      </div>
    </div>
  );
};

export default AdmissionSuccess;