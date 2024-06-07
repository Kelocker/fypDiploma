import React from 'react'
import '../css/Home.css'
import Soya from '../assets/img/python_pixel_logo_transparent.png'

const Home = () => {
  return (
    <div className="Home-container">

        <div className="Home-title">
            
            <span className="Home-Welcome">
                
                Ever wonder how is the feeling of taming  
                <span className="Home-Python"> Python?</span>
            </span> 
            
            <span className="Home-Subtitle">
                <span>Welcome to SOYA!</span>
                <span>A 
                    <span className="Home-Game"> Gamefied </span> 
                    way to learn Python
                </span>
                
            </span>


            <div className="Home-Button-container">
                <button className="Home-Button" >
                    Get started
                </button>

                <button className="Home-Button Home-Learn-more" onClick={() => window.open("https://github.com/Kelocker/fypDiploma", "_blank", "noopener,noreferrer")}>
                    Learn more
                </button>

            </div>
            

            <span className="Home-Scroll">

            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z" stroke="#1C274C" stroke-width="1.5"/>
            <path d="M10.5 8.5C10.5 7.67157 11.1716 7 12 7C12.8284 7 13.5 7.67157 13.5 8.5V10.5C13.5 11.3284 12.8284 12 12 12C11.1716 12 10.5 11.3284 10.5 10.5V8.5Z" stroke="#1C274C" stroke-width="1.5"/>
            <path opacity="0.5" d="M12 2V7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>

                Scroll Down to see more section
            </span>
        </div>

        <div className="Home-content">

            <div className="Home-img">

                <img src={Soya} alt="soya" />

            </div>
            

        </div>

    </div>
  )
}

export default Home