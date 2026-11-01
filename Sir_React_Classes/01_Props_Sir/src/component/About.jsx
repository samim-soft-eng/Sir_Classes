import React from 'react'
import Content from './Content'


function About({abc}) {
  return (
    <div>
        <h1>About Us</h1>
        <Content xyz={abc} />
        <h1>{abc}</h1>
    </div>
  )
}

export default About