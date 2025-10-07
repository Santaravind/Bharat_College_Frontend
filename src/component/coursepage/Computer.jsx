import React, { useState } from 'react'
import { BookOpen, Shield, Flame, Hammer, ComputerIcon } from "lucide-react"; // example icons
import { useNavigate } from 'react-router-dom';

    const courses = [
  { id: 1, name: "Post Diploma in Computer Hardware Maintenance", duration: "1 Year" },
  { id: 2, name: "Post Diploma in Computer Applications", duration: "1 Year" },
  { id: 3, name: "Post Diploma in Software Applications", duration: "1 Year" },
  { id: 4, name: "Diploma in Computer Applications", duration: "6 Months" },
  { id: 5, name: "Diploma in Computer Hardware Maintenance and Network Engineering", duration: "1 Year" },
  { id: 6, name: "Diploma in Computer Science", duration: "6 Months" },
  { id: 7, name: "Diploma in Multimedia", duration: "3 Months" },
  { id: 8, name: "Diploma in Web Designing", duration: "6 Months" },
  { id: 9, name: "Certificate in Mobile Phone Technology", duration: "3 Months" },
  { id: 10, name: "Multimedia Animation", duration: "3 Months" },
  { id: 11, name: "Diploma in Data Entry Operator", duration: "3 Months" },
  { id: 12, name: "Diploma in Computer Hardware and Networking", duration: "6 Months" },
  { id: 13, name: "Certificate in Oracle", duration: "2 Months" },
  { id: 14, name: "Certificate in Visual C++", duration: "2 Months" },
  { id: 15, name: "Certificate in ASP.NET", duration: "4 Months" },
  { id: 16, name: "Certificate in C#.NET", duration: "4 Months" },
  { id: 17, name: "Certificate in VB.NET", duration: "4 Months" },
  { id: 18, name: "Diploma in CAD/CAM Programming", duration: "1 Year" },
  { id: 19, name: "Diploma in Global Hardware and Networking", duration: "1 Year" },
  { id: 20, name: "Certificate in Information Technology", duration: "3 Months" },
  { id: 21, name: "Preparatory Course in CEO", duration: "4 Months" },
  { id: 22, name: "Certificate in Auto CAD", duration: "2 Months" },
  { id: 23, name: "Preparatory Course in DTP", duration: "4 Months" },
  { id: 24, name: "Java Programming", duration: "2 Months" },
  { id: 25, name: "Diploma in Electronic Office", duration: "6 Months" },
  { id: 26, name: "Diploma in Desktop Publishing", duration: "6 Months" },
  { id: 27, name: "Certificate in C++", duration: "2 Months" },
  { id: 28, name: "Certificate in Clerical Jobs in Computerised Office", duration: "3 Months" },
  { id: 29, name: "Certificate in Operations of Computer in Retail Shops", duration: "3 Months" },
  { id: 30, name: "Certificate in Data Entry and Console Operation", duration: "2 Months" },
  { id: 31, name: "Certificate in Computer Hardware Maintenance", duration: "3 Months" },
  { id: 32, name: "C Programming", duration: "2 Months" },
  { id: 33, name: "Visual Basic", duration: "2 Months" },
  { id: 34, name: "MS-Office", duration: "1 Month" },
  { id: 35, name: "Open Office", duration: "1 Month" },
  { id: 36, name: "Adobe Photoshop", duration: "1 Month" },
  { id: 37, name: "Financial Management Software", duration: "1 Month" },
  { id: 38, name: "Adobe Page Maker", duration: "1 Month" },
  { id: 39, name: "Corel Draw", duration: "3 Months" },
  { id: 40, name: "Excel", duration: "1 Month" },
  { id: 41, name: "Windows/Linux", duration: "1 Month" },
  { id: 42, name: "COBOL Programming", duration: "1 Month" },
  { id: 43, name: "Internet Applications", duration: "1 Month" },
  { id: 44, name: "Diploma in Computer Faculty Training", duration: "1 Year" },
  { id: 45, name: "Diploma in Computer TC", duration: "10 Months" },
  { id: 46, name: "Advanced Diploma in Computer Application", duration: "1 Year" },
  { id: 47, name: "Advanced Diploma in Information Technology", duration: "1 Year" },
  { id: 48, name: "Honors Diploma in Multimedia Programming", duration: "1 Year" },
  { id: 49, name: "Advanced Diploma in Multimedia Programming", duration: "6 Months" },
  { id: 50, name: "Honors Diploma in Computer Application", duration: "6 Months" },
  { id: 51, name: "Diploma in Laptop Hardware & Wifi Technology", duration: "6 Months" },
  { id: 52, name: "Tally ERP 9", duration: "3 Months" },
  { id: 53, name: "Honors Diploma in Computer Hardware & Networking", duration: "6 Months" },
  { id: 54, name: "Diploma in Computer Hardware Maintenance", duration: "3 Months" },
  { id: 55, name: "DOA (MS-Office Only)", duration: "2 Months" },
  { id: 56, name: "Diploma in Graphics", duration: "3 Months" },
  { id: 57, name: "Diploma in 3D Animation", duration: "6 Months" },
  { id: 58, name: "Diploma in J2EE", duration: "3 Months" },
  { id: 59, name: "Diploma in .NET", duration: "3 Months" },
  { id: 60, name: "Diploma in A+", duration: "3 Months" },
  { id: 61, name: "Diploma in N+", duration: "3 Months" },
  { id: 62, name: "Diploma in AutoCAD", duration: "3 Months" },
  { id: 63, name: "Diploma in SAP", duration: "3 Months" },
  { id: 64, name: "Diploma in Software Testing", duration: "6 Months" },
  { id: 65, name: "Advanced Diploma in Embedded System", duration: "3 Months" },
  { id: 66, name: "Diploma in Chip Level System", duration: "3 Months" },
  { id: 67, name: "Diploma in Computer Technology", duration: "1 Year" },
  { id: 68, name: "Diploma in Information Technology", duration: "1 Year" },
  { id: 69, name: "Diploma in Computer Technology", duration: "2 Years" },
  { id: 70, name: "Diploma in Information Technology", duration: "2 Years" },
  { id: 71, name: "Certificate in Computer Python Programming", duration: "3 Months" },
  { id: 72, name: "Advanced Diploma in Animation", duration: "1 Year" },
  { id: 73, name: "Diploma in Digital Marketing", duration: "4 Months" },
  { id: 74, name: "Advanced Diploma in Animation Design and Technology", duration: "1 Year" },
  { id: 75, name: "Diploma in Visual Design & Communication", duration: "1 Year" },
  { id: 76, name: "Diploma in Game Design", duration: "1 Year" },
  { id: 77, name: "Advanced Diploma in Data Science", duration: "1 Year" },
  { id: 78, name: "Advanced Diploma in 3D Printing Technology", duration: "1 Year" },
  { id: 79, name: "Certificate Course in 3D Printing Technology", duration: "6 Months" },
  { id: 80, name: "Diploma in User Interface and User Experience (UI/UX)", duration: "1 Year" },
  { id: 81, name: "Diploma in Visual Effects", duration: "1 Year" },
  { id: 82, name: "Diploma in Graphic Web Designing & Development", duration: "1 Year" },
];
function Computer() {
const navigate=useNavigate();
  const icons = [<BookOpen />, <Shield />, <Flame />, <Hammer />,<ComputerIcon/>];
   const [showAll, setShowAll] = useState(false);  
  // Limit to 10 courses initially
  const displayedCourses = showAll ? courses : courses.slice(0, 8);
  const handalAdmission=(e)=>{
    e.preventDefault();
     navigate("/admission");
     window.scroll(top);
  }

  return (
    <>
       <div className="bg-gray-50 py-9 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 p-3 rounded-full text-black shadow-[5px_5px_5px_5px_rgba(109,40,217)] bg-indigo-400">
        COMPUTER COURSES
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayedCourses.map((course, index) => (
            <div
              key={course.id}
              onClick={handalAdmission}
              className="flex flex-col items-center cursor-pointer justify-center border border-gray-300 rounded-xl bg-white p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[inset_1px_15px_13px_0px_#48bb78] transition"
            >
              {/* Icon */}
              <div className="text-yellow-500 mb-3 text-4xl">
                {icons[index % icons.length]}
              </div>

              {/* Course Name */}
              <h3 className="text-lg font-bold text-gray-900 text-center">
                {course.name}
              </h3>

              {/* Duration */}
              <p className="text-sm text-gray-600 mt-2">
                Duration: {course.duration}
              </p>
            </div>
          ))}
        </div>

    </div>

    {/* Read More / Show Less Button */}
        <div className="flex justify-center mt-1">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            {showAll ? "Show Less" : "Read More"}
          </button>
        </div>
    </>
  )
}

export default Computer
