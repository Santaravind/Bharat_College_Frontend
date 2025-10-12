import React from "react";
import logo2 from './assets/logo2.png'
import QR from './assets/QR.jpg'
export default function Footer() {
  return (
    <footer className="bg-white text-black footer">
      {/* Footer Widgets */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* NSDM Info */}
        <div>
          <h3 className="text-lg font-bold mb-4 ">BTCFSM</h3>
          <img
            src={logo2}
            alt="NSDM Logo"
            className="w-46 mb-4"
          />
          <p className="text-sm">
            <b> Bharat Technical College</b> of Fire & Safety Management, Robertsganj, Sonbhadra (U.P.) is recognized as one of the No.1 colleges in the region for Fire & Safety Management and Computer Courses. We are committed to providing quality education, practical training, and career-oriented programs that prepare students to become skilled professionals.
</p>
        </div>

        {/* QR Code */}
        <div>
          <h3 className="text-lg font-bold mb-4">QR Code</h3>
          <a href="">
          {/* QR not added */}
            <img
              src={QR}
              alt="QR Code"
              className="w-full max-w-xs"
            />
          </a>
        </div>

        {/* MSME & Visitor Counts */}
        <div>
          <h3 className="text-lg font-bold mb-4">BTCFSM</h3>
          <img
            src="https://res.cloudinary.com/djwanfb4j/image/upload/v1758614510/hrrtvtzsz18ymcqkfadg.jpg"
            alt="BTCFSM"
            className="w-40 mb-4"
          />
          {/* <h3 className="text-lg font-bold mb-2">Visitor Counts</h3>
          <div className="text-yellow-400 text-sm">
            <p>Today: 3,935</p>
            <p>This Month: 41,379</p>
            <p>Total Visits: 393,567</p> */}
          {/* </div> */}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm mb-2">
            Bharat Technical College of Fire & Safety Management<br />
            Pusauli, Robertsganj<br />
            <br />
            Sonbhadra,Utter Predash, India, 231216
          </p>
          <p className="text-sm mb-2">Land Line: </p>
          <p className="text-sm mb-2">
            Mobile: 8840157051
          </p>
          <p className="text-sm mb-2">WhatsApp: 8840157051</p>
          <p className="text-sm mb-2">Email: bharattechnicalcollege@gmail.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-white text-gray-900 py-4 text-center text-sm">
        <p>
          © 2025 <a href="" className="text-black font-semibold">BTCFSM</a>. All rights reserved. Theme <a href="https://linkedin.com/in/aravind-sant-singh-717023229" className="text-black hover:text-blue-600" target="_blank" rel="noreferrer">Develop By Aravind Sant</a> 
           {/* <a href="https://wordpress.org" className="text-white" target="_blank" rel="noreferrer"></a>. */}
        </p>
      </div>
    </footer>
  );
}
