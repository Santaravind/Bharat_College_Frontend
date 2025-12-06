
const BASE_URL =
  "https://script.google.com/macros/s/AKfycbwsbSCzuYxF4YjkQ7JAMDkthI82A1XmPR_Yovy5wuQ_WV8Jo2_lc4emp4t7vL-vkenDpQ/exec";

export const googleserv = {
  // Save new result data
  //this is working code 100%
  saveResultData: async (resultData) => {
    try {
      // Add action to the data
      const postData = {
        action: "saveResult",
        ...resultData,
      };
      const response = await fetch(BASE_URL, {
  method: "POST",
    mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postData),
});

      // Don’t parse JSON because it's opaque
      return {
        success: true,
        data: { message: "Request sent (no response read)" },
      };

      // Google Apps Script returns 200 even for errors, so we need to check the response content
      const result = await response.json();
      return result;

      if (!result.success) {
        throw new Error(result.message || "Failed to save result data");
      }

      return result;
    } catch (error) {
      throw new Error("Failed to save result: " + error.message);
    }
  },

  // Get all results
  getAllResults: async () => {
    try {
      const response = await fetch(`${BASE_URL}?action=getAllResults`,{
        method:"no cross"

      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch results");
      }

      return result;
    } catch (error) {
      throw new Error("Failed to fetch results: " + error.message);
    }
  },

  //this is not wroking 
  // Get result by serial number
  // getResultBySerial: async (serialNo) => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(
  //         serialNo,{
  //       method:"no cross"

  //     }
  //       )}`
  //     );
  //     const result = await response.json();

  //     if (!result.success) {
  //       throw new Error(result.message || "Failed to fetch result data");
  //     }

  //     return result;
  //   } catch (error) {
  //     throw new Error("Failed to fetch result: " + error.message);
  //   }
  // },

  //  // Get result by serial number
  // getResultBySerial: async (serialNo) => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(serialNo)}`,{
  //       method:"no cross"

  //     }
  //     );
  //     const result = await response.json();

  //     if (!result.success) {
  //       throw new Error(result.message || "Failed to fetch result data");
  //     }

  //     return result;
  //   } catch (error) {
  //     throw new Error("Failed to fetch result: " + error.message);
  //   }
  // },

  // ✅ NEW: Get result by enrollment number
  // getResultByEnrollment: async (enrollmentNo) => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}?action=getResultByEnrollment&enrollmentNo=${encodeURIComponent(enrollmentNo)}`
        
  //     );
  //     const result = await response.json();

  //     if (!result.success) {
  //       throw new Error(result.message || "Failed to fetch result data");
  //     }

  //     return result;
  //   } catch (error) {
  //     throw new Error("Failed to fetch result: " + error.message);
  //   }
  // },
// ✅ Use JSONP for GET requests to avoid CORS
getResultByEnrollment: async (enrollmentNo) => {
  try {
    // console.log(`📋 Fetching result data for enrollment: ${enrollmentNo}`);
    
    // Use JSONP approach for GET request
    const url = `${BASE_URL}?action=getResultByEnrollment&enrollmentNo=${encodeURIComponent(enrollmentNo)}&callback=handleResponse`;
    
    return new Promise((resolve, reject) => {
      // Create a temporary function to handle the response
      window.handleResponse = (response) => {
        delete window.handleResponse;
        document.head.removeChild(script);
        
        // console.log('📊 Result data fetched:', response);
        
        if (!response.success) {
          reject(new Error(response.message || 'Failed to fetch result data'));
          return;
        }
        
        if (!response.data) {
          reject(new Error('No result data found'));
          return;
        }
        
        resolve({
          success: true,
          data: response.data
        });
      };

      // Create and append script tag
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        delete window.handleResponse;
        document.head.removeChild(script);
        reject(new Error('Network error - failed to fetch data'));
      };
      
      document.head.appendChild(script);
    });

  } catch (error) {
    console.error('❌ Error fetching result data:', error);
    throw error;
  }
},

getResultBySerial: async (serialNo) => {
  try {
    // console.log(`📋 Fetching result data for serial: ${serialNo}`);
    
    // Use JSONP approach for GET request
    const url = `${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(serialNo)}&callback=handleResponse`;
    
    return new Promise((resolve, reject) => {
      // Create a temporary function to handle the response
      window.handleResponse = (response) => {
        delete window.handleResponse;
        document.head.removeChild(script);
        
        // console.log('📊 Result data fetched:', response);
        
        if (!response.success) {
          reject(new Error(response.message || 'Failed to fetch result data'));
          return;
        }
        
        if (!response.data) {
          reject(new Error('No result data found'));
          return;
        }
        
        resolve({
          success: true,
          data: response.data
        });
      };

      // Create and append script tag
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        delete window.handleResponse;
        document.head.removeChild(script);
        reject(new Error('Network error - failed to fetch data'));
      };
      
      document.head.appendChild(script);
    });

  } catch (error) {
    console.error('❌ Error fetching result data:', error);
    throw error;
  }
}
};
