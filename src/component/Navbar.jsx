import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // <nav className="bg-white text-black  font-bold h-15 px-6 py-3 m-0.5 shadow-md">
    //   <ul className="flex space-x-6">
    //     <li>
    //       <Link to="/" 

          
    //       className="hover:text-red-400"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></Link>
    //     </li>
    //     <li>
    //       <Link to="/about" className="hover:text-yellow-300">About</Link>
    //     </li>
    //     <li>
    //       <Link to="/student" className="hover:text-yellow-300">Student</Link>
    //     </li>
    //     <li>
    //       <Link to="/course" className="hover:text-yellow-300">Course</Link>
    //     </li>
    //     <li>
    //       <Link to="/admission" className="hover:text-yellow-300">Admission</Link>
    //     </li>
    //     <li>
    //       <Link to="/gallery" className="hover:text-yellow-300">Gallery</Link>
    //     </li>
    //     <li>
    //       <Link to="/syllabus" className="hover:text-yellow-300">Syllabus</Link>
    //     </li>
    //     <li>
    //       <Link to="/verification" className="hover:text-yellow-300">Verification</Link>
    //     </li>
    //   </ul>
    // </nav>
    <>
    <nav className="bg-[oklch(97.9%_0.021_166.113)] text-black font-semibold shadow-md">
  <ul className="flex items-center justify-center space-x-10 px-8 py-4">
    <li>
      <Link
        to="/"
        className="flex items-center space-x-2 text-lg hover:text-red-500 transition-colors duration-300"
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
    </li>
    <li>
      <Link
        to="/about"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        About
      </Link>
    </li>
    <li>
      <Link
        to="/student"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Student
      </Link>
    </li>
    <li>
      <Link
        to="/course"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Course
      </Link>
    </li>
    <li>
      <Link
        to="/admission"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Admission
      </Link>
    </li>
    <li>
      <Link
        to="/gallery"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Gallery
      </Link>
    </li>
    <li>
      <Link
        to="/syllabus"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Syllabus
      </Link>
    </li>
    <li>
      <Link
        to="/verification"
        className="text-lg hover:text-yellow-400 transition-colors duration-300"
      >
        Verification
      </Link>
    </li>
  </ul>
</nav>

    </>
  );
}
