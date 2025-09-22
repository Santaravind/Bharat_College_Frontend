import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Footer Widgets */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* NSDM Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">NSDM</h3>
          <img
            src="https://nehruskilldevelopmentmission.com/wp-content/uploads/2020/04/logo-300x272.png"
            alt="NSDM Logo"
            className="w-36 mb-4"
          />
          <p className="text-sm">
            <b>Skills training</b> is designed to provide employees with the
            targeted <b>training</b> they need to gain the knowledge and
            abilities necessary for their job. Skills training can also be used
            to re-educate and retrain employees whenever new technology, processes or systems debut.
          </p>
        </div>

        {/* QR Code */}
        <div>
          <h3 className="text-lg font-bold mb-4">QR Code</h3>
          <a href="https://nehruskilldevelopmentmission.com/student-verification/">
            <img
              src="https://nehruskilldevelopmentmission.com/wp-content/uploads/2020/04/qr-code.png"
              alt="QR Code"
              className="w-full max-w-xs"
            />
          </a>
        </div>

        {/* MSME & Visitor Counts */}
        <div>
          <h3 className="text-lg font-bold mb-4">MSME</h3>
          <img
            src="https://nehruskilldevelopmentmission.com/wp-content/uploads/2021/03/msme-1.png"
            alt="MSME"
            className="w-40 mb-4"
          />
          <h3 className="text-lg font-bold mb-2">Visitor Counts</h3>
          <div className="text-yellow-400 text-sm">
            <p>Today: 3,935</p>
            <p>This Month: 41,379</p>
            <p>Total Visits: 393,567</p>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm mb-2">
            Nehru Skill Development Mission<br />
            4/1958, Samiyapuram Koot Road,<br />
            Pattukonampatti post, Pappireddipatti Tk,<br />
            Dharmapuri Dt, Tamilnadu, India, 636905
          </p>
          <p className="text-sm mb-2">Land Line: 04643-296120</p>
          <p className="text-sm mb-2">
            Mobile: 8110897011, 9786390331, 9585343052, 7639884905
          </p>
          <p className="text-sm mb-2">WhatsApp: 8110897011</p>
          <p className="text-sm mb-2">Email: nsdmeduc@gmail.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
        <p>
          © 2025 <a href="https://nehruskilldevelopmentmission.com/" className="text-white font-semibold">NSDM</a>. All rights reserved. Theme <a href="https://themegrill.com/themes/spacious" className="text-white" target="_blank" rel="noreferrer">Spacious</a> by ThemeGrill. Powered by <a href="https://wordpress.org" className="text-white" target="_blank" rel="noreferrer">WordPress</a>.
        </p>
      </div>
    </footer>
  );
}
