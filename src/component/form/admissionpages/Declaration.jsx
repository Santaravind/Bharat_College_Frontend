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




const Declaration = ({ formData, errors, onChange,  onSubmit, isSubmitting,  setIsSubmitting,  setErrors   }) => {
  // const handlePaymentRedirect = async (e) => {
  //   e.preventDefault();
  //   //client data not show 18/10/2025
  //   if (!formData.declarationAccepted) {
  //     setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
      
  //     // Generate admission ID
  //     const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
      
  //     // ✅ FIRST: Save to database with PENDING status
  //     const submissionData = {
  //       ...formData,
  //       admissionId: generatedAdmissionId,
  //       paymentStatus: 'pending', // Important: don't set as 'paid' yet
  //       status: 'PENDING_PAYMENT',
  //       submissionTimestamp: new Date().toISOString()
  //     };

  //     // ✅ WAIT for database save to complete
  //     await onSubmit(submissionData);
      
  //     // ✅ Store in multiple places for redundancy
  //     if (typeof localStorage !== 'undefined') {
  //       localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
  //       localStorage.setItem('pendingFormData', JSON.stringify(formData));
  //     }
  //     if (typeof sessionStorage !== 'undefined') {
  //       sessionStorage.setItem('pendingAdmissionId', generatedAdmissionId);
  //     }
      
  //     // ✅ Create SUCCESS URL with all necessary parameters
  //     const successUrl = `${window.location.origin}${window.location.pathname}?payment_return=true&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;
      
  //     // const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&data=${returnData}&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;

  //     // ✅ Redirect to payment with success URL
  //     const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${generatedAdmissionId}&success_url=${encodeURIComponent(successUrl)}`;
      
  //     // ✅ Use location.replace instead of href for better handling
  //     window.location.replace(paymentUrl);
      
  //   } catch (error) {
  //     console.error("Error in payment redirect:", error);
  //     setIsSubmitting(false);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
 
 const handlePaymentRedirect = async (e) => {
  e.preventDefault();
   //changes on 19-10-2025
  if (!formData.declarationAccepted) {
    setErrors({ declarationAccepted: 'You must accept the declaration to proceed' });
    return;
  }

  try {
    setIsSubmitting(true);
    
    // Generate admission ID
    const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
    
    // ✅ COMPREHENSIVE DATA STORAGE
    const storageData = {
      formData: formData,
      admissionId: generatedAdmissionId,
      timestamp: new Date().toISOString(),
      paymentStatus: 'pending'
    };

    // Store in multiple storage mechanisms for redundancy
    localStorage.setItem('admissionFormData', JSON.stringify(storageData));
    localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
    sessionStorage.setItem('admissionBackup', JSON.stringify(storageData));
    
    // Also store individual fields for extra safety
    Object.keys(formData).forEach(key => {
      if (formData[key] && typeof formData[key] === 'string') {
        localStorage.setItem(`admission_${key}`, formData[key]);
      }
    });

    // ✅ Prepare submission data
    const submissionData = {
      ...formData,
      admissionId: generatedAdmissionId,
      paymentStatus: 'pending',
      status: 'PENDING_PAYMENT',
      submissionTimestamp: new Date().toISOString()
    };

    // ✅ Submit to Google Sheets
    await onSubmit(e, submissionData);
    
    console.log('Data saved locally:', storageData);
    
    // ✅ Create robust return URL with all data encoded
    const returnData = btoa(JSON.stringify({
      admissionId: generatedAdmissionId,
      timestamp: Date.now(),
      source: 'payment_redirect'
    }));
    
    const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&data=${returnData}&admission_id=${generatedAdmissionId}&timestamp=${Date.now()}`;
    
    // ✅ Redirect to payment
    const paymentUrl = `https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view?admission_id=${generatedAdmissionId}&success_url=${encodeURIComponent(successUrl)}`;
    
    // Use replace to prevent back button issues
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
          Your admission will be confirmed by the college Not your payment .
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
      {/* <div className="flex justify-between">
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
      </div> */}
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

