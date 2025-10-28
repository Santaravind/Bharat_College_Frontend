
const BASE_URL =
  "https://script.google.com/macros/s/AKfycbwye0sNyqRo74x4HebWhjIOZi4Nny6lL_ZhzcydHU2e66z0wRaMIq-66y6Zox3EzTBdnQ/exec";

export const googleserv = {
  // Save new result data
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
      const response = await fetch(`${BASE_URL}?action=getAllResults`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch results");
      }

      return result;
    } catch (error) {
      throw new Error("Failed to fetch results: " + error.message);
    }
  },

  // Get result by serial number
  getResultBySerial: async (serialNo) => {
    try {
      const response = await fetch(
        `${BASE_URL}?action=getResultBySerial&serialNo=${encodeURIComponent(
          serialNo
        )}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch result data");
      }

      return result;
    } catch (error) {
      throw new Error("Failed to fetch result: " + error.message);
    }
  },
};
