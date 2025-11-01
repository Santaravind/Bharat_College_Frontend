import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/course" },
    { name: "Admission", path: "/admission" },
    { name: "Gallery", path: "/gallery" },
    { name: "Syllabus", path: "/syllabus" },
    { name: "Result", path: "/result" },
    { name: "About", path: "/about" },
    { name: "Verification", path: "/verification" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="bg-[oklch(27.1%_0.105_12.094)] text-white shadow-md font-semibold  relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo / Home */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center text-lg hover:text-red-700 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler-home"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <span>Home</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-red-500"
                    : "hover:text-red-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden relative z-50">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[oklch(71.2%_0.194_13.428)] px-2 pt-2 pb-4 space-y-2 relative z-40">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`block w-full text-left text-lg transition-colors duration-300 ${
                location.pathname === link.path ? "text-red-500" : "hover:text-yellow-400"
              }`}
              onClick={() => {
                if (location.pathname !== link.path) navigate(link.path);
                setIsOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
