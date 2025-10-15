// services/cloudinaryService.js
export const cloudinaryService = {
  uploadPhoto: async (file) => {
    const cloudName = 'du9hkv91l'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'BharatCollageAdmissionPhotos'; // Replace with your upload preset

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('cloud_name',cloudName );

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Photo upload failed');
    }
  },
};