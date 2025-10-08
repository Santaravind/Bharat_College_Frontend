import { useEffect, useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    // ✅ Fallback demo notifications (shown if backend fails)
    {
      title: "New admission form is available now!",
      link: "https://yourcollege.edu/admissions",
      type: "admission",
    },
    {
      title: "Classes will resume from Oct 5th.",
      link: "https://yourcollege.edu/schedule",
      type: "class",
    },
    {
      title: "Classes will resume from Oct 5th.",
      link: "https://yourcollege.edu/schedule",
      type: "class",
    },
  ]);


  // ✅ Fetch from backend
//   useEffect(() => {
//     fetch("http://localhost:8080/api/notifications") // your backend API
//       .then((res) => res.json())
//       .then((data) => setNotifications(data))
//       .catch((err) => console.error("Error fetching notifications:", err));
//   }, []);

  return (
    <div className=" shadow-lg bg-white rounded-2xl p-6 h-64 overflow-hidden">
      {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">📢 Notifications</h2> */}

      {/* Scroll container */}
      <div className="relative h-[200px] overflow-hidden">
        <ul className="animate-scroll space-y-3">
            
          {notifications.map((n, index) => (
            
            <li
              key={index}
              className={`p-3 rounded-lg shadow-sm border-l-4 cursor-pointer transition hover:bg-gray-100 ${
                n.type === "admission"
                  ? "bg-yellow-50 border-yellow-500"
                  : n.type === "class"
                  ? "bg-green-50 border-green-500"
                  : "bg-blue-50 border-blue-500"
              }`}
            >
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full text-red-600  font-medium blink-text"
              >
                {n.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
