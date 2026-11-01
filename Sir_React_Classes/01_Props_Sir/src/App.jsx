import React from 'react'
import About from './component/About'



function App() {
  const name = "Samim";
  return (
    <>
    <div>App
      <h1>Hello World</h1>

    </div>
    <About abc={name}></About>
    </>
    
    
  )
}

export default App