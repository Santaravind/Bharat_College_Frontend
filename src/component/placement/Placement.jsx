import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import abhay from "../assets/Abhay.jpg";
import amrish from "../assets/Amrish.jpg";
import bhagirath from "../assets/Bhagirath.jpg";
import rahul from "../assets/Rahul.jpg";
import rais from "../assets/rais.jpg";
import suraj from "../assets/suraj.jpg";
import tipu from "../assets/tipu.jpg";
import mb from "../assets/Mb.jpg";

function Placement() {
  const list = [
    {
      Image: abhay,
      name: "Abhay Kumar",
      company: "Safety Officer",
      location: "Dala Cement Plant, UP",
    },
   
    { Image:  amrish, name: "Amrish Singh", company: "Fire officer", location: " Raigarh Chhattisgarh" },
    { Image: bhagirath, name: "Bhagirath Singh", company: "Fire Fighter", location: "Mumbai" },
    { Image:  rahul, name: "Rahul Kumar", company: "Safety Officer", location: "Chennai" },
    { Image: rais, name: "Rais Ansari", company: "Safety Officer", location: "Mundra Gujrat" },
    { Image: suraj, name: "Suraj Kumar Rai", company: "Safety Officer", location: "Chennai" },
    { Image: tipu, name: "Tipu Ansari", company: "Safety Officer", location: "Mundra Gujrat" },
    { Image: mb, name: "Md basaruddin", company: "Safety Officer", location: "Pune" },
   
  ];

  const [index, setIndex] = useState(0);

  // Detect screen size to decide how many slides per view
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) {
        setPerView(4); // desktop
      } else if (window.innerWidth >= 768) {
        setPerView(3); // tablet
      } else {
        setPerView(1); // mobile
      }
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Auto slide only on mobile
  // Auto slide only on mobile
useEffect(() => {
  if (perView === 1) {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= list.length - 1) {
          return 0; // reset to first
        }
        return prev + 1;
      });
    }, 5000); // 10s per slide
   
    
    return () => clearInterval(interval);
}
  
}, [perView, list.length]);


  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? list.length - perView : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev >= list.length - perView ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full py-8 px-4 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">🎓 Our Placements</h2>

      {/* Slider Container */}
      {/* <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(index * 100) / perView}%)`,
            width: `${(list.length * 100) / perView}%`,
          }}
        >
          {list.map((item, idx) => (
            <div
              key={idx}
              className="w-full px-2"
              style={{ flex: `0 0 ${100 / perView}%` }}
            >
             <div className="bg-white shadow-md rounded-xl p-6 text-center w-full">
             <img
                src={item.Image}
                alt={item.name}
                className="w-40 h-40 object-cover mx-auto rounded-full shadow"
            />
            <h3 className="mt-4 font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.company}</p>
            <p className="text-gray-500 text-sm">{item.location}</p>
                </div>

            </div>
          ))}
        </div>
      </div> */}
<div className="overflow-hidden relative">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(-${index * (100 / perView)}%)`,
    }}
  >
    {list.map((item, idx) => (
      <div
        key={idx}
        className="px-2"
        style={{ flex: `0 0 ${100 / perView}%` }} // ensures 4 cards on desktop, 3 on tablet, 1 on mobile
      >
        <div className="bg-white shadow-md rounded-xl p-6 text-center w-full">
          <img
            src={item.Image}
            alt={item.name}
            className="w-40 h-40 object-cover mx-auto rounded-full shadow"
          />
          <h3 className="mt-4 font-bold text-lg">{item.name}</h3>
          <p className="text-gray-600">{item.company}</p>
          <p className="text-gray-500 text-sm">{item.location}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Navigation Arrows (only for tablet/desktop) */}
      {perView > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  );
}

export default Placement;
