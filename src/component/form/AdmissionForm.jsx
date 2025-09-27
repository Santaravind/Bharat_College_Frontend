import { useState } from "react";

const AdmissionForm= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form Submitted Successfully ✅");
  };

  return (
    <>
   <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
    Admission Form
  </h2>
  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        placeholder="Enter your name"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        placeholder="Enter your email"
        required
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        placeholder="Enter your phone number"
        required
      />
    </div>

    {/* Course */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Course Name
      </label>
      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        required
      >
        <option value="">Select a course</option>
        <option value="C Programming">C Programming</option>
        <option value="Java Full Stack">Java Full Stack</option>
        <option value="React Development">React Development</option>
        <option value="Data Science">Data Science</option>
      </select>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition"
    >
      Submit
    </button>
  </form>

</>
  );
};

export default AdmissionForm;

