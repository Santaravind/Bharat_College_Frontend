import React from 'react'
import { googleSheetsService } from '../form/admissionpages/services/googleSheetsService';
function Verification() {
  const fetchAdmissionDataByAdmissionId = async (admissionId) => {
    try {
      setSearchLoading(true);
      setError(null);
  // Function to fetch admission data by admission ID
      console.log('Searching for admission ID:', admissionId);
  
      const response = await googleSheetsService.getAdmissionById(admissionId);
      
      if (response.success && response.data) {
        console.log('Admission data found by ID:', response.data);
        setDisplayData({
          admissionId: response.data['Admission ID'],
          studentData: transformBackendData(response.data)
        });
      } else {
        throw new Error('Admission ID not found');
      }
    } catch (error) {
      console.error('Error fetching admission data by ID:', error);
      setError(error.message || 'Admission ID not found or error loading data.');
      setDisplayData(null);
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };
  
  return (
    <div>
      it is okay .....
    </div>
  )
}

export default Verification
