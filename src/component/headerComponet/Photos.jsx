
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

const images = [
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4951277/pexels-photo-4951277.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4951277/pexels-photo-4951277.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4951277/pexels-photo-4951277.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4951277/pexels-photo-4951277.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
  "https://images.pexels.com/photos/4951277/pexels-photo-4951277.jpeg",
  "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
];

const Photos = () => {
  const [index, setIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
const IMAGE_HEIGHT = 224 + 12; 
  // Desktop: horizontal
  const prevSlide = () => setIndex((prev) => (prev === 0 ? 0 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev >= images.length - 4 ? images.length - 4 : prev + 1));

  // // Mobile: vertical
  // const prevMobile = () => setMobileIndex((prev) => (prev === 0 ? 0 : prev - 1));
  // const nextMobile = () =>
  //   setMobileIndex((prev) => (prev >= images.length - 4 ? images.length - 4 : prev + 1));
   useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Resent Events</h2>

      {/* Desktop / Laptop View (Horizontal scroll) */}
      <div className="hidden  md:block relative">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Horizontal Images */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 25}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="w-1/4 flex-shrink-0 px-2">
                <img
                  src={img}
                  alt={`gallery-${idx}`}
                  className="rounded-xl shadow-md w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Mobile View (Vertical scroll with 4 per view) */}
     <div className="block md:hidden w-full max-w-sm overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
        >
          {images.map((img, idx) => (             
            <div key={idx} className="w-full flex-shrink-0">
               <img
                 src={img}
                 alt={`gallery-${idx}`}
                className="rounded-xl shadow-md w-full h-56 object-cover"
              />
             </div>
          ))}
         </div>
      </div>
    </section>
  );
};

export default Photos;

