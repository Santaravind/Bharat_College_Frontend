import React, { useState, useEffect } from 'react';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import EducationDetails from './EducationDetails';
import Declaration from './Declaration';
import SubmissionSuccess from './SubmissionSuccess';
import { cloudinaryService } from './services/cloudinaryService';
import { googleSheetsService } from './services/googleSheetsService';

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    age: "",
    castCategory: "",
    aadharNumber: "",

    // Contact Details
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    villagePost: "",
    district: "",
    state: "",
    pinCode: "",
    permanentAddress: "",
    sameAsAddress: false,

    // Educational Details
    tenth: { collegeName: "", yearOfPassing: "", percentage: "" },
    twelfth: { collegeName: "", yearOfPassing: "", percentage: "" },
    diploma: { collegeName: "", yearOfPassing: "", percentage: "" },
    graduation: { collegeName: "", yearOfPassing: "", percentage: "" },
    postGraduation: { collegeName: "", yearOfPassing: "", percentage: "" },

    // Course Details
    courseProgram: "",
    fillingDate: new Date().toISOString().split("T")[0],

    // Photo Upload
    photo: null,
    photoUrl: "",

    // Declaration
    declarationAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admissionId, setAdmissionId] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Check this update when data not show in client page 
  // useEffect(() => {
  //   const checkPaymentReturn = () => {
  //     const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
  //     if (pendingAdmissionId) {
  //       setAdmissionId(pendingAdmissionId);
  //       setSubmissionSuccess(true);
  //       setStep(5);
  //     }
  //   };

  //   checkPaymentReturn();
  // }, []);



  // In AdmissionForm.jsx - Update the useEffect 18/10/2025
// In AdmissionForm.jsx
// useEffect(() => {
//   const handlePaymentReturn = async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const isPaymentReturn = urlParams.get('payment_return');
//     const admissionIdFromUrl = urlParams.get('admission_id');
    
//     if (isPaymentReturn && admissionIdFromUrl) {
//       try {
//         console.log('Payment return detected with admission ID:', admissionIdFromUrl);
        
//         // ✅ Clear URL parameters to prevent re-triggering
//         window.history.replaceState({}, '', window.location.pathname);
        
//         // ✅ Set admission ID from URL
//         setAdmissionId(admissionIdFromUrl);
        
//         // ✅ Try to fetch data from database
//         try {
//           // If you have API to fetch by admission ID
//           const response = await fetch(`/api/admissions/${admissionIdFromUrl}`);
//           if (response.ok) {
//             const data = await response.json();
//             setFormData(data); // Update form data with database data
//           }
//         } catch (dbError) {
//           console.log('Could not fetch from DB, using localStorage fallback');
//         }
        
//         // ✅ Move to success page
//         setStep(5);
        
//       } catch (error) {
//         console.error('Error handling payment return:', error);
//       }
//     }
    
//     // ✅ Original localStorage fallback (for direct submissions without payment)
//     const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
//     if (pendingAdmissionId && !admissionIdFromUrl) {
//       setAdmissionId(pendingAdmissionId);
//       setStep(5);
//     }
//   };

//   handlePaymentReturn();
// }, []);

//data from local storage
// useEffect(() => {
//   const handlePaymentReturn = async () => {
//     console.log('Checking for payment return...');
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const isPaymentReturn = urlParams.get('payment_success') || urlParams.get('payment_return');
//     const admissionIdFromUrl = urlParams.get('admission_id');
//     const encodedData = urlParams.get('data');
    
//     // ✅ METHOD 1: URL Parameters (Highest Priority)
//     if (isPaymentReturn && admissionIdFromUrl) {
//       console.log('Payment return detected with ID:', admissionIdFromUrl);
      
//       try {
//         // Decode URL data if present
//         let urlFormData = {};
//         if (encodedData) {
//           try {
//             urlFormData = JSON.parse(atob(encodedData));
//             console.log('Decoded URL data:', urlFormData);
//           } catch (e) {
//             console.log('No encoded data in URL');
//           }
//         }
        
//         // ✅ METHOD 2: Check localStorage for comprehensive data
//         const storedData = localStorage.getItem('admissionFormData');
//         const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
        
//         let finalAdmissionId = admissionIdFromUrl || pendingAdmissionId;
//         let finalFormData = formData;
        
//         if (storedData) {
//           try {
//             const parsedData = JSON.parse(storedData);
//             console.log('Found stored data:', parsedData);
            
//             if (parsedData.formData) {
//               finalFormData = { ...finalFormData, ...parsedData.formData };
//             }
//             if (parsedData.admissionId && !finalAdmissionId) {
//               finalAdmissionId = parsedData.admissionId;
//             }
//           } catch (parseError) {
//             console.error('Error parsing stored data:', parseError);
//           }
//         }
        
//         // ✅ METHOD 3: Fallback - reconstruct from individual localStorage items
//         if (!finalFormData.firstName) {
//           console.log('Reconstructing form from individual storage...');
//           const reconstructedData = {};
//           const formFields = [
//             'title', 'firstName', 'lastName', 'dateOfBirth', 'fatherName', 'motherName', 
//             'age', 'castCategory', 'aadharNumber', 'mobileNumber', 'email', 'address',
//             'city', 'villagePost', 'district', 'state', 'pinCode', 'permanentAddress',
//             'courseProgram', 'photoUrl'
//           ];
          
//           formFields.forEach(field => {
//             const value = localStorage.getItem(`admission_${field}`);
//             if (value) {
//               reconstructedData[field] = value;
//             }
//           });
          
//           // Handle nested education objects
//           const educationLevels = ['tenth', 'twelfth', 'diploma', 'graduation', 'postGraduation'];
//           educationLevels.forEach(level => {
//             const collegeName = localStorage.getItem(`admission_${level}_collegeName`);
//             const yearOfPassing = localStorage.getItem(`admission_${level}_yearOfPassing`);
//             const percentage = localStorage.getItem(`admission_${level}_percentage`);
            
//             if (collegeName || yearOfPassing || percentage) {
//               reconstructedData[level] = {
//                 collegeName: collegeName || '',
//                 yearOfPassing: yearOfPassing || '',
//                 percentage: percentage || ''
//               };
//             }
//           });
          
//           if (Object.keys(reconstructedData).length > 0) {
//             finalFormData = { ...finalFormData, ...reconstructedData };
//             console.log('Reconstructed data:', reconstructedData);
//           }
//         }
        
//         // ✅ METHOD 4: SessionStorage fallback
//         if (!finalFormData.firstName) {
//           const sessionData = sessionStorage.getItem('admissionBackup');
//           if (sessionData) {
//             try {
//               const parsedSessionData = JSON.parse(sessionData);
//               if (parsedSessionData.formData) {
//                 finalFormData = { ...finalFormData, ...parsedSessionData.formData };
//               }
//             } catch (e) {
//               console.log('No valid session data');
//             }
//           }
//         }
        
//         // ✅ Update state with recovered data
//         if (finalAdmissionId) {
//           setAdmissionId(finalAdmissionId);
//         }
        
//         if (finalFormData.firstName) {
//           setFormData(finalFormData);
//           console.log('Form data restored successfully');
//         }
        
//         // ✅ Clean URL to prevent re-triggering
//         window.history.replaceState({}, '', window.location.pathname);
        
//         // ✅ Move to success page
//         setStep(5);
//         setSubmissionSuccess(true);
        
//       } catch (error) {
//         console.error('Error handling payment return:', error);
//       }
//     }
    
//     // ✅ Handle direct localStorage restoration (page refresh)
//     else {
//       const storedData = localStorage.getItem('admissionFormData');
//       const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
      
//       if (storedData && pendingAdmissionId) {
//         try {
//           const parsedData = JSON.parse(storedData);
//           console.log('Restoring from localStorage (page refresh):', parsedData);
          
//           if (parsedData.formData && parsedData.admissionId) {
//             setFormData(parsedData.formData);
//             setAdmissionId(parsedData.admissionId);
//             setStep(5);
//             setSubmissionSuccess(true);
//           }
//         } catch (error) {
//           console.error('Error restoring from localStorage:', error);
//         }
//       }
//     }
//   };

//   handlePaymentReturn();
// }, []); // Empty dependency array to run only on mount



// useEffect(() => {
//   // data from google sheet
//   const handlePaymentReturn = async () => {
//     console.log('🔄 Checking payment return status...');
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const isPaymentReturn = urlParams.get('payment_success') || urlParams.get('payment_return');
//     const admissionIdFromUrl = urlParams.get('admission_id');
    
//     console.log('📋 URL Parameters:', { isPaymentReturn, admissionIdFromUrl });

//     if (isPaymentReturn && admissionIdFromUrl) {
//       try {
//         console.log('💰 Payment return detected with ID:', admissionIdFromUrl);
        
//         // ✅ IMMEDIATELY clear URL to prevent re-triggering
//         window.history.replaceState({}, '', window.location.pathname);
        
//         setAdmissionId(admissionIdFromUrl);
        
//         // ✅ PRIMARY METHOD: Fetch from backend
//         console.log('📡 Fetching data from backend...');
//         const backendData = await fetchAdmissionFromBackend(admissionIdFromUrl);
        
//         if (backendData) {
//           console.log('✅ Data fetched from backend:', backendData);
//           setFormData(backendData);
//           setStep(5);
//           setSubmissionSuccess(true);
          
//           // ✅ Update payment status
//           try {
//             await googleSheetsService.updatePaymentStatus(admissionIdFromUrl, 'paid');
//             console.log('✅ Payment status updated to paid');
//           } catch (paymentError) {
//             console.error('❌ Payment status update failed:', paymentError);
//           }
          
//           return; // Success - exit early
//         }
        
//         // ✅ FALLBACK METHOD: Local storage recovery
//         console.log('🔄 Backend fetch failed, trying local storage...');
//         const localData = await recoverFromLocalStorage(admissionIdFromUrl);
        
//         if (localData) {
//           console.log('✅ Data recovered from local storage');
//           setFormData(localData);
//           setStep(5);
//           setSubmissionSuccess(true);
//           return;
//         }
        
//         // ✅ FINAL FALLBACK: Show minimal success page
//         console.warn('⚠️ No data found, showing minimal success page');
//         setStep(5);
//         setSubmissionSuccess(true);
        
//       } catch (error) {
//         console.error('❌ Error in payment return handler:', error);
//         setStep(5); // Always show success page
//       }
//     }

//     // ✅ Handle direct access to success page
//     else {
//       const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
//       if (pendingAdmissionId) {
//         console.log('🔍 Direct access detected, admission ID:', pendingAdmissionId);
//         await handleDirectAccess(pendingAdmissionId);
//       }
//     }
//   };

//   // Fetch admission data from backend
//   const fetchAdmissionFromBackend = async (admissionId) => {
//     try {
//       const response = await googleSheetsService.getAdmissionById(admissionId);
      
//       if (response.success && response.data) {
//         // Transform backend data to match form structure
//         return transformBackendData(response.data);
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Backend fetch error:', error);
//       return null;
//     }
//   };

//   // Transform backend data to match form structure
//   const transformBackendData = (backendData) => {
//     return {
//       // Personal Details
//       title: backendData.title || '',
//       firstName: backendData.firstName || '',
//       lastName: backendData.lastName || '',
//       dateOfBirth: backendData.dateOfBirth || '',
//       fatherName: backendData.fatherName || '',
//       motherName: backendData.motherName || '',
//       age: backendData.age || '',
//       castCategory: backendData.castCategory || '',
//       aadharNumber: backendData.aadharNumber || '',
      
//       // Contact Details
//       mobileNumber: backendData.mobileNumber || '',
//       email: backendData.email || '',
//       address: backendData.address || '',
//       city: backendData.city || '',
//       villagePost: backendData.villagePost || '',
//       district: backendData.district || '',
//       state: backendData.state || '',
//       pinCode: backendData.pinCode || '',
//       permanentAddress: backendData.permanentAddress || '',
      
//       // Education Details
//       tenth: {
//         collegeName: backendData.tenthCollegeName || backendData.tenth?.collegeName || '',
//         yearOfPassing: backendData.tenthYearOfPassing || backendData.tenth?.yearOfPassing || '',
//         percentage: backendData.tenthPercentage || backendData.tenth?.percentage || ''
//       },
//       twelfth: {
//         collegeName: backendData.twelfthCollegeName || backendData.twelfth?.collegeName || '',
//         yearOfPassing: backendData.twelfthYearOfPassing || backendData.twelfth?.yearOfPassing || '',
//         percentage: backendData.twelfthPercentage || backendData.twelfth?.percentage || ''
//       },
//       diploma: {
//         collegeName: backendData.diplomaCollegeName || backendData.diploma?.collegeName || '',
//         yearOfPassing: backendData.diplomaYearOfPassing || backendData.diploma?.yearOfPassing || '',
//         percentage: backendData.diplomaPercentage || backendData.diploma?.percentage || ''
//       },
//       graduation: {
//         collegeName: backendData.graduationCollegeName || backendData.graduation?.collegeName || '',
//         yearOfPassing: backendData.graduationYearOfPassing || backendData.graduation?.yearOfPassing || '',
//         percentage: backendData.graduationPercentage || backendData.graduation?.percentage || ''
//       },
//       postGraduation: {
//         collegeName: backendData.postGraduationCollegeName || backendData.postGraduation?.collegeName || '',
//         yearOfPassing: backendData.postGraduationYearOfPassing || backendData.postGraduation?.yearOfPassing || '',
//         percentage: backendData.postGraduationPercentage || backendData.postGraduation?.percentage || ''
//       },
      
//       // Course Details
//       courseProgram: backendData.courseProgram || '',
//       fillingDate: backendData.fillingDate || new Date().toISOString().split("T")[0],
      
//       // Photo
//       photoUrl: backendData.photoUrl || '',
      
//       // Declaration
//       declarationAccepted: true
//     };
//   };

//   // Local storage recovery fallback
//   const recoverFromLocalStorage = async (admissionId) => {
//     try {
//       const storedData = localStorage.getItem('admissionFormData');
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         if (parsedData.admissionId === admissionId && parsedData.formData) {
//           return parsedData.formData;
//         }
//       }
      
//       // Try individual field recovery
//       return recoverIndividualFields();
//     } catch (error) {
//       console.error('❌ Local storage recovery error:', error);
//       return null;
//     }
//   };

//   // Handle direct access (page refresh)
//   const handleDirectAccess = async (admissionId) => {
//     try {
//       // Try backend first
//       const backendData = await fetchAdmissionFromBackend(admissionId);
//       if (backendData) {
//         setFormData(backendData);
//         setAdmissionId(admissionId);
//         setStep(5);
//         setSubmissionSuccess(true);
//         return;
//       }
      
//       // Fallback to local storage
//       const localData = await recoverFromLocalStorage(admissionId);
//       if (localData) {
//         setFormData(localData);
//         setAdmissionId(admissionId);
//         setStep(5);
//         setSubmissionSuccess(true);
//       }
//     } catch (error) {
//       console.error('❌ Direct access error:', error);
//     }
//   };

//   // Individual field recovery (existing function)
//   const recoverIndividualFields = () => {
//     const recovered = {};
//     // ... (keep your existing individual field recovery logic)
//     return Object.keys(recovered).length > 0 ? recovered : null;
//   };

//   handlePaymentReturn();
// }, []);

// In AdmissionForm.jsx - Update the payment return handler
useEffect(() => {
  const handlePaymentReturn = async () => {
    console.log('Checking for payment return...');
    
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    
    if (paymentSuccess) {
      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);
      
      // Move to success page - user will enter admission ID manually
      setStep(5);
      setSubmissionSuccess(true);
    }
    
    // Handle direct access with existing admission ID
    const pendingAdmissionId = localStorage.getItem('pendingAdmissionId');
    if (pendingAdmissionId && !paymentSuccess) {
      setAdmissionId(pendingAdmissionId);
      setStep(5);
    }
  };

  handlePaymentReturn();
}, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name === 'photo' && files && files[0]) {
      handlePhotoUpload(files[0]);
      return;
    }
    
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

  const handlePhotoUpload = async (file) => {
    // Validate file size (500KB)
    if (file.size > 500 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'Photo size must be less than 500KB' }));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Please upload a valid image file' }));
      return;
    }

    setUploadingPhoto(true);
    try {
      const photoUrl = await cloudinaryService.uploadPhoto(file);
      setFormData(prev => ({
        ...prev,
        photo: file,
        photoUrl: photoUrl
      }));
      setErrors(prev => ({ ...prev, photo: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, photo: 'Failed to upload photo. Please try again.' }));
    } finally {
      setUploadingPhoto(false);
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
      if (!formData.photoUrl) newErrors.photo = 'Photo is required';
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
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  //this before payment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateStep(4)) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Generate admission ID
//       const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
//       setAdmissionId(generatedAdmissionId);

//       // Store in localStorage for payment return
//       localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
//       localStorage.setItem('pendingFormData', JSON.stringify(formData));

//       // Prepare data for Google Sheets
//       const submissionData = {
//         ...formData,
//         admissionId: generatedAdmissionId,
//         submissionTimestamp: new Date().toISOString(),
//         status: 'PENDING_PAYMENT',
//         paymentStatus: 'pending'
//       };

//       // Submit to Google Sheets directly
//       const response = await googleSheetsService.submitAdmission(submissionData);
      
//       console.log('Form submitted successfully to Google Sheets:', response);
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: error.message || 'Failed to submit form. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

// const handleSubmit = async (e, submissionData = null) => {
// //   e.preventDefault();
  
//   if (!validateStep(4)) return;
  
//   setIsSubmitting(true);
  
//   try {
//     // Generate admission ID
//     const generatedAdmissionId = `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`;
//     setAdmissionId(generatedAdmissionId);

//     // Store in localStorage for payment return
//     localStorage.setItem('pendingAdmissionId', generatedAdmissionId);
//     localStorage.setItem('pendingFormData', JSON.stringify(formData));

//     // Prepare data for Google Sheets - use provided data or default
//     const finalSubmissionData = submissionData || {
//       ...formData,
//       admissionId: generatedAdmissionId,
//       submissionTimestamp: new Date().toISOString(),
//       status: 'ADMISSION_CONFIRMED',
//       paymentStatus: 'paid' // Set as paid immediately
//     };

//     // Submit to Google Sheets directly
//     const response = await googleSheetsService.submitAdmission(finalSubmissionData);
    
//     console.log('Form submitted successfully to Google Sheets:', response);
    
//     // Move to success page immediately
//     setStep(5);
    
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     setErrors({ submit: error.message || 'Failed to submit form. Please try again.' });
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//client data not show 18/10/2025

const handleSubmit = async (e, submissionData = null) => {
  // if (e) e.preventDefault();
  
  if (!validateStep(4)) return;
  
  setIsSubmitting(true);
  
  try {
    // Use provided submissionData or create default
    const finalSubmissionData = submissionData || {
      ...formData,
      admissionId: `ADM${formData.aadharNumber.slice(-8)}${Date.now().toString().slice(-4)}`,
      submissionTimestamp: new Date().toISOString(),
      status: 'ADMISSION_CONFIRMED',
      paymentStatus: 'paid'
    };

    // Submit to Google Sheets
    const response = await googleSheetsService.submitAdmission(finalSubmissionData);
    
    console.log('Form submitted successfully to Google Sheets:', response);
    
    // Only move to success page if not redirecting to payment
    if (finalSubmissionData.paymentStatus !== 'pending') {
      setAdmissionId(finalSubmissionData.admissionId);
      setStep(5);
    }
    
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
            uploadingPhoto={uploadingPhoto}
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
          <EducationDetails 
            formData={formData} 
            errors={errors} 
            onChange={handleInputChange} 
          />
        );
      case 4:
        return (
          // <Declaration
          //   formData={formData}
          //   errors={errors}
          //   onChange={handleInputChange}
          //   onSubmit={handleSubmit}
          //   isSubmitting={isSubmitting}
          //   admissionId={admissionId}
          // />
          <Declaration
              formData={formData}
              errors={errors}
               onChange={handleInputChange}
               onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                  admissionId={admissionId}
                setIsSubmitting={setIsSubmitting} // Add this
                setErrors={setErrors} // Add this
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
    <div className="min-h-screen bg-gray-50 py-10">
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