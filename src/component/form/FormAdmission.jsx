import React, { useState } from "react";
import icon from '../assets/icon.png'
import { IoLocationSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const FormAdmission = () => {
     const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    course: "",
    message: "",
    terms: false,
  });

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
  // Check if any required field is empty
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.state.trim() ||
    !formData.course.trim() ||
    !formData.message.trim()
  ) {
    toast.error("⚠️ Please fill in all required fields!");
    return;
  }

  if (!formData.terms) {
    toast.success("⚠️ You must confirm the details before submitting.");
    return;
  }
    console.log("Form submitted:", formData);
    toast.success("Query register sucessfully!!!")

    // 🔹 Example: send to backend API
    /*
    fetch("http://localhost:8080/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
    */

    // Reset form (optional)
    setFormData({
      name: "",
      email: "",
      phone: "",
      state: "",
      course: "",
      message: "",
      terms: false,
    });
  };
  return (
    <div className="min-h-screen w-full bg-white relative mt-5">
      {/* Background with grid + dots */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
            radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 20px 20px",
          backgroundPosition: "0 0, 0 0, 0 0",
        }}
      />

      {/* Content */}

      <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl">Admission Contect us</h1>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
           {/* college name */}
          <div>
           
            <div className="flex justify-center mb-3">
              <img src={icon} alt="College icon" className="w-30 h-25 " />
            </div>
            <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
            <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
            <p className="text-lg font-semibold">MANAGEMENT </p>
          </div>

          {/* address */}
          <div>
            <div className="flex justify-center mb-3">
              {/* <span className="text-6xl">📍</span> */}
             <IoLocationSharp className=" text-red-600 text-7xl"/>  
            </div>
            <h3 className="font-bold text-2xl">Address:</h3>
            <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
            <p className="text-lg font-semibold">Utter Pradesh</p>
            <p className="text-lg font-semibold">Pin code : 231216 </p>
          </div>

          {/* Contect  */}
          <div>
            <div className="flex justify-center mb-3">
              <span className="text-7xl">📞</span>
            </div>
            <h3 className="font-bold text-2xl">Contact us:</h3>
           
              <p className="text-blue-600 font-medium text-xl fl ">
                  
               bharattechnicalcollege@gmail.com
                </p>
            
            <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
          </div>
        </div>

         <div className="min-h-screen w-fullrelative  bg-[#fefcff]   mt-2">
      {/* Dreamy Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />

    <h1 className="text-black  font-bold text-6xl font-serif flex items-center justify-center rounded-2xl mt-8 p-2"> Admission & Query Form</h1>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 mt-5  text-white rounded-2xl shadow-lg p-8 space-y-6 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="course"
            placeholder="Coure name that you interested "
            value={formData.course}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2"
          />
        </div>

        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>

        <div className="flex items-center text-black">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mr-2 bg-blue-400"
          />
          <label htmlFor="terms" className="text-sm">
            I confirm that I have given the details correct.
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
        >
          Send message
        </button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default FormAdmission;
