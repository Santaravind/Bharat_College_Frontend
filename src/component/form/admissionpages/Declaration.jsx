// components/Declaration.jsx
import React from 'react';

const Declaration = ({ formData, errors, onChange, onSubmit, isSubmitting }) => {
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
        {/* <button
          type="button"
          onClick={onSubmit}
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
            'Pay & Submit Admission Form'
          )}
        </button> */}
         {/* <button
  type="button"
  onClick={() => {
    // First, submit the form
    onSubmit();

    // Then redirect to Razorpay payment page
    window.location.href = "https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view";
  }}
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
    'Submit Admission Form & Proceed to Payment'
  )}
</button> */}
{/* // Wait for the form data to save before redirecting */}
<button
  type="button"
  onClick={async (e) => {
    try {
      // Wait for the form data to save before redirecting
      await onSubmit(e);

      // If submission is successful, then go to Razorpay payment page
      window.location.href = "https://pages.razorpay.com/pl_RQcFXEkDBbtWBZ/view";
    } catch (error) {
      console.error("Error saving data before payment:", error);
      alert("Something went wrong while saving your details. Please try again.");
    }
  }}
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
    'Submit Admission Form & Proceed to Payment'
  )}
</button>


      </div>
    </div>
  );
};

export default Declaration;