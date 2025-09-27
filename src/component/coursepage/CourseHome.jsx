import React from 'react'
import { FaLaptopCode } from "react-icons/fa";
import Admission from '../Admission';
import AdmissionForm from '../form/Admissionform';


function CourseHome() {
  return (
    <>


 <div className="w-full bg-[oklch(97.7%_0.014_308.299)] flex items-center justify-center p-4">
  <h1 className="font-bold text-black text-3xl text-center">
    Course
  </h1>
</div>

{/* Main Content */}
<div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto p-4">
  {/* Left Grid (Courses) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
    {/* Example Course Cards */}
          
            <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
      
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
           <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-lg"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-4xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">C Programming</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 2 Months</p>
    </div>
         
        </div>
 <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto border border-gray-400 rounded-xl bg-white shadow-lg p-6">
 
        <AdmissionForm/>
        </div>
      </div>
    

    </>
  )
}

export default CourseHome
