import React from 'react';

const ContactDetails = ({ formData, errors, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10-digit mobile number"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            rows="3"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Current address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Village/Post *
          </label>
          <input
            type="text"
            name="villagePost"
            value={formData.villagePost}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.villagePost ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.villagePost && (
            <p className="text-red-500 text-sm mt-1">{errors.villagePost}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District *
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.district ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">{errors.district}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pinCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.pinCode && (
            <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="sameAsAddress"
              checked={formData.sameAsAddress}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Permanent address is same as current address
            </label>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permanent Address *
          </label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={onChange}
            rows="3"
            disabled={formData.sameAsAddress}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.permanentAddress ? 'border-red-500' : 'border-gray-300'
            } ${formData.sameAsAddress ? 'bg-gray-100' : ''}`}
            placeholder="Permanent address"
          />
          {errors.permanentAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.permanentAddress}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;