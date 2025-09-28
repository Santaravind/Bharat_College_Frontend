import React from 'react'
import { FaLaptopCode, FaFire } from "react-icons/fa";
import { FaBowlFood,FaComputer } from "react-icons/fa6";

import { DiHtml5Multimedia } from "react-icons/di";
import { MdOutlineConstruction } from "react-icons/md";
import { PiFireTruckDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function CourseHome() {
  const navigate=useNavigate();
  const handalCourse=(e)=>{
     
     e.preventDefault();

     navigate("/course")
      window.scroll(top);
  }
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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
    {/* Example Course Cards */}
          
          {/* Fist course 1 */}
            <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
    >
      {/* Icon */}
      <FaComputer className="text-4xl text-yellow-400 mb-2 " />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Post Diploma in Computer Hardware Maintenance</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 1 Year</p>
    </div>
      
       {/*  course 2 */}
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/* Icon */}
      <DiHtml5Multimedia className="text-5xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Diploma in Multimedia
       </h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 3 Months</p>
    </div>
     
      {/* course 3 */}
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/* Icon */}
     <FaBowlFood className="text-5xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Diploma in Food Safety</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 1 Year</p>
    </div>
       {/* course 4 */}
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4  shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/*  Icon */}
     <FaFire  className="text-5xl text-yellow-400 mb-3" />
      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Fire Technician</h3>
      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 6 Months</p> 
        
    </div>

     {/* course 5 */}
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/* Icon */}
      <FaLaptopCode className="text-5xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Diploma in Computer </h3>
      <h3 className='text-lg font-bold text-black'>Science</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 6 Months</p>
    </div>
          
           {/* course 6 */}
           <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/* Icon */}
      <MdOutlineConstruction className="text-5xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Diploma in Construction </h3>
      <h3 className='text-lg font-bold text-black'>Safety</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 1 Year</p>
    </div>
           {/* course 7 */}
           <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[-4px_8px_16px_14px_#fc8181]"
      
    >
      {/* Icon */}
      <PiFireTruckDuotone className="text-5xl text-yellow-400 mb-3" />

      {/* Course Name */}
      <h3 className="text-lg font-bold text-black">Diploma in Fire Fighting</h3>

      {/* Duration */}
      <p className="text-sm  mt-1 text-black">Duration: 1 Year</p>
    </div>
    
      {/* course more click */}
      <div
      className="flex flex-col items-center justify-center border border-gray-400 rounded-xl text-white p-4 shadow-[inset_11px_20px_20px_10px_#f6e05e]"
      
    >
      {/*  Icon */}
      {/* <FaLaptopCode className="text-5xl text-yellow-400 mb-3" /> */}
      {/* Course Name */}
      {/* <h3 className="text-lg font-bold text-black">Fire Technician</h3> */}
      {/* Duration */}
      {/* <p className="text-sm  mt-1 text-black">Duration: 6 Months</p>  */}
        <h1  className="text-lg font-bold text-black">More Courses</h1>
      <h2  className="text-lg font-bold text-black">  </h2>
      <button className="text-lg  mt-1 text-yellow-300 font-bold  border-2 border-red-600 rounded-full p-2 m-1  bg-red-600 hover:bg-blue-600 hover:border-black cursor-pointer " 
       onClick={handalCourse}
      >
        <span className='blink-text' > Click here </span> </button>
    </div>
         
        </div>
 {/* <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-400 rounded-xl bg-white  p-6 mr-0.5">
 
        <AdmissionForm/>
        </div> */}
      </div>
    

    </>
  )
}

export default CourseHome
