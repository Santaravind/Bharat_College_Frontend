import React from 'react';
import Select from 'react-select';

const EducationDetails = ({ formData, errors, onChange }) => {
  const courseOptions = [
  { value: "DIPLOMA IN FIRE & SAFETY METHODS", label: "DIPLOMA IN FIRE & SAFETY METHODS" },
  { value: "DIPLOMA IN FOOD SAFETY", label: "DIPLOMA IN FOOD SAFETY" },
  { value: "DIPLOMA IN INDUSTRIAL SAFETY", label: "DIPLOMA IN INDUSTRIAL SAFETY" },
  { value: "FIRE TECHNICIAN", label: "FIRE TECHNICIAN" },
  { value: "DIPLOMA IN ELECTRICAL SAFETY", label: "DIPLOMA IN ELECTRICAL SAFETY" },
  { value: "DIPLOMA IN OFF SHORE SAFETY", label: "DIPLOMA IN OFF SHORE SAFETY" },
  { value: "DIPLOMA IN FIRE FIGHTING", label: "DIPLOMA IN FIRE FIGHTING" },
  { value: "DIPLOMA IN CONSTRUCTION SAFETY", label: "DIPLOMA IN CONSTRUCTION SAFETY" },
  { value: "DIPLOMA IN ENVIRONMENTAL SAFETY", label: "DIPLOMA IN ENVIRONMENTAL SAFETY" },
  { value: "DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES", label: "DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES" },
  { value: "CERTIFICATE IN FIRE & SAFETY ENGINEERING TECHNIQUES", label: "CERTIFICATE IN FIRE & SAFETY ENGINEERING TECHNIQUES" },
  { value: "POST DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES", label: "POST DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES" },
  { value: "DIPLOMA IN FIRE ENGINEERING & SAFETY MANAGEMENT", label: "DIPLOMA IN FIRE ENGINEERING & SAFETY MANAGEMENT" },
  { value: "ADVANCED DIP IN OCCUPATIONAL SAFETY, HEALTH & ENVIRONMENTAL MGMT", label: "ADVANCED DIP IN OCCUPATIONAL SAFETY, HEALTH & ENVIRONMENTAL MGMT" },
  { value: "POST DIPLOMA IN ENVIRONMENT SAFETY ENGINEERING", label: "POST DIPLOMA IN ENVIRONMENT SAFETY ENGINEERING" },
  { value: "FIRE MAN TECHNICIAN", label: "FIRE MAN TECHNICIAN" },
  { value: "DIPLOMA IN HEALTH, ENVIRONMENT & SAFETY ENGINEERING", label: "DIPLOMA IN HEALTH, ENVIRONMENT & SAFETY ENGINEERING" },
  { value: "DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES (2 YEARS)", label: "DIPLOMA IN FIRE & SAFETY ENGINEERING TECHNIQUES (2 YEARS)" },
  { value: "DIPLOMA IN CONSTRUCTION SAFETY MANAGEMENT", label: "DIPLOMA IN CONSTRUCTION SAFETY MANAGEMENT" },
  { value: "DIPLOMA IN HEALTH, SAFETY & ENVIRONMENT MANAGEMENT", label: "DIPLOMA IN HEALTH, SAFETY & ENVIRONMENT MANAGEMENT" },
  { value: "DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT (6 MONTHS)", label: "DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT (6 MONTHS)" },
  { value: "ADVANCED DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT", label: "ADVANCED DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT" },
  { value: "DIPLOMA IN FIRE & CONSTRUCTION SAFETY MANAGEMENT (6 MONTHS)", label: "DIPLOMA IN FIRE & CONSTRUCTION SAFETY MANAGEMENT (6 MONTHS)" },
  { value: "DIPLOMA IN INDUSTRIAL SAFETY ENGINEERING", label: "DIPLOMA IN INDUSTRIAL SAFETY ENGINEERING" },
  { value: "DIPLOMA IN INDUSTRIAL SAFETY & DISASTER MANAGEMENT", label: "DIPLOMA IN INDUSTRIAL SAFETY & DISASTER MANAGEMENT" },
  { value: "DIPLOMA IN FIRE AND CONSTRUCTION SAFETY MANAGEMENT", label: "DIPLOMA IN FIRE AND CONSTRUCTION SAFETY MANAGEMENT" },
  { value: "DIPLOMA IN INDUSTRIAL SAFETY", label: "DIPLOMA IN INDUSTRIAL SAFETY" },
  { value: "SUB FIRE STATION OFFICER", label: "SUB FIRE STATION OFFICER" },
  { value: "DIPLOMA IN OCCUPATIONAL SAFETY & HEALTH", label: "DIPLOMA IN OCCUPATIONAL SAFETY & HEALTH" },
  { value: "CERTIFICATE IN OCCUPATIONAL SAFETY & HEALTH", label: "CERTIFICATE IN OCCUPATIONAL SAFETY & HEALTH" },
  { value: "ADVANCED DIPLOMA IN CHEMICAL PLANT PROCESSING SAFETY & MANAGEMENT", label: "ADVANCED DIPLOMA IN CHEMICAL PLANT PROCESSING SAFETY & MANAGEMENT" },
  { value: "POST DIPLOMA IN PETRO CHEMICAL PROCESS SAFETY & ENGINEERING", label: "POST DIPLOMA IN PETRO CHEMICAL PROCESS SAFETY & ENGINEERING" },
  { value: "ADVANCED DIPLOMA IN INDUSTRIAL SAFETY", label: "ADVANCED DIPLOMA IN INDUSTRIAL SAFETY" },
  { value: "DIPLOMA IN INDUSTRIAL ENVIRONMENTAL SAFETY", label: "DIPLOMA IN INDUSTRIAL ENVIRONMENTAL SAFETY" },
  { value: "POST DIPLOMA IN HAZARD ANALYSIS CRITICAL CONTROL POINT", label: "POST DIPLOMA IN HAZARD ANALYSIS CRITICAL CONTROL POINT" },
  { value: "POST DIPLOMA IN POWER PLANT ENGINEERING, SAFETY & TECHNOLOGY", label: "POST DIPLOMA IN POWER PLANT ENGINEERING, SAFETY & TECHNOLOGY" },
  { value: "ADVANCED DIPLOMA IN OCCUPATIONAL HEALTH, SAFETY, ENVIRONMENT & RISK MGMT", label: "ADVANCED DIPLOMA IN OCCUPATIONAL HEALTH, SAFETY, ENVIRONMENT & RISK MGMT" },
  { value: "CERTIFICATE COURSE IN FIRE ENGINEERING", label: "CERTIFICATE COURSE IN FIRE ENGINEERING" },
  { value: "ADVANCED DIPLOMA IN OFFSHORE, RIG, OIL AND GAS SAFETY ENGINEERING", label: "ADVANCED DIPLOMA IN OFFSHORE, RIG, OIL AND GAS SAFETY ENGINEERING" },
  { value: "ADVANCED DIPLOMA IN OIL AND GAS SAFETY ENGINEERING", label: "ADVANCED DIPLOMA IN OIL AND GAS SAFETY ENGINEERING" },
  { value: "POST DIPLOMA IN TRANSPORT OF HAZARDOUS AND DANGEROUS GOODS BY ROAD", label: "POST DIPLOMA IN TRANSPORT OF HAZARDOUS AND DANGEROUS GOODS BY ROAD" },
  { value: "POST DIPLOMA IN FIRE, INDUSTRIAL & ENVIRONMENT HEALTH SAFETY MGMT", label: "POST DIPLOMA IN FIRE, INDUSTRIAL & ENVIRONMENT HEALTH SAFETY MGMT" },
  { value: "ADVANCED DIPLOMA IN FIRE ENGINEERING & INDUSTRIAL SAFETY MANAGEMENT", label: "ADVANCED DIPLOMA IN FIRE ENGINEERING & INDUSTRIAL SAFETY MANAGEMENT" },
  { value: "ADVANCED DIPLOMA IN CERTIFIED HEALTH SAFETY & ENVIRONMENT ENGINEER", label: "ADVANCED DIPLOMA IN CERTIFIED HEALTH SAFETY & ENVIRONMENT ENGINEER" },
  { value: "DIPLOMA IN OIL & GAS SAFETY MANAGEMENT", label: "DIPLOMA IN OIL & GAS SAFETY MANAGEMENT" },
  { value: "POST DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT", label: "POST DIPLOMA IN FIRE & INDUSTRIAL SAFETY MANAGEMENT" },
  { value: "DIPLOMA IN FIRE & SAFETY", label: "DIPLOMA IN FIRE & SAFETY" },
  { value: "POST DIPLOMA IN HEALTH SAFETY ENVIRONMENT & MANAGEMENT", label: "POST DIPLOMA IN HEALTH SAFETY ENVIRONMENT & MANAGEMENT" },
  { value: "POST DIPLOMA IN COMPUTER HARDWARE MAINTENANCE", label: "POST DIPLOMA IN COMPUTER HARDWARE MAINTENANCE" },
  { value: "POST DIPLOMA IN COMPUTER APPLICATIONS", label: "POST DIPLOMA IN COMPUTER APPLICATIONS" },
  { value: "POST DIPLOMA IN SOFTWARE APPLICATIONS", label: "POST DIPLOMA IN SOFTWARE APPLICATIONS" },
  { value: "DIPLOMA IN COMPUTER APPLICATIONS", label: "DIPLOMA IN COMPUTER APPLICATIONS" },
  { value: "DIPLOMA IN COMPUTER HARDWARE MAINTENANCE AND NETWORK ENGINEERING", label: "DIPLOMA IN COMPUTER HARDWARE MAINTENANCE AND NETWORK ENGINEERING" },
  { value: "DIPLOMA IN COMPUTER SCIENCE", label: "DIPLOMA IN COMPUTER SCIENCE" },
  { value: "DIPLOMA IN MULTIMEDIA", label: "DIPLOMA IN MULTIMEDIA" },
  { value: "DIPLOMA IN WEB DESIGNING", label: "DIPLOMA IN WEB DESIGNING" },
  { value: "CERTIFICATE IN MOBILE PHONE TECHNOLOGY", label: "CERTIFICATE IN MOBILE PHONE TECHNOLOGY" },
  { value: "MULTIMEDIA ANIMATION", label: "MULTIMEDIA ANIMATION" },
  { value: "DIPLOMA IN DATA ENTRY OPERATOR", label: "DIPLOMA IN DATA ENTRY OPERATOR" },
  { value: "DIPLOMA IN COMPUTER HARDWARE AND NETWORKING", label: "DIPLOMA IN COMPUTER HARDWARE AND NETWORKING" },
  { value: "CERTIFICATE IN ORACLE", label: "CERTIFICATE IN ORACLE" },
  { value: "CERTIFICATE IN VISUAL C++", label: "CERTIFICATE IN VISUAL C++" },
  { value: "CERTIFICATE IN ASP.NET", label: "CERTIFICATE IN ASP.NET" },
  { value: "CERTIFICATE IN C#.NET", label: "CERTIFICATE IN C#.NET" },
  { value: "CERTIFICATE IN VB.NET", label: "CERTIFICATE IN VB.NET" },
  { value: "DIPLOMA IN CAD/CAM PROGRAMMING", label: "DIPLOMA IN CAD/CAM PROGRAMMING" },
  { value: "DIPLOMA IN GLOBAL HARDWARE AND NETWORKING", label: "DIPLOMA IN GLOBAL HARDWARE AND NETWORKING" },
  { value: "CERTIFICATE IN INFORMATION TECHNOLOGY", label: "CERTIFICATE IN INFORMATION TECHNOLOGY" },
  { value: "PREPARATORY COURSE IN CEO", label: "PREPARATORY COURSE IN CEO" },
  { value: "CERTIFICATE IN AUTO CAD", label: "CERTIFICATE IN AUTO CAD" },
  { value: "PREPARATORY COURSE IN DTP", label: "PREPARATORY COURSE IN DTP" },
  { value: "JAVA PROGRAMMING", label: "JAVA PROGRAMMING" },
  { value: "DIPLOMA IN ELECTRONIC OFFICE", label: "DIPLOMA IN ELECTRONIC OFFICE" },
  { value: "DIPLOMA IN DESKTOP PUBLISHING", label: "DIPLOMA IN DESKTOP PUBLISHING" },
  { value: "CERTIFICATE IN C++", label: "CERTIFICATE IN C++" },
  { value: "CERTIFICATE IN CLERICAL JOBS IN COMPUTERISED OFFICE", label: "CERTIFICATE IN CLERICAL JOBS IN COMPUTERISED OFFICE" },
  { value: "CERTIFICATE IN OPERATIONS OF COMPUTER IN RETAIL SHOPS", label: "CERTIFICATE IN OPERATIONS OF COMPUTER IN RETAIL SHOPS" },
  { value: "CERTIFICATE IN DATA ENTRY AND CONSOLE OPERATION", label: "CERTIFICATE IN DATA ENTRY AND CONSOLE OPERATION" },
  { value: "CERTIFICATE IN COMPUTER HARDWARE MAINTENANCE", label: "CERTIFICATE IN COMPUTER HARDWARE MAINTENANCE" },
  { value: "C PROGRAMMING", label: "C PROGRAMMING" },
  { value: "VISUAL BASIC", label: "VISUAL BASIC" },
  { value: "MS-OFFICE", label: "MS-OFFICE" },
  { value: "OPEN OFFICE", label: "OPEN OFFICE" },
  { value: "ADOBE PHOTOSHOP", label: "ADOBE PHOTOSHOP" },
  { value: "FINANCIAL MANAGEMENT SOFTWARE", label: "FINANCIAL MANAGEMENT SOFTWARE" },
  { value: "ADOBE PAGE MAKER", label: "ADOBE PAGE MAKER" },
  { value: "COREL DRAW", label: "COREL DRAW" },
  { value: "EXCEL", label: "EXCEL" },
  { value: "WINDOWS/LINUX", label: "WINDOWS/LINUX" },
  { value: "COBOL PROGRAMMING", label: "COBOL PROGRAMMING" },
  { value: "INTERNET APPLICATIONS", label: "INTERNET APPLICATIONS" },
  { value: "DIPLOMA IN COMPUTER FACULTY TRAINING", label: "DIPLOMA IN COMPUTER FACULTY TRAINING" },
  { value: "DIPLOMA IN COMPUTER TC", label: "DIPLOMA IN COMPUTER TC" },
  { value: "ADVANCED DIPLOMA IN COMPUTER APPLICATION", label: "ADVANCED DIPLOMA IN COMPUTER APPLICATION" },
  { value: "ADVANCED DIPLOMA IN INFORMATION TECHNOLOGY", label: "ADVANCED DIPLOMA IN INFORMATION TECHNOLOGY" },
  { value: "HONORS DIPLOMA IN MULTIMEDIA PROGRAMMING", label: "HONORS DIPLOMA IN MULTIMEDIA PROGRAMMING" },
  { value: "ADVANCED DIPLOMA IN MULTIMEDIA PROGRAMMING", label: "ADVANCED DIPLOMA IN MULTIMEDIA PROGRAMMING" },
  { value: "HONORS DIPLOMA IN COMPUTER APPLICATION", label: "HONORS DIPLOMA IN COMPUTER APPLICATION" },
  { value: "DIPLOMA IN LAPTOP HARDWARE & WIFI TECHNOLOGY", label: "DIPLOMA IN LAPTOP HARDWARE & WIFI TECHNOLOGY" },
  { value: "TALLY ERP 9", label: "TALLY ERP 9" },
  { value: "HONORS DIPLOMA IN COMPUTER HARDWARE & NETWORKING", label: "HONORS DIPLOMA IN COMPUTER HARDWARE & NETWORKING" },
  { value: "DIPLOMA IN COMPUTER HARDWARE MAINTENANCE", label: "DIPLOMA IN COMPUTER HARDWARE MAINTENANCE" },
  { value: "DOA (MS-OFFICE ONLY)", label: "DOA (MS-OFFICE ONLY)" },
  { value: "DIPLOMA IN GRAPHICS", label: "DIPLOMA IN GRAPHICS" },
  { value: "DIPLOMA IN 3D ANIMATION", label: "DIPLOMA IN 3D ANIMATION" },
  { value: "DIPLOMA IN J2EE", label: "DIPLOMA IN J2EE" },
  { value: "DIPLOMA IN .NET", label: "DIPLOMA IN .NET" },
  { value: "DIPLOMA IN A+", label: "DIPLOMA IN A+" },
  { value: "DIPLOMA IN N+", label: "DIPLOMA IN N+" }
];


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

{/* program that you want to admmission */}
        {/* <div>
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
        </div> */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Course/Program Name *
  </label>

  <Select
    options={courseOptions}
    name="courseProgram"
    value={courseOptions.find(option => option.value === formData.courseProgram)}
    onChange={(selectedOption) => 
      onChange({
        target: {
          name: "courseProgram",
          value: selectedOption ? selectedOption.value : "",
        },
      })
    }
    placeholder="Select or search a course/program..."
    className="w-full text-sm"
    classNamePrefix="react-select"
    isSearchable
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

export default EducationDetails;