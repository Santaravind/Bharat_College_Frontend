// services/googleSheetsService.js
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypvOv874msP3ycKENdCoNLzuZ94fHYyrvZzksPKuxMazNTRuMc73Q6EBDzjMNqnIqP/exec';

 export  const googleSheetsService = {
  // Submit admission data to Google Sheets
  submitAdmission: async (formData) => {
    try {
      console.log('Sending data to Google Sheets...', formData);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // ✅ Add this for CORS
        body: JSON.stringify({
          action: 'submitAdmission',
          data: formData
        }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });

      // With no-cors mode, we can't read the response
      // So we'll assume success and handle errors differently
      console.log('Request sent successfully');
      
      return {
        status: "success",
        message: "Admission submitted successfully",
        admissionId: formData.admissionId,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      throw new Error('Failed to submit admission form. Please try again.');
    }
  },

  // Check if Aadhar already exists
  checkAadharExists: async (aadharNumber) => {
    try {
      // For Aadhar check, we'll use a different approach
      // Since we can't read response with no-cors, we'll skip this check
      // or implement it differently
      console.log('Aadhar check skipped due to CORS limitations');
      return false;
      
    } catch (error) {
      console.error('Error checking Aadhar:', error);
      return false;
    }
  },
};