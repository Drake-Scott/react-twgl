import React from 'react'
import Canvas from './Canvas/Canvas'
import '../Assets/Home.css'

const Home = (props) => {
  return (
    <div id='home'>
      <h1>TWGL Testing</h1>
      <Canvas width={1280} height={720}/>
    </div>
  )
}

export default Home