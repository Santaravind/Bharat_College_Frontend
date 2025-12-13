
import MainComponent from './component/MainComponent'
import Home from './component/Home'
import { Route, Routes } from 'react-router-dom'
import About from './component/About'
import Student from './component/Student'
import Course from './component/coursepage/Course'
import Footer from './component/Footer'
import Admission from './component/Admission'
import Gallery from './component/Gallery'
import Syllabus from './component/Syllabus'

import { Toaster } from 'react-hot-toast'
import AdmissionSuccess from './component/form/admissionpages/AdmissionSuccess'
import SubmissionSuccess from './component/form/admissionpages/SubmissionSuccess'
import Declaration from './component/form/admissionpages/Declaration'
import Verification from './component/resultverification/Verification'
import AdminPage from './component/adminpanel/AdminPage.jsx'
import Result from './component/resultverification/Result.jsx'
import AdminResult from './component/adminpanel/AdminResult.jsx'





function App() {
  return (
    <>
    <Toaster/>
      <MainComponent/>
       <div className=""> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route  path='/student' element={<Student/>} />
      <Route  path='/course' element={<Course/>} />
      {/* <Route  path='/footer' element={<Footer/>} /> */}
      <Route  path='/admission' element={<Admission/>} />
      <Route  path='/gallery' element={<Gallery/>} />
      <Route  path='/syllabus' element={<Syllabus/>} />
      <Route  path='/verification' element={<Verification/>} />
      <Route path='/admissionSuccess' element={<AdmissionSuccess/>}/>
      <Route path='/Success' element={<SubmissionSuccess/>}/>
      <Route path='/declaration' element={<Declaration/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/adminresult' element={<AdminResult/>} />  
      {/* <Route path='/admisucces' element={<AdmissionSuccess/>}/> */}

      
    </Routes>
     <Footer/>

     </div>
      
     
    
    </>
    
  )
}

export default App
