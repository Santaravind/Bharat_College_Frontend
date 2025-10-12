import React from 'react'
import icon from './assets/icon.png'
import { IoLocationSharp } from "react-icons/io5";
import AdmissionForm from './form/admissionpages/AdmmisionForm'

function Admission() {
  return (
    <>
    <div className="min-h-screen w-full bg-white relative mt-5">
          {/* Background with grid + dots */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
                radial-gradient(circle, rgba(51,65,85,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px, 20px 20px, 20px 20px",
              backgroundPosition: "0 0, 0 0, 0 0",
            }}
          />
    
          {/* Content */}
    
          <h1 className="relative flex z-10 font-medium  justify-center items-center mt-2 pt-2 text-black text-6xl">Admission Contect us</h1>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {/* Top Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
               {/* college name */}
              <div>
               
                <div className="flex justify-center mb-3">
                  <img src={icon} alt="College icon" className="w-30 h-25 " />
                </div>
                <h3 className="font-bold text-2xl">BHARAT TECHNICAL COLLEGE  </h3>
                <p className="text-lg font-semibold mt-1">OF FIRE ENGINEERING & SAFETY  </p>
                <p className="text-lg font-semibold">MANAGEMENT </p>
              </div>
    
              {/* address */}
              <div>
                <div className="flex justify-center mb-3">
                  {/* <span className="text-6xl">📍</span> */}
                 <IoLocationSharp className=" text-red-600 text-7xl"/>  
                </div>
                <h3 className="font-bold text-2xl">Address:</h3>
                <p className="text-lg font-semibold mt-1">Robertsganj , Sonbhadra  </p>
                <p className="text-lg font-semibold">Utter Pradesh</p>
                <p className="text-lg font-semibold">Pin code : 231216 </p>
              </div>
    
              {/* Contect  */}
              <div>
                <div className="flex justify-center mb-3">
                  <span className="text-7xl">📞</span>
                </div>
                <h3 className="font-bold text-2xl">Contact us:</h3>
               
                  <p className="text-blue-600 font-medium text-xl fl ">
                      
                   bharattechnicalcollege@gmail.com
                    </p>
                
                <p className="text-blue-600 font-medium text-xl"> 📞+91-8840157051</p>
              </div>

              

            </div>
    <div className='border-2 border-neutral-200 rounded-2xl  bg-neutral-200'>   

 <AdmissionForm/>
    </div>
  
    
        
      
      </div>
      </div>
    </>
  )
}

export default Admission
