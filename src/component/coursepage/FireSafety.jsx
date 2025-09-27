import { BookOpen, Shield, Flame, Hammer } from "lucide-react"; // example icons
import { useState } from "react";

const courses = [
  { id: 1, name: "Diploma in Fire & Safety Methods", duration: "1 Year" },
  { id: 2, name: "Diploma in Food Safety", duration: "1 Year" },
  { id: 3, name: "Diploma in Industrial Safety", duration: "1 Year" },
  { id: 4, name: "Fire Technician", duration: "6 Months" },
  { id: 5, name: "Diploma in Electrical Safety", duration: "1 Year" },
  { id: 6, name: "Diploma in Off Shore Safety", duration: "1 Year" },
  { id: 7, name: "Diploma in Fire Fighting", duration: "1 Year" },
  { id: 8, name: "Diploma in Construction Safety", duration: "1 Year" },
  { id: 9, name: "Diploma in Environmental Safety", duration: "1 Year" },
  { id: 10, name: "Diploma in Fire & Safety Engineering Techniques", duration: "1 Year" },
  { id: 11, name: "Certificate in Fire & Safety Engineering Techniques", duration: "6 Months" },
  { id: 12, name: "Post Diploma in Fire & Safety Engineering Techniques", duration: "1 Year" },
  { id: 13, name: "Diploma in Fire Engineering & Safety Management", duration: "1 Year" },
  { id: 14, name: "Advanced Dip in Occupational Safety, Health & Environmental Mgmt", duration: "1 Year" },
  { id: 15, name: "Post Diploma in Environment Safety Engineering", duration: "1 Year" },
  { id: 16, name: "Fire Man Technician", duration: "1 Year" },
  { id: 17, name: "Diploma in Health, Environment & Safety Engineering", duration: "1 Year" },
  { id: 18, name: "Diploma in Fire & Safety Engineering Techniques", duration: "2 Years" },
  { id: 19, name: "Diploma in Construction Safety Management", duration: "1 Year" },
  { id: 20, name: "Diploma in Health, Safety & Environment Management", duration: "1 Year" },
  { id: 21, name: "Diploma in Fire & Industrial Safety Management", duration: "6 Months" },
  { id: 22, name: "Advanced Diploma in Fire & Industrial Safety Management", duration: "1 Year" },
  { id: 23, name: "Diploma in Fire & Construction Safety Management", duration: "6 Months" },
  { id: 24, name: "Diploma in Industrial Safety Engineering", duration: "6 Months" },
  { id: 25, name: "Diploma in Industrial Safety & Disaster Management", duration: "6 Months" },
  { id: 26, name: "Diploma in Fire and Construction Safety Management", duration: "1 Year" },
  { id: 27, name: "Diploma in Fire & Industrial Safety Management", duration: "1 Year" },
  { id: 28, name: "Diploma in Industrial Safety", duration: "1 Year" },
  { id: 29, name: "Advanced Diploma in Fire & Industrial Safety Management", duration: "1 Year" },
  { id: 30, name: "Sub Fire Station Officer", duration: "6 Months" },
  { id: 31, name: "Diploma in Occupational Safety & Health", duration: "1 Year" },
  { id: 32, name: "Certificate in Occupational Safety & Health", duration: "6 Months" },
  { id: 33, name: "Advanced Diploma in Chemical Plant Processing Safety & Management", duration: "1 Year" },
  { id: 34, name: "Post Diploma in Petro Chemical Process Safety & Engineering", duration: "1 Year" },
  { id: 35, name: "Advanced Diploma in Industrial Safety", duration: "1 Year" },
  { id: 36, name: "Diploma in Industrial Environmental Safety", duration: "1 Year" },
  { id: 37, name: "Post Diploma in Hazard Analysis Critical Control Point", duration: "1 Year" },
  { id: 38, name: "Post Diploma in Power Plant Engineering, Safety & Technology", duration: "1 Year" },
  { id: 39, name: "Advanced Diploma in Occupational Health, Safety, Environment & Risk Mgmt", duration: "2 Years" },
  { id: 40, name: "Certificate Course in Fire Engineering", duration: "6 Months" },
  { id: 41, name: "Advanced Diploma in Offshore, Rig, Oil and Gas Safety Engineering", duration: "1 Year" },
  { id: 42, name: "Advanced Diploma in Oil and Gas Safety Engineering", duration: "2 Years" },
  { id: 43, name: "Advanced Diploma in Occupational Safety, Health & Environment Mgmt", duration: "1 Year" },
  { id: 44, name: "Post Diploma in Transport of Hazardous and Dangerous Goods by Road", duration: "1 Year" },
  { id: 45, name: "Diploma in Fire & Safety Engineering", duration: "1 Year" },
  { id: 46, name: "Diploma in Fire & Safety Engineering", duration: "6 Months" },
  { id: 47, name: "Diploma in Fire Engineering & Safety Management", duration: "2 Years" },
  { id: 48, name: "Diploma in Fire Safety & Security Management", duration: "1 Year" },
  { id: 49, name: "Post Diploma in Fire, Industrial & Environment Health Safety Mgmt", duration: "1 Year" },
  { id: 50, name: "Advanced Diploma in Fire Engineering & Industrial Safety Management", duration: "1 Year" },
  { id: 51, name: "Advanced Diploma in Certified Health Safety & Environment Engineer", duration: "1 Year" },
  { id: 52, name: "Diploma in Oil & Gas Safety Management", duration: "1 Year" },
  { id: 53, name: "Post Diploma in Fire & Industrial Safety Management", duration: "1 Year" },
  { id: 54, name: "Diploma in Fire & Safety", duration: "1 Year" },
  { id: 55, name: "Post Diploma in Health Safety Environment & Management", duration: "1 Year" },
];


const FireSafety = () => {
  // Choose random icons for variety
  const icons = [<BookOpen />, <Shield />, <Flame />, <Hammer />];
   const [showAll, setShowAll] = useState(false);  
    // Limit to 10 courses initially
    const displayedCourses = showAll ? courses : courses.slice(0, 8);

  return (
    <>
    <div className="bg-gray-50 py-9 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 rounded-full text-black shadow-[inset_1px_15px_13px_0px_#97266d]">
        🔥 Fire & Safety Courses
      </h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayedCourses.map((course, index) => (
            <div
              key={course.id}
              className="flex flex-col items-center justify-center border border-gray-300 rounded-xl bg-white p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[inset_1px_15px_13px_0px_#48bb78] transition"
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
  );
};





export default FireSafety;
