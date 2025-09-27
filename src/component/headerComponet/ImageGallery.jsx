import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery() {
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
    "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
    "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
    "https://images.pexels.com/photos/4738081/pexels-photo-4738081.jpeg",
    
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev >= images.length - 4 ? images.length - 4 : prev + 1
    );
  };

  return (
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">📸 Photo Gallery</h2>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Images Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 25}%)` }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-1/4 flex-shrink-0 px-2" // 4 images per view
              >
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
    </section>
  );
}
