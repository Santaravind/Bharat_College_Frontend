import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import EducationalDetails from './EducationDetails';
import Declaration from './Declaration';
import SubmissionSuccess from './SubmissionSuccess';
import {googleSheetsService} from './services/googleSheetsService.js'

// const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL
const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    age: '',
    castCategory: '',
    aadharNumber: '',
    
    // Contact Details
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    villagePost: '',
    district: '',
    state: '',
    pinCode: '',
    permanentAddress: '',
    sameAsAddress: false,
    
    // Educational Details
    tenth: { collegeName: '', yearOfPassing: '', percentage: '' },
    twelfth: { collegeName: '', yearOfPassing: '', percentage: '' },
    diploma: { collegeName: '', yearOfPassing: '', percentage: '' },
    graduation: { collegeName: '', yearOfPassing: '', percentage: '' },
    postGraduation: { collegeName: '', yearOfPassing: '', percentage: '' },
    
    // Course Details
    courseProgram: '',
    fillingDate: new Date().toISOString().split('T')[0],
    
    // Declaration
    declarationAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admissionId, setAdmissionId] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
 
  // Validate Aadhar and check uniqueness
  // In AdmissionForm.jsx - remove Aadhar validation for now
const validateAadhar = async (aadhar) => {
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadhar)) {
    return 'Aadhar number must be 12 digits';
  }
  
  // Skip duplicate check due to CORS limitations
  return null;
};

// const nextStep = async () => {
//   // Remove the Aadhar validation call
//   if (validateStep(step)) {
//     setStep(step + 1);
//   }
// };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'dateOfBirth') {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        dateOfBirth: value,
        age: age
      }));
    } else if (name === 'sameAsAddress') {
      setFormData(prev => ({
        ...prev,
        sameAsAddress: checked,
        permanentAddress: checked ? prev.address : ''
      }));
    } else if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
      if (!formData.motherName) newErrors.motherName = "Mother's name is required";
      if (!formData.castCategory) newErrors.castCategory = 'Cast category is required';
      if (!formData.aadharNumber) {
        newErrors.aadharNumber = 'Aadhar number is required';
      } else if (formData.aadharNumber.length !== 12) {
        newErrors.aadharNumber = 'Aadhar number must be 12 digits';
      }
    }

    if (step === 2) {
      if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.villagePost) newErrors.villagePost = 'Village/Post is required';
      if (!formData.district) newErrors.district = 'District is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
      if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent address is required';
    }

    if (step === 3) {
      if (!formData.tenth.collegeName || !formData.tenth.yearOfPassing || !formData.tenth.percentage) {
        newErrors.tenth = '10th details are required';
      }
      if (!formData.courseProgram) newErrors.courseProgram = 'Course/Program is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (step === 1 && formData.aadharNumber) {
      // Validate Aadhar uniqueness when moving from step 1
      const aadharError = await validateAadhar(formData.aadharNumber);
      if (aadharError) {
        setErrors(prev => ({ ...prev, aadharNumber: aadharError }));
        return;
      }
    }

    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data to Google Sheets:', formData);
      
      // Generate admission ID
      const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
      setAdmissionId(generatedAdmissionId);

      // Prepare data for Google Sheets
      const submissionData = {
        ...formData,
        admissionId: generatedAdmissionId,
        submissionTimestamp: new Date().toISOString(),
        status: 'SUBMITTED'
      };

      // Submit to Google Sheets
      const response = await googleSheetsService.submitAdmission(submissionData);
      
      console.log('Form submitted successfully to Google Sheets:', response);
      setSubmissionSuccess(true);
      setStep(5); // Move to success step
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error.message || 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails 
            formData={formData} 
            errors={errors} 
            onChange={handleInputChange} 
          />
        );
      case 2:
        return (
          <ContactDetails 
            formData={formData} 
            errors={errors} 
            onChange={handleInputChange} 
          />
        );
      case 3:
        return (
          <EducationalDetails 
            formData={formData} 
            errors={errors} 
            onChange={handleInputChange} 
          />
        );
      case 4:
        return (
          <Declaration
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 5:
        return (
          <SubmissionSuccess 
            formData={formData} 
            admissionId={admissionId} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            College Admission Form
          </h1>
          <p className="text-red-600 text-center font-semibold text-sm">
            ⚠️ Important: All details must exactly match your 10th class certificate and Aadhar card. 
            Any mismatch will lead to admission cancellation.
          </p>
        </div>

        {/* Progress Bar */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div
                    className={`w-16 h-1 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal</span>
            <span>Contact</span>
            <span>Education</span>
            <span>Declaration</span>
            <span>Complete</span>
          </div>
        </div> */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
  <div className="flex flex-wrap items-center justify-center sm:justify-between mb-4 gap-2 sm:gap-4">
    {[1, 2, 3, 4, 5].map((stepNumber) => (
      <div key={stepNumber} className="flex items-center">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
            step >= stepNumber
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {stepNumber}
        </div>

        {/* Connector line (hidden on small screens) */}
        {stepNumber < 5 && (
          <div
            className={`hidden sm:block w-16 h-1 ${
              step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        )}
      </div>
    ))}
  </div>

  {/* Step labels */}
  <div className="flex flex-wrap justify-center sm:justify-between text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0">
    <span>Personal</span>
    <span>Contact</span>
    <span>Education</span>
    <span>Declaration</span>
    <span>Complete</span>
  </div>
</div>


        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderStep()}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-2 rounded-md ${
                  step === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;


