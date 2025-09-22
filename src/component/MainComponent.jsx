import React from 'react'
import Header from './Header'
import Navbar from './Navbar'

function MainComponent() {
  return (
    <>
    <div className="min-h-screen w-full relative bg-white">
  {/* Cool Blue Glow Left */}
  <div
    className="absolute inset-0 -z-10 "
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    }}
  />
     {/* Your Content/Components */}
      <Header/>
      <Navbar/>
</div>
     </>
      
  )
}

export default MainComponent
