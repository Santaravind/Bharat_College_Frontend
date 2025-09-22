
import MainComponent from './component/MainComponent'
import Home from './component/Home'
import { Route, Routes } from 'react-router-dom'
import About from './component/About'
import Student from './component/Student'
import Course from './component/Course'
import Footer from './component/Footer'
import Admission from './component/Admission'
import Gallery from './component/Gallery'
import Syllabus from './component/Syllabus'
import Verification from './component/Verification'
import Navbar from './component/Navbar'
// import Navbar from './component/Navbar'




function App() {
  return (
    <>
    
      <MainComponent/>
       <div className=""> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route  path='/student' element={<Student/>} />
      <Route  path='/Course' element={<Course/>} />
      {/* <Route  path='/footer' element={<Footer/>} /> */}
      <Route  path='/admission' element={<Admission/>} />
      <Route  path='/gallery' element={<Gallery/>} />
      <Route  path='/syllabus' element={<Syllabus/>} />
      <Route  path='/verification' element={<Verification/>} />
    </Routes>
     <Footer/>

     </div>
      
     
    
    </>
    
  )
}

export default App
