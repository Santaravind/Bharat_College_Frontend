
// const BASE_URL =
//   "https://script.google.com/macros/s/AKfycbyxiVThFqVZSb0oogFHPLG4U8AlbVHgm1b9aPCDAPVRdHGRG2Dv0ZxUUPG1-lcmDnkTnQ/exec";

const BASE_URL ="https://script.google.com/macros/s/AKfycbyxoeaGUHY8ryIh-t_uUUCOi5Bqy1-aSNhXBXAiaalbQ9pY9itOtzjWNdtJqSESg799LQ/exec"

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

  

// Get result by enrollment - FIXED VERSION
  // getResultByEnrollment: async (enrollmentNo) => {
  //   try {
  //     // Use fetch instead of JSONP (simpler and more reliable)
  //     const response = await fetch(`${BASE_URL}?action=getResultByEnrollment&enrollmentNo=${encodeURIComponent(enrollmentNo)}`, {
  //       method: "GET",
  //       mode: "no-cors",
 
  //       headers: {
  //         "Accept": "application/json"
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     if (!result.success) {
  //       throw new Error(result.message || "Failed to fetch enrollment result");
  //     }

  //     console.log('📊 Result data fetched:', result);
  //     return result;

  //   } catch (error) {
  //     console.error("❌ Enrollment fetch failed:", error);
  //     throw error;
  //   }
  // },

  // // Get result by serial - FIXED VERSION
  // getResultBySerial: async (serialNo) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(serialNo)}`, {
  //       method: "GET",
  //       mode: "no-cors",
 
  //       headers: {
  //         "Accept": "application/json"
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     if (!result.success) {
  //       throw new Error(result.message || "Failed to fetch serial result");
  //     }
      
  //     console.log('📊 Result data fetched:', result);
  //     return result;
  //   } catch (error) {
  //     console.error("❌ Serial fetch failed:", error);
  //     throw error;
  //   }
  // },
  getResultByEnrollment: (enrollmentNo) => {
    return new Promise((resolve, reject) => {
      // Generate unique callback name
      const callbackName = 'callback_' + Date.now() + '_' + Math.random().toString(36).substr(2);
      
      // Create the URL with callback parameter
      const url = `${BASE_URL}?action=getResultByEnrollment&enrollmentNo=${encodeURIComponent(enrollmentNo)}&callback=${callbackName}`;
      
      // console.log("📡 Request URL:", url);
      
      // Create script element
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      
      // Set timeout for request
      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error('Request timeout'));
      }, 15000); // 15 second timeout
      
      // Define cleanup function
      const cleanup = () => {
        clearTimeout(timeoutId);
        delete window[callbackName];
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
      
      // Define the callback function
      window[callbackName] = (response) => {
        cleanup();
        
        if (response && response.success) {
          // console.log('✅ Success response:', response);
          resolve(response);
        } else {
          const errorMsg = response ? response.message : 'Unknown error';
          reject(new Error(errorMsg || 'Failed to fetch enrollment result'));
        }
      };
      
      // Handle script load error
      script.onerror = (error) => {
        cleanup();
        console.error('❌ Script load error:', error);
        reject(new Error('Network error - failed to load script'));
      };
      
      // Add script to document
      document.body.appendChild(script);
    });
  },

  // Similar for serial number
  getResultBySerial: (serialNo) => {
    return new Promise((resolve, reject) => {
      const callbackName = 'callback_' + Date.now() + '_' + Math.random().toString(36).substr(2);
      const url = `${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(serialNo)}&callback=${callbackName}`;
      
      // console.log("📡 Request URL:", url);
      
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      
      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error('Request timeout'));
      }, 15000);
      
      const cleanup = () => {
        clearTimeout(timeoutId);
        delete window[callbackName];
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
      
      window[callbackName] = (response) => {
        cleanup();
        
        if (response && response.success) {
          // console.log('✅ Success response:', response);
          resolve(response);
        } else {
          const errorMsg = response ? response.message : 'Unknown error';
          reject(new Error(errorMsg || 'Failed to fetch serial result'));
        }
      };
      
      script.onerror = (error) => {
        cleanup();
        console.error('❌ Script load error:', error);
        reject(new Error('Network error - failed to load script'));
      };
      
      document.body.appendChild(script);
    });
  }

};