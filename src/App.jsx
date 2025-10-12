
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
import Verification from './component/Verification'
import { Toaster } from 'react-hot-toast'
import AdmissionSuccess from './component/form/admissionpages/AdmissionSuccess'
import SubmissionSuccess from './component/form/admissionpages/SubmissionSuccess'





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
      
    </Routes>
     <Footer/>

     </div>
      
     
    
    </>
    
  )
}

export default App
