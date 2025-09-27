// import { useEffect, useState } from "react";
// import college from "../assets/icollege.jpg";

// const images = [college, college, college];

// const HeadeGallery = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length); // loop forward
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="w-full relative overflow-hidden rounded-2xl shadow-lg">
//       {/* Image Container */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`slide-${index}`}
//             className="w-full h-96 object-cover flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Dots indicator */}
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full ${
//               current === index ? "bg-yellow-500" : "bg-gray-300"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeadeGallery;

import { useEffect, useState } from "react";
import college from "../assets/icollege.jpg";

const images = [college, college, college];

const HeadeGallery = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length); // loop forward
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full  flex flex-col md:flex-row gap-.5 mt-0.5">
      {/* Gallery Section */}
      <div className=" relative overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img }
              alt={`slide-${index}`}
              className="w-full h-24 sm:h-60 md:h-72 lg:h-72  object-cover flex-shrink-0 "
            />
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Notification Card */}
      {/* <div className="w-full md:w-1/3  shadow-lg rounded-2xl p-2 bg-red-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📢 Notifications</h2>
        <ul className="space-y-3">
          <li className="bg-yellow-50 p-3 rounded-lg shadow-sm border-l-4 border-yellow-500">
            New admission form is available now!
          </li>
          <li className="bg-green-50 p-3 rounded-lg shadow-sm border-l-4 border-green-500">
            Classes will resume from Oct 5th.
          </li>
          <li className="bg-blue-50 p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
            Check the updated syllabus in the portal.
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default HeadeGallery;

