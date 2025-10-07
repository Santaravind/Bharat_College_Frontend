import React from 'react';

const EducationalDetails = ({ formData, errors, onChange }) => {
  const renderEducationField = (level, label, required = false) => (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">{label} {required && '*'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            College/School Name {required && '*'}
          </label>
          <input
            type="text"
            name={`${level}.collegeName`}
            value={formData[level].collegeName}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[level] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`${label} institution name`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Passing {required && '*'}
          </label>
          <input
            type="number"
            name={`${level}.yearOfPassing`}
            value={formData[level].yearOfPassing}
            onChange={onChange}
            min="1950"
            max="2030"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[level] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="YYYY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Percentage (%) {required && '*'}
          </label>
          <input
            type="number"
            name={`${level}.percentage`}
            value={formData[level].percentage}
            onChange={onChange}
            step="0.01"
            min="0"
            max="100"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[level] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Percentage"
          />
        </div>
      </div>
      {errors[level] && (
        <p className="text-red-500 text-sm mt-2">{errors[level]}</p>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Educational Details</h2>
      
      <div className="space-y-6">
        {renderEducationField('tenth', '10th Class', true)}
        {renderEducationField('twelfth', '12th Class')}
        {renderEducationField('diploma', 'Diploma (if applicable)')}
        {renderEducationField('graduation', 'Graduation')}
        {renderEducationField('postGraduation', 'Post Graduation')}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course/Program Name *
          </label>
          <input
            type="text"
            name="courseProgram"
            value={formData.courseProgram}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.courseProgram ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter desired course/program that you want to enter "
          />
          {errors.courseProgram && (
            <p className="text-red-500 text-sm mt-1">{errors.courseProgram}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filling Date
          </label>
          <input
            type="date"
            name="fillingDate"
            value={formData.fillingDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default EducationalDetails;