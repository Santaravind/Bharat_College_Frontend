import React from 'react';

const AdmissionSuccess = ({ formData }) => {
 
  const handlPayment=()=>{
    const paymentUrl = "https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view";
      window.location.replace(paymentUrl);
  }

  return (
    <div className="text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">
            {/* Without Payment Admission Not  Successful  */}
            Payment is not successful
        </h2>
        <p className="text-green-700 text-lg mb-4">
          Only Submission of data is not complite your process ...
        </p>
      </div>
{/* */}
<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
  <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
  <div className="space-y-3 text-left">
    <div className="flex items-start">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <span className="text-blue-600 text-sm font-semibold">1</span>
      </div>
      <div>
        <h4 className="font-semibold">Pay Admission Fee</h4>
        <p className="text-gray-600">
          If you haven’t paid the admission fee yet, please complete the payment as soon as possible to confirm your admission.
        </p>
      </div>
    </div>

       <div className="flex items-start">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <span className="text-blue-600 text-sm font-semibold">2</span>
      </div>
      <div>
        <h4 className="font-semibold">Download Admission Complited Form </h4>
        <p className="text-gray-600">
           Download your form from the email you used for registration.
           
        </p>
      </div>
    </div>

    <div className="flex items-start">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <span className="text-blue-600 text-sm font-semibold">3</span>
      </div>
      <div>
        <h4 className="font-semibold">Visit College Campus</h4>
        <p className="text-gray-600">
          Visit the college within 7 days with all original documents.
        </p>
      </div>
    </div>

    <div className="flex items-start">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <span className="text-blue-600 text-sm font-semibold">4</span>
      </div>
      <div>
        <h4 className="font-semibold">Document Verification</h4>
        <p className="text-gray-600">
          Bring all original documents for verification.
        </p>
      </div>
    </div>

    <div className="flex items-start">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
        <span className="text-blue-600 text-sm font-semibold">5</span>
      </div>
      <div>
        <h4 className="font-semibold">Complete Admission Process</h4>
        <p className="text-gray-600">
          Complete the remaining formalities at the college to finalize your admission.
        </p>
      </div>
    </div>
  </div>
</div>


      <div className=" border border-neutral-300 bg-green-300  rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Payment Fees</h3>

        <button 
        onClick={handlPayment}
        className='border-2 border-neutral-100  px-3 py-2 bg-red-500 font-semibold hover:text-white hover:bg-blue-900 rounded-full '> 
          Pay Fee
        </button>
       {/*  */}
      </div>
    </div>
  );
};

export default AdmissionSuccess;