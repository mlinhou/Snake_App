import React from 'react'
import { Link } from "react-router-dom";
import './global.css';


function Home() {
  return (
    <div className='container'>
        <h1 className='welcome'>WELCOME TO THE GAME!</h1>
        <div className='instructions'>How to Play: Use Arrow Keys to Move Snake While Eating Red Apples</div>
        <div className='instructions-blue'>Blue Powerups Shrink Snake</div>
        <div className='instructions-yellow'>Yellow Powerups Slow Down Snake</div>
        <div className="links">
            <Link className='link' to="/Snake/"> Start Game </Link>
        </div>
    </div>
  )
}

export default Home