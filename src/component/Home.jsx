
import logo from "./assets/logo2.png"
import CourseHome from "./coursepage/CourseHome";

import Photos from "./headerComponet/Photos";






const Home = () => {
 


  return (

<>   
 <div className="min-h-screen radial-gradient(circle at top center, rgba(59, 130, 246, 0.5),transparent 70% mb-10 p-2">

     
          {/* about us and notification  */}
     <div className="w-full p-2 md:p-2 lg:p-2.5   ">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
    
    {/* About Section */}
    <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-3">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
      <p className="text-gray-700 leading-relaxed">
        Kashi Institute of Technology (KIT), established in 2008 under the aegis of 
        the Jain Education Society, is a premier institution dedicated to excellence 
        in technical education. Located in Varanasi, Uttar Pradesh, the institute stands 
        out for its strong academic foundation, state-of-the-art infrastructure, and 
        commitment to student success.
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        KIT is approved by the All India Council for Technical Education (AICTE) and is 
        affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow. 
        The institute offers a wide range of undergraduate and postgraduate programs 
        in engineering, management, and applied sciences.
      </p>
    </div>

    {/* Notifications Section */}
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📢 Notifications</h2>
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
    </div>

  </div>
</div>
  
  {/* Collage heads */}
 
   <div className="bg-[oklch(97.7%_0.014_308.299)] mt-2 rounded-2xl items-center justify-center"> 
          <h1 className="text-black flex justify-center items-center font-bold text-2xl"> College heads</h1>
        
      <div className="max-w-7xl mx-auto mt-5 p-1 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
       
    
  
   
  {/* Card 1 */}
  <div
    className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col  items-center w-72 sm:mt-4 "
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 20%, #FFF991 0%, transparent 40%),
        radial-gradient(circle at 70% 80%, #FFD6E8 0%, transparent 50%),
        radial-gradient(circle at 90% 10%, #C9E7FF 0%, transparent 40%)
      `,
      backgroundBlendMode: "multiply",
    }}
  >
    {/* Image */}
    <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-gray-200 shadow-md -mt-10 ">
      <img
        src={logo}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Details */}
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
      <p className="text-gray-600 mt-2">Software Engineer</p>
      <p className="text-gray-500 text-sm mt-1">
        Passionate about building scalable web apps.
      </p>
    </div>
  
</div>

  {/* Card 2 */}
  <div
    className="relative bg-white rounded-2xl shadow-lg p-6 mt-3 flex flex-col items-center w-72"
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 20%, #FFF991 0%, transparent 40%),
        radial-gradient(circle at 70% 80%, #FFD6E8 0%, transparent 50%),
        radial-gradient(circle at 90% 10%, #C9E7FF 0%, transparent 40%)
      `,
      backgroundBlendMode: "multiply",
    }}
  >
    {/* Image */}
    <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-yellow-100 shadow-md -mt-10">
      <img
        src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg"
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Details */}
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
      <p className="text-gray-600 mt-2">Software Engineer</p>
      <p className="text-gray-500 text-sm mt-1">
        Passionate about building scalable web apps.
      </p>
    </div>
  
</div>

{/* Card 3 */}
  <div
    className="relative bg-white rounded-2xl shadow-lg p-6 mt-3 flex flex-col items-center w-72"
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 20%, #FFF991 0%, transparent 40%),
        radial-gradient(circle at 70% 80%, #FFD6E8 0%, transparent 50%),
        radial-gradient(circle at 90% 10%, #C9E7FF 0%, transparent 40%)
      `,
      backgroundBlendMode: "multiply",
    }}
  >
    {/* Image */}
    <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-gray-200 shadow-md -mt-10">
      <img
        src={logo}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Details */}
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
      <p className="text-gray-600 mt-2">Software Engineer</p>
      <p className="text-gray-500 text-sm mt-1">
        Passionate about building scalable web apps.
      </p>
    </div>
  
</div>

{/* Card 4 */}
  <div
    className="relative bg-white rounded-2xl shadow-lg p-6 mt-3 flex flex-col items-center w-72"
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 20%, #FFF991 0%, transparent 40%),
        radial-gradient(circle at 70% 80%, #FFD6E8 0%, transparent 50%),
        radial-gradient(circle at 90% 10%, #C9E7FF 0%, transparent 40%)
      `,
      backgroundBlendMode: "multiply",
    }}
  >
    {/* Image */}
    <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-gray-200 shadow-md -mt-10">
      <img
        src={logo}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Details */}
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
      <p className="text-gray-600 mt-2">Software Engineer</p>
      <p className="text-gray-500 text-sm mt-1">
        Passionate about building scalable web apps.
      </p>
    </div>
  
</div>

  </div>
  </div>

{/* Course that display in home  */}
 <CourseHome/>
 {/* image that display at home page */}
 <Photos/>



  
</div>


   
    


    
    
    </>

  );
};

export default Home;
