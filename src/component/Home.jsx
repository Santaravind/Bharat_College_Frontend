import React, { useState } from "react";
import { FaPills, FaUniversity, FaPhoneAlt, FaList } from "react-icons/fa";
import { GiMountains } from "react-icons/gi";
import { IoBook } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Home2 from   './Home2'

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });
const navigate=  useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    alert("Form Submitted Successfully!");
    setFormData({ name: "", email: "", course: "" });
  };

  const cards = [
    { title: "D. Pharm", icon: <FaPills className="text-green-600 text-6xl hover:animate-pulse hover:text-9xl" /> },
    { title: "University Courses", icon: <FaUniversity className="text-blue-600 text-6xl" /> },
    { title: "Sikkim Alpine University", icon: <GiMountains className="text-orange-500 text-6xl" /> },
    { title: "NSDM Syllabus", icon: <IoBook className="text-purple-600 text-6xl" /> },
    { title: "Contact Us", icon: <FaPhoneAlt className="text-green-500 text-6xl" /> },
    { title: "BTCFSM Course List", icon: <FaList className="text-pink-500 text-6xl"
      onClick={()=>navigate("/course" )}
      /> },
  ];

  return (

<>    <div className="min-h-screen radial-gradient(circle at top center, rgba(59, 130, 246, 0.5),transparent 70% flex p-6">

      {/* Left Side - 3/4 */}
      
      <div className="w-3/4 grid grid-cols-3 gap-6 pr-6 ">
      
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-yellow-50 hover:shadow-lg transition p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer  shadow-amber-300 "
          >
            {card.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
        
      {/* Right Side - 1/4 (Student Form) */}
      <div className="w-1/4 max-h-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Admission Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Course</option>
              <option value="D. Pharm">D. Pharm</option>
              <option value="University Courses">University Courses</option>
              <option value="Sikkim Alpine University">Sikkim Alpine University</option>
              <option value="NSDM Syllabus">NSDM Syllabus</option>
              <option value="NSDM Course List">NSDM Course List</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <Home2/>
    </>

  );
};

export default Home;
