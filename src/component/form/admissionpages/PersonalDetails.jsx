import React from 'react';

const PersonalDetails = ({ formData, errors, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title and Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title 
          </label>
          <select
            name="title"
            value={formData.title}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="As per 10th certificate"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="As per 10th certificate"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father's Name *
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fatherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="As per 10th certificate"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Name *
          </label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.motherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="As per 10th certificate"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="text"
            name="age"
            value={formData.age}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cast Category *
          </label>
          <select
            name="castCategory"
            value={formData.castCategory}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.castCategory ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Category</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="General">General</option>
            <option value="EWS">EWS</option>
            <option value="Other">Other</option>
          </select>
          {errors.castCategory && (
            <p className="text-red-500 text-sm mt-1">{errors.castCategory}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Number *
          </label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={onChange}
            maxLength="12"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="12-digit Aadhar number"
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>
          )}
          <p className="text-sm text-rose-600 mt-1">
            Must match with your Aadhar card. Any mismatch will lead to admission cancellation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;