import { useState } from "react";
import collage from '../assets/college.png'
import imageCollege from '../assets/icollege.jpg'
import HeadeGallery from "./HeadeGallery";
export default function Header() {
  //const [search, setSearch] = useState("");

  return (
    <div className="w-full z-20">
      {/* Responsive styles for Header */}
      <style>{`
        @media (max-width: 768px) {
          .header-college-img {
            height: 80px !important;
          }
          .header-notice {
            font-size: 1rem !important;
          }
          .header-notice-label {
            font-size: 1.2rem !important;
            padding: 0.5rem 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .header-college-img {
            height: 50px !important;
          }
          .header-notice {
            font-size: 0.9rem !important;
          }
          .header-notice-label {
            font-size: 1rem !important;
            padding: 0.3rem 0.7rem !important;
          }
        }
      `}</style>
         {/* 🔍 Search Bar */}
      {/* <div className="flex items-center justify-between bg-white border-b p-2 mt-1 roinded-2xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-2 py-2 border rounded-md outline-none"
        />
        <button
          onClick={() => setSearch("")}
          className="ml-2 text-gray-600 hover:text-red-600"
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  
          width="24" 
           height="24"
             viewBox="0 0 24 24" 
              fill="none" 
               stroke="currentColor"  
               stroke-width="2" 
                stroke-linecap="round" 
                 stroke-linejoin="round" 
                  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        </button>
        <button className="ml-2 text-gray-600 hover:text-blue-600">
          👤
        </button>
      </div> */}
       
       {/* Image of college + Logo */}
        <div className="flex items-center border justify-center bg-white">
          <img src={collage} alt="college" className="header-college-img h-32 w-full" />
        </div>
     

      {/* 📢 Scrolling Notice Bar */}
      <div className="bg-red-700 font-semibold text-white flex items-center overflow-hidden header-notice">
        <span className="bg-red-900 text-white px-3 py-2 mr-2 text-2xl header-notice-label">NOTICE</span>
        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap py-2">
            Welcome to Bharat Technical College Of Fire Engineering & Safety
            Management
            <span className="text-yellow-400 ml-2">• Admissions Open </span> 
             • Explore Our Courses   
              • Stay Safe 
          </div>
        </div>
      </div>
      {/* Image for gallery s */}
      {/* <div className="justify-center items-center m-.5">
       <div>
               <img src={ imageCollege} alt="college" className="w-full h-80 object-cover rounded-b-2xl"/>
     </div>
      </div> */}
      <HeadeGallery/>
    </div>
  );
}
